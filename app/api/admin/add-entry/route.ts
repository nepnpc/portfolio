import { createHash } from "crypto";
import fs from "fs";
import path from "path";
import type { LogEntry } from "@/lib/log-data";

// This route runs in the Node.js runtime (not Edge) so `fs` is available.
// In local dev: reads and writes lib/log-entries.json directly.
// On Vercel prod: the write will fail (read-only fs), so we return the
// generated entry as a fallback for manual copy-paste.

export async function POST(request: Request) {
  const body = await request.json();
  const { password, title, bodyText, tags, type, date } = body as {
    password: string;
    title: string;
    bodyText: string;
    tags: string;
    type: LogEntry["type"];
    date: string;
  };

  // Auth check
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || password !== adminPassword) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  // Build the new entry
  const id = String(Date.now());
  const hash = createHash("sha1")
    .update(title + date + id)
    .digest("hex")
    .slice(0, 7);

  const newEntry: LogEntry = {
    id,
    date,
    hash,
    title: title.trim(),
    body: bodyText.trim(),
    tags: tags
      .split(",")
      .map((t: string) => t.trim())
      .filter(Boolean),
    type,
  };

  // Try to write to the JSON file
  const filePath = path.join(process.cwd(), "lib", "log-entries.json");

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const entries: LogEntry[] = JSON.parse(raw);
    // Prepend so newest appears first
    entries.unshift(newEntry);
    fs.writeFileSync(filePath, JSON.stringify(entries, null, 2) + "\n", "utf-8");

    return Response.json({ success: true, entry: newEntry });
  } catch {
    // Filesystem is read-only (Vercel prod) — return entry for manual paste
    return Response.json({
      success: false,
      entry: newEntry,
      message: "filesystem_readonly",
    });
  }
}

export async function GET() {
  return Response.json({ error: "method not allowed" }, { status: 405 });
}
