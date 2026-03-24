"use client";

import { motion } from "framer-motion";
import Typewriter from "@/components/ui/TypeWriter";
import BentoCard from "@/components/ui/BentoCard";

const typewriterPhrases = [
  "Day 0 — The journey starts now.",
  "Goal: Master AI Automation in 100 Days.",
  "Learning in public. Building in public.",
  "Next: RAG Pipelines & Agentic Workflows.",
  "Status: Laying the foundation.",
];

export default function HeroSection() {
  return (
    <BentoCard
      className="col-span-12 lg:col-span-8 min-h-[320px] flex flex-col justify-between bg-grid"
      glowOnHover
      magnetic={false}
    >
      {/* Corner label */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-zinc-500 border border-border rounded px-2 py-0.5">
          HERO_01
        </span>
        <span className="font-mono text-xs text-accent">
          AI_AUTOMATION_ARCHITECT
        </span>
      </div>

      {/* Main heading */}
      <div className="space-y-4 py-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight leading-none"
        >
          <span className="text-zinc-100">Subarna</span>{" "}
          <span className="text-accent">Katwal</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-xl sm:text-2xl text-zinc-400 font-sans font-medium"
        >
          Architecting Agentic Workflows.
        </motion.p>
      </div>

      {/* Typewriter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="font-mono text-sm text-accent border-t border-border pt-4"
      >
        <Typewriter phrases={typewriterPhrases} />
      </motion.div>
    </BentoCard>
  );
}
