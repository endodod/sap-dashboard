"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "results",     label: "Results" },
  { id: "tier-list",   label: "Tiers" },
  { id: "synergies",   label: "Synergies" },
  { id: "performance", label: "Performance" },
  { id: "spotlight",   label: "Spotlight" },
  { id: "training",    label: "Training" },
  { id: "simulate",    label: "Simulate" },
  { id: "simulator",   label: "Battle" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      for (const s of [...SECTIONS].reverse()) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= 80) {
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
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10,10,15,0.94)" : "rgba(10,10,15,0.7)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        height: "56px",
      }}
    >
      <nav className="flex items-center px-6 md:px-12 lg:px-20 h-full gap-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 flex-shrink-0 mr-2"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.02em" }}
        >
          <span className="text-base">🐟</span>
          <span style={{ color: "var(--acid)" }}>sap</span>
          <span style={{ color: "var(--text-dim)" }}>·agent</span>
        </a>

        <div className="hidden md:block w-px h-5 flex-shrink-0" style={{ background: "var(--border)" }} />

        {/* Section links — desktop */}
        <div className="hidden md:flex items-center gap-0.5 flex-1 overflow-x-auto">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex-shrink-0 px-3 py-1.5 rounded text-xs transition-all duration-150"
              style={{
                fontFamily: "var(--font-mono)",
                background: active === s.id ? "rgba(162,89,255,0.15)" : "transparent",
                color: active === s.id ? "var(--acid)" : "var(--text-dim)",
              }}
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 ml-auto"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="block w-5 h-px" style={{ background: "var(--text-dim)" }} />
          ))}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-4 pt-2 grid grid-cols-2 gap-2"
          style={{ background: "rgba(10,10,15,0.97)", borderBottom: "1px solid var(--border)" }}
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-sm py-2"
              style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
              onClick={() => setMenuOpen(false)}
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
