import { createFileRoute, Link } from "@tanstack/react-router";
import { allArticles } from "content-collections";
import { useMemo } from "react";

export const Route = createFileRoute("/articles/")({
  component: ArticlesList,
});

function ArticlesList() {
  const search = Route.useSearch();

  // Filter articles based on search and tag
  const filteredArticles = useMemo(() => {
    let filtered = [...allArticles];

    // Filter by search term
    if (search.search) {
      const searchTerm = search.search.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
          article.content.toLowerCase().includes(searchTerm),
      );
    }

    // Filter by tag
    if (search.tag) {
      filtered = filtered.filter((article) =>
        article.tags.includes(search.tag),
      );
    }

    // Sort by date if available, otherwise by title
    return filtered.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });
  }, [search.search, search.tag]);

  if (filteredArticles.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-gray-400 text-xl">
          No articles found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {filteredArticles.map((article, index) => (
        <article className="group" key={article._meta.path}>
          <Link
            className="block"
            params={{ slug: article._meta.path }}
            to="/articles/$slug"
          >
            <div className="mb-4">
              <h2 className="mb-4 font-bold text-3xl transition-colors group-hover:text-yellow-400 md:text-4xl">
                {article.title}
              </h2>

              {/* Tags */}
              <div className="mb-6 flex flex-wrap gap-3">
                {article.tags.map((tag) => (
                  <span
                    className="rounded-full bg-gray-800 px-3 py-1 text-gray-300 text-sm"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Summary if available */}
              {article.summary && (
                <p className="text-gray-400 text-lg leading-relaxed">
                  {article.summary}
                </p>
              )}
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
