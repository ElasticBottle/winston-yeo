import {
  ThemeProvider,
  ThemeToggle,
} from "@rectangular-labs/ui/components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
} from "@rectangular-labs/ui/components/ui/sidebar";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AnimatePresence } from "motion/react";
import { BlogSidebar } from "~/components/blog-sidebar";
import { MobileNav } from "~/components/mobile-nav";
import { seo } from "~/lib/seo";
import appCss from "../style.css?url";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "Big Blog Title - Welcome to the big blog",
        description:
          "A personal blog featuring articles about life, technology, and various thoughts",
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeToggle className="absolute top-2 right-2 z-10" />
          <SidebarProvider>
            <BlogSidebar />
            <SidebarInset>
              <MobileNav />
              <AnimatePresence mode="sync">
                <Outlet />
              </AnimatePresence>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}

// reportWebVitals(typeof window!== 'undefined' ?console.log : undefined);
