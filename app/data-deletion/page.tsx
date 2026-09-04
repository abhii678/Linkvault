import Link from "next/link";
import { Vault, ArrowLeft, Trash2, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Data Deletion — DM Vault",
  description: "How to delete your data from DM Vault.",
};

export default function DataDeletion() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-rose-200/30 blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-orange-200/30 blur-3xl opacity-50"></div>
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
        <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/60 shadow-xl shadow-rose-100/20 p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 shadow-lg">
              <Trash2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Data Deletion Instructions</h1>
              <p className="text-slate-500 mt-1">How to remove your data from DM Vault</p>
            </div>
          </div>

          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section className="bg-rose-50 border border-rose-100 rounded-2xl p-6">
              <p className="text-rose-800 font-medium">DM Vault respects your right to privacy and data control. You can fully disconnect and delete all associated data by following the steps below.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">Step 1: Revoke Instagram Access</h2>
              <p className="mb-4">Remove DM Vault permission to access your Instagram account:</p>
              <div className="space-y-3">
                {[
                  "Open the Instagram app on your phone.",
                  "Go to Settings and Privacy.",
                  "Tap on Apps and Websites.",
                  "Find DM Vault in the Active list.",
                  "Tap Remove.",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/80 rounded-xl p-4 border border-slate-100">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mt-0.5">{i + 1}</div>
                    <p className="text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">Request Manual Deletion</h2>
              <p>Contact us directly at: support@dmvault.app</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
