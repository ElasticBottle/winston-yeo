import * as Icon from "@rectangular-labs/ui/components/icon";
import { ThemeToggle } from "@rectangular-labs/ui/components/theme-provider";
import { Button } from "@rectangular-labs/ui/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@rectangular-labs/ui/components/ui/drawer";
import { Separator } from "@rectangular-labs/ui/components/ui/separator";
import { cn } from "@rectangular-labs/ui/utils/cn";
import { Link, useLocation } from "@tanstack/react-router";
import { MENU_ITEMS } from "./blog-sidebar";

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const location = useLocation();

  return (
    <div className={cn("md:hidden", className)}>
      <Drawer direction="right">
        {/* Top Bar */}
        <div className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b bg-background px-4 py-3">
          <ThemeToggle />
          <DrawerTrigger asChild>
            <Button size={"icon"} variant={"ghost"}>
              <Icon.Menu />
            </Button>
          </DrawerTrigger>
        </div>

        {/* Drawer Content */}
        <DrawerContent className="bg-background py-2">
          <DrawerHeader className="text-center">Menu</DrawerHeader>
          <Separator />
          <nav className="px-2 py-8">
            <ul className="space-y-8">
              {MENU_ITEMS.map((menuItem) => {
                return (
                  <li key={menuItem.pathname}>
                    <DrawerClose asChild>
                      <Link
                        className="block text-center text-muted-foreground data-[active=true]:font-bold"
                        data-active={
                          location.pathname === menuItem.pathname ||
                          (menuItem.pathname.length > 1 &&
                            location.pathname.includes(menuItem.pathname))
                        }
                        to={menuItem.pathname}
                      >
                        {menuItem.label}
                      </Link>
                    </DrawerClose>
                  </li>
                );
              })}
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>

      {/* Spacer to prevent content from hiding under the fixed header */}
      <div className="h-16" />
    </div>
  );
}
