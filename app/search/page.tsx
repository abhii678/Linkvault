"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon, X, SlidersHorizontal, Sparkles } from "lucide-react";
import { Resource } from "@/data/types";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import ResourceCard from "@/components/ResourceCard";

export default function SearchResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [query, setQuery] = useState("");
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResources() {
      try {
        const res = await fetch("/api/messages");
        if (res.ok) {
          const data = await res.json();
          setResources(data);
          setFilteredResources(data);
        }
      } catch (err) {
        console.error("Failed to load resources:", err);
      } finally {
        setLoading(false);
      }
    }
    loadResources();
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim().toLowerCase();
    if (!trimmedQuery) {
      setFilteredResources(resources);
      return;
    }

    const filtered = resources.filter((resource) => {
      return (
        resource.title.toLowerCase().includes(trimmedQuery) ||
        resource.creator.toLowerCase().includes(trimmedQuery) ||
        resource.type.toLowerCase().includes(trimmedQuery)
      );
    });
    setFilteredResources(filtered);
  }, [query, resources]);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 pb-24 overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background ambient blurs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-purple-200/40 blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-200/40 blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
      </div>

      <TopNav />

      <main className="mx-auto max-w-md px-6 py-8 md:max-w-3xl relative z-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Search Vault</h1>
          <p className="text-slate-500 mt-1">Find anything extracted from your DMs.</p>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex items-center mb-10 group">
          <div className="pointer-events-none absolute left-5 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <SearchIcon className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, creators, or types..."
            className="w-full rounded-2xl border border-white/60 bg-white/70 py-4 pl-14 pr-12 text-sm font-medium text-slate-900 placeholder-slate-400 outline-none shadow-sm backdrop-blur-xl focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors focus:outline-none"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results section */}
        <div>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white/40 rounded-3xl border border-white/60 backdrop-blur-xl shadow-xl shadow-indigo-100/20">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute h-full w-full animate-ping rounded-full bg-indigo-400 opacity-20"></div>
                <Sparkles className="h-6 w-6 text-indigo-600 animate-pulse" />
              </div>
              <p className="text-sm font-medium text-slate-500">Searching your vault...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white/40 rounded-3xl border border-white/60 backdrop-blur-xl shadow-xl shadow-indigo-100/20">
              <div className="h-16 w-16 rounded-full bg-slate-100/80 flex items-center justify-center mb-4 border border-white">
                <SlidersHorizontal className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">No results for "{query}"</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                Try searching for check lists, templates, creator names, or media types.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider px-1">
                  {query ? `${filteredResources.length} Results Found` : "All Resources"}
                </h3>
                <div className="h-px w-full bg-gradient-to-r from-slate-200 to-transparent"></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredResources.map((item) => (
                  <ResourceCard key={item.id} resource={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
