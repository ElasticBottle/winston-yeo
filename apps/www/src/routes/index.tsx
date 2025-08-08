import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 32, scale: 0.98, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, x: -24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="container mx-auto flex h-full min-h-screen w-full">
      <div className="flex-1" />

      <motion.div
        animate="visible"
        className="flex min-h-screen flex-col justify-center gap-28"
        initial="hidden"
        variants={containerVariants}
      >
        <motion.div className="space-y-6" variants={itemVariants}>
          <motion.h1
            className="font-semibold text-6xl leading-tighter md:text-8xl"
            variants={itemVariants}
          >
            Winston Yeo
          </motion.h1>
          <motion.div className="space-y-2" variants={containerVariants}>
            <motion.p
              className="text-lg text-muted-foreground md:text-xl"
              variants={subtitleVariants}
            >
              Reading other people's code so you don't have to.
            </motion.p>
            <motion.p
              className="text-lg text-muted-foreground md:text-xl"
              variants={subtitleVariants}
            >
              Writing code that future-me won&apos;t hate.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Navigation Links */}
        <motion.div
          className="flex flex-col gap-8"
          variants={containerVariants}
        >
          <motion.div variants={linkVariants}>
            <Link
              className="cursor-pointer text-2xl transition-colors hover:text-primary md:text-3xl"
              to="/about"
            >
              About
            </Link>
          </motion.div>
          <motion.div variants={linkVariants}>
            <Link
              className="cursor-pointer text-2xl transition-colors hover:text-primary md:text-3xl"
              to="/articles"
            >
              Articles
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="flex-1" />
    </div>
  );
}
