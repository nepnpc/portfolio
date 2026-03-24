"use client";

import { motion } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";

const techStack = [
  { name: "Python", icon: "🐍", color: "#3776ab" },
  { name: "LangChain", icon: "⛓️", color: "#1c3c3c" },
  { name: "Next.js", icon: "▲", color: "#ffffff" },
  { name: "Gemini", icon: "✦", color: "#8b5cf6" },
  { name: "Ollama", icon: "◈", color: "#f97316" },
  { name: "RAG", icon: "⚡", color: "#eab308" },
  { name: "Docker", icon: "🐳", color: "#2496ed" },
  { name: "FastAPI", icon: "⚙️", color: "#009688" },
  { name: "Pinecone", icon: "🌲", color: "#00a67e" },
  { name: "CrewAI", icon: "🤖", color: "#3b82f6" },
  { name: "Whisper", icon: "🎙️", color: "#a78bfa" },
  { name: "Git", icon: "◆", color: "#f05033" },
];

export default function TechStack() {
  return (
    <BentoCard className="col-span-12 sm:col-span-6 lg:col-span-4" glowOnHover>
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-zinc-500 border border-border rounded px-2 py-0.5">
            TECH_STACK
          </span>
          <span className="font-mono text-xs text-zinc-600">
            {techStack.length} tools
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              whileHover={{
                scale: 1.15,
                boxShadow: `0 0 16px ${tech.color}55`,
              }}
              className="flex flex-col items-center gap-1 p-2 rounded-lg border border-border bg-zinc-900/50 cursor-default group transition-colors hover:border-zinc-600"
              title={tech.name}
            >
              <span className="text-lg leading-none">{tech.icon}</span>
              <span className="font-mono text-[9px] text-zinc-600 group-hover:text-zinc-400 transition-colors leading-none text-center">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}
