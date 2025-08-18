import { sexyEaseCurve } from "@rectangular-labs/ui/animation/constants";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@rectangular-labs/ui/components/ui/dropdown-menu";
import { Input } from "@rectangular-labs/ui/components/ui/input";
import {
  createFileRoute,
  Outlet,
  useMatchRoute,
  useNavigate,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { type } from "arktype";
import { LayoutGroup, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { getArticlesSummary } from "~/lib/article";

const getArticleSummary = createServerFn().handler(() => {
  return getArticlesSummary();
});

const articlesSearchSchema = type({
  "search?": "string|undefined",
  "tag?": "string[]|undefined",
  "page?": "(number|string)|undefined",
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
  const [searchInput, setSearchInput] = useState(search.search ?? "");

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
    setSearchInput(searchValue);
  };

  // Debounce URL updates to avoid lag while typing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void navigate({
        search: (prev) => {
          return {
            ...prev,
            search: searchInput || undefined,
            page: undefined,
          };
        },
      });
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [navigate, searchInput]);

  const handleTagFilter = (tag: string | undefined) => {
    if (!tag) {
      // No tag filter, show everything
      void navigate({
        search: (prev) => {
          return {
            ...prev,
            tag: undefined,
            page: undefined,
          };
        },
      });
      return;
    }
    // filter by tag
    void navigate({
      search: (prev) => {
        const newTagValue = prev.tag?.includes(tag)
          ? prev.tag.filter((tagValue) => tagValue !== tag)
          : [...(prev.tag ?? []), tag];
        return {
          ...prev,
          tag: newTagValue.length > 0 ? newTagValue : undefined,
          page: undefined,
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
              "lg:data-[detail=true]:-left-44 xl:data-[detail=true]:-left-[5%] h-full w-full px-8 py-16 data-[detail=true]:hidden lg:w-80 lg:data-[detail=true]:fixed lg:data-[detail=true]:top-0 lg:data-[detail=true]:block lg:data-[detail=true]:cursor-pointer"
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
            <motion.h1 className="mb-12 font-bold text-4xl md:text-5xl" layout>
              Articles
            </motion.h1>

            <motion.div className="space-y-6" layout>
              {/* Search */}
              <Input
                className="h-full w-full rounded-full border px-4 py-3"
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search"
                type="text"
                value={searchInput}
              />

              {/* Filter by tag */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="flex w-full items-center rounded-full border px-4 py-3"
                  onClick={() => setIsTagDropdownOpen(!isTagDropdownOpen)}
                  type="button"
                >
                  <span className="truncate">
                    {search.tag ? `Tag: ${search.tag}` : "Filter by tag"}
                  </span>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-[var(--radix-popper-anchor-width)]">
                  <DropdownMenuItem
                    className="w-full px-4 py-2"
                    onClick={() => handleTagFilter(undefined)}
                  >
                    All tags
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    {allTags.map((tag) => (
                      <DropdownMenuCheckboxItem
                        checked={(search.tag ?? []).includes(tag)}
                        className="w-full"
                        key={tag}
                        onClick={() => handleTagFilter(tag)}
                      >
                        {tag}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
