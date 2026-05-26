"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/components/ui/StatCard";

const TEAM_PETS = [
  { emoji: "🐟", name: "Fish", winRate: "83.3%", delay: 0 },
  { emoji: "🐜", name: "Ant", winRate: "86.8%", delay: 0.1 },
  { emoji: "🦫", name: "Beaver", winRate: "83.8%", delay: 0.2 },
  { emoji: "🐴", name: "Horse", winRate: "81.6%", delay: 0.3 },
  { emoji: "🐷", name: "Pig", winRate: "81.3%", delay: 0.4 },
];

const STATS = [
  { value: 85.99, suffix: "%", label: "Win Rate" },
  { value: 16.77, suffix: "", label: "Mean Rounds" },
  { value: 46, suffix: "", label: "Pets Analysed" },
];

function HeroStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const counted = useCountUp(value, 1400, inView);
  const display = (Number.isInteger(value) ? Math.round(counted) : counted.toFixed(2)) + suffix;

  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-none"
        style={{ fontFamily: "var(--font-display)", color: "var(--acid)" }}
      >
        {display}
      </span>
      <span
        className="text-xs uppercase tracking-widest"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

      {/* Watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(80px, 22vw, 280px)",
            fontWeight: 800,
            color: "rgba(184,255,63,0.035)",
            letterSpacing: "-0.04em",
            whiteSpace: "nowrap",
          }}
        >
          85.99%
        </span>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0 lg:justify-between py-20">
        {/* Left 70% */}
        <div className="lg:w-[65%] flex flex-col gap-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--text)" }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight"
          >
            An AI learned
            <br />
            <span style={{ color: "var(--acid)" }}>to play</span> Super
            <br />
            Auto Pets.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl max-w-xl"
            style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.6 }}
          >
            A reinforcement learning agent trained from scratch, discovering strategy through millions of games — and reaching an 85.99% win rate.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-8 md:gap-12"
          >
            {STATS.map((s) => (
              <HeroStat key={s.label} {...s} />
            ))}
          </motion.div>
        </div>

        {/* Right 30% — Pet cards */}
        <div className="lg:w-[30%] flex justify-center lg:justify-end">
          <div className="relative flex flex-col gap-2 w-52">
            {TEAM_PETS.map((pet, i) => (
              <motion.div
                key={pet.name}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + pet.delay, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex items-center gap-3 px-4 py-3 corner-cut cursor-default"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  animation: `float 4s ease-in-out ${pet.delay * 2}s infinite`,
                }}
              >
                <span className="text-2xl">{pet.emoji}</span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}>
                    {pet.name}
                  </span>
                  <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
                    {pet.winRate}
                  </span>
                </div>
                {i === 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 rounded"
                    style={{ background: "var(--acid)", color: "#0A0A0F", fontFamily: "var(--font-mono)", fontWeight: 600 }}
                  >
                    #1
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
          Scroll
        </span>
        <svg
          width="16"
          height="24"
          viewBox="0 0 16 24"
          fill="none"
          style={{ color: "var(--text-dim)", animation: "chevronBounce 1.5s ease-in-out infinite" }}
        >
          <path d="M8 0V20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
