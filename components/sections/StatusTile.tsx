"use client";

import { motion } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";

export default function StatusTile() {
  return (
    <BentoCard className="col-span-12 sm:col-span-6 lg:col-span-4" glowOnHover>
      <div className="h-full flex flex-col justify-between gap-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-500 border border-border rounded px-2 py-0.5">
            STATUS
          </span>
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-mono text-xs text-green-400"
          >
            LIVE
          </motion.span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <span className="w-3 h-3 rounded-full bg-green-500 inline-block status-pulse" />
            <span className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-30" />
          </div>
          <div>
            <p className="text-sm font-sans font-medium text-zinc-100">
              Open for Collaborations
            </p>
            <p className="text-xs font-mono text-zinc-500 mt-0.5">
              AI Automation · RAG · Agents
            </p>
          </div>
        </div>

        <div className="border-t border-border pt-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-500">Day streak</span>
            <span className="font-mono text-xs text-accent font-bold">0</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5">
            <motion.div
              className="bg-accent h-1.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "0%" }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="font-mono text-xs text-zinc-600">
            Day 0 / 100 — AI Mastery begins now
          </p>
        </div>
      </div>
    </BentoCard>
  );
}
