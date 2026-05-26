"use client";
import { useState } from "react";
import SectionNav from "@/components/SectionNav";

interface RunEntryProps {
  runNumber: number;
  date: string;
  title: string;
  winRate: number;
  meanRounds: number;
  algorithm: string;
  steps: string;
  strategy: string;
  tags: string[];
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function RunEntry({
  runNumber,
  date,
  title,
  winRate,
  meanRounds,
  algorithm,
  steps,
  strategy,
  tags,
  children,
  defaultExpanded = true,
}: RunEntryProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const runId = String(runNumber).padStart(3, "0");
  const runLabel = `#${runId}`;

  return (
    <article id={`run-${runNumber}`}>
      {/* Entry header — always visible */}
      <div
        className="px-6 md:px-12 lg:px-20 py-10"
        style={{ borderTop: "2px solid var(--border)" }}
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
          {/* Left: identity */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-xs px-2.5 py-1 rounded"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: "rgba(162,89,255,0.12)",
                  color: "var(--acid)",
                  border: "1px solid rgba(162,89,255,0.3)",
                  letterSpacing: "0.06em",
                }}
              >
                {runLabel}
              </span>
              <span
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
              >
                {date}
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                color: "var(--text)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {title}
            </h2>

            <p
              className="text-sm max-w-xl"
              style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.7 }}
            >
              {strategy}
            </p>

            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: "rgba(255,255,255,0.04)",
                    color: "var(--text-dim)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: metrics + toggle */}
          <div className="flex flex-col items-start md:items-end gap-5 flex-shrink-0">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Win Rate",   value: `${winRate}%`,       accent: true },
                { label: "Avg Rounds", value: String(meanRounds),  accent: false },
                { label: "Algorithm",  value: algorithm,           accent: false },
                { label: "Steps",      value: steps,               accent: false },
              ].map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col gap-0.5 px-3 py-2.5 rounded"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", minWidth: "116px" }}
                >
                  <span
                    className="text-xs uppercase tracking-wide"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-dim)" }}
                  >
                    {m.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.05rem",
                      color: m.accent ? "var(--acid)" : "var(--text)",
                    }}
                  >
                    {m.value}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setExpanded((e) => !e)}
              className="text-xs px-4 py-2 rounded transition-all duration-200 hover:opacity-80"
              style={{
                fontFamily: "var(--font-mono)",
                background: expanded ? "rgba(162,89,255,0.1)" : "var(--surface)",
                color: expanded ? "var(--acid)" : "var(--text-dim)",
                border: `1px solid ${expanded ? "rgba(162,89,255,0.3)" : "var(--border)"}`,
              }}
            >
              {expanded ? "Collapse ▲" : "Expand Analysis ▾"}
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible content — CSS grid trick, no height animation GPU issues */}
      <div
        className="collapse-grid"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <div className="collapse-inner">
          <SectionNav runLabel={runLabel} />
          {children}
        </div>
      </div>
    </article>
  );
}
