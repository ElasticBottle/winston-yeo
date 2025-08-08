import { useTheme } from "@rectangular-labs/ui/components/theme-provider";
import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { theme } = useTheme();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.2,
        ease: [0.22, 1, 0.36, 1],
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
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
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
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
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
        In this section, I explain why I am indeed perhaps one of the best if
        not the best creator on the planet. For starters, this text that you are
        reading right now is in fact not written by a human, it is generated
        using an advanced AI known as GPT-3. Are you shocked? Don't be, because
        I was simply lying to you. The true purpose of the text is to fill up
        the page to look as if there is something worth saying here, when in
        reality, the is not.
      </motion.p>

      <motion.p variants={paragraphVariants}>
        Around the age of 0 years old, I was born onto this planet. For many
        people around me, this seems to be a fairly common occurrence. However,
        what was not common was what followed this. There is no doubt in my mind
        that when you read what I am about to say, you will question your own
        greatness. Are you ready? I invested my life savings into Terra. Fear,
        my existence.
      </motion.p>
    </motion.div>
  );
}
