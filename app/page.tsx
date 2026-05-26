import Nav from "@/components/nav/Nav";
import BlogMasthead from "@/components/BlogMasthead";
import RunEntry from "@/components/RunEntry";
import Results from "@/components/sections/Results";
import TierList from "@/components/sections/TierList";
import SynergyExplorer from "@/components/sections/SynergyExplorer";
import WinRateByRound from "@/components/sections/WinRateByRound";
import PetSpotlight from "@/components/sections/PetSpotlight";
import TrainingCurves from "@/components/sections/TrainingCurves";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main>
      <Nav />
      <BlogMasthead />

      <div>
        <RunEntry
          runNumber={1}
          date="2026-05-27"
          title="Baseline Run — Fish-Core Strategy"
          winRate={85.99}
          meanRounds={16.77}
          algorithm="MaskablePPO"
          steps="~3M"
          strategy="First full training run to establish a baseline. Agent converged on a Fish-centric core with Ant, Beaver, and Mosquito support. No explicit strategy guidance — emergent behaviour only."
          tags={["baseline", "tier-1", "fish-core", "3M-steps", "self-play"]}
          defaultExpanded={true}
        >
          <Results />
          <TierList />
          <SynergyExplorer />
          <WinRateByRound />
          <PetSpotlight />
          <TrainingCurves />
        </RunEntry>
      </div>

      <About />
    </main>
  );
}
