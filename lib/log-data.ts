import rawEntries from "./log-entries.json";

export interface LogEntry {
  id: string;
  date: string;
  hash: string;
  title: string;
  body: string;
  tags: string[];
  type: "feat" | "fix" | "learn" | "deploy" | "build";
}

export const logEntries: LogEntry[] = rawEntries as LogEntry[];

export const typeColors: Record<LogEntry["type"], string> = {
  feat: "text-accent border-accent/30 bg-accent/10",
  fix: "text-red-400 border-red-500/30 bg-red-500/10",
  learn: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  deploy: "text-green-400 border-green-500/30 bg-green-500/10",
  build: "text-amber-400 border-amber-500/30 bg-amber-500/10",
};
