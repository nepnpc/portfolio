"use client";

import { motion } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";
import { logEntries } from "@/lib/log-data";

// All metrics are derived automatically from lib/log-data.ts
// Add a log entry → numbers update on their own
const totalEntries = logEntries.length;
const agentsBuilt = logEntries.filter(
  (e) => e.type === "build" || e.type === "deploy"
).length;
const uniqueTools = new Set(logEntries.flatMap((e) => e.tags)).size;

const stats = [
  {
    label: "Log Entries",
    value: String(totalEntries),
    sub: totalEntries === 0 ? "nothing yet" : "and counting",
  },
  {
    label: "Things Built",
    value: String(agentsBuilt),
    sub: agentsBuilt === 0 ? "in progress" : "shipped",
  },
  {
    label: "Tools Touched",
    value: String(uniqueTools),
    sub: uniqueTools === 0 ? "day 0" : "unique tags",
  },
];

export default function QuickStats() {
  return (
    <BentoCard className="col-span-12 sm:col-span-6 lg:col-span-4" glowOnHover>
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-500 border border-border rounded px-2 py-0.5">
            METRICS
          </span>
          <span className="font-mono text-[10px] text-zinc-700">auto</span>
        </div>

        <div className="space-y-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <div>
                <p className="font-mono text-xs text-zinc-500">{stat.label}</p>
                <p className="font-mono text-[10px] text-zinc-700">{stat.sub}</p>
              </div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="font-mono text-2xl font-bold text-accent tabular-nums"
              >
                {stat.value}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
