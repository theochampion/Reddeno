import Submission from "./models/Submission.ts";
import { FullnamePrefixes } from "./utils/constants.ts";
import Requests, { RedditOptions } from "./utils/requests.ts";
import { ListingData } from "./models/internal/Listing.ts";

export default class Reddit {
  req: Requests;
  constructor(options: RedditOptions) {
    this.req = new Requests(options);
  }

  async submission(id: string) {
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
}
