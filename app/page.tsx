"use client";

import Link from "next/link";
import { Vault, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-200/50 blur-3xl opacity-50 mix-blend-multiply animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] rounded-full bg-purple-200/50 blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] rounded-full bg-pink-100/50 blur-3xl opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="w-full relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200">
            <Vault className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">DM Vault</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
        </div>
        <div>
          <Link
            href="/home"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-slate-900 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:ring-2 hover:ring-slate-900 hover:ring-offset-2 active:scale-95"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur-md mb-8">
          <Sparkles className="h-4 w-4" />
          <span>The Ultimate Resource Manager for Creators</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
          Never lose a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">valuable link</span> <br className="hidden md:block" />
          in your DMs again.
        </h1>
        
        <p className="max-w-2xl text-lg text-slate-600 mb-10 leading-relaxed">
          DM Vault connects securely to your Instagram account to automatically extract, categorize, and safely store every link, PDF, and resource sent to you by other creators.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/home"
            className="relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-indigo-200 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-200 active:scale-95"
          >
            Go to Dashboard
            <ArrowRight className="h-5 w-5" />
          </Link>
          <a
            href="#demo"
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-white/80 px-8 py-4 text-lg font-semibold text-slate-700 shadow-sm ring-1 ring-inset ring-slate-200 backdrop-blur-md transition-all hover:bg-white hover:ring-slate-300 active:scale-95"
          >
            Watch Demo
          </a>
        </div>

        <div className="mt-10 flex items-center gap-6 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Official Meta API</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Read-only access</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>No passwords required</span>
          </div>
        </div>

        {/* Floating Glass UI Preview */}
        <div className="relative mt-24 w-full max-w-4xl mx-auto rounded-3xl border border-white/40 bg-white/30 p-2 shadow-2xl shadow-indigo-100/50 backdrop-blur-xl">
          <div className="rounded-2xl border border-slate-100 bg-white/90 p-4 sm:p-8 shadow-sm h-64 sm:h-96 flex flex-col items-center justify-center relative overflow-hidden">
             {/* Fake UI inside the glass window */}
             <div className="absolute top-0 left-0 w-full h-12 border-b border-slate-100 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-400"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                </div>
             </div>
             <div className="mt-8 flex flex-col items-center gap-4 text-slate-400 opacity-60">
               <Vault className="h-16 w-16 text-indigo-300" />
               <p className="text-xl font-medium">Your resources will appear here...</p>
             </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200/60 bg-white/40 backdrop-blur-md py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 DM Vault. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/data-deletion" className="hover:text-indigo-600 transition-colors">
              Data Deletion
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
