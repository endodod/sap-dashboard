"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "results",     label: "01 Results" },
  { id: "tier-list",   label: "02 Tier List" },
  { id: "synergies",   label: "03 Synergies" },
  { id: "performance", label: "04 Performance" },
  { id: "spotlight",   label: "05 Spotlight" },
  { id: "training",    label: "06 Training" },
  { id: "simulate",    label: "07 Simulate" },
  { id: "simulator",   label: "08 Battle" },
];

export default function SectionNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(s.id);
          return;
        }
      }
      setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="sticky z-40 overflow-x-auto"
      style={{
        top: "56px",
        background: "rgba(10,10,15,0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center px-6 md:px-12 lg:px-20 h-10 min-w-max gap-1">
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="flex-shrink-0 px-3 h-full flex items-center text-xs transition-colors duration-150"
            style={{
              fontFamily: "var(--font-mono)",
              color: active === s.id ? "var(--acid)" : "var(--text-dim)",
              borderBottom: active === s.id ? "2px solid var(--acid)" : "2px solid transparent",
              fontWeight: active === s.id ? 600 : 400,
            }}
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
