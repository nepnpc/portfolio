import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";

export const metadata: Metadata = {
  title: "Subarna Katwal — AI Automation Architect",
  description:
    "Architecting agentic workflows, RAG pipelines, and AI-native systems. Open for collaborations.",
  keywords: ["AI", "Automation", "LangChain", "RAG", "Next.js", "Architect"],
  authors: [{ name: "Subarna Katwal" }],
  openGraph: {
    title: "Subarna Katwal — AI Automation Architect",
    description: "Architecting agentic workflows, RAG pipelines, and AI-native systems.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Subarna Katwal — AI Automation Architect",
    description: "Architecting agentic workflows, RAG pipelines, and AI-native systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-zinc-100 font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
