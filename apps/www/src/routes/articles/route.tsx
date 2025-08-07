import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { type } from "arktype";
import { allArticles } from "content-collections";
import { useMemo, useState } from "react";

const articlesSearchSchema = type({
  "search?": "string|undefined",
  "tag?": "string[]|undefined",
});

export const Route = createFileRoute("/articles")({
  component: ArticlesLayout,
  validateSearch: articlesSearchSchema,
});

function ArticlesLayout() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/articles" });
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  // Get all unique tags from articles
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    allArticles.forEach((article) => {
      article.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, []);

  const handleSearchChange = (searchValue: string) => {
    void navigate({
      search: (prev) => {
        return {
          ...prev,
          search: searchValue || undefined,
        };
      },
    });
  };

  const handleTagFilter = (tag: string | undefined) => {
    void navigate({
      search: (prev) => {
        return {
          ...prev,
          tag: tag ? [tag] : undefined,
        };
      },
    });
    setIsTagDropdownOpen(false);
  };

  return (
    <div className="min-h-screen px-8 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row lg:gap-16">
          {/* Left side - Search and Filters */}
          <div className="mb-12 lg:mb-0 lg:w-1/3">
            <h1 className="mb-12 font-bold text-5xl md:text-6xl">Articles</h1>

            <div className="space-y-6">
              {/* Search */}
              <div>
                <input
                  className="w-full rounded-full border border-gray-600 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-yellow-400 focus:outline-none"
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search"
                  type="text"
                  value={search.search || ""}
                />
              </div>

              {/* Filter by tag */}
              <div className="relative">
                <button
                  className="flex w-full items-center justify-between rounded-full border border-gray-600 bg-gray-800 px-4 py-3 text-left text-white transition-colors hover:border-yellow-400"
                  onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                  type="button"
                >
                  <span>
                    {search.tag ? `Tag: ${search.tag}` : "Filter by tag"}
                  </span>
                </button>

                {isTagDropdownOpen && (
                  <div className="absolute top-full z-10 mt-2 w-full rounded-lg border border-gray-600 bg-gray-800 py-2 shadow-lg">
                    <button
                      className="w-full px-4 py-2 text-left text-white hover:bg-gray-700"
                      onClick={() => handleTagFilter(undefined)}
                      type="button"
                    >
                      All tags
                    </button>
                    {allTags.map((tag) => (
                      <button
                        className="w-full px-4 py-2 text-left text-white hover:bg-gray-700"
                        key={tag}
                        onClick={() => handleTagFilter(tag)}
                        type="button"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right side - Articles Content */}
          <div className="lg:w-2/3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
