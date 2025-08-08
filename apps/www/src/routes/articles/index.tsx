import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { allArticles } from "content-collections";
import { motion, type Variants } from "motion/react";
import { useMemo } from "react";

const articleServerFn = createServerFn().handler(() => {
  return allArticles.map((article) => {
    return {
      ...article,
      mdx: undefined,
      content: undefined,
    };
  });
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
          (article.summary?.toLowerCase() ?? "").includes(searchTerm) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          (article.keywords ?? []).some((kw) =>
            kw.toLowerCase().includes(searchTerm),
          ),
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

    // Sort by date if available, otherwise by title
    return filtered.sort((a, b) => {
      if (a.publishedAt && b.publishedAt) {
        return (
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
        );
      }
      return a.title.localeCompare(b.title);
    });
  }, [search.search, search.tag, articles]);

  if (filteredArticles.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground text-xl">No articles found.</p>
      </div>
    );
  }

  const listItemVariants: Variants = {
    hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: -12, transition: { duration: 0.35 } },
  };

  return (
    <motion.div
      animate="visible"
      className="space-y-12"
      initial="hidden"
      transition={{ staggerChildren: 0.08 }}
      variants={{}}
    >
      {filteredArticles.map((article) => (
        <motion.article
          className="group"
          key={article._meta.path}
          layout
          variants={listItemVariants}
        >
          <Link
            className="block"
            params={{ slug: article.slug }}
            to="/articles/$slug"
          >
            <div className="mb-4">
              <motion.h2
                className="mb-4 font-bold text-3xl transition-colors group-hover:text-primary md:text-4xl"
                layoutId={`article-title-${article.title}`}
              >
                {article.title}
              </motion.h2>

              {/* Tags */}
              <motion.div
                className="mb-6 flex flex-wrap gap-3"
                layoutId={`article-meta-${article.tags.join(",")}-${article.title}`}
              >
                {article.tags.map((tag) => (
                  <span
                    className="rounded-full bg-muted px-3 py-1 text-muted-foreground text-sm"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Summary if available */}
              {article.summary && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {article.summary}
                </p>
              )}
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  );
}
