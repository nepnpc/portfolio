"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LogEntry } from "@/lib/log-data";

type Status = "idle" | "loading" | "success" | "readonly" | "error";

const ENTRY_TYPES = ["feat", "fix", "learn", "deploy", "build"] as const;

const today = () => new Date().toISOString().split("T")[0];

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [tags, setTags] = useState("");
  const [type, setType] = useState<LogEntry["type"]>("learn");
  const [date, setDate] = useState(today());

  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<LogEntry | null>(null);
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("admin_authed") === "true") setAuthed(true);
    else passwordRef.current?.focus();
  }, []);

  async function submitEntry(pwd: string) {
    setStatus("loading");
    setResult(null);

    const res = await fetch("/api/admin/add-entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd, title, bodyText, tags, type, date }),
    });

    if (res.status === 401) {
      setStatus("idle");
      setAuthed(false);
      sessionStorage.removeItem("admin_authed");
      setAuthError(true);
      return;
    }

    const data = await res.json();

    if (data.success) {
      sessionStorage.setItem("admin_authed", "true");
      setStatus("success");
      setResult(data.entry);
      resetForm();
    } else if (data.message === "filesystem_readonly") {
      sessionStorage.setItem("admin_authed", "true");
      setStatus("readonly");
      setResult(data.entry);
    } else {
      setStatus("error");
    }
  }

  function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    // Authenticate by attempting a minimal submission — but we need form data.
    // Instead, just set authed and let the real submit validate the password.
    setAuthError(false);
    setAuthed(true);
    sessionStorage.setItem("admin_authed", "true");
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !bodyText.trim()) return;
    submitEntry(password);
  }

  function resetForm() {
    setTitle("");
    setBodyText("");
    setTags("");
    setType("learn");
    setDate(today());
    setStatus("idle");
  }

  function copyEntry() {
    if (!result) return;
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputClass =
    "w-full bg-zinc-900 border border-border rounded-lg px-3 py-2 font-mono text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors";

  const labelClass = "font-mono text-xs text-zinc-500 block mb-1.5";

  // ── Password gate ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div
          className="pointer-events-none fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-sm bg-card border border-border rounded-xl p-6 space-y-5"
        >
          <div className="space-y-1">
            <p className="font-mono text-xs text-zinc-600">~/admin</p>
            <h1 className="font-sans font-bold text-zinc-100 text-lg">
              Admin Access
            </h1>
            <p className="font-mono text-xs text-zinc-600">
              Enter your password to continue.
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>PASSWORD</label>
              <input
                ref={passwordRef}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              {authError && (
                <p className="font-mono text-xs text-red-400 mt-1.5">
                  Incorrect password.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-accent/10 hover:bg-accent/20 border border-accent/30 hover:border-accent/60 text-accent font-mono text-sm rounded-lg py-2 transition-colors"
            >
              Enter
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ── Admin form ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% -10%, rgba(59,130,246,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs text-zinc-600">~/admin</span>
            <span className="text-zinc-700">—</span>
            <span className="font-mono text-xs text-zinc-600">Add Log Entry</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-sans font-bold text-zinc-100 text-2xl">
              New Entry
            </h1>
            <button
              onClick={() => {
                sessionStorage.removeItem("admin_authed");
                setAuthed(false);
                setPassword("");
              }}
              className="font-mono text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              sign out
            </button>
          </div>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className={labelClass}>TITLE *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                placeholder="Successfully deployed a local Ollama instance"
                required
              />
            </div>

            {/* Body */}
            <div>
              <label className={labelClass}>BODY *</label>
              <textarea
                value={bodyText}
                onChange={(e) => setBodyText(e.target.value)}
                className={`${inputClass} resize-none h-28`}
                placeholder="What you did, what you learned, why it matters..."
                required
              />
            </div>

            {/* Type + Date row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>TYPE</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as LogEntry["type"])}
                  className={inputClass}
                >
                  {ENTRY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>DATE</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className={labelClass}>TAGS (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className={inputClass}
                placeholder="Ollama, Docker, Self-hosted"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-accent/10 hover:bg-accent/20 disabled:opacity-40 border border-accent/30 hover:border-accent/60 text-accent font-mono text-sm rounded-lg py-2.5 transition-colors"
            >
              {status === "loading" ? "Saving..." : "Add Entry →"}
            </button>
          </form>
        </motion.div>

        {/* Feedback */}
        <AnimatePresence>
          {status === "success" && result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-green-500/10 border border-green-500/30 rounded-xl p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-green-400">
                  ✓ Entry saved — {result.hash}
                </p>
                <button
                  onClick={resetForm}
                  className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  + Add another
                </button>
              </div>
              <p className="font-mono text-[10px] text-zinc-600">
                Restart the dev server if you don&apos;t see it appear immediately.
              </p>
            </motion.div>
          )}

          {status === "readonly" && result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 space-y-3"
            >
              <p className="font-mono text-xs text-amber-400">
                ⚠ Filesystem is read-only (Vercel). Copy this into{" "}
                <code className="text-zinc-300">lib/log-entries.json</code>:
              </p>
              <pre className="bg-zinc-900 rounded-lg p-3 text-[11px] font-mono text-zinc-300 overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(result, null, 2)}
              </pre>
              <div className="flex gap-3">
                <button
                  onClick={copyEntry}
                  className="font-mono text-xs text-accent border border-accent/30 rounded px-3 py-1.5 hover:bg-accent/10 transition-colors"
                >
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
                <button
                  onClick={resetForm}
                  className="font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  + Add another
                </button>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 bg-red-500/10 border border-red-500/30 rounded-xl p-4"
            >
              <p className="font-mono text-xs text-red-400">
                Something went wrong. Check the server logs.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
