import Replyable from "./Replyable.ts";

/**
 * @description Class for handling Reddit's primary elements - submissions and comments.
 */
export default abstract class PrimaryContent extends Replyable {
  /**
   * @description Saves the post.
   */
  save() {
    this.req.postParams("api/save", { id: this.fullname });
  }

  /**
   * @description Unsaves the post.
   */
  unsave() {
    this.req.postParams("api/unsave", { id: this.fullname });
  }

  /**
   * @description Locks the post. Requires "posts" permission in the subreddit.
   */
  lock() {
    this.req.postParams("api/lock", { id: this.fullname });
  }

  /**
   * @description Unlocks the post. Requires "posts" permission in the subreddit.
   */
  unlock() {
    this.req.postParams("api/unlock", { id: this.fullname });
  }

  /**
   * @description Edits the submission or comment. Requires you to be the author.
   * @param content Content of the edit.
   */
  edit(content: string) {
    this.req.postParams("api/editusertext", {
      text: content,
      thing_id: this.fullname,
    });
  }
}
