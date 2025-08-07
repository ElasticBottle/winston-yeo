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

const menuItems = [
  {
    label: "Home",
    href: "/" as const,
  },
  {
    label: "Articles",
    href: "/articles" as const,
  },
  {
    label: "About",
    href: "/about" as const,
  },
];

export function BlogSidebar() {
  const location = useLocation();
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      variant="floating"
    >
      <p className="-translate-x-1/2 -translate-y-1/2 -rotate-90 absolute top-1/2 left-1/2 hidden text-xl group-data-[collapsible=icon]:block">
        Menu
      </p>

      <SidebarHeader>
        <p className="w-full border-sidebar-border border-b py-8 text-center text-xl group-data-[collapsible=icon]:hidden">
          Menu
        </p>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className="relative h-full justify-center py-5 text-xl transition-colors before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-current before:transition-all before:duration-300 hover:bg-sidebar hover:before:left-0 hover:before:w-full data-[active=true]:bg-sidebar data-[active=true]:font-bold"
                    isActive={location.pathname === item.href}
                  >
                    <Link to={item.href}>{item.label}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
