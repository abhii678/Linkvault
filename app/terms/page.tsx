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
              <p className="text-slate-500 mt-1">Last updated: August 23, 2026</p>
            </div>
          </div>
          <div className="space-y-8 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using DM Vault, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service. DM Vault reserves the right to update these terms at any time. Continued use of the service after changes constitutes your acceptance of the new terms.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
              <p>DM Vault is a personal productivity tool that connects to your Instagram Business account via the official Meta Graph API to automatically extract, categorize, and display links and resources shared with you through Instagram Direct Messages. The service is intended for individual creators and business account holders.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">3. Eligibility</h2>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>You must be at least 13 years of age to use DM Vault.</li>
                <li>You must have a valid Instagram Business or Creator account.</li>
                <li>You must comply with Meta Platform Policy and Instagram Terms of Use.</li>
                <li>You must have the legal authority to connect the Instagram account you use with our service.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">4. Permitted Use</h2>
              <p>You may use DM Vault solely for lawful, personal productivity purposes. You agree NOT to:</p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Use the service to violate any applicable laws or regulations.</li>
                <li>Attempt to reverse engineer, copy, or scrape our service.</li>
                <li>Use the service to access, collect, or store other users data without their consent.</li>
                <li>Violate Meta Platform Policies or Instagram Community Guidelines.</li>
                <li>Use the service for spam, harassment, or any abusive purpose.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">5. Instagram and Meta Integration</h2>
              <p>DM Vault uses the official Meta Graph API. By connecting your Instagram account, you authorize DM Vault to access your Instagram profile information and direct message content as permitted by the API scopes you approve. You can revoke this access at any time through your Instagram account settings. Your use of the Instagram integration is also governed by Meta Terms of Service and Privacy Policy.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">6. Intellectual Property</h2>
              <p>All content, features, and functionality of DM Vault including but not limited to the design, code, and branding are the exclusive property of DM Vault and are protected by copyright and other intellectual property laws. You retain ownership of all content extracted from your Instagram account.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">7. Disclaimer of Warranties</h2>
              <p>DM Vault is provided on an AS IS and AS AVAILABLE basis without any warranties of any kind, either express or implied. We do not warrant that the service will be uninterrupted, error-free, or free of viruses. The service depends on the availability of the Meta Graph API and may be affected by changes to Meta platforms or policies.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">8. Limitation of Liability</h2>
              <p>To the fullest extent permitted by law, DM Vault shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of or inability to use the service, including loss of data or unauthorized access to your account.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">9. Termination</h2>
              <p>We reserve the right to suspend or terminate your access to DM Vault at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, third parties, or for any other reason at our sole discretion.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact</h2>
              <p>For questions about these Terms of Service, contact us at: support@dmvault.app</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
