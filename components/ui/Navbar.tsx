"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/log", label: "The Log" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded border border-accent/50 flex items-center justify-center group-hover:border-accent group-hover:shadow-accent-glow transition-all duration-300">
            <span className="text-accent font-mono text-xs font-bold">SK</span>
          </div>
          <span className="font-mono text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">
            subarna.katwal
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-sm font-mono rounded transition-colors duration-200 ${
                  isActive
                    ? "text-accent"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded bg-accent/10 border border-accent/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status indicator */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 status-pulse inline-block" />
          <span>available</span>
        </div>
      </div>
    </motion.header>
  );
}
