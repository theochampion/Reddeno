export interface ContentOptions {
  fullname: string;
}

/**
 * @description Class with methods that _all_ content on Reddit share, like `fetch()`.
 */
export default class Content {
  constructor(options: ContentOptions) {
    Object.assign(this, options);
  }
}
