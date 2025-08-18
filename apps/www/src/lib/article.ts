import { allArticles } from "content-collections";

export function getArticlesSummary() {
  return allArticles
    .map((article) => {
      if (article.slug === "about") {
        return undefined;
      }
      return {
        ...article,
        mdx: undefined,
        content: undefined,
      };
    })
    .filter((article) => article !== undefined)
    .sort((a, b) => {
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    });
}

export function getArticleBySlug(slug: string) {
  const article = allArticles.filter((article) => {
    return article.slug === slug;
  });
  return article[0];
}
