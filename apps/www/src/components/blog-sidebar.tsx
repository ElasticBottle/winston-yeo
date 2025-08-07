import { cn } from "@rectangular-labs/ui/utils/cn";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface BlogSidebarProps {
  className?: string;
}

export function BlogSidebar({ className }: BlogSidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-50 hidden h-screen border-gray-200 border-r bg-gray-100 transition-all duration-300 ease-in-out md:block",
        isHovered ? "w-64" : "w-16",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full flex-col">
        {/* Menu Header */}
        <div className="flex items-center p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 font-bold text-black">
            W
          </div>
          {isHovered && (
            <span className="ml-3 font-medium text-lg opacity-100 transition-opacity duration-200">
              Menu
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            <li>
              <Link
                className={cn(
                  "flex items-center rounded-lg px-2 py-3 transition-colors hover:bg-gray-100",
                  "text-gray-700 hover:text-gray-900",
                )}
                to="/"
              >
                <span className="font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  "flex items-center rounded-lg px-2 py-3 transition-colors hover:bg-gray-100",
                  "text-gray-700 hover:text-gray-900",
                )}
                to="/about"
              >
                <span className="font-medium">About</span>
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  "flex items-center rounded-lg px-2 py-3 transition-colors hover:bg-gray-100",
                  "text-gray-700 hover:text-gray-900",
                )}
                to="/articles"
              >
                <span className="font-medium">Articles</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
