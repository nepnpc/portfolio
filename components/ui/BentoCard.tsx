"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  magnetic?: boolean;
}

export default function BentoCard({
  children,
  className = "",
  glowOnHover = false,
  magnetic = true,
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(y, [-50, 50], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(x, [-50, 50], [-4, 4]), springConfig);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: magnetic ? rotateX : 0, rotateY: magnetic ? rotateY : 0, transformPerspective: 800 }}
      whileHover={glowOnHover ? { boxShadow: "0 0 30px rgba(59,130,246,0.3)" } : {}}
      transition={{ duration: 0.2 }}
      className={`
        relative bg-card border border-border rounded-xl p-5 overflow-hidden
        transition-colors duration-300
        ${glowOnHover ? "hover:border-accent/40" : ""}
        ${className}
      `}
    >
      {/* Subtle inner gradient */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent" />
      {children}
    </motion.div>
  );
}
