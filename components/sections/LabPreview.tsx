"use client";

import { motion } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";

// Add real projects here when they're ready
const labProjects: {
  id: string;
  codename: string;
  description: string;
  tags: string[];
  progress: number;
}[] = [];

export default function LabPreview() {
  return (
    <BentoCard className="col-span-12 lg:col-span-8" glowOnHover magnetic={false}>
      <div className="flex flex-col h-full gap-5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-500 border border-border rounded px-2 py-0.5">
            THE_LAB
          </span>
          <span className="font-mono text-xs text-zinc-600 animate-pulse">
            ◉ INITIALIZING
          </span>
        </div>

        {labProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex-1 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-lg py-12 gap-3"
          >
            <span className="font-mono text-2xl text-zinc-800">⬡</span>
            <p className="font-mono text-xs text-zinc-600 text-center">
              // No projects yet — the lab is being set up.
            </p>
            <p className="font-mono text-[10px] text-zinc-700 text-center">
              Projects will appear here as they are built.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {labProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="relative rounded-lg border border-border bg-zinc-900/60 overflow-hidden group"
              >
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-[10px] text-zinc-600">{project.id}</p>
                      <h3 className="font-mono text-sm font-bold text-zinc-200 tracking-widest mt-0.5">
                        {project.codename}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-accent font-bold">
                      {project.progress}%
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="w-full bg-zinc-800 rounded-full h-1">
                    <motion.div
                      className="bg-accent h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: 0.8 + i * 0.2, duration: 0.8, ease: "easeOut" }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] text-zinc-500 border border-border rounded px-1.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </BentoCard>
  );
}
