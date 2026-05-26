"use client";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  interpretation: string;
  delay?: number;
}

function useCountUp(target: number, duration = 1200, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return val;
}

export default function StatCard({ label, value, delta, interpretation, delay = 0 }: StatCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const numericMatch = value.match(/^([\d.]+)(.*)$/);
  const numericTarget = numericMatch ? parseFloat(numericMatch[1]) : 0;
  const suffix = numericMatch ? numericMatch[2] : "";
  const isNumeric = numericMatch !== null && !isNaN(numericTarget);

  const counted = useCountUp(numericTarget, 1200, inView);
  const displayValue = isNumeric
    ? (Number.isInteger(numericTarget) ? Math.round(counted).toLocaleString() : counted.toFixed(2)) + suffix
    : value;

  return (
    <div
      ref={ref}
      className="corner-cut border p-6 md:p-8 flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span
        className="text-xs uppercase tracking-widest"
        style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
      >
        {label}
      </span>
      <span
        className="text-5xl md:text-6xl font-extrabold leading-none"
        style={{ fontFamily: "var(--font-display)", color: "var(--acid)" }}
      >
        {displayValue}
      </span>
      {delta && (
        <span className="text-sm flex items-center gap-1" style={{ fontFamily: "var(--font-mono)", color: "var(--amber)" }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 1L9 9H1L5 1Z" fill="currentColor" />
          </svg>
          {delta}
        </span>
      )}
      <p className="text-sm leading-relaxed" style={{ color: "var(--text-dim)", fontFamily: "var(--font-ui)" }}>
        {interpretation}
      </p>
    </div>
  );
}

export { useCountUp };
