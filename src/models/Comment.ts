import Requests from "../utils/requests.ts";
import PrimaryContent from "./internal/PrimaryContent.ts";
import Redditor from "./Redditor.ts";

interface CommentProperties {
  subreddit: string;
  text?: string;
  id: string;
  url: string;
  creationDate: Date;
  author?: Redditor | string;
}

export default class Comment extends PrimaryContent {
  subreddit!: string;
  text!: string;
  author!: string;
  url!: string;
  creationDate!: Date;

  constructor(
    fullname: string,
    properties: CommentProperties,
    req: Requests,
  ) {
    super(fullname, req);
    Object.assign(this, properties);
  }
}
