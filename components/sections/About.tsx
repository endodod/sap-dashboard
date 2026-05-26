"use client";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const REPOS = [
  {
    name: "sap-sim",
    desc: "Game environment + battle engine",
    url: "https://github.com/endodod/sap-sim",
  },
  {
    name: "sap-agent",
    desc: "RL training pipeline (MaskablePPO)",
    url: "https://github.com/endodod/sap-agent",
  },
  {
    name: "sap-dashboard",
    desc: "This site — Next.js data dashboard",
    url: "https://github.com/endodod/sap-dashboard",
  },
];

const FAQ = [
  {
    q: "How is win rate calculated?",
    a: "Win rate is computed as a per-game binary outcome — win or loss — averaged over the full evaluation set of 10,000+ games. A game counts as a win if the agent's team survives the final round, regardless of score.",
  },
  {
    q: "What does 'synergy' mean here?",
    a: "Synergy is measured as co-occurrence above chance: how often two pets appear on the same team relative to how often we'd expect by random selection, correlated with the win rate of games featuring that pair. High co-occurrence + high win rate = strong synergy.",
  },
  {
    q: "Why does performance peak at round 17?",
    a: "Super Auto Pets has tier unlocks that introduce progressively stronger opponent units. The agent's preferred early-tier composition — Fish, Ant, Beaver — reaches peak strength around rounds 12–17 as accumulated buffs compound. After round 17, tier 4 and 5 opponents begin appearing, and the agent's strategy doesn't scale as effectively against higher-attack enemy units.",
  },
  {
    q: "Is the tier list accurate for human play?",
    a: "Not directly. The agent plays in a self-play environment and optimises against itself, not a human community metagame. Some pets that humans undervalue (like Ant) the agent learned to treasure — and vice versa. Treat this as 'what an RL agent found', not a community tier list.",
  },
];

export default function About() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <>
      <SectionWrapper id="about" number="09">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
              About
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
              Methodology
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — project summary */}
            <div className="flex flex-col gap-6">
              <p className="text-base leading-relaxed" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.8 }}>
                This project trained a reinforcement learning agent from scratch to play Super Auto Pets Pack 1, using{" "}
                <span style={{ color: "var(--text)" }}>MaskablePPO</span> from Stable-Baselines3 with a custom{" "}
                <span style={{ color: "var(--text)" }}>Gymnasium</span> environment. Training ran for ~3 million environment steps over a three-month project. The agent reached an 85.99% win rate — a 76 percentage-point improvement over the random baseline.
              </p>

              <div className="flex flex-col gap-3">
                <span className="text-sm uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                  Source repositories
                </span>
                {REPOS.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded group transition-all duration-200 hover:-translate-y-0.5 corner-cut"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="flex-shrink-0"
                      style={{ color: "var(--text-dim)" }}
                      aria-hidden="true"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    <div className="flex flex-col min-w-0">
                      <span
                        className="text-sm font-medium truncate"
                        style={{
                          fontFamily: "var(--font-mono)",
                          color: "var(--acid)",
                          transition: "color 0.2s",
                        }}
                      >
                        {repo.name}
                      </span>
                      <span className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)" }}>
                        {repo.desc}
                      </span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="ml-auto flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — FAQ accordion */}
            <div className="flex flex-col gap-2">
              {FAQ.map((item, i) => (
                <div
                  key={i}
                  className="rounded overflow-hidden"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <button
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-white/5"
                    style={{ background: openIdx === i ? "rgba(184,255,63,0.04)" : "var(--surface)" }}
                  >
                    <span className="text-sm pr-4" style={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}>
                      {item.q}
                    </span>
                    <span
                      className="flex-shrink-0 transition-transform duration-200"
                      style={{
                        color: "var(--text-dim)",
                        transform: openIdx === i ? "rotate(180deg)" : "rotate(0deg)",
                        fontSize: "0.75rem",
                      }}
                    >
                      ▾
                    </span>
                  </button>
                  {openIdx === i && (
                    <div
                      className="px-4 pb-4 pt-2 text-sm"
                      style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.7, background: "rgba(184,255,63,0.02)" }}
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer
        className="px-6 md:px-12 lg:px-20 py-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div
          className="text-sm flex flex-wrap gap-x-4 gap-y-2 items-center"
          style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
        >
          <span>Paul Kühn</span>
          <span aria-hidden="true">·</span>
          <span>Summer 2026</span>
          <span aria-hidden="true">·</span>
          <a
            href="https://paulkuehn.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ color: "var(--acid)" }}
          >
            paulkuehn.ch
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://github.com/endodod"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ color: "var(--acid)" }}
          >
            github.com/endodod
          </a>
        </div>
      </footer>
    </>
  );
}
