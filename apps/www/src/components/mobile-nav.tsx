import { cn } from "@rectangular-labs/ui/utils/cn";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("md:hidden", className)}>
      {/* Top Bar */}
      <div className="fixed top-0 right-0 left-0 z-50 border-gray-300 border-b bg-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 font-bold text-black">
              W
            </div>
            <span className="ml-3 font-medium text-lg">Menu</span>
          </div>
          <button
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <title>Menu</title>
              {isOpen ? (
                <path
                  d="M6 18L18 6M6 6l12 12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              ) : (
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              )}
            </svg>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="border-gray-300 border-t bg-gray-100 shadow-lg">
            <nav className="px-4 py-2">
              <ul className="space-y-1">
                <li>
                  <Link
                    className="block rounded-lg px-2 py-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setIsOpen(false)}
                    to="/"
                  >
                    <span className="font-medium">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="block rounded-lg px-2 py-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setIsOpen(false)}
                    to="/about"
                  >
                    <span className="font-medium">About</span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="block rounded-lg px-2 py-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => setIsOpen(false)}
                    to="/articles"
                  >
                    <span className="font-medium">Articles</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>

      {/* Spacer to prevent content from hiding under the fixed header */}
      <div className="h-16" />
    </div>
  );
}
