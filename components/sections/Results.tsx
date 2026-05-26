import SectionWrapper from "@/components/ui/SectionWrapper";
import StatCard from "@/components/ui/StatCard";

const STATS = [
  {
    label: "Overall Win Rate",
    value: "85.99%",
    delta: "+76pp vs random (~10%)",
    interpretation: "The agent won 86 out of every 100 games — a staggering gap over random play.",
  },
  {
    label: "Mean Rounds Survived",
    value: "16.77",
    delta: "+11.8 vs random baseline",
    interpretation: "Games stretch further when the agent plays — it builds teams that last.",
  },
  {
    label: "Most Drafted Pet",
    value: "91,019",
    delta: "Fish — drafted in 91k games",
    interpretation: "The agent discovered Fish as the cornerstone of almost every winning team.",
  },
  {
    label: "Top Solo Win Rate",
    value: "90.2%",
    delta: "Giraffe — highest individual rate",
    interpretation: "Among pets with sufficient data, Giraffe posted the strongest individual win rate.",
  },
];

export default function Results() {
  return (
    <SectionWrapper id="results" number="02">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <span
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: "var(--font-mono)", color: "var(--acid)" }}
          >
            Results Overview
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold"
            style={{ fontFamily: "var(--font-display)", color: "var(--text)" }}
          >
            What the agent found
          </h2>
        </div>

        {/* Stat grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 80} />
          ))}
        </div>

        {/* Editorial summary */}
        <div
          className="max-w-3xl flex flex-col gap-4"
          style={{ fontFamily: "var(--font-ui)", color: "var(--text-dim)", lineHeight: 1.8, fontSize: "1.0625rem" }}
        >
          <p>
            After approximately three million training steps, the agent settled into a remarkably consistent strategy: anchor every team around Fish, stack early-tier support pets like Ant, Beaver, and Mosquito, and lean on Horse to amplify burst damage. Rather than discovering an obscure metagame, it converged on the same core units most experienced human players identify — which is a kind of validation in itself.
          </p>
          <p>
            The 85.99% figure is not a cherry-picked run. It is the average across the entire evaluation set, spanning games that reached both early knockout and deep late-game rounds. The agent does not simply fast-win — it scales. Performance actually <em style={{ color: "var(--text)" }}>rises</em> through the mid-game before the difficulty spikes of higher tiers begin to tell, peaking at 90.7% around round 17.
          </p>
          <p>
            The outliers are telling too. Giraffe posts a 90.2% solo win rate yet is picked far less often than Fish or Ant — the agent learned that Giraffe is powerful only in the right context, not a blind auto-include. Scorpion and Dog sit near the bottom of the tier list despite theoretical strength; the agent simply never found reliable windows to leverage them.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
