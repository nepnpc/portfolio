"use client";

import { motion } from "framer-motion";
import { logEntries, typeColors } from "@/lib/log-data";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LogPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-zinc-600">~/log</span>
            <span className="text-zinc-700">—</span>
            <span className="font-mono text-xs text-zinc-600">
              git log --all --oneline
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-100 mb-2">
            The Log
          </h1>
          <p className="font-mono text-sm text-zinc-500">
            Every tool learned. Every system built. Every commit shipped.
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 mt-6">
            {(["feat", "deploy", "build", "learn", "fix"] as const).map((type) => (
              <span
                key={type}
                className={`font-mono text-[10px] border rounded px-2 py-0.5 ${typeColors[type]}`}
              >
                {type}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Empty state */}
        {logEntries.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-xl py-20 gap-4 text-center"
          >
            <span className="font-mono text-4xl text-zinc-800">◌</span>
            <div className="space-y-1">
              <p className="font-mono text-sm text-zinc-600">
                {"// No commits yet."}
              </p>
              <p className="font-mono text-xs text-zinc-700">
                The log starts when the first thing is learned and shipped.
              </p>
            </div>
            <span className="font-mono text-[10px] text-zinc-800 border border-zinc-800 rounded px-3 py-1">
              git log --oneline → (empty)
            </span>
          </motion.div>
        )}

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Vertical line — only show when there are entries */}
          {logEntries.length > 0 && (
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/50 via-border to-transparent" />
          )}

          <div className="space-y-8">
            {logEntries.map((entry, i) => (
              <motion.article
                key={entry.id}
                variants={itemVariants}
                className="relative pl-10 group"
              >
                {/* Dot */}
                <motion.div
                  whileHover={{ scale: 1.4 }}
                  className={`absolute left-0 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-200
                    ${i === 0
                      ? "border-accent bg-accent/20 shadow-accent-glow"
                      : "border-border bg-card group-hover:border-accent/50"
                    }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current text-accent opacity-60" />
                </motion.div>

                {/* Card */}
                <div className="bg-card border border-border rounded-xl p-5 group-hover:border-zinc-700 transition-colors duration-200">
                  {/* Top row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span
                      className={`font-mono text-[10px] border rounded px-2 py-0.5 ${typeColors[entry.type]}`}
                    >
                      {entry.type}
                    </span>
                    <code className="font-mono text-[10px] text-zinc-600 bg-zinc-900 rounded px-1.5 py-0.5">
                      {entry.hash}
                    </code>
                    <span className="font-mono text-[10px] text-zinc-600 ml-auto">
                      {formatDate(entry.date)}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-sans font-semibold text-zinc-100 mb-2 leading-snug">
                    {entry.title}
                  </h2>

                  {/* Body */}
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                    {entry.body}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] text-zinc-600 border border-border rounded px-1.5 py-0.5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* End of log */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="relative pl-10 pt-8"
          >
            <div className="absolute left-0 top-10 w-5 h-5 rounded-full border-2 border-border bg-background flex items-center justify-center">
              <span className="font-mono text-[8px] text-zinc-700">⊕</span>
            </div>
            <p className="font-mono text-xs text-zinc-700 border border-dashed border-zinc-800 rounded-lg p-4 text-center">
              {"// Day 01 — The journey begins. More commits incoming daily."}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
