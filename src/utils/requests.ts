// @deno-types="../libs/ky-types.d.ts"
import ky from "https://deno.land/x/ky@v0.23.0/index.js";
import { RedditAPIError } from "./errors.ts";

export interface RedditOptions {
  clientID: string;
  clientSecret: string;
  username: string;
  password: string;
  userAgent: string;
  connection?: {
    reddit: string;
    oauth: string;
  };
}

const defaultOptions: RedditOptions = {
  clientSecret: "",
  clientID: "",
  username: "",
  password: "",
  userAgent: "",
  connection: {
    reddit: "https://reddit.com",
    oauth: "https://oauth.reddit.com",
  },
};

export default class Requests {
  private options: RedditOptions;
  private oauth;
  private reddit;

  constructor(options: RedditOptions) {
    // Makes sure that connection.{reddit, oauth} aren't undefined
    this.options = { ...defaultOptions, ...options };

    // creating ky instances for better readability
    this.reddit = ky.create({
      prefixUrl: this.options.connection?.reddit,
      headers: {
        "User-Agent": this.options.userAgent,
      },
    });

    this.oauth = ky.create({
      prefixUrl: this.options.connection?.oauth,
      headers: {
        "User-Agent": this.options.userAgent,
      },
    });

    this.login();
  }

  private async login(): Promise<void> {
    // /api/v1/access_token takes application/x-www-form-urlencoded, not json

    interface ResponseParams {
      access_token: string;
      token_type: string;
      expires_in: number;
      scope: string;
      error: string;
    }

    // we need to await fetch the token...
    const response = await this.reddit.post(
      "api/v1/access_token",
      {
        searchParams: {
          "grant_type": "password",
          "username": this.options.username,
          "password": this.options.password,
        },
        headers: {
          Authorization: `Basic ${
            btoa(`${this.options.clientID}:${this.options.clientSecret}`)
          }`,
        },
      },
    ).json<ResponseParams>().catch((reason: string) => {
      throw new RedditAPIError(reason);
    });

    if (response.error) {
      throw new RedditAPIError(response.error);
    }

    // ...and then extend the `oauth` ky instance with that token
    this.oauth = this.oauth.extend({
      prefixUrl: this.options.connection?.oauth,
      headers: {
        Authorization: btoa(`bearer ${this.options.clientID}:`),
      },
    });
  }

  async get(path: string) {
    return await this.oauth.get(path);
  }

  async post(path: string) {
    const response = await this.oauth.post(path).json();
  }
}
