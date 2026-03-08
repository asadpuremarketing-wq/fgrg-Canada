import { governanceDocuments } from "../content/documents";
import { pagesContent } from "../content/pages";
import { findComplianceWarnings } from "../lib/compliance";
import { getAllNewsPosts } from "../lib/news";

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }
  if (Array.isArray(value)) {
    return value.flatMap((item) => collectStrings(item));
  }
  if (value && typeof value === "object") {
    return Object.values(value).flatMap((item) => collectStrings(item));
  }
  return [];
}

function scanStrings(label: string, values: string[]) {
  const warnings = values.flatMap((value, index) =>
    findComplianceWarnings(value).map((warning) => `${label} [item ${index + 1}]: ${warning}`),
  );
  return warnings;
}

async function run() {
  const allWarnings: string[] = [];

  allWarnings.push(...scanStrings("pagesContent", collectStrings(pagesContent)));
  allWarnings.push(...scanStrings("governanceDocuments", collectStrings(governanceDocuments)));

  const posts = await getAllNewsPosts();
  for (const post of posts) {
    allWarnings.push(
      ...scanStrings(`news/${post.slug}`, [post.title, post.excerpt, post.content]),
    );
  }

  if (allWarnings.length > 0) {
    console.error("Compliance check failed.");
    for (const warning of allWarnings) {
      console.error(`- ${warning}`);
    }
    process.exit(1);
  }

  console.log("Compliance check passed.");
}

run().catch((error) => {
  console.error("Compliance check failed with runtime error.", error);
  process.exit(1);
});
