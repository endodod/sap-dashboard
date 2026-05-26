"use client";
import { useState } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Badge from "@/components/ui/Badge";
import { PET_META, getTier, TIER_COLORS } from "@/lib/petMeta";
import { fmt, fmtNum } from "@/lib/utils";
import statsData from "@/data/stats.json";

type SortKey = "winRate" | "picks" | "name";

interface PetRow {
  name: string;
  emoji: string;
  winRate: number;
  picks: number;
  tier: string;
  lowSample: boolean;
}

function buildPetRows(): PetRow[] {
  const winRates = statsData.pet_win_rate as Record<string, number>;
  const picks = statsData.pet_pick_frequency as Record<string, number>;

  return Object.entries(winRates)
    .map(([name, wr]) => ({
      name,
      emoji: PET_META[name]?.emoji ?? "❓",
      winRate: wr,
      picks: picks[name] ?? 0,
      tier: getTier(wr, picks[name] ?? 0),
      lowSample: (picks[name] ?? 0) < 2000,
    }))
    .sort((a, b) => b.winRate - a.winRate);
}

const TIER_ORDER = ["S", "A", "B", "C", "D"] as const;

export default function TierList() {
  const [view, setView] = useState<"tier" | "table">("tier");
  const [sortKey, setSortKey] = useState<SortKey>("winRate");
  const [sortAsc, setSortAsc] = useState(false);

  const rows = buildPetRows();

  const tierGroups = TIER_ORDER.reduce<Record<string, PetRow[]>>((acc, t) => {
    acc[t] = rows.filter((r) => r.tier === t);
    return acc;
  }, {} as Record<string, PetRow[]>);

  const sorted = [...rows].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortKey === "winRate") return (a.winRate - b.winRate) * dir;
    if (sortKey === "picks") return (a.picks - b.picks) * dir;
    return a.name.localeCompare(b.name) * dir;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc((a) => !a);
    else { setSortKey(key); setSortAsc(false); }
  };

  return (
    <SectionWrapper id="tier-list" number="03">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
              Agent-Derived Tier List
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
              Pet Tier List
            </h2>
            <p className="text-sm max-w-lg" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.7 }}>
              Tiers derived from agent win-rate data: S ≥ 85%, A 80–84.9%, B 75–79.9%, C 65–74.9%, D &lt; 65%. Pets with fewer than 2,000 picks are flagged as low-sample.
            </p>
          </div>
          {/* View toggle */}
          <div
            className="flex rounded overflow-hidden self-start md:self-end"
            style={{ border: "1px solid var(--border)" }}
          >
            {(["tier", "table"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-4 py-2 text-xs uppercase tracking-wide transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: view === v ? "var(--acid)" : "transparent",
                  color: view === v ? "#0A0A0F" : "var(--text-dim)",
                  fontWeight: view === v ? 600 : 400,
                }}
              >
                {v === "tier" ? "Tier View" : "Table View"}
              </button>
            ))}
          </div>
        </div>

        {/* Tier view */}
        {view === "tier" && (
          <div className="flex flex-col gap-3">
            {TIER_ORDER.map((tier) => (
              <div key={tier} className="flex gap-4 items-start">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded text-sm font-extrabold flex-shrink-0 mt-1"
                  style={{
                    background: `${TIER_COLORS[tier]}22`,
                    color: TIER_COLORS[tier],
                    fontFamily: "var(--font-display)",
                    border: `1px solid ${TIER_COLORS[tier]}44`,
                  }}
                >
                  {tier}
                </div>
                <div className="flex flex-wrap gap-2">
                  {tierGroups[tier].map((pet) => (
                    <div
                      key={pet.name}
                      className="group relative flex items-center gap-2 px-3 py-2 rounded cursor-default transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: "var(--surface)",
                        border: `1px solid var(--border)`,
                        minWidth: "fit-content",
                      }}
                    >
                      <span>{pet.emoji}</span>
                      <span className="text-sm capitalize" style={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}>
                        {pet.name}
                      </span>
                      <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
                        {fmt(pet.winRate)}
                      </span>
                      {pet.lowSample && (
                        <span title="Low sample size" className="text-xs" style={{ color: "var(--amber)" }}>⚠</span>
                      )}
                      {/* Hover expansion */}
                      <div
                        className="absolute bottom-full left-0 mb-2 p-3 rounded z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-48"
                        style={{ background: "#1A1A28", border: "1px solid var(--border)" }}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                            Picks: <span style={{ color: "var(--text)" }}>{fmtNum(pet.picks)}</span>
                          </div>
                          <div className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                            Win rate: <span style={{ color: "var(--acid)" }}>{fmt(pet.winRate)}</span>
                          </div>
                          {pet.lowSample && (
                            <div className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--amber)" }}>
                              ⚠ Low sample (&lt;2k picks)
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table view */}
        {view === "table" && (
          <div className="overflow-x-auto rounded" style={{ border: "1px solid var(--border)" }}>
            <table className="w-full text-sm" style={{ fontFamily: "var(--font-mono)" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
                  {[
                    { key: "name" as SortKey, label: "Pet" },
                    { key: "winRate" as SortKey, label: "Win Rate" },
                    { key: "picks" as SortKey, label: "Pick Count" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-4 py-3 text-left cursor-pointer select-none hover:opacity-80 transition-opacity"
                      style={{ color: sortKey === col.key ? "var(--acid)" : "var(--text-dim)", fontWeight: 500 }}
                    >
                      {col.label} {sortKey === col.key ? (sortAsc ? "↑" : "↓") : ""}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left" style={{ color: "var(--text-dim)", fontWeight: 500 }}>Tier</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((pet, i) => (
                  <tr
                    key={pet.name}
                    style={{
                      borderBottom: "1px solid var(--border)",
                      background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    }}
                  >
                    <td className="px-4 py-2.5 flex items-center gap-2" style={{ color: "var(--text)" }}>
                      <span>{pet.emoji}</span>
                      <span className="capitalize">{pet.name}</span>
                      {pet.lowSample && <span title="Low sample" style={{ color: "var(--amber)" }}>⚠</span>}
                    </td>
                    <td className="px-4 py-2.5" style={{ color: "var(--acid)" }}>{fmt(pet.winRate)}</td>
                    <td className="px-4 py-2.5" style={{ color: "var(--text-dim)" }}>{fmtNum(pet.picks)}</td>
                    <td className="px-4 py-2.5">
                      <Badge color={TIER_COLORS[pet.tier]}>{pet.tier}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
