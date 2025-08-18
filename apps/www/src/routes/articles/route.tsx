import { sexyEaseCurve } from "@rectangular-labs/ui/animation/constants";
import {
  createFileRoute,
  Outlet,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { type } from "arktype";
import { LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import { getArticlesSummary } from "~/lib/article";

const getArticleSummary = createServerFn().handler(() => {
  return getArticlesSummary();
});

const articlesSearchSchema = type({
  "search?": "string|undefined",
  "tag?": "string[]|undefined",
});

export const Route = createFileRoute("/articles")({
  component: ArticlesLayout,
  validateSearch: articlesSearchSchema,
  loader: async () => {
    return await getArticleSummary();
  },
});

function ArticlesLayout() {
  const articles = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/articles" });
  const matchRoute = useMatchRoute();
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  // Detect when we're on the article detail route
  const isDetailRoute = !!matchRoute({ to: "/articles/$slug" });

  // Get all unique tags from articles
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    articles.forEach((article) => {
      article.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [articles]);

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
    <div className="h-screen">
      <div className="mx-auto flex h-full max-w-6xl">
        <motion.div
          className="flex h-full w-full flex-col lg:flex-row lg:gap-16"
          transition={{ duration: 0.6, ease: sexyEaseCurve }}
        >
          {/* Left side - Search and Filters */}
          <motion.div
            animate={{
              opacity: isDetailRoute ? 0.35 : 1,
              filter: isDetailRoute ? "grayscale(1)" : "grayscale(0)",
            }}
            className={
              "h-full w-full px-8 py-16 data-[detail=true]:hidden lg:w-80 lg:data-[detail=true]:fixed lg:data-[detail=true]:top-0 lg:data-[detail=true]:left-0 lg:data-[detail=true]:block lg:data-[detail=true]:cursor-pointer"
            }
            data-detail={isDetailRoute}
            initial={{ opacity: 0, x: -16 }}
            onClick={() => {
              if (isDetailRoute) {
                void navigate({ to: "/articles" });
              }
            }}
            transition={{ duration: 0.55, ease: sexyEaseCurve }}
          >
            <motion.h1 className="mb-12 font-bold text-5xl md:text-6xl" layout>
              Articles
            </motion.h1>

            <motion.div className="space-y-6" layout>
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
            </motion.div>
          </motion.div>

          {/* Right side - Articles Content */}
          <LayoutGroup id="articles">
            <div
              className="flex h-full w-full"
              // style={{ flexBasis: isDetailRoute ? "100%" : "66.6667%" }}
              // transition={{ duration: 0.6, ease: sexyEaseCurve }}
            >
              <div className="h-full w-full px-8 py-16">
                <Outlet />
              </div>
            </div>
          </LayoutGroup>
        </motion.div>
      </div>
    </div>
  );
}
