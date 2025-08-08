import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { type } from "arktype";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const articles = defineCollection({
  name: "articles",
  directory: "content",
  include: ["**/*.mdx"],
  schema: type({
    title: "string",
    "summary?": "string",
    tags: "string[]",
    keywords: "string[]",
    isDraft: "boolean = false",
    publishedAt: "string.date",
    updatedAt: "string.date?",
    slug: "string",
    toc: "boolean = false",
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeKatex],
    });
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [articles],
});
