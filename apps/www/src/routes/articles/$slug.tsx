import { MDXContent } from "@content-collections/mdx/react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { allArticles } from "content-collections";

export const Route = createFileRoute("/articles/$slug")({
  component: Article,
  loader: ({ params }) => {
    const article = allArticles.find(
      (article) => article._meta.path === params.slug,
    );
    if (!article) {
      throw notFound();
    }
    return article;
  },
});

function Article() {
  const article = Route.useLoaderData();

  return (
    <div className="min-h-screen px-8 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Back button */}
        <div className="mb-8">
          <Link
            className="inline-flex items-center text-gray-400 transition-colors hover:text-yellow-400"
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
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="mb-6 font-bold text-4xl leading-tight md:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-3">
            {article.tags.map((tag) => (
              <span
                className="rounded-full bg-gray-800 px-4 py-2 font-medium text-gray-300 text-sm"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Date if available */}
          {article.publishedAt && (
            <div className="text-gray-400">
              Published on{" "}
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          )}
        </header>

        {/* Article Content */}
        <div className="prose prose-lg prose-invert max-w-none">
          <MDXContent code={article.mdx} />
        </div>
      </div>
    </div>
  );
}
