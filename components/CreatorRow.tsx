"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Creator } from "@/data/types";

interface CreatorRowProps {
  creator: Creator;
}

export default function CreatorRow({ creator }: CreatorRowProps) {
  return (
    <Link
      href={`/creators/${encodeURIComponent(creator.username)}`}
      className="group flex items-center justify-between p-4 sm:p-5 transition-all duration-200 hover:bg-slate-50/50"
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-slate-800 shadow-sm ring-4 ring-white transition-transform group-hover:scale-105"
          style={{ backgroundColor: creator.avatarColor }}
        >
          {creator.avatar}
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">@{creator.username}</h4>
          <p className="text-xs font-medium text-slate-500 mt-0.5">
            {creator.resourcesCount} {creator.resourcesCount === 1 ? 'resource' : 'resources'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-slate-400">{creator.lastReceivedDate}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/80 transition-colors group-hover:bg-indigo-100 group-hover:text-indigo-600 text-slate-400">
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
