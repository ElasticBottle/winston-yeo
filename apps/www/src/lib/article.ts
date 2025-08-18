import { allArticles } from "content-collections";

export function getArticlesSummary() {
  return allArticles.map((article) => {
    return {
      ...article,
      mdx: undefined,
      content: undefined,
    };
  });
}

export function getArticleBySlug(slug: string) {
  const article = allArticles.filter((article) => {
    return article.slug === slug;
  });
  return article[0];
}
