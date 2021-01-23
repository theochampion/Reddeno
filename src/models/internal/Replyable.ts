import Content from "./Content.ts";
import { FullnamePrefixes } from "../../utils/constants.ts";

type Replyables =
  | FullnamePrefixes.Comment
  | FullnamePrefixes.Message
  | FullnamePrefixes.Submission;

export default abstract class Replyable extends Content {
  reply(content: string, type: Replyables) {
    this.req.postParams("api/comment", {
      text: content,
      thing_id: type,
    });
  }

  edit(content: string) {
    this.req.postParams("api/editusertext", {
      text: content,
      thing_id: this.fullname,
      return_rtjson: false,
    });
  }

  delete() {
    this.req.postParams("api/del", {
      id: this.fullname,
    });
  }
}
