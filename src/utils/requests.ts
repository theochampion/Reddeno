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
  private token?: string;
  private oauth;
  private reddit;

  constructor(options: RedditOptions) {
    // Makes sure that connection.{reddit, oauth} aren't undefined
    this.options = { ...defaultOptions, ...options };
    this.oauth = ky.create({
      prefixUrl: this.options.connection?.oauth,
    });
    this.reddit = ky.create({
      prefixUrl: this.options.connection?.reddit,
    });

    console.log(this.options);
  }

  async login() {
    this.token = await this.initializeConnection();
  }

  private async initializeConnection(): Promise<string> {
    // /api/v1/access_token takes application/x-www-form-urlencoded, not json

    interface ResponseParams {
      access_token: string;
      token_type: string;
      expires_in: number;
      scope: string;
      error: string;
    }

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
          "User-Agent": this.options.userAgent,
        },
      },
    ).json<ResponseParams>().catch((reason) => {
      throw new RedditAPIError(reason);
    });

    if (response.error) {
      throw new RedditAPIError(response.error);
    }

    return response.access_token;
  }
}
