import Submission from "./models/Submission.ts";
import { FullnamePrefixes } from "./utils/constants.ts";
import Requests, { RedditOptions } from "./utils/requests.ts";

export default class Reddit {
  req: Requests;
  constructor(options: RedditOptions) {
    this.req = new Requests(options);
  }

  submission(id: string) {
    return new Submission(FullnamePrefixes.Submission + id, this.req);
  }
}
