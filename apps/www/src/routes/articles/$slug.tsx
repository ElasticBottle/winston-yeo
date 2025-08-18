import { MDXContent } from "@content-collections/mdx/react";
import { useTheme } from "@rectangular-labs/ui/components/theme-provider";
import { Badge } from "@rectangular-labs/ui/components/ui/badge";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect } from "react";
import { getArticleBySlug } from "~/lib/article";

export const Route = createFileRoute("/articles/$slug")({
  component: Article,
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug);
    if (!article) {
      throw notFound();
    }
    return article;
  },
});

function Article() {
  const article = Route.useLoaderData();
  const { theme } = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <motion.div key={article._meta.path}>
      <div className="mx-auto max-w-3xl lg:max-w-4xl">
        {/* Back button */}
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
          initial={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            className="inline-flex items-center text-muted-foreground transition-colors hover:text-primary"
            to="/articles"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Back Arrow</title>
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Back to Articles
          </Link>
        </motion.div>

        {/* Article Header */}
        <header className="mb-12">
          <motion.h2
            className="mb-6 font-bold text-3xl leading-tight md:text-4xl"
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
              <Badge key={tag}>{tag}</Badge>
            ))}
          </motion.div>

          {/* Date if available */}
          {article.publishedAt && (
            <motion.div
              animate={{ opacity: 1 }}
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Published on{" "}
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </motion.div>
          )}
        </header>

        {/* Article Content */}
        <motion.div
          animate={{ opacity: 1 }}
          className={`prose prose-lg max-w-none ${
            theme === "dark" ? "prose-invert" : ""
          }`}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <MDXContent code={article.mdx} />
        </motion.div>
      </div>
    </motion.div>
  );
}
