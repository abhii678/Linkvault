"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Bookmark, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      href: "/home",
      icon: Home,
      isActive: pathname === "/home"
    },
    {
      label: "Creators",
      href: "/creators",
      icon: Users,
      isActive: pathname.startsWith("/creators")
    },
    {
      label: "Saved",
      href: "/saved",
      icon: Bookmark,
      isActive: pathname === "/saved"
    },
    {
      label: "Search",
      href: "/search",
      icon: Search,
      isActive: pathname === "/search"
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 z-40 flex h-16 w-full items-center justify-around border-t border-gray-200 bg-white shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center justify-center gap-1 w-full h-full text-xs transition-colors"
          >
            <Icon 
              className={cn(
                "h-5 w-5 transition-transform active:scale-95",
                item.isActive ? "text-[#534AB7] scale-110" : "text-gray-400"
              )} 
            />
            <span 
              className={cn(
                "font-medium",
                item.isActive ? "text-[#534AB7] font-semibold" : "text-gray-500"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
