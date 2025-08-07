import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="container mx-auto flex h-full min-h-screen w-full">
      <div className="flex-1" />

      <div className="flex min-h-screen flex-col justify-center gap-28">
        <div className="space-y-6">
          <h1 className="font-semibold text-6xl leading-tighter md:text-8xl">
            Winston Yeo
          </h1>
          <div className="space-y-2">
            <p className="text-lg text-muted-foreground md:text-xl">
              Reading other people's code so you don't have to.
            </p>
            <p className="text-lg text-muted-foreground md:text-xl">
              Writing code that future-me won&apos;t hate.
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-8">
          <Link
            className="cursor-pointer text-2xl transition-colors hover:text-primary md:text-3xl"
            to="/about"
          >
            About
          </Link>
          <Link
            className="cursor-pointer text-2xl transition-colors hover:text-primary md:text-3xl"
            to="/articles"
          >
            Articles
          </Link>
        </div>
      </div>

      <div className="flex-1" />
    </div>
  );
}
