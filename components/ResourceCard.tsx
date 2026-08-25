"use client";

import Link from "next/link";
import { FileText, Video, Link as LinkIcon, FileSpreadsheet, Headset, ArrowUpRight } from "lucide-react";
import { Resource } from "@/data/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedList = JSON.parse(localStorage.getItem("saved_resources") || "[]");
      setIsSaved(savedList.includes(resource.id) || resource.tag === "saved");
    }
  }, [resource.id, resource.tag]);

  const getTypeStyles = (type: Resource["type"]) => {
    switch (type) {
      case "PDF":
        return {
          bg: "bg-orange-50/80 text-orange-600 border-orange-200/50",
          icon: FileText
        };
      case "Video":
        return {
          bg: "bg-emerald-50/80 text-emerald-600 border-emerald-200/50",
          icon: Video
        };
      case "Doc":
        return {
          bg: "bg-blue-50/80 text-blue-600 border-blue-200/50",
          icon: FileSpreadsheet
        };
      case "Audio":
        return {
          bg: "bg-amber-50/80 text-amber-600 border-amber-200/50",
          icon: Headset
        };
      default:
        return {
          bg: "bg-indigo-50/80 text-indigo-600 border-indigo-200/50",
          icon: LinkIcon
        };
    }
  };

  const { bg, icon: Icon } = getTypeStyles(resource.type);

  return (
    <div className="group relative flex flex-col rounded-3xl border border-white/60 bg-white/40 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100/40 hover:bg-white/60">
      <Link href={`/resource/${encodeURIComponent(resource.id)}`} className="absolute inset-0 z-0" />
      
      {/* Top Section */}
      <div className="z-10 flex items-start gap-4">
        <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border backdrop-blur-md shadow-sm transition-transform group-hover:scale-105", bg)}>
          <Icon className="h-5 w-5" />
        </div>
        
        <div className="flex-1 min-w-0 pt-0.5">
          <h4 className="font-semibold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors text-base">
            {resource.title}
          </h4>
          <div className="mt-1.5 flex items-center gap-2">
            <div 
              className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-slate-800 shadow-sm ring-2 ring-white"
              style={{ backgroundColor: resource.avatarColor }}
            >
              {resource.avatar}
            </div>
            <span className="text-xs font-medium text-slate-500">
              @{resource.creator}
            </span>
          </div>
        </div>

        <div className="text-right shrink-0 pt-1">
          <p className="text-xs font-semibold text-slate-700">{resource.date}</p>
          <p className="text-[10px] font-medium text-slate-400 mt-0.5">{resource.time}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-slate-200/50 z-10" />

      {/* Bottom Section */}
      <div className="z-10 flex items-center justify-between">
        <div>
          {isSaved ? (
            <span className="inline-flex items-center rounded-lg bg-emerald-100/50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200/50 backdrop-blur-md">
              Saved
            </span>
          ) : resource.tag === "new" ? (
            <span className="inline-flex items-center rounded-lg bg-indigo-100/50 px-2.5 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-200/50 backdrop-blur-md">
              New
            </span>
          ) : (
            <span className="h-6 w-1 block" />
          )}
        </div>

        <a 
          href={resource.url} 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="z-20 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-slate-800 hover:ring-2 hover:ring-slate-900 hover:ring-offset-2 active:scale-95"
        >
          Open link <ArrowUpRight className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
