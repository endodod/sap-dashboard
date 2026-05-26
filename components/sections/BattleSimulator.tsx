"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { PET_META } from "@/lib/petMeta";
import statsData from "@/data/stats.json";

const ALL_PETS = Object.keys(statsData.pet_pick_frequency as Record<string, number>).sort();

interface BattleResult {
  winner: "team_a" | "team_b" | "draw";
  rounds: number;
  log: string[];
  surviving_pets: { team_a: string[]; team_b: string[] };
}

type SimState = "idle" | "loading" | "success" | "unavailable" | "error";

function PetSlot({
  pet,
  onSelect,
  team,
}: {
  pet: string | null;
  onSelect: (p: string | null) => void;
  team: "a" | "b";
}) {
  const [open, setOpen] = useState(false);
  const accentColor = team === "a" ? "var(--acid)" : "var(--amber)";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full h-16 rounded flex items-center justify-center gap-2 transition-all duration-200 hover:-translate-y-0.5 corner-cut"
        style={{
          background: "var(--surface)",
          border: `1px solid ${pet ? accentColor + "44" : "var(--border)"}`,
        }}
      >
        {pet ? (
          <>
            <span className="text-xl">{PET_META[pet]?.emoji ?? "❓"}</span>
            <span className="text-sm capitalize" style={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}>{pet}</span>
          </>
        ) : (
          <span className="text-sm" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>+ Add pet</span>
        )}
      </button>

      {open && (
        <div
          className="absolute top-full mt-1 left-0 right-0 z-30 rounded overflow-y-auto max-h-52"
          style={{ background: "#1A1A28", border: "1px solid var(--border)" }}
        >
          <button
            onClick={() => { onSelect(null); setOpen(false); }}
            className="w-full text-left px-3 py-2 text-xs hover:bg-white/5 transition-colors"
            style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
          >
            Clear slot
          </button>
          {ALL_PETS.map((p) => (
            <button
              key={p}
              onClick={() => { onSelect(p); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/5 transition-colors"
              style={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}
            >
              <span>{PET_META[p]?.emoji ?? "❓"}</span>
              <span className="capitalize">{p}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BattleSimulator() {
  const [teamA, setTeamA] = useState<(string | null)[]>([null, null, null, null, null]);
  const [teamB, setTeamB] = useState<(string | null)[]>([null, null, null, null, null]);
  const [simState, setSimState] = useState<SimState>("idle");
  const [result, setResult] = useState<BattleResult | null>(null);
  const [visibleLogLines, setVisibleLogLines] = useState(0);

  const updateTeam = (team: "a" | "b", idx: number, pet: string | null) => {
    if (team === "a") setTeamA((t) => { const n = [...t]; n[idx] = pet; return n; });
    else setTeamB((t) => { const n = [...t]; n[idx] = pet; return n; });
  };

  const handleSimulate = async () => {
    const a = teamA.filter(Boolean) as string[];
    const b = teamB.filter(Boolean) as string[];
    if (a.length === 0 || b.length === 0) return;

    setSimState("loading");
    setResult(null);
    setVisibleLogLines(0);

    try {
      const res = await fetch("https://sim.paulkuehn.ch/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team_a: a, team_b: b }),
        signal: AbortSignal.timeout(8000),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: BattleResult = await res.json();
      setResult(data);
      setSimState("success");
      // Stagger log lines
      for (let i = 1; i <= data.log.length; i++) {
        setTimeout(() => setVisibleLogLines(i), i * 150);
      }
    } catch {
      setSimState("unavailable");
    }
  };

  return (
    <SectionWrapper id="simulator" number="08">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
            Live Battle Simulator
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Build your team
          </h2>
          <p className="text-sm" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)" }}>
            Pick up to 5 pets per team and simulate a battle.
          </p>
        </div>

        {/* Team builders */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Team A */}
          <div className="flex-1 flex flex-col gap-3">
            <span className="text-sm font-medium uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
              Team A
            </span>
            {teamA.map((pet, i) => (
              <PetSlot key={i} pet={pet} onSelect={(p) => updateTeam("a", i, p)} team="a" />
            ))}
          </div>

          {/* VS divider */}
          <div className="flex lg:flex-col items-center justify-center gap-2 px-4 py-2">
            <div
              className="text-2xl font-extrabold"
              style={{
                fontFamily: "var(--font-display)",
                color: simState === "loading" ? "var(--acid)" : "var(--text-dim)",
                animation: simState === "loading" ? "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite" : "none",
              }}
            >
              VS
            </div>
            {simState === "loading" && (
              <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                simulating…
              </span>
            )}
          </div>

          {/* Team B */}
          <div className="flex-1 flex flex-col gap-3">
            <span className="text-sm font-medium uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)", color: "var(--amber)" }}>
              Team B
            </span>
            {teamB.map((pet, i) => (
              <PetSlot key={i} pet={pet} onSelect={(p) => updateTeam("b", i, p)} team="b" />
            ))}
          </div>
        </div>

        {/* Simulate button */}
        <button
          onClick={handleSimulate}
          disabled={simState === "loading"}
          className="w-full py-4 rounded font-bold text-base uppercase tracking-widest transition-all duration-200 disabled:opacity-50 corner-cut"
          style={{
            background: "var(--acid)",
            color: "#0A0A0F",
            fontFamily: "var(--font-mono)",
          }}
        >
          {simState === "loading" ? "Simulating battle…" : "Simulate Battle"}
        </button>

        {/* Result panel */}
        <AnimatePresence>
          {simState === "unavailable" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-6 rounded corner-cut"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex flex-col gap-3">
                <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                  🔧 Simulator coming soon
                </span>
                <p className="text-sm" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.7 }}>
                  The battle engine is being wired up. Check back soon — or run it locally from the sim repo.
                </p>
                <a
                  href="https://github.com/endodod/SuperAutoPetsSimulation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm inline-flex items-center gap-2 transition-opacity hover:opacity-80"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                  </svg>
                  View sim repo on GitHub
                </a>
              </div>
            </motion.div>
          )}

          {simState === "success" && result && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-6 p-6 rounded corner-cut"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              {/* Winner banner */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: result.log.length * 0.15 + 0.1, type: "spring", stiffness: 200 }}
                className="text-center py-4 rounded"
                style={{
                  background: result.winner === "team_a" ? "rgba(184,255,63,0.08)" : "rgba(255,179,71,0.08)",
                  border: `1px solid ${result.winner === "team_a" ? "rgba(184,255,63,0.3)" : "rgba(255,179,71,0.3)"}`,
                }}
              >
                <span
                  className="text-2xl font-extrabold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: result.winner === "team_a" ? "var(--acid)" : "var(--amber)",
                  }}
                >
                  {result.winner === "team_a" ? "Team A wins" : result.winner === "team_b" ? "Team B wins" : "Draw"} 🏆
                </span>
                <div className="text-sm mt-1" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                  {result.rounds} rounds · Survivors:{" "}
                  {[...result.surviving_pets.team_a, ...result.surviving_pets.team_b]
                    .map((p) => PET_META[p]?.emoji ?? p)
                    .join(" ")}
                </div>
              </motion.div>

              {/* Battle log */}
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wide mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                  Battle log
                </span>
                {result.log.slice(0, visibleLogLines).map((line, i) => {
                  const isTeamA = line.toLowerCase().includes("team a") || teamA.filter(Boolean).some((p) => p && line.toLowerCase().includes(p));
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="battle-log-line px-2 py-0.5 rounded"
                      style={{
                        color: isTeamA ? "var(--acid)" : "var(--amber)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      {line}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
