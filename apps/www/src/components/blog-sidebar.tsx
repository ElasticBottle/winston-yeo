import { sexyEaseCurve } from "@rectangular-labs/ui/animation/constants";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@rectangular-labs/ui/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { FancyLinkVariant } from "./fancy-link";

export const MENU_ITEMS = [
  {
    label: "Home",
    pathname: "/" as const,
  },
  {
    label: "About",
    pathname: "/about" as const,
  },
  {
    label: "Articles",
    pathname: "/articles" as const,
  },
];

export function BlogSidebar() {
  const location = useLocation();
  const { setOpen, open } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      variant="floating"
    >
      <AnimatePresence initial={false}>
        {!open && (
          <motion.p
            animate={{ opacity: 1, scale: 1 }}
            className="-rotate-90 -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 hidden transform-gpu text-xl will-change-transform group-data-[collapsible=icon]:block"
            exit={{ opacity: 0, scale: 0.96 }}
            initial={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: sexyEaseCurve }}
          >
            Menu
          </motion.p>
        )}
      </AnimatePresence>

      <SidebarHeader>
        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="w-full border-sidebar-border border-b py-8 text-center text-xl group-data-[collapsible=icon]:hidden"
              exit={{ opacity: 0, y: -10 }}
              initial={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: sexyEaseCurve }}
            >
              Menu
            </motion.p>
          )}
        </AnimatePresence>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <SidebarMenu>
              <AnimatePresence initial={false}>
                {open &&
                  MENU_ITEMS.map((item, index) => (
                    <motion.div
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -22, y: 14 }}
                      initial={{ opacity: 0, x: -22, y: 14 }}
                      key={item.pathname}
                      transition={{
                        duration: 0.45,
                        ease: sexyEaseCurve,
                        delay: 0.12 + index * 0.06,
                      }}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className={FancyLinkVariant()}
                          isActive={
                            location.pathname === item.pathname ||
                            (item.pathname.length > 1 &&
                              location.pathname.includes(item.pathname))
                          }
                        >
                          <Link
                            className="flex justify-center hover:bg-transparent"
                            to={item.pathname}
                          >
                            {item.label}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
