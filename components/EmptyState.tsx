"use client";

import Link from "next/link";
import { Vault } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function EmptyState({ title, description, buttonText, buttonHref }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white/40 rounded-3xl border border-white/60 backdrop-blur-xl shadow-xl shadow-indigo-100/20">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100/80 text-slate-400 mb-6 border border-white shadow-sm">
        <Vault className="h-10 w-10 opacity-60" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
      <p className="text-sm text-slate-500 max-w-xs mt-3 mb-8 leading-relaxed">{description}</p>
      
      {buttonText && buttonHref && (
        <Link 
          href={buttonHref}
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-200 active:scale-95"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}
