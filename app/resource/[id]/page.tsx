"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Video, Link as LinkIcon, FileSpreadsheet, Headset, ExternalLink, Bookmark } from "lucide-react";
import { Resource } from "@/data/types";
import { cn } from "@/lib/utils";
import ResourceCard from "@/components/ResourceCard";

export default function ResourceDetail() {
  const params = useParams();
  const router = useRouter();
  const id = decodeURIComponent(params.id as string);

  const [resource, setResource] = useState<Resource | null>(null);
  const [moreFromCreator, setMoreFromCreator] = useState<Resource[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/messages");
        if (res.ok) {
          const allResources: Resource[] = await res.json();
          
          // Find resource
          const found = allResources.find((r) => r.id === id);
          if (found) {
            setResource(found);
            
            // Get 2 other resources from same creator
            const others = allResources.filter(
              (r) => r.creator.toLowerCase() === found.creator.toLowerCase() && r.id !== found.id
            ).slice(0, 2);
            setMoreFromCreator(others);

            // Check if saved
            const savedList = JSON.parse(localStorage.getItem("saved_resources") || "[]");
            setIsSaved(savedList.includes(found.id) || found.tag === "saved");
          }
        }
      } catch (err) {
        console.error("Error loading resource detail:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  const handleToggleSave = () => {
    if (!resource) return;
    
    const savedList: string[] = JSON.parse(localStorage.getItem("saved_resources") || "[]");
    let newList: string[];

    if (isSaved) {
      newList = savedList.filter((item) => item !== resource.id);
      setIsSaved(false);
    } else {
      newList = [...savedList, resource.id];
      setIsSaved(true);
    }

    localStorage.setItem("saved_resources", JSON.stringify(newList));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFA] text-gray-900 gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#534AB7]" />
        <p className="text-sm font-medium text-gray-500">Loading resource details...</p>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFA] text-gray-900 p-4">
        <p className="text-sm text-gray-500 mb-4">Resource not found</p>
        <button 
          onClick={() => router.back()}
          className="rounded-lg bg-[#534AB7] px-4 py-2 text-white font-semibold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const getTypeStyles = (type: Resource["type"]) => {
    switch (type) {
      case "PDF":
        return {
          bg: "bg-orange-50 text-orange-600 border-orange-200",
          icon: FileText
        };
      case "Video":
        return {
          bg: "bg-emerald-50 text-emerald-600 border-emerald-200",
          icon: Video
        };
      case "Doc":
        return {
          bg: "bg-blue-50 text-blue-600 border-blue-200",
          icon: FileSpreadsheet
        };
      case "Audio":
        return {
          bg: "bg-amber-50 text-amber-600 border-amber-200",
          icon: Headset
        };
      default:
        return {
          bg: "bg-purple-50 text-[#534AB7] border-purple-200",
          icon: LinkIcon
        };
    }
  };

  const { bg, icon: Icon } = getTypeStyles(resource.type);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-12 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white px-4">
        <button 
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">Resource Detail</span>
        <div className="w-10 h-10" />
      </header>

      <main className="mx-auto max-w-md px-4 py-8 md:max-w-2xl">
        {/* Resource Type Big Icon */}
        <div className="flex flex-col items-center text-center">
          <div className={cn("flex h-20 w-20 items-center justify-center rounded-2xl border mb-6", bg)}>
            <Icon className="h-10 w-10" />
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 px-2 leading-snug">
            {resource.title}
          </h2>

          {/* Creator Information Row */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div 
              className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-gray-800"
              style={{ backgroundColor: resource.avatarColor }}
            >
              {resource.avatar}
            </div>
            <Link 
              href={`/creators/${encodeURIComponent(resource.creator)}`}
              className="text-sm font-semibold text-[#534AB7] hover:underline"
            >
              @{resource.creator}
            </Link>
            <span className="text-gray-300 text-xs">•</span>
            <span className="text-xs text-gray-500 font-medium">
              Received on {resource.date} at {resource.time}
            </span>
          </div>

          {/* Resource Type Badge */}
          <span className={cn(
            "mt-6 inline-flex items-center rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider border",
            bg
          )}>
            {resource.type}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 w-full">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#534AB7] py-4 text-base font-semibold text-white shadow-md shadow-purple-100 transition-all hover:bg-[#4339a0] active:scale-[0.98]"
          >
            Open Resource <ExternalLink className="h-4 w-4" />
          </a>

          <button
            onClick={handleToggleSave}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-xl border py-4 text-base font-semibold transition-all active:scale-[0.98]",
              isSaved 
                ? "bg-[#E1F5EE] border-[#A3E2CD] text-[#0F6E56]" 
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            )}
          >
            <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
            {isSaved ? "Saved ✓" : "Save Resource"}
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200" />

        {/* More from Creator Section */}
        {moreFromCreator.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-1">
              More from @{resource.creator}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {moreFromCreator.map((item) => (
                <ResourceCard key={item.id} resource={item} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
