import { MDXContent } from "@content-collections/mdx/react";
import { sexyEaseCurve } from "@rectangular-labs/ui/animation/constants";
import { useTheme } from "@rectangular-labs/ui/components/theme-provider";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { allArticles } from "content-collections";
import { motion, stagger, type Variants } from "motion/react";

const aboutDetails = createServerFn().handler(() => {
  const aboutArticle = allArticles.filter(
    (article) => article.slug === "about",
  );
  return aboutArticle[0];
});

export const Route = createFileRoute("/about")({
  component: About,
  loader: async () => {
    const aboutArticle = await aboutDetails();
    if (!aboutArticle) {
      throw notFound();
    }
    return { article: aboutArticle };
  },
});

function About() {
  const { article } = Route.useLoaderData();
  const { theme } = useTheme();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: stagger(0.2),
        ease: sexyEaseCurve,
      },
    },
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 28, scale: 0.98, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: sexyEaseCurve,
      },
    },
  };

  const paragraphVariants: Variants = {
    hidden: { opacity: 0, y: 18, x: -14 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: sexyEaseCurve,
      },
    },
  };

  return (
    <motion.div
      animate="visible"
      className="prose sm:prose-lg md:prose-xl data-[theme=dark]:prose-invert mx-auto max-w-4xl px-8 py-16"
      data-theme={theme}
      initial="hidden"
      variants={containerVariants}
    >
      <motion.h1 variants={headingVariants}>About</motion.h1>

      <motion.p variants={paragraphVariants}>
        <MDXContent code={article.mdx} />
      </motion.p>
    </motion.div>
  );
}
