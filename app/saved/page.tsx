"use client";

import { useEffect, useState } from "react";
import { Bookmark, Sparkles } from "lucide-react";
import { Resource } from "@/data/types";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import ResourceCard from "@/components/ResourceCard";
import EmptyState from "@/components/EmptyState";

export default function SavedResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSaved() {
      try {
        const res = await fetch("/api/messages");
        if (res.ok) {
          const allResources: Resource[] = await res.json();
          
          const savedList: string[] = JSON.parse(localStorage.getItem("saved_resources") || "[]");
          
          const filtered = allResources.filter(
            (r) => savedList.includes(r.id) || r.tag === "saved"
          );
          setResources(filtered);
        }
      } catch (err) {
        console.error("Failed to load saved resources:", err);
      } finally {
        setLoading(false);
      }
    }

    loadSaved();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 pb-24 overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background ambient blurs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-200/40 blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      <TopNav />

      <main className="mx-auto max-w-md px-6 py-8 md:max-w-3xl relative z-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-200">
            <Bookmark className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Saved</h1>
            <p className="text-slate-500 mt-1">Your starred and favorite resources.</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 bg-white/40 rounded-3xl border border-white/60 backdrop-blur-xl shadow-xl shadow-indigo-100/20">
            <div className="relative flex h-12 w-12 items-center justify-center">
              <div className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-20"></div>
              <Sparkles className="h-6 w-6 text-emerald-600 animate-pulse" />
            </div>
            <p className="text-sm font-medium text-slate-500">Loading your saved vault...</p>
          </div>
        ) : resources.length === 0 ? (
          <EmptyState
            title="No saved resources yet"
            description="Browse your vault and star resources to save them here for quick access later."
            buttonText="Browse your vault →"
            buttonHref="/home"
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {resources.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
