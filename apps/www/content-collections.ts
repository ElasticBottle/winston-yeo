import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { type } from "arktype";

const articles = defineCollection({
  name: "articles",
  directory: "content",
  include: ["**/*.mdx"],
  schema: type({
    title: "string",
    "summary?": "string",
    tags: "string[]",
    isDraft: "boolean = false",
    publishedAt: "string.date",
    updatedAt: "string.date?",
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
    };
  },
});

export default defineConfig({
  collections: [articles],
});
