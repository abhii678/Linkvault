"use client";

import { useEffect, useState } from "react";
import { Inbox, Calendar, Bookmark, FileText, Video, File, Music, ExternalLink, Sparkles, RefreshCw, LucideIcon } from "lucide-react";
import { Resource } from "@/data/types";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import StatChip from "@/components/StatChip";
import ResourceCard from "@/components/ResourceCard";

type FilterType = "All" | "Doc" | "Video" | "PDF" | "Audio" | "Link";

export default function HomeFeed() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedCount, setSavedCount] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [authError, setAuthError] = useState<{
    message: string;
    reconnect: boolean;
  } | null>(null);

  useEffect(() => {
    async function loadResources() {
      try {
        const res = await fetch("/api/messages");
        if (res.ok) {
          const data = await res.json();
          setResources(data);
        } else {
          const data = await res.json().catch(() => ({}));
          if (data?.error === "token_expired" || data?.reconnect) {
            setAuthError({
              message: data.message || "Your Instagram connection expired.",
              reconnect: true,
            });
          } else if (data?.error === "not_authenticated") {
            setAuthError({
              message: "Please connect your Instagram account to see your DMs.",
              reconnect: true,
            });
          } else {
            setAuthError({
              message: data?.message || "Failed to load resources.",
              reconnect: false,
            });
          }
        }
      } catch (err) {
        console.error("Failed to load resources:", err);
        setAuthError({
          message: "Network error. Please try again.",
          reconnect: false,
        });
      } finally {
        setLoading(false);
      }
    }

    loadResources();

    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem("saved_resources") || "[]");
      setSavedCount(saved.length);
    }
  }, []);

  const filteredResources = resources.filter((item) => {
    if (activeFilter === "All") return true;
    return item.type.toLowerCase() === activeFilter.toLowerCase();
  });

  const groupedResources = filteredResources.reduce(
    (groups: { [key: string]: Resource[] }, resource) => {
      const date = resource.date || "Recent";
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(resource);
      return groups;
    },
    {}
  );

  const totalCount = resources.length;
  const thisWeekCount = resources.filter(
    (r) => r.date === "Today" || r.date === "Yesterday"
  ).length;

  const filters: { label: FilterType; icon: LucideIcon }[] = [
    { label: "All", icon: Inbox },
    { label: "Doc", icon: FileText },
    { label: "Video", icon: Video },
    { label: "PDF", icon: File },
    { label: "Audio", icon: Music },
    { label: "Link", icon: ExternalLink },
  ];

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 pb-24 overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background ambient blurs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/40 blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[30%] right-[-10%] w-[45%] h-[45%] rounded-full bg-purple-200/40 blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[55%] h-[55%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <TopNav />

      <main className="mx-auto max-w-md px-6 py-8 md:max-w-3xl relative z-10">

        {/* Auth Error Banner */}
        {authError && (
          <div className="mb-6 p-4 rounded-2xl border border-amber-200 bg-amber-50 flex flex-col gap-3">
            <p className="text-sm text-amber-800 font-medium">{authError.message}</p>
            {authError.reconnect && (
              <a
                href="/api/auth/login"
                className="inline-flex items-center gap-2 self-start rounded-full bg-amber-200 hover:bg-amber-300 text-amber-900 px-4 py-2 text-sm font-semibold transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Reconnect Instagram
              </a>
            )}
          </div>
        )}

        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage and organize your extracted resources.</p>
        </div>

        {/* Stat Chips */}
        <div className="grid grid-cols-3 gap-3">
          <StatChip
            label="Total Links"
            value={totalCount}
            icon={Inbox}
            iconColorClass="text-indigo-600"
            bgColorClass="bg-indigo-50/80 border border-indigo-100/50 backdrop-blur-md"
          />
          <StatChip
            label="This Week"
            value={thisWeekCount}
            icon={Calendar}
            iconColorClass="text-purple-600"
            bgColorClass="bg-purple-50/80 border border-purple-100/50 backdrop-blur-md"
          />
          <StatChip
            label="Saved"
            value={savedCount}
            icon={Bookmark}
            iconColorClass="text-emerald-600"
            bgColorClass="bg-emerald-50/80 border border-emerald-100/50 backdrop-blur-md"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none snap-x">
          {filters.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveFilter(label)}
              className={`snap-center shrink-0 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 shadow-sm ${
                activeFilter === label
                  ? "bg-slate-900 text-white ring-2 ring-slate-900 ring-offset-2 ring-offset-slate-50"
                  : "bg-white/80 text-slate-600 border border-slate-200 backdrop-blur-md hover:bg-white hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Resources Feed */}
        <div className="mt-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white/40 rounded-3xl border border-white/60 backdrop-blur-xl shadow-xl shadow-indigo-100/20">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute h-full w-full animate-ping rounded-full bg-indigo-400 opacity-20"></div>
                <Sparkles className="h-6 w-6 text-indigo-600 animate-pulse" />
              </div>
              <p className="text-sm font-medium text-slate-500">Syncing your vault...</p>
            </div>
          ) : Object.keys(groupedResources).length === 0 && !authError ? (
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white/40 rounded-3xl border border-white/60 backdrop-blur-xl shadow-xl shadow-indigo-100/20">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                <Inbox className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">It is quiet here</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                {resources.length === 0
                  ? "No links found in your DMs yet. They will automatically appear here."
                  : `No ${activeFilter} links found.`}
              </p>
            </div>
          ) : Object.keys(groupedResources).length === 0 && authError ? null : (
            <div className="space-y-10">
              {Object.entries(groupedResources).map(([date, items]) => (
                <div key={date} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider shrink-0">
                      {date}
                    </h3>
                    <div className="h-px w-full bg-gradient-to-r from-slate-200 to-transparent"></div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {items.map((item) => (
                      <ResourceCard key={item.id} resource={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
