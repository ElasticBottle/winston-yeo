"use client";

import NavLink from "@components/Navigation/NavLink";
import { FadeInVariant, FadeOutVariant } from "@utils/framerMotion/constants";
import { m } from "framer-motion";

const MenuBarVariant = {
  initial: {
    x: "-80%",
    opacity: 0,
  },
  load: {
    opacity: 1,
  },
  animate: {
    x: 0,
  },
};

const SeparatorVariant = {
  initial: {
    width: 0,
  },
  animate: {
    width: "auto",
  },
};

export default function DesktopSidebar({
  links,
}: {
  links: Array<{ path: string; label: string }>;
}) {
  return (
    <m.nav
      initial="initial"
      animate="load"
      whileHover="animate"
      variants={MenuBarVariant}
      className="fixed z-10 hidden h-full w-80 items-center bg-base-secondary  md:block"
    >
      <m.p
        variants={FadeOutVariant}
        className="absolute top-1/2 right-0.5 -rotate-90 text-2xl font-light tracking-wider"
      >
        Menu
      </m.p>
      <m.div
        initial="initial"
        whileHover="animate"
        transition={{
          delayChildren: 0.4,
          staggerChildren: 0.08,
        }}
        className="h-full w-full px-10 py-14 text-center text-xl tracking-widest"
      >
        <m.p variants={FadeInVariant}>Menu</m.p>
        <m.div
          variants={SeparatorVariant}
          className="my-10 h-0.5 bg-primary"
          role="separator"
        />
        {links.map((navLinkDetail) => (
          <NavLink
            key={navLinkDetail.path}
            className="after:mb-8"
            label={navLinkDetail.label}
            path={navLinkDetail.path}
          />
        ))}
      </m.div>
    </m.nav>
  );
}
