import fs from "node:fs/promises";
import path from "node:path";
import { warnIfContentHasBannedTerms } from "@/lib/compliance";

type NewsFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
};

export type NewsPost = NewsFrontmatter & {
  slug: string;
  content: string;
};

const newsDir = path.join(process.cwd(), "content", "news");

function parseFrontmatter(markdown: string): { data: NewsFrontmatter; content: string } {
  if (!markdown.startsWith("---")) {
    throw new Error("News post missing frontmatter.");
  }

  const parts = markdown.split("---");
  const rawData = parts[1] ?? "";
  const content = parts.slice(2).join("---").trim();
  const entries = rawData
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separator = line.indexOf(":");
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim();
      return [key, value.replace(/^"(.*)"$/, "$1")] as const;
    });

  const dataObject = Object.fromEntries(entries) as Partial<NewsFrontmatter>;

  if (!dataObject.title || !dataObject.date || !dataObject.excerpt) {
    throw new Error("News frontmatter must include title, date, and excerpt.");
  }

  return {
    data: {
      title: dataObject.title,
      date: dataObject.date,
      excerpt: dataObject.excerpt,
    },
    content,
  };
}

function sortByDateDescending(posts: NewsPost[]) {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllNewsPosts(): Promise<NewsPost[]> {
  const files = await fs.readdir(newsDir);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  const posts = await Promise.all(
    markdownFiles.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(newsDir, fileName);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const { data, content } = parseFrontmatter(fileContent);

      if (process.env.NODE_ENV !== "production") {
        warnIfContentHasBannedTerms(`news/${fileName}`, [data.title, data.excerpt, content]);
      }

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        content,
      };
    }),
  );

  return sortByDateDescending(posts);
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  const posts = await getAllNewsPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function renderNewsMarkdown(markdown: string) {
  const lines = markdown
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: Array<{ type: "h2" | "p"; text: string }> = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.replace(/^##\s+/, "") });
      continue;
    }
    blocks.push({ type: "p", text: line });
  }

  return blocks;
}
