import Link from "next/link";
import { Vault, ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service — DM Vault",
  description: "Terms and conditions for using DM Vault.",
};

export default function TermsOfService() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-3xl opacity-50"></div>
      </div>
      <nav className="w-full flex items-center justify-between px-8 py-6 max-w-4xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <Vault className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">DM Vault</span>
        </Link>
        <Link href="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
      </nav>
      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-indigo-100/20 p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
              <p className="text-slate-500 mt-1">Last updated: August 25, 2026</p>
            </div>
          </div>
          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using DM Vault, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
              <p>DM Vault is a personal productivity tool that connects to your Instagram Business account via the official Meta Graph API to automatically extract, categorize, and display links and resources shared with you through Instagram Direct Messages.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Eligibility</h2>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>You must be at least 13 years of age to use DM Vault.</li>
                <li>You must have a valid Instagram Business or Creator account.</li>
                <li>You must comply with Meta Platform Policy and Instagram Terms of Use.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Contact</h2>
              <p>For questions about these Terms of Service, contact us at: support@dmvault.app</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
