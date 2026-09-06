"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
      <Link href="/home" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#534AB7] text-white font-bold">
          V
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900">
          DM Vault
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <Link 
          href="/search" 
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Search className="h-5 w-5" />
        </Link>
        <div className="h-8 w-8 rounded-full bg-[#534AB7] text-white flex items-center justify-center text-xs font-semibold select-none cursor-pointer">
          U
        </div>
      </div>
    </header>
  );
}
