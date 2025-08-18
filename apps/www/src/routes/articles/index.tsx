import { sexyEaseCurve } from "@rectangular-labs/ui/animation/constants";
import { Badge } from "@rectangular-labs/ui/components/ui/badge";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { motion, stagger, type Variants } from "motion/react";
import { useMemo } from "react";
import { FancyLink } from "~/components/fancy-link";
import { getArticlesSummary } from "~/lib/article";

const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: sexyEaseCurve },
  },
};
const articleServerFn = createServerFn().handler(() => {
  return getArticlesSummary();
});

export const Route = createFileRoute("/articles/")({
  component: ArticlesList,
  loader: async () => {
    return await articleServerFn();
  },
});

function ArticlesList() {
  const search = Route.useSearch();
  const articles = Route.useLoaderData();

  // Filter articles based on search and tag
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by search term
    if (search.search) {
      const searchTerm = search.search.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          (article.summary ?? "").toLowerCase().includes(searchTerm) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          article.keywords.some((kw) => kw.toLowerCase().includes(searchTerm)),
      );
    }

    // Filter by tag
    if (search.tag) {
      filtered = filtered.filter((article) =>
        article.tags.some((tag) =>
          search.tag?.some((t) => t.toLowerCase().includes(tag.toLowerCase())),
        ),
      );
    }

    return filtered;
  }, [search.search, search.tag, articles]);

  if (filteredArticles.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground text-xl">No articles found.</p>
      </div>
    );
  }

  return (
    <motion.div
      animate="visible"
      className="space-y-6"
      initial="hidden"
      transition={{ delayChildren: stagger(0.06) }}
    >
      {filteredArticles.map((article) => (
        <motion.article
          className="group"
          key={article.slug}
          variants={listItemVariants}
        >
          <FancyLink
            className="block pt-0 pb-1"
            params={{ slug: article.slug }}
            to="/articles/$slug"
          >
            <motion.h2
              className="pb-2 font-bold text-3xl md:text-4xl"
              layoutId={`article-title-${article.title}`}
            >
              {article.title}
            </motion.h2>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2 pb-3"
              layoutId={`article-meta-${article.tags.join(",")}-${article.title}`}
            >
              {article.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </motion.div>

            {/* Summary if available */}
            {article.summary && (
              <p className="text-lg text-muted-foreground">{article.summary}</p>
            )}
          </FancyLink>
        </motion.article>
      ))}
    </motion.div>
  );
}
