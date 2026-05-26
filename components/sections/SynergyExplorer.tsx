"use client";
import { useState, useMemo } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { PET_META } from "@/lib/petMeta";
import { fmt, fmtNum } from "@/lib/utils";
import statsData from "@/data/stats.json";

interface SynergyPair {
  pets: [string, string];
  co_occurrence: number;
  win_rate: number;
}

const HEATMAP_PETS = ["fish", "ant", "beaver", "horse", "pig", "mosquito", "otter", "duck", "swan", "hedgehog"];

function getCellColor(value: number, min: number, max: number): string {
  const t = (value - min) / (max - min);
  // Interpolate from surface (#12121A) to accent purple (#A259FF = 162,89,255)
  const r = Math.round(18 + t * (162 - 18));
  const g = Math.round(18 + t * (89 - 18));
  const b = Math.round(26 + t * (255 - 26));
  return `rgb(${r},${g},${b})`;
}

export default function SynergyExplorer() {
  const pairs = statsData.synergy_pairs as SynergyPair[];
  const [selectedPair, setSelectedPair] = useState<SynergyPair | null>(null);

  const pairMap = useMemo(() => {
    const m: Record<string, SynergyPair> = {};
    for (const p of pairs) {
      const key = [...p.pets].sort().join("|");
      m[key] = p;
    }
    return m;
  }, [pairs]);

  const getPair = (a: string, b: string) => {
    if (a === b) return null;
    return pairMap[[a, b].sort().join("|")] ?? null;
  };

  const counts = Object.values(pairMap).map((p) => p.co_occurrence);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);

  const top5 = [...pairs].sort((a, b) => b.co_occurrence - a.co_occurrence).slice(0, 5);

  const activePair = selectedPair ?? null;

  const genInsight = (p: SynergyPair): string => {
    const wr = fmt(p.win_rate);
    const a = p.pets[0], b = p.pets[1];
    const emojiA = PET_META[a]?.emoji ?? "❓";
    const emojiB = PET_META[b]?.emoji ?? "❓";
    if (p.co_occurrence > 3000) return `${emojiA} ${a.charAt(0).toUpperCase() + a.slice(1)} + ${emojiB} ${b.charAt(0).toUpperCase() + b.slice(1)} appeared in ${fmtNum(p.co_occurrence)} games and won ${wr} of them — one of the most reliable early-game cores the agent found.`;
    return `This pair appeared in ${fmtNum(p.co_occurrence)} games with a ${wr} win rate. The agent drafted them together frequently as a supporting duo.`;
  };

  return (
    <SectionWrapper id="synergies" number="04">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
            Synergy Explorer
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Which pets work together?
          </h2>
          <p className="text-sm max-w-lg" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.7 }}>
            Heatmap shows co-occurrence counts for the top 10 most-drafted pets. Click a cell to see pair details.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Heatmap */}
          <div className="lg:w-1/2 overflow-x-auto">
            <div className="min-w-[360px]">
              {/* Column headers */}
              <div className="flex ml-[88px] mb-1">
                {HEATMAP_PETS.map((pet) => (
                  <div
                    key={pet}
                    className="flex-1 text-center text-xs truncate px-0.5"
                    style={{
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-dim)",
                      transform: "rotate(-45deg) translateY(8px)",
                      transformOrigin: "bottom center",
                      whiteSpace: "nowrap",
                      fontSize: "0.65rem",
                    }}
                    title={pet}
                  >
                    {PET_META[pet]?.emoji ?? "❓"}
                  </div>
                ))}
              </div>

              {/* Rows */}
              <div className="mt-6 flex flex-col gap-0.5">
                {HEATMAP_PETS.map((rowPet) => (
                  <div key={rowPet} className="flex items-center gap-1">
                    {/* Row label */}
                    <div
                      className="w-20 text-xs text-right pr-2 flex items-center justify-end gap-1 flex-shrink-0"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                    >
                      <span>{PET_META[rowPet]?.emoji ?? "❓"}</span>
                      <span className="truncate" title={rowPet}>{rowPet}</span>
                    </div>

                    {/* Cells */}
                    {HEATMAP_PETS.map((colPet) => {
                      const pair = getPair(rowPet, colPet);
                      const isDiagonal = rowPet === colPet;
                      return (
                        <button
                          key={colPet}
                          className="flex-1 aspect-square rounded-sm transition-all duration-150 focus:outline-none"
                          style={{
                            background: isDiagonal
                              ? "rgba(255,255,255,0.03)"
                              : pair
                              ? getCellColor(pair.co_occurrence, minCount, maxCount)
                              : "rgba(255,255,255,0.03)",
                            opacity: isDiagonal ? 0.3 : 1,
                            cursor: pair ? "pointer" : "default",
                            minWidth: "28px",
                            minHeight: "28px",
                            outline: activePair === pair && pair ? "2px solid var(--acid)" : "none",
                          }}
                          title={pair ? `${rowPet} + ${colPet}: ${fmtNum(pair.co_occurrence)} games, ${fmt(pair.win_rate)}` : undefined}
                          onClick={() => pair && setSelectedPair(pair)}
                          aria-label={pair ? `${rowPet} + ${colPet}` : undefined}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            {!activePair ? (
              <>
                <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                  Top 5 Synergy Pairs
                </h3>
                {top5.map((p, i) => (
                  <button
                    key={p.pets.join("-")}
                    onClick={() => setSelectedPair(p)}
                    className="flex items-center gap-4 p-4 rounded text-left transition-all duration-200 hover:-translate-y-0.5 corner-cut"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                  >
                    <span className="text-xl font-extrabold w-6" style={{ fontFamily: "var(--font-display)", color: "var(--text-dim)" }}>
                      {i + 1}
                    </span>
                    <div className="flex-1 flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span>{PET_META[p.pets[0]]?.emoji}</span>
                        <span className="text-sm capitalize" style={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}>{p.pets[0]}</span>
                        <span style={{ color: "var(--text-dim)" }}>+</span>
                        <span>{PET_META[p.pets[1]]?.emoji}</span>
                        <span className="text-sm capitalize" style={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}>{p.pets[1]}</span>
                        {i === 0 && <span className="text-sm">👑</span>}
                      </div>
                      <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                        {fmtNum(p.co_occurrence)} games together
                      </span>
                    </div>
                    <span
                      className="text-lg font-bold"
                      style={{ fontFamily: "var(--font-display)", color: "var(--acid)" }}
                    >
                      {fmt(p.win_rate)}
                    </span>
                  </button>
                ))}
              </>
            ) : (
              <div className="flex flex-col gap-6 p-6 rounded corner-cut" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{PET_META[activePair.pets[0]]?.emoji}</span>
                  <span className="text-3xl" style={{ color: "var(--text-dim)" }}>+</span>
                  <span className="text-3xl">{PET_META[activePair.pets[1]]?.emoji}</span>
                  <div className="flex flex-col ml-2">
                    <span className="text-xl font-bold capitalize" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                      {activePair.pets[0]} & {activePair.pets[1]}
                    </span>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-4xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--acid)" }}>
                      {fmt(activePair.win_rate)}
                    </span>
                    <span className="text-xs uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>Win Rate</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-4xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                      {fmtNum(activePair.co_occurrence)}
                    </span>
                    <span className="text-xs uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>Games Together</span>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)" }}>
                  {genInsight(activePair)}
                </p>
                <button
                  onClick={() => setSelectedPair(null)}
                  className="text-xs self-start"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                >
                  ← Back to top pairs
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Horizontal scrollable all pairs */}
        <div>
          <h3 className="text-sm font-medium mb-3" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)" }}>
            All 20 synergy pairs
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[...pairs].sort((a, b) => b.win_rate - a.win_rate).map((p) => (
              <button
                key={p.pets.join("-")}
                onClick={() => setSelectedPair(p)}
                className="flex-shrink-0 flex flex-col gap-1.5 p-3 rounded transition-all duration-150 hover:-translate-y-0.5"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", minWidth: "120px" }}
              >
                <div className="flex items-center gap-1.5 text-sm">
                  <span>{PET_META[p.pets[0]]?.emoji}</span>
                  <span style={{ color: "var(--text-dim)" }}>+</span>
                  <span>{PET_META[p.pets[1]]?.emoji}</span>
                </div>
                <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
                  {fmt(p.win_rate)}
                </span>
                <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                  {fmtNum(p.co_occurrence)} games
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
