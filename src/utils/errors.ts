export class RedditAPIError extends Error {
  constructor(message: string) {
    super(
      `RedditAPIError: Reddit returned an error${
        message ? `: ${message}` : "."
      }`,
    );
  }
}
