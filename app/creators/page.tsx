"use client";

import { useEffect, useState } from "react";
import { Users, Sparkles } from "lucide-react";
import { Resource, Creator } from "@/data/types";
import TopNav from "@/components/TopNav";
import BottomNav from "@/components/BottomNav";
import CreatorRow from "@/components/CreatorRow";

export default function CreatorsList() {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCreators() {
      try {
        const res = await fetch("/api/messages");
        if (res.ok) {
          const resources: Resource[] = await res.json();
          
          const creatorsMap: { [username: string]: Creator } = {};
          
          resources.forEach((res) => {
            if (!creatorsMap[res.creator]) {
              creatorsMap[res.creator] = {
                username: res.creator,
                avatar: res.avatar,
                avatarColor: res.avatarColor,
                resourcesCount: 0,
                lastReceivedDate: res.date
              };
            }
            creatorsMap[res.creator].resourcesCount += 1;
          });
          
          setCreators(Object.values(creatorsMap));
        }
      } catch (err) {
        console.error("Failed to load creators:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCreators();
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 pb-24 overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background ambient blurs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 blur-3xl opacity-60 mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[45%] h-[45%] rounded-full bg-emerald-100/40 blur-3xl opacity-60 mix-blend-multiply animate-blob animation-delay-2000"></div>
      </div>

      <TopNav />

      <main className="mx-auto max-w-md py-8 px-6 md:max-w-3xl relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Creators</h1>
          <p className="text-slate-500 mt-1">Browse resources grouped by sender.</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/40 shadow-xl shadow-indigo-100/20 backdrop-blur-xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="relative flex h-12 w-12 items-center justify-center">
                <div className="absolute h-full w-full animate-ping rounded-full bg-indigo-400 opacity-20"></div>
                <Sparkles className="h-6 w-6 text-indigo-600 animate-pulse" />
              </div>
              <p className="text-sm font-medium text-slate-500">Loading creators...</p>
            </div>
          ) : creators.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
              <div className="h-16 w-16 rounded-full bg-slate-100/80 flex items-center justify-center mb-4 border border-white">
                <Users className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800">No creators found</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-[250px]">
                When creators send you links, they will be listed here automatically.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200/50">
              {creators.map((creator) => (
                <CreatorRow key={creator.username} creator={creator} />
              ))}
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
