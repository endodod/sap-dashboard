"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { PET_META } from "@/lib/petMeta";
import type { SimulationRun, SimTurn, SimState, SimPet } from "@/lib/simulationTypes";

// ─── Demo data ────────────────────────────────────────────────────────────────
// Shown when sap-agent isn't live yet so the visualization is always visible.
const DEMO_RUN: SimulationRun = {
  run_id: "demo-fish-core",
  strategy: "Fish-Core · Emergent Baseline",
  final_result: "win",
  total_turns: 10,
  total_wins: 10,
  turns: [
    {
      turn: 1, gold: 10, lives: 10, wins: 0,
      team: [{ pet: "fish", attack: 2, health: 3, level: 1 }, null, null, null, null],
      shop: [
        { pet: "fish", cost: 3, frozen: false },
        { pet: "ant", cost: 3, frozen: false },
        { pet: "beaver", cost: 3, frozen: false },
        { pet: "otter", cost: 3, frozen: false },
      ],
      actions: [
        { type: "buy", detail: "Fish → slot 1" },
        { type: "end_turn", detail: "End shop phase" },
      ],
      battle: {
        opponent_team: [{ pet: "ant", attack: 1, health: 1, level: 1 }, null, null, null, null],
        result: "win", lives_after: 10, wins_after: 1,
        log: ["Fish (2/3) attacks Ant (1/1)", "Ant faints", "Team wins!"],
      },
    },
    {
      turn: 2, gold: 10, lives: 10, wins: 1,
      team: [
        { pet: "fish", attack: 2, health: 3, level: 1 },
        { pet: "ant", attack: 1, health: 1, level: 1 },
        { pet: "beaver", attack: 3, health: 3, level: 1 },
        null, null,
      ],
      shop: [
        { pet: "ant", cost: 3, frozen: false },
        { pet: "beaver", cost: 3, frozen: false },
        { pet: "mosquito", cost: 3, frozen: false },
        { pet: "pig", cost: 1, frozen: false },
      ],
      actions: [
        { type: "buy", detail: "Ant → slot 2" },
        { type: "buy", detail: "Beaver → slot 3" },
        { type: "end_turn", detail: "End shop phase" },
      ],
      battle: {
        opponent_team: [
          { pet: "beaver", attack: 2, health: 2, level: 1 },
          { pet: "ant", attack: 1, health: 1, level: 1 },
          null, null, null,
        ],
        result: "win", lives_after: 10, wins_after: 2,
        log: [
          "Fish (2/3) attacks Beaver (2/2) — both take damage",
          "Ant faints → buffs Fish +1 atk",
          "Fish (3/2) sweeps remaining",
          "Team wins!",
        ],
      },
    },
    {
      turn: 3, gold: 10, lives: 10, wins: 2,
      team: [
        { pet: "fish", attack: 4, health: 3, level: 1 },
        { pet: "ant", attack: 1, health: 1, level: 1 },
        { pet: "beaver", attack: 3, health: 3, level: 1 },
        { pet: "mosquito", attack: 2, health: 2, level: 1 },
        null,
      ],
      shop: [
        { pet: "horse", cost: 3, frozen: false },
        { pet: "pig", cost: 1, frozen: false },
        { pet: "mosquito", cost: 3, frozen: false },
        { pet: "otter", cost: 3, frozen: false },
      ],
      actions: [
        { type: "buy", detail: "Mosquito → slot 4" },
        { type: "buy", detail: "Horse → slot 5" },
        { type: "end_turn", detail: "End shop phase" },
      ],
      battle: {
        opponent_team: [
          { pet: "fish", attack: 3, health: 4, level: 1 },
          { pet: "ant", attack: 1, health: 1, level: 1 },
          { pet: "cricket", attack: 1, health: 2, level: 1 },
          null, null,
        ],
        result: "loss", lives_after: 9, wins_after: 2,
        log: [
          "Mosquito snipes enemy Ant (1 dmg)",
          "Fish (4/3) clashes with enemy Fish (3/3) — trades",
          "Enemy Ant buffs teammate",
          "Team loses — 1 life lost",
        ],
      },
    },
    {
      turn: 4, gold: 10, lives: 9, wins: 2,
      team: [
        { pet: "horse", attack: 5, health: 3, level: 1 },
        { pet: "fish", attack: 4, health: 3, level: 2 },
        { pet: "ant", attack: 3, health: 2, level: 2 },
        { pet: "beaver", attack: 3, health: 3, level: 1 },
        { pet: "mosquito", attack: 2, health: 2, level: 1 },
      ],
      shop: [
        { pet: "ant", cost: 3, frozen: false },
        { pet: "fish", cost: 3, frozen: false },
        { pet: "crab", cost: 3, frozen: false },
        { pet: "dog", cost: 3, frozen: false },
      ],
      actions: [
        { type: "buy", detail: "Ant → combine (slot 3 levels up!)" },
        { type: "reorder", detail: "Horse → slot 1, Fish → slot 2" },
        { type: "end_turn", detail: "End shop phase" },
      ],
      battle: {
        opponent_team: [
          { pet: "fish", attack: 4, health: 5, level: 2 },
          { pet: "ant", attack: 2, health: 2, level: 1 },
          { pet: "beaver", attack: 3, health: 3, level: 1 },
          null, null,
        ],
        result: "win", lives_after: 9, wins_after: 3,
        log: [
          "Mosquito snipes enemy Ant (faints)",
          "Horse gives +1 temp atk to Fish",
          "Fish (5/3) vs enemy Fish (4/5) — Fish survives at 5/1",
          "Ant (lv2) faint gives friends +2/+1",
          "Beaver sweeps — Team wins!",
        ],
      },
    },
    {
      turn: 5, gold: 10, lives: 9, wins: 3,
      team: [
        { pet: "horse", attack: 6, health: 4, level: 1 },
        { pet: "fish", attack: 5, health: 4, level: 2 },
        { pet: "ant", attack: 3, health: 2, level: 2 },
        { pet: "beaver", attack: 5, health: 4, level: 1 },
        { pet: "mosquito", attack: 3, health: 3, level: 1 },
      ],
      shop: [
        { pet: "ox", cost: 3, frozen: false },
        { pet: "kangaroo", cost: 3, frozen: false },
        { pet: "blowfish", cost: 3, frozen: false },
        { pet: "shrimp", cost: 3, frozen: false },
      ],
      actions: [
        { type: "buy_food", detail: "Salad bowl → Horse & Fish (+1/+1 each)" },
        { type: "freeze", detail: "Freeze Ox for next turn" },
        { type: "end_turn", detail: "End shop phase" },
      ],
      battle: {
        opponent_team: [
          { pet: "ox", attack: 4, health: 5, level: 1 },
          { pet: "kangaroo", attack: 2, health: 3, level: 1 },
          { pet: "beaver", attack: 3, health: 3, level: 1 },
          { pet: "ant", attack: 1, health: 1, level: 1 },
          null,
        ],
        result: "win", lives_after: 9, wins_after: 4,
        log: [
          "Mosquito snipes enemy Ant (faints)",
          "Horse charges Ox — Ox faints",
          "Fish + Ant combo crushes remaining",
          "Team wins! 4 wins accumulated.",
        ],
      },
    },
  ],
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PetCard({ pet, showStats = true }: { pet: SimPet | null; showStats?: boolean }) {
  if (!pet) {
    return (
      <div
        className="flex flex-col items-center justify-center rounded h-16 w-16 flex-shrink-0"
        style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed var(--border)" }}
      >
        <span className="text-xs" style={{ color: "var(--muted)" }}>—</span>
      </div>
    );
  }
  const meta = PET_META[pet.pet];
  return (
    <div
      className="flex flex-col items-center gap-1 rounded px-2 py-2 flex-shrink-0 corner-cut"
      style={{ background: "var(--surface)", border: "1px solid var(--border)", minWidth: "64px" }}
    >
      <span className="text-xl leading-none">{meta?.emoji ?? "❓"}</span>
      <span className="text-xs capitalize leading-none" style={{ fontFamily: "var(--font-ui)", color: "var(--text)", fontSize: "0.65rem" }}>
        {pet.pet}
      </span>
      {showStats && (
        <span className="text-xs leading-none" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)", fontSize: "0.6rem" }}>
          {pet.attack}/{pet.health}
          {pet.level > 1 && <span style={{ color: "var(--amber)" }}> L{pet.level}</span>}
        </span>
      )}
    </div>
  );
}

function ActionIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    buy: "↓",
    sell: "↑",
    reorder: "⇄",
    freeze: "❄",
    buy_food: "🍎",
    end_turn: "→",
  };
  const colors: Record<string, string> = {
    buy: "var(--acid)",
    sell: "var(--amber)",
    reorder: "var(--text-dim)",
    freeze: "#7EC8E3",
    buy_food: "var(--amber)",
    end_turn: "var(--muted)",
  };
  return (
    <span style={{ color: colors[type] ?? "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
      {icons[type] ?? "·"}
    </span>
  );
}

function TurnDetail({ turn }: { turn: SimTurn }) {
  const winColor = turn.battle.result === "win" ? "var(--acid)" : turn.battle.result === "loss" ? "#FF6B6B" : "var(--amber)";
  const winBg = turn.battle.result === "win" ? "rgba(162,89,255,0.08)" : turn.battle.result === "loss" ? "rgba(255,107,107,0.08)" : "rgba(255,179,71,0.08)";
  const winBorder = turn.battle.result === "win" ? "rgba(162,89,255,0.25)" : turn.battle.result === "loss" ? "rgba(255,107,107,0.25)" : "rgba(255,179,71,0.25)";

  return (
    <motion.div
      key={turn.turn}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6"
    >
      {/* Turn header bar */}
      <div
        className="flex flex-wrap items-center gap-4 px-4 py-3 rounded"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)" }}
      >
        {[
          { label: "TURN",  value: String(turn.turn).padStart(2, "0") },
          { label: "GOLD",  value: `${turn.gold}g` },
          { label: "LIVES", value: String(turn.lives) },
          { label: "WINS",  value: `${turn.wins}/10` },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide" style={{ color: "var(--text-dim)" }}>{item.label}</span>
            <span className="text-sm font-bold" style={{ color: item.label === "TURN" ? "var(--acid)" : "var(--text)" }}>{item.value}</span>
          </div>
        ))}

        {/* Lives bar */}
        <div className="flex items-center gap-1.5 ml-auto">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: "8px", height: "8px",
                background: i < turn.lives ? "var(--acid)" : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column — Team + Shop */}
        <div className="flex flex-col gap-5">
          {/* Team */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
              Team
            </span>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <PetCard key={i} pet={turn.team[i] ?? null} />
              ))}
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
              Shop
            </span>
            <div className="flex flex-wrap gap-2">
              {turn.shop.map((item, i) => {
                const meta = PET_META[item.pet];
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 rounded px-2 py-2 flex-shrink-0 corner-cut"
                    style={{
                      background: item.frozen ? "rgba(126,200,227,0.08)" : "var(--surface)",
                      border: `1px solid ${item.frozen ? "rgba(126,200,227,0.35)" : "var(--border)"}`,
                      minWidth: "60px",
                    }}
                  >
                    <span className="text-xl leading-none">{meta?.emoji ?? "❓"}</span>
                    <span className="text-xs capitalize" style={{ fontFamily: "var(--font-ui)", color: "var(--text)", fontSize: "0.65rem" }}>
                      {item.pet}
                    </span>
                    <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--amber)", fontSize: "0.6rem" }}>
                      ${item.cost}{item.frozen ? " ❄" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column — Actions + Battle */}
        <div className="flex flex-col gap-5">
          {/* Actions */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
              Agent Actions
            </span>
            <div className="flex flex-col gap-1.5">
              {turn.actions.map((action, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--border)" }}>
                  <ActionIcon type={action.type} />
                  <span className="text-xs uppercase tracking-wide flex-shrink-0" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)", width: "56px" }}>
                    {action.type.replace("_", " ")}
                  </span>
                  <span className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--text)" }}>
                    {action.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Battle */}
          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
              Battle
            </span>
            <div className="flex flex-col gap-3 p-4 rounded corner-cut" style={{ background: winBg, border: `1px solid ${winBorder}` }}>
              {/* Opponent */}
              <div className="flex flex-col gap-2">
                <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>Opponent</span>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <PetCard key={i} pet={turn.battle.opponent_team[i] ?? null} />
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="flex items-center justify-between">
                <span
                  className="text-lg font-extrabold uppercase tracking-wider"
                  style={{ fontFamily: "var(--font-display)", color: winColor }}
                >
                  {turn.battle.result === "win" ? "Victory" : turn.battle.result === "loss" ? "Defeat" : "Draw"}
                </span>
                <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                  {turn.battle.wins_after} wins · {turn.battle.lives_after} lives
                </span>
              </div>

              {/* Log */}
              <div className="flex flex-col gap-0.5">
                {turn.battle.log.map((line, i) => (
                  <span
                    key={i}
                    className="text-xs"
                    style={{ fontFamily: "var(--font-mono)", color: i === turn.battle.log.length - 1 ? winColor : "var(--text-dim)", lineHeight: 1.6 }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

export default function RunSimulation() {
  const [simState, setSimState] = useState<SimState>("idle");
  const [run, setRun] = useState<SimulationRun | null>(null);
  const [activeTurnIdx, setActiveTurnIdx] = useState(0);
  const [isDemo, setIsDemo] = useState(false);

  const displayRun = run ?? (isDemo ? DEMO_RUN : null);
  const activeTurn = displayRun?.turns[activeTurnIdx] ?? null;

  const handleRun = async () => {
    setSimState("loading");
    setRun(null);
    setActiveTurnIdx(0);
    setIsDemo(false);

    try {
      const res = await fetch("/api/simulate-run", { signal: AbortSignal.timeout(35_000) });
      if (res.status === 503) {
        // Agent not live — fall through to demo
        setSimState("unavailable");
        setIsDemo(true);
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: SimulationRun = await res.json();
      setRun(data);
      setSimState("success");
    } catch {
      setSimState("unavailable");
      setIsDemo(true);
    }
  };

  return (
    <SectionWrapper id="simulate" number="07">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
            Run Simulation
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Watch the agent play
          </h2>
          <p className="text-sm max-w-xl" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.7 }}>
            Trigger a live run using the trained policy. The agent shops, builds a team, and battles opponents turn by turn — you see every decision it makes.
          </p>
        </div>

        {/* Trigger */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={handleRun}
            disabled={simState === "loading"}
            className="px-6 py-3 rounded font-bold uppercase tracking-widest transition-all duration-200 disabled:opacity-50 corner-cut"
            style={{
              background: "var(--acid)",
              color: "#0A0A0F",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
            }}
          >
            {simState === "loading" ? "Running…" : simState === "idle" ? "Run Simulation" : "Run Again"}
          </button>

          <AnimatePresence>
            {simState === "loading" && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
              >
                Agent is playing… this may take up to 30s
              </motion.span>
            )}
            {simState === "unavailable" && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs"
                style={{ fontFamily: "var(--font-mono)", color: "var(--amber)" }}
              >
                Live endpoint offline — showing demo run
              </motion.span>
            )}
            {simState === "success" && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs"
                style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}
              >
                Live run complete ✓
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Run visualization */}
        <AnimatePresence>
          {displayRun && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              {/* Run metadata */}
              <div
                className="flex flex-wrap items-center gap-4 px-4 py-3 rounded text-xs"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)" }}
              >
                <span style={{ color: "var(--text-dim)" }}>
                  Run <span style={{ color: "var(--acid)" }}>{displayRun.run_id}</span>
                </span>
                <div className="w-px h-3 hidden sm:block" style={{ background: "var(--border)" }} />
                <span style={{ color: "var(--text-dim)" }}>
                  Strategy: <span style={{ color: "var(--text)" }}>{displayRun.strategy}</span>
                </span>
                <div className="w-px h-3 hidden sm:block" style={{ background: "var(--border)" }} />
                <span
                  className="font-bold uppercase tracking-wide"
                  style={{ color: displayRun.final_result === "win" ? "var(--acid)" : "#FF6B6B" }}
                >
                  {displayRun.final_result === "win" ? "Win" : "Loss"} — {displayRun.total_wins}/10 wins · {displayRun.total_turns} turns
                </span>
                {isDemo && (
                  <span
                    className="ml-auto px-2 py-0.5 rounded text-xs"
                    style={{ background: "rgba(255,179,71,0.12)", color: "var(--amber)", border: "1px solid rgba(255,179,71,0.3)" }}
                  >
                    demo data
                  </span>
                )}
              </div>

              {/* Turn selector */}
              <div className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                  Turn
                </span>
                <div className="flex items-center gap-1 overflow-x-auto pb-1">
                  <button
                    onClick={() => setActiveTurnIdx((i) => Math.max(0, i - 1))}
                    disabled={activeTurnIdx === 0}
                    className="flex-shrink-0 px-2.5 py-1.5 rounded text-xs transition-opacity disabled:opacity-30"
                    style={{ fontFamily: "var(--font-mono)", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-dim)" }}
                  >
                    ←
                  </button>

                  {displayRun.turns.map((t, i) => {
                    const isActive = activeTurnIdx === i;
                    const result = t.battle.result;
                    const dot = result === "win" ? "var(--acid)" : result === "loss" ? "#FF6B6B" : "var(--amber)";
                    return (
                      <button
                        key={t.turn}
                        onClick={() => setActiveTurnIdx(i)}
                        className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-1.5 rounded transition-all duration-150"
                        style={{
                          fontFamily: "var(--font-mono)",
                          background: isActive ? "rgba(162,89,255,0.15)" : "var(--surface)",
                          border: `1px solid ${isActive ? "rgba(162,89,255,0.4)" : "var(--border)"}`,
                          color: isActive ? "var(--acid)" : "var(--text-dim)",
                        }}
                      >
                        <span className="text-xs font-bold">{String(t.turn).padStart(2, "0")}</span>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: dot }} />
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setActiveTurnIdx((i) => Math.min(displayRun.turns.length - 1, i + 1))}
                    disabled={activeTurnIdx === displayRun.turns.length - 1}
                    className="flex-shrink-0 px-2.5 py-1.5 rounded text-xs transition-opacity disabled:opacity-30"
                    style={{ fontFamily: "var(--font-mono)", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-dim)" }}
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Active turn detail */}
              {activeTurn && <TurnDetail turn={activeTurn} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
