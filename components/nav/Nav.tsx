"use client";
import { useEffect, useState } from "react";

const RUNS = [
  { id: "run-1", label: "#001", sublabel: "Baseline Run", winRate: "85.99%" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeRun, setActiveRun] = useState("run-1");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const el = document.getElementById("run-1");
      if (el) {
        const rect = el.getBoundingClientRect();
        setActiveRun(rect.top <= 200 && rect.bottom >= 0 ? "run-1" : "");
      }
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
      <nav className="flex items-center justify-between px-6 md:px-12 lg:px-20 h-full gap-6">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 flex-shrink-0"
          style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "0.85rem", letterSpacing: "0.02em" }}
        >
          <span className="text-base">🐟</span>
          <span style={{ color: "var(--acid)" }}>sap</span>
          <span style={{ color: "var(--text-dim)" }}>·log</span>
        </a>

        {/* Divider */}
        <div className="hidden md:block w-px h-5" style={{ background: "var(--border)" }} />

        {/* Run chips — desktop */}
        <div className="hidden md:flex items-center gap-2 flex-1">
          <span
            className="text-xs uppercase tracking-widest mr-2"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
          >
            Runs
          </span>

          {RUNS.map((run) => (
            <a
              key={run.id}
              href={`#${run.id}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs transition-all duration-200"
              style={{
                fontFamily: "var(--font-mono)",
                background: activeRun === run.id ? "rgba(162,89,255,0.15)" : "rgba(255,255,255,0.04)",
                color: activeRun === run.id ? "var(--acid)" : "var(--text-dim)",
                border: `1px solid ${activeRun === run.id ? "rgba(162,89,255,0.35)" : "var(--border)"}`,
              }}
            >
              <span className="font-semibold">{run.label}</span>
              <span style={{ color: "var(--text-dim)", opacity: 0.7 }}>—</span>
              <span>{run.sublabel}</span>
              <span
                className="text-xs px-1.5 py-0.5 rounded"
                style={{ background: "rgba(162,89,255,0.12)", color: "var(--acid)" }}
              >
                {run.winRate}
              </span>
            </a>
          ))}

          {/* Coming soon placeholder */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs select-none"
            style={{
              fontFamily: "var(--font-mono)",
              background: "rgba(255,255,255,0.02)",
              color: "var(--muted)",
              border: "1px dashed rgba(255,255,255,0.1)",
            }}
          >
            <span>+</span>
            <span>More runs coming soon</span>
          </div>
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
          className="md:hidden px-6 pb-4 pt-2 flex flex-col gap-3"
          style={{ background: "rgba(10,10,15,0.97)", borderBottom: "1px solid var(--border)" }}
        >
          {RUNS.map((run) => (
            <a
              key={run.id}
              href={`#${run.id}`}
              className="text-sm flex items-center gap-2"
              style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}
              onClick={() => setMenuOpen(false)}
            >
              <span>{run.label}</span>
              <span style={{ color: "var(--text-dim)" }}>{run.sublabel}</span>
              <span style={{ color: "var(--acid)" }}>{run.winRate}</span>
            </a>
          ))}
          <div className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
            + More runs coming soon
          </div>
        </div>
      )}
    </header>
  );
}
