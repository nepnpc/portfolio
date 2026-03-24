import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 text-center px-4">
      <div className="font-mono text-6xl font-bold text-zinc-800">404</div>
      <p className="font-mono text-sm text-zinc-500">
        // This route does not exist in the system.
      </p>
      <Link
        href="/"
        className="font-mono text-xs text-accent border border-accent/30 rounded px-4 py-2 hover:bg-accent/10 transition-colors"
      >
        cd ~/dashboard
      </Link>
    </div>
  );
}
