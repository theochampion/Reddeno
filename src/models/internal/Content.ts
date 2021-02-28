import Requests from "../../utils/requests.ts";

/**
 * @description Class with methods that _all_ content on Reddit share, like `fetch()`.
 */
export default abstract class Content {
  protected req;
  protected fullname;
  protected fetched = false;
  constructor(fullname: string, req: Requests) {
    this.req = req;
    this.fullname = fullname;
  }
  protected async fetch() {
    // deno-lint-ignore no-explicit-any
    const data: any = await this.req.get(
      "api/info.json",
      { id: this.fullname },
    );
    Object.assign(this, data.data.children[0]);
  }
}
