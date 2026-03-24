"use client";

import { motion } from "framer-motion";
import HeroSection from "@/components/sections/HeroSection";
import StatusTile from "@/components/sections/StatusTile";
import TechStack from "@/components/sections/TechStack";
import LabPreview from "@/components/sections/LabPreview";
import QuickStats from "@/components/sections/QuickStats";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      {/* Radial glow background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="font-mono text-xs text-zinc-600">~/dashboard</span>
          <span className="text-zinc-700">—</span>
          <span className="font-mono text-xs text-zinc-600">
            Command Center
          </span>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-12 gap-4"
        >
          {/* Row 1: Hero (8 cols) + Status (4 cols) */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8">
            <HeroSection />
          </motion.div>
          <motion.div variants={itemVariants} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <StatusTile />
          </motion.div>

          {/* Row 2: Tech Stack (4 cols) + Quick Stats (4 cols) + mini card (4 cols) */}
          <motion.div variants={itemVariants} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <TechStack />
          </motion.div>
          <motion.div variants={itemVariants} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <QuickStats />
          </motion.div>
          <motion.div variants={itemVariants} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <NowLearningCard />
          </motion.div>

          {/* Row 3: Lab Preview (8 cols) + Contact (4 cols) */}
          <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8">
            <LabPreview />
          </motion.div>
          <motion.div variants={itemVariants} className="col-span-12 sm:col-span-6 lg:col-span-4">
            <ContactCard />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── Inline small cards ───────────────────────────────────────────────── */

function NowLearningCard() {
  const items = [
    { label: "Set up the portfolio", done: true },
    { label: "Deploy to Vercel", done: false },
    { label: "Ship first real project", done: false },
    { label: "Write first log entry", done: false },
  ];

  return (
    <div className="relative bg-card border border-border rounded-xl p-5 overflow-hidden h-full">
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent" />
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-500 border border-border rounded px-2 py-0.5">
            NOW_LEARNING
          </span>
          <span className="font-mono text-xs text-accent">100_DAYS</span>
        </div>
        <ul className="space-y-2.5">
          {items.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-2.5"
            >
              <span
                className={`font-mono text-xs flex-shrink-0 ${
                  item.done ? "text-green-500" : "text-zinc-600"
                }`}
              >
                {item.done ? "✓" : "○"}
              </span>
              <span
                className={`text-xs font-mono ${
                  item.done ? "text-zinc-600 line-through" : "text-zinc-300"
                }`}
              >
                {item.label}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ContactCard() {
  const links = [
    { label: "GitHub", href: "https://github.com/nepnpc", icon: "◆" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nepnpc/", icon: "◈" },
    { label: "Email", href: "mailto:subwrn@gmail.com", icon: "✉" },
  ];

  return (
    <div className="relative bg-card border border-border rounded-xl p-5 overflow-hidden h-full">
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent" />
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-500 border border-border rounded px-2 py-0.5">
            CONNECT
          </span>
        </div>
        <p className="text-xs text-zinc-500 font-sans leading-relaxed">
          Building AI systems in public. Always open to interesting projects and conversations.
        </p>
        <div className="space-y-2 mt-auto">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group w-full"
            >
              <span className="font-mono text-xs text-zinc-600 group-hover:text-accent transition-colors">
                {link.icon}
              </span>
              <span className="font-mono text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors">
                {link.label}
              </span>
              <span className="font-mono text-xs text-zinc-700 ml-auto group-hover:text-accent transition-colors">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
