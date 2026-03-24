"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  phrases: string[];
  speed?: number;
  deleteSpeed?: number;
  pause?: number;
  className?: string;
}

export default function Typewriter({
  phrases,
  speed = 60,
  deleteSpeed = 30,
  pause = 2000,
  className = "",
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const timer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pause);
      return () => clearTimeout(timer);
    }

    const current = phrases[phraseIndex];

    if (!isDeleting) {
      if (charIndex < current.length) {
        const timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, speed);
        return () => clearTimeout(timer);
      } else {
        setIsPaused(true);
      }
    } else {
      if (charIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, deleteSpeed);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }
    }
  }, [charIndex, isDeleting, isPaused, phraseIndex, phrases, speed, deleteSpeed, pause]);

  return (
    <span className={`typewriter-cursor ${className}`}>{displayed}</span>
  );
}
