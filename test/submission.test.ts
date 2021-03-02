import Reddit from "../src/index.ts";
import {
  assertEquals,
  assertMatch,
  assertStrictEquals,
} from "https://deno.land/std@0.88.0/testing/asserts.ts";

Deno.test({
  name: "correctSubmissionValues",
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

    assertStrictEquals(submission.subreddit, "announcements");
    assertEquals(submission.creationDate, new Date(1586842538000));
    assertStrictEquals(
      submission.url,
      "https://www.reddit.com/r/announcements/comments/g0s6tn/changes_to_reddits_political_ads_policy/",
    );
    assertMatch(
      submission.text!,
      /^As the 2020 election approaches, we are updating our/,
    );
  },
  sanitizeOps: false,
  sanitizeResources: false,
});
