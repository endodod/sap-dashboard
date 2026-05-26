export default function BlogMasthead() {
  return (
    <section className="pt-24 pb-16 px-6 md:px-12 lg:px-20">
      {/* Breadcrumb line */}
      <div className="flex items-center gap-3 mb-10">
        <span
          className="text-xs uppercase tracking-widest flex-shrink-0"
          style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}
        >
          SAP · RL · RESEARCH LOG
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      {/* Title */}
      <h1
        className="mb-6"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(3rem, 8vw, 6rem)",
          color: "var(--text)",
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
        }}
      >
        Research<br />
        <span style={{ color: "var(--acid)" }}>Log</span>
      </h1>

      {/* Description */}
      <p
        className="text-base md:text-lg mb-10 max-w-xl"
        style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.75 }}
      >
        Documenting a reinforcement learning agent&apos;s journey through{" "}
        <span style={{ color: "var(--text)" }}>Super Auto Pets</span>. Each entry is an
        independent run — different strategies, pets, hyperparameters.
      </p>

      {/* Summary bar */}
      <div
        className="inline-flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 rounded"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide" style={{ color: "var(--text-dim)" }}>Runs logged</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--acid)" }}>1</span>
        </div>
        <div className="w-px h-4 hidden sm:block" style={{ background: "var(--border)" }} />
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide" style={{ color: "var(--text-dim)" }}>Best win rate</span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "var(--acid)" }}>85.99%</span>
        </div>
        <div className="w-px h-4 hidden sm:block" style={{ background: "var(--border)" }} />
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide" style={{ color: "var(--text-dim)" }}>Algorithm</span>
          <span className="text-sm" style={{ color: "var(--text)" }}>MaskablePPO</span>
        </div>
      </div>
    </section>
  );
}
