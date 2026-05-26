"use client";
import { useState, useMemo } from "react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import { PET_META, getTier, TIER_COLORS } from "@/lib/petMeta";
import { fmt, fmtNum } from "@/lib/utils";
import statsData from "@/data/stats.json";

interface PetData {
  name: string;
  emoji: string;
  winRate: number;
  picks: number;
  tier: string;
  lowSample: boolean;
  description: string;
}

function genAgentRead(pet: PetData, maxPicks: number): string {
  const wr = pet.winRate;
  const pickShare = pet.picks / maxPicks;
  if (wr >= 0.85 && pickShare >= 0.5) return `Core pick — drafted in ${fmtNum(pet.picks)}k games with ${fmt(wr)} win rate. Essential early-game cornerstone.`;
  if (wr >= 0.80) return `Reliable performer — agent drafted this ${fmtNum(pet.picks)} times and won ${fmt(wr)} of those games.`;
  if (wr >= 0.75) return `Solid support unit. The agent found consistent value here across ${fmtNum(pet.picks)} picks.`;
  if (wr >= 0.65 || pet.picks >= 5000) return `Situational pick — provides niche upside but the agent only committed ${fmtNum(pet.picks)} times.`;
  return `Rarely picked — agent found limited value despite ${pet.picks < 1000 ? "very few" : "some"} opportunities.${pet.lowSample ? " Low sample warning." : ""}`;
}

function buildPetData(): { rows: PetData[]; maxPicks: number } {
  const winRates = statsData.pet_win_rate as Record<string, number>;
  const picks = statsData.pet_pick_frequency as Record<string, number>;
  const maxPicks = Math.max(...Object.values(picks));
  const rows = Object.entries(winRates)
    .map(([name, wr]) => ({
      name,
      emoji: PET_META[name]?.emoji ?? "❓",
      winRate: wr,
      picks: picks[name] ?? 0,
      tier: getTier(wr, picks[name] ?? 0),
      lowSample: (picks[name] ?? 0) < 2000,
      description: PET_META[name]?.description ?? "—",
    }))
    .sort((a, b) => b.winRate - a.winRate);
  return { rows, maxPicks };
}

function PetCard({ pet, maxPicks }: { pet: PetData; maxPicks: number }) {
  const [modalOpen, setModalOpen] = useState(false);
  const agentRead = genAgentRead(pet, maxPicks);
  const tierColor = TIER_COLORS[pet.tier];

  return (
    <>
      <div
        className="card-flip-container cursor-pointer corner-cut"
        onClick={() => setModalOpen(true)}
        style={{ height: "160px" }}
      >
        <div className="card-flip-inner w-full h-full rounded" style={{ border: "1px solid var(--border)" }}>
          {/* Front */}
          <div
            className="card-flip-front flex flex-col p-4 gap-3 rounded"
            style={{ background: "var(--surface)" }}
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{pet.emoji}</span>
              <Badge color={tierColor}>{pet.tier}</Badge>
            </div>
            <div>
              <div className="text-sm font-bold capitalize" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
                {pet.name}
              </div>
              {pet.lowSample && (
                <div className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--amber)" }}>⚠ low sample</div>
              )}
            </div>
            {/* Win rate bar */}
            <div className="flex flex-col gap-1">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pet.winRate * 100}%`, background: "var(--acid)" }}
                />
              </div>
              <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
                {fmt(pet.winRate)}
              </span>
            </div>
            {/* Picks bar */}
            <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${(pet.picks / maxPicks) * 100}%`, background: "var(--amber)", opacity: 0.6 }}
              />
            </div>
          </div>

          {/* Back */}
          <div
            className="card-flip-back flex flex-col justify-center p-4 gap-2 rounded"
            style={{ background: "#1A1A28" }}
          >
            <span className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
              Agent&apos;s read
            </span>
            <p className="text-xs leading-relaxed" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)" }}>
              {agentRead}
            </p>
          </div>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`${pet.emoji} ${pet.name.charAt(0).toUpperCase() + pet.name.slice(1)}`}>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Badge color={tierColor}>Tier {pet.tier}</Badge>
            {pet.lowSample && <Badge color="#FFB347">⚠ Low Sample</Badge>}
          </div>
          <p className="text-sm" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.7 }}>
            {pet.description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Win Rate", value: fmt(pet.winRate), color: "var(--acid)" },
              { label: "Total Picks", value: fmtNum(pet.picks), color: "var(--text)" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1 p-4 rounded" style={{ background: "rgba(255,255,255,0.03)" }}>
                <span className="text-xs uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                  {s.label}
                </span>
                <span className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: s.color }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 rounded" style={{ background: "rgba(184,255,63,0.05)", border: "1px solid rgba(184,255,63,0.15)" }}>
            <span className="text-xs uppercase tracking-wide block mb-2" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
              Agent&apos;s read
            </span>
            <p className="text-sm" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.7 }}>
              {agentRead}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default function PetSpotlight() {
  const [query, setQuery] = useState("");
  const { rows, maxPicks } = useMemo(buildPetData, []);

  const filtered = query
    ? rows.filter((p) => p.name.includes(query.toLowerCase()) || p.tier === query.toUpperCase())
    : rows;

  return (
    <SectionWrapper id="spotlight" number="06">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
              Pet Spotlight
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
              Explore every pet
            </h2>
            <p className="text-sm" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)" }}>
              Hover to flip — click for full stats.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search pet or tier (S/A/B/C/D)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2.5 rounded text-sm outline-none"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              color: "var(--text)",
              fontFamily: "var(--font-mono)",
              width: "280px",
            }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filtered.map((pet) => (
            <PetCard key={pet.name} pet={pet} maxPicks={maxPicks} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-10" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
            No pets found for &quot;{query}&quot;
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}
