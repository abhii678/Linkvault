import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DM Vault — Instagram DM Resource Organizer",
  description: "A premium dashboard to auto-sync, organize, and find every resource sent to your Instagram DMs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FAFAFA] text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
