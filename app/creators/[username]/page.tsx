"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Inbox } from "lucide-react";
import { Resource } from "@/data/types";
import ResourceCard from "@/components/ResourceCard";
import BottomNav from "@/components/BottomNav";

export default function CreatorResources() {
  const params = useParams();
  const router = useRouter();
  const username = decodeURIComponent(params.username as string);
  
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResources() {
      try {
        const res = await fetch("/api/messages");
        if (res.ok) {
          const allResources: Resource[] = await res.json();
          // Filter by creator
          const filtered = allResources.filter(
            (r) => r.creator.toLowerCase() === username.toLowerCase()
          );
          setResources(filtered);
        }
      } catch (err) {
        console.error("Failed to load resources:", err);
      } finally {
        setLoading(false);
      }
    }

    loadResources();
  }, [username]);

  // Group resources by date
  const groupedResources = resources.reduce((groups: { [key: string]: Resource[] }, resource) => {
    const date = resource.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(resource);
    return groups;
  }, {});

  const creatorAvatar = resources[0]?.avatar || username.substring(0, 2).toUpperCase();
  const creatorColor = resources[0]?.avatarColor || "#EEEDFE";

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-24 text-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center gap-3 border-b border-gray-200 bg-white px-4">
        <button 
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        
        <div className="flex items-center gap-2">
          <div 
            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-gray-800"
            style={{ backgroundColor: creatorColor }}
          >
            {creatorAvatar}
          </div>
          <span className="text-lg font-bold text-gray-900">
            @{username}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-6 md:max-w-2xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#534AB7]" />
            <p className="text-sm font-medium text-gray-500">Loading resources...</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-sm">
            No resources found for this creator.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-1">
              <Inbox className="h-4 w-4 text-[#534AB7]" />
              <p className="text-sm font-semibold text-gray-600">
                {resources.length} {resources.length === 1 ? "resource" : "resources"} found
              </p>
            </div>
            
            {Object.entries(groupedResources).map(([date, items]) => (
              <div key={date} className="space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {date}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {items.map((item) => (
                    <ResourceCard key={item.id} resource={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
