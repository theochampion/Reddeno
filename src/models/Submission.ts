import Requests from "../utils/requests.ts";
import PrimaryContent from "./internal/PrimaryContent.ts";
import Redditor from "./Redditor.ts";

interface SubmissionProperties {
  subreddit: string;
  text?: string;
  link?: string;
  title: string;
  flair?: {
    text: string | null;
    class: string | null;
    templateID: string | null;
  };
  id: string;
  url: string;
  creationDate: Date;
  author?: Redditor | string;
}

export default class Submission extends PrimaryContent {
  id: string;
  subreddit!: string;
  text?: string;
  link?: string;
  title!: string;
  flair?: {
    text: string | null;
    class: string | null;
    templateID: string | null;
  };
  url!: string;
  creationDate!: Date;
  author?: Redditor;

  constructor(
    fullname: string,
    properties: SubmissionProperties,
    req: Requests,
  ) {
    super(fullname, req);
    this.id = fullname.slice(3); // removing the t3_ part

    Object.assign(this, properties);
  }

  hide() {
    this.req.postParams("api/hide", { id: this.fullname });
  }
}
