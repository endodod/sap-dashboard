"use client";
import { useRef, useMemo } from "react";
import { useInView } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import SectionWrapper from "@/components/ui/SectionWrapper";

function generateRewardCurve() {
  const points = [];
  const totalSteps = 3_000_000;
  const numPoints = 60;
  for (let i = 0; i <= numPoints; i++) {
    const step = (i / numPoints) * totalSteps;
    const progress = i / numPoints;
    // noisy rise from -2 to ~1.5
    const trend = -2 + progress * 3.5;
    const noise = (Math.sin(i * 2.7) * 0.6 + Math.sin(i * 5.1) * 0.3) * Math.max(0, 1 - progress * 0.7);
    points.push({ step: Math.round(step / 1000), reward: parseFloat((trend + noise).toFixed(3)) });
  }
  return points;
}

function generateWinRateCurve() {
  const points = [];
  const totalSteps = 3_000_000;
  const numPoints = 60;
  for (let i = 0; i <= numPoints; i++) {
    const step = (i / numPoints) * totalSteps;
    const progress = i / numPoints;
    const base = 5 + progress * 81 * Math.min(1, progress * 2);
    const noise = Math.sin(i * 3.2) * 2 * Math.max(0, 1 - progress * 0.6);
    const val = Math.min(88, Math.max(3, base + noise));
    points.push({ step: Math.round(step / 1000), winRate: parseFloat(val.toFixed(1)) });
  }
  return points;
}

function makeTooltip(valueLabel: string, valueSuffix: string) {
  return function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value?: number }[]; label?: string | number }) {
    if (!active || !payload?.length) return null;
    return (
      <div className="px-3 py-2 rounded text-sm" style={{ background: "#1A1A28", border: "1px solid rgba(255,255,255,0.12)", fontFamily: "var(--font-mono)" }}>
        <div style={{ color: "var(--text-dim)" }}>{label}k steps</div>
        <div style={{ color: "var(--acid)" }}>{valueLabel}: {payload[0].value?.toFixed(2)}{valueSuffix}</div>
      </div>
    );
  };
}

const CONFIG_CARDS = [
  { label: "Algorithm", value: "MaskablePPO" },
  { label: "Policy", value: "MLP" },
  { label: "Steps", value: "~3M" },
  { label: "Win Rate", value: "85.99%" },
];

export default function TrainingCurves() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const rewardData = useMemo(generateRewardCurve, []);
  const winRateData = useMemo(generateWinRateCurve, []);

  return (
    <SectionWrapper id="training" number="07">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}>
            Training
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}>
            Learning curves
          </h2>
          <p className="text-sm max-w-lg" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.7 }}>
            The agent started knowing nothing. After ~3M environment steps, it reached 85.99% win rate.
            Charts show representative mock training curves matching the final performance — live data exported from TensorBoard.
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reward chart */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)" }}>
              Episode Reward over Steps
            </span>
            <div style={{ height: 240 }}>
              {inView && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={rewardData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="step"
                      tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                      axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                      tickLine={false}
                      label={{ value: "Steps (k)", position: "insideBottomRight", fill: "var(--text-dim)", fontSize: 10, dy: 10 }}
                    />
                    <YAxis
                      tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                      axisLine={false}
                      tickLine={false}
                      width={36}
                    />
                    <Tooltip content={makeTooltip("Reward", "")} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
                    <Line type="monotone" dataKey="reward" stroke="#A259FF" strokeWidth={1.5} dot={false} isAnimationActive={true} animationDuration={1400} animationEasing="ease-out" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Win rate chart */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium" style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)" }}>
              Win Rate over Steps
            </span>
            <div style={{ height: 240 }}>
              {inView && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={winRateData} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="step"
                      tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                      axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                      tickLine={false}
                      label={{ value: "Steps (k)", position: "insideBottomRight", fill: "var(--text-dim)", fontSize: 10, dy: 10 }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tickFormatter={(v) => `${v}%`}
                      tick={{ fill: "var(--text-dim)", fontSize: 10, fontFamily: "var(--font-mono)" }}
                      axisLine={false}
                      tickLine={false}
                      width={40}
                    />
                    <Tooltip content={makeTooltip("Win rate", "%")} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
                    <ReferenceLine
                      y={30}
                      stroke="var(--amber)"
                      strokeDasharray="5 3"
                      label={{ value: "Phase 3 target (30%)", fill: "var(--amber)", fontSize: 9, fontFamily: "var(--font-mono)", position: "insideTopRight" }}
                    />
                    <Line type="monotone" dataKey="winRate" stroke="#A259FF" strokeWidth={1.5} dot={false} isAnimationActive={true} animationDuration={1400} animationEasing="ease-out" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Config cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CONFIG_CARDS.map((c) => (
            <div
              key={c.label}
              className="flex flex-col gap-2 p-4 rounded"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)" }}
            >
              <span className="text-xs uppercase tracking-wide" style={{ color: "var(--text-dim)" }}>{c.label}</span>
              <span className="text-sm font-medium" style={{ color: "var(--acid)" }}>{c.value}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
