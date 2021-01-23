import Requests from "../../utils/requests.ts";
import Replyable from "./Replyable.ts";

/**
 * @description Class for handling Reddit's primary elements - submissions and comments.
 */
export default abstract class PrimaryContent extends Replyable {
  save() {
    return this.req.postParams("api/save", {
      id: this.fullname,
    });
  }
}
