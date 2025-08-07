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

const menuItems = [
  {
    label: "Home",
    pathname: "/" as const,
  },
  {
    label: "Articles",
    pathname: "/articles" as const,
  },
  {
    label: "About",
    pathname: "/about" as const,
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
      <AnimatePresence>
        {!open && (
          <motion.p
            animate={{ opacity: 1, scale: 1 }}
            className="-translate-x-1/2 -translate-y-1/2 -rotate-90 absolute top-1/2 left-1/2 hidden text-xl group-data-[collapsible=icon]:block"
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            Menu
          </motion.p>
        )}
      </AnimatePresence>

      <SidebarHeader>
        <AnimatePresence>
          {open && (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="w-full border-sidebar-border border-b py-8 text-center text-xl group-data-[collapsible=icon]:hidden"
              exit={{ opacity: 0, y: -20 }}
              initial={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
                delay: 0.1,
              }}
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
              <AnimatePresence>
                {open &&
                  menuItems.map((item, index) => (
                    <motion.div
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      exit={{ opacity: 0, x: -30, y: 20 }}
                      initial={{ opacity: 0, x: -30, y: 20 }}
                      key={item.pathname}
                      transition={{
                        duration: 0.8,
                        ease: "easeInOut",
                        delay: 0.3 + index * 0.1,
                      }}
                    >
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          asChild
                          className="relative h-full justify-center py-5 text-xl transition-colors before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-current before:transition-all before:duration-300 hover:bg-sidebar hover:before:left-0 hover:before:w-full data-[active=true]:bg-sidebar data-[active=true]:font-bold"
                          isActive={
                            location.pathname === item.pathname ||
                            (item.pathname.length > 1 &&
                              location.pathname.includes(item.pathname))
                          }
                        >
                          <Link to={item.pathname}>{item.label}</Link>
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
