import Replyable from "./Replyable.ts";

/**
 * @description Class for handling Reddit's primary elements - submissions and comments.
 */
export default abstract class PrimaryContent extends Replyable {
  save() {
    this.req.postParams("api/save", { id: this.fullname });
  }

  unsave() {
    this.req.postParams("api/unsave", { id: this.fullname });
  }

  lock() {
    this.req.postParams("api/lock", { id: this.fullname });
  }

  unlock() {
    this.req.postParams("api/unlock", { id: this.fullname });
  }
}
