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
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
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
          <motion.div variants={linkVariants} whileHover="hover">
            <Link
              className="cursor-pointer text-2xl transition-colors hover:text-primary md:text-3xl"
              to="/about"
            >
              About
            </Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover">
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
