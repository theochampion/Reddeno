import Requests from "../../utils/requests.ts";
import Content, { ContentOptions } from "./Content.ts";
import { FullnamePrefixes } from "../../utils/constants.ts";

type Replyables =
  | FullnamePrefixes.Comment
  | FullnamePrefixes.Message
  | FullnamePrefixes.Submission;

export default abstract class Replyable extends Content {
  private req: Requests;
  constructor(options: ContentOptions, requests: Requests) {
    super(options);

    this.req = requests;
  }

  reply(content: string, type: Replyables) {
    this.req.post("/api/comment", {
      text: content,
      thing_id: type,
    });
  }
}
