import Link from "next/link";
import { Vault, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy — DM Vault",
  description: "How DM Vault collects, uses, and protects your data.",
};

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-800 overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-200/30 blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-10%] left-[10%] w-[40%] h-[40%] rounded-full bg-purple-200/30 blur-3xl opacity-50"></div>
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
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <ShieldCheck className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
              <p className="text-slate-500 mt-1">Last updated: August 25, 2026</p>
            </div>
          </div>
          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Introduction</h2>
              <p>Welcome to DM Vault. DM Vault is a resource management tool that connects to your Instagram account via the official Meta Graph API to help you organize links and resources shared with you through Instagram Direct Messages. This Privacy Policy explains how we collect, use, store, and protect your information when you use our service.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
              <p>We collect the following information when you connect your Instagram account:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li><strong>Instagram Profile Information:</strong> Your Instagram username, display name, and account ID.</li>
                <li><strong>Direct Message Content:</strong> We access the text content of your direct messages solely to identify and extract URLs, links, and resource references shared with you.</li>
                <li><strong>Access Tokens:</strong> OAuth access tokens issued by Meta to authenticate API requests on your behalf. These are stored securely and are never shared with third parties.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
              <p>We use your information exclusively to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Authenticate your Instagram account via the official Meta API.</li>
                <li>Scan your incoming Direct Messages for URLs and links to extract and display them in your personal resource vault.</li>
                <li>Display organized, categorized resources within your DM Vault dashboard.</li>
                <li>Save resources you explicitly mark as saved using your device local storage.</li>
              </ul>
              <p className="mt-3 font-medium text-indigo-700 bg-indigo-50 rounded-xl px-4 py-3">We do NOT sell, share, rent, or otherwise disclose your personal data or message content to any third parties.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Data Storage and Security</h2>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>We do not store your raw Instagram messages on our servers. Message data is fetched in real-time and displayed directly to you.</li>
                <li>Your saved resources are stored locally on your device using browser localStorage and are not transmitted to our servers.</li>
                <li>Access tokens are stored securely in server-side environment variables and are never exposed in client-side code.</li>
                <li>We use industry-standard HTTPS encryption for all data transmission.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Meta Platform Data</h2>
              <p>DM Vault accesses Instagram data through the official Meta Graph API. We only request the minimum permissions necessary: instagram_business_basic and instagram_business_manage_messages. Our use of this data is governed by the Meta Platform Policy and Meta Privacy Policy.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Your Rights</h2>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Disconnect your Instagram account from DM Vault at any time through Instagram Settings.</li>
                <li>Request deletion of any data associated with your account. See our Data Deletion page at /data-deletion.</li>
                <li>Revoke API access from your Instagram settings at any time.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at: support@dmvault.app</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
