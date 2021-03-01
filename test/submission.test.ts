import Reddit from "../src/index.ts";
import {
  assertEquals,
  assertStrictEquals,
} from "https://deno.land/std@0.88.0/testing/asserts.ts";

Deno.test({
  name: "isCorrectAuthor",
  fn: async function (): Promise<void> {
    const reddit = new Reddit({
      clientID: Deno.env.get("REDDIT_CLIENT_ID")!,
      clientSecret: Deno.env.get("REDDIT_CLIENT_SECRET")!,
      password: Deno.env.get("REDDIT_PASSWORD")!,
      username: Deno.env.get("REDDIT_USERNAME")!,
      userAgent: "Reddeno testing suite (by u/Xeoth)",
    });

    const submission = await reddit.submission("g0s6tn");

    assertStrictEquals(
      submission.title,
      "Changes to Reddit’s Political Ads Policy",
    );
  },
  sanitizeOps: false,
  sanitizeResources: false,
});
