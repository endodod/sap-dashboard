"use client";
import { useRef, useMemo } from "react";
import { useInView } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import SectionWrapper from "@/components/ui/SectionWrapper";
import statsData from "@/data/stats.json";

interface ChartPoint {
  round: number;
  winRate: number;
  sparse: boolean;
}

function buildChartData(): ChartPoint[] {
  const raw = statsData.win_rate_by_round as Record<string, number>;
  return Object.entries(raw)
    .map(([k, v]) => ({ round: parseInt(k), winRate: parseFloat((v * 100).toFixed(2)), sparse: parseInt(k) >= 74 }))
    .filter((d) => d.round <= 80)
    .sort((a, b) => a.round - b.round);
}

function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 rounded text-sm"
      style={{ background: "#1A1A28", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "var(--font-mono)" }}
    >
      <div style={{ color: "var(--text-dim)" }}>Round {label}</div>
      <div style={{ color: "var(--acid)", fontWeight: 600 }}>{payload[0].value?.toFixed(2)}%</div>
    </div>
  );
}

export default function WinRateByRound() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const data = useMemo(buildChartData, []);

  return (
    <SectionWrapper id="performance" number="05">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
            Performance
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Win Rate by Round
          </h2>
          <p className="text-sm max-w-lg" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.7 }}>
            How does agent performance evolve — and eventually degrade — as games progress into higher tiers?
          </p>
        </div>

        {/* Chart */}
        <div ref={ref} className="w-full" style={{ height: 360 }}>
          {inView && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="winRateGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A259FF" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#A259FF" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="round"
                  tick={{ fill: "var(--text-dim)", fontSize: 11, fontFamily: "var(--font-mono)" }}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                  label={{ value: "Round", position: "insideBottomRight", fill: "var(--text-dim)", fontSize: 11, dy: 10 }}
                />
                <YAxis
                  domain={[50, 100]}
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fill: "var(--text-dim)", fontSize: 11, fontFamily: "var(--font-mono)" }}
                  axisLine={false}
                  tickLine={false}
                  width={48}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.15)", strokeWidth: 1 }} />
                <ReferenceLine
                  y={85.99}
                  stroke="var(--amber)"
                  strokeDasharray="6 3"
                  label={{ value: "85.99% overall", fill: "var(--amber)", fontSize: 10, fontFamily: "var(--font-mono)", position: "insideTopLeft" }}
                />
                <Area
                  type="monotone"
                  dataKey="winRate"
                  stroke="#A259FF"
                  strokeWidth={2}
                  fill="url(#winRateGradient)"
                  isAnimationActive={true}
                  animationDuration={1200}
                  animationEasing="ease-out"
                  dot={false}
                  activeDot={{ r: 4, fill: "#A259FF", stroke: "#0A0A0F", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Annotations */}
        <div className="flex flex-wrap gap-4">
          {[
            { label: "Round 17", value: "90.7%", note: "Peak performance — agent scales into mid-game", color: "var(--acid)" },
            { label: "Rounds 12–17", value: "↑ Rising", note: "Agent consistently improves through early-mid game", color: "var(--acid)" },
            { label: "Rounds 74+", value: "~50%", note: "Sparse data — statistical noise, treat with caution", color: "var(--amber)" },
          ].map((a) => (
            <div
              key={a.label}
              className="flex flex-col gap-1 px-4 py-3 rounded"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <span className="text-xs uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}>
                {a.label}
              </span>
              <span className="text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: a.color }}>
                {a.value}
              </span>
              <span className="text-xs" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)" }}>
                {a.note}
              </span>
            </div>
          ))}
        </div>

        {/* Insight text */}
        <div
          className="max-w-2xl flex flex-col gap-4"
          style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.8, fontSize: "1.0625rem" }}
        >
          <p>
            The performance arc tells a compelling story about how Super Auto Pets actually works at depth. In the early rounds, every game begins at the same baseline — the agent's 85.99% average. But as games progress into rounds 12–17, something interesting happens: performance climbs rather than declines. The agent's preferred team compositions — Fish-centric scaling builds with Ant and Beaver support — are precisely the teams that get stronger as they accumulate buffs across multiple turns.
          </p>
          <p>
            The decline that follows round 17 is not a failure of the agent — it reflects the deliberate difficulty design of Super Auto Pets. Tier unlocks introduce opponents with fundamentally different power levels and combat mechanics. The agent, trained on early-tier patterns, runs out of effective adaptation as the late-game tier 5 and 6 units begin appearing on enemy teams.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
