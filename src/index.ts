import Submission from "./models/Submission.ts";
import { FullnamePrefixes } from "./utils/constants.ts";
import Requests, { RedditOptions } from "./utils/requests.ts";
import { ListingData } from "./models/internal/Listing.ts";

export default class Reddit {
  req: Requests;
  constructor(options: RedditOptions) {
    this.req = new Requests(options);
  }

  /**
   * @description Returns a Submission object with the desired ID.
   * @param id Reddit ID of the desired submission.
   */
  async submission(id: string): Promise<Submission> {
    const fullname = `${FullnamePrefixes.Submission}${id}`;
    // deno-lint-ignore no-explicit-any
    const d: any = await this.req.get(
      "api/info.json",
      { id: fullname },
    );
    const data = d.data.children[0].data;
    return new Submission(
      fullname,
      {
        creationDate: new Date(data.created * 1000),
        subreddit: data.subreddit,
        title: data.title,
        url: data.url,
        author: data.author,
        id,
      },
      this.req,
    );
  }

  /**
   * @description Provides a `Redditor` object for the specified username.
   * @param username Username of the Redditor.
   */
  async redditor(username: string) {
  }
}
