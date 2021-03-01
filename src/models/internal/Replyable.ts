import Content from "./Content.ts";
import { FullnamePrefixes } from "../../utils/constants.ts";

type Replyables =
  | FullnamePrefixes.Comment
  | FullnamePrefixes.Message
  | FullnamePrefixes.Submission;

export default abstract class Replyable extends Content {
  /**
   * @description Replies to the submission, comment or message.
   * @param content Text of the reply.
   */
  reply(content: string) {
    this.req.postParams("api/comment", {
      text: content,
      thing_id: this.fullname,
    });
  }

  delete() {
    this.req.postParams("api/del", {
      id: this.fullname,
    });
  }
}
