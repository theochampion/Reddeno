import Requests from "../utils/requests.ts";
import PrimaryContent from "./internal/PrimaryContent.ts";

export default class Submission extends PrimaryContent {
  id: string;
  // title: string;

  constructor(fullname: string, req: Requests) {
    super(fullname, req);
    this.id = fullname.slice(3); // removing the t3_ part
  }

  hide() {
    this.req.postParams("api/hide", { id: this.fullname });
  }
}
