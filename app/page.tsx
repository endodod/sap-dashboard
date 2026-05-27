import Nav from "@/components/nav/Nav";
import Hero from "@/components/hero/Hero";
import SectionNav from "@/components/SectionNav";
import Results from "@/components/sections/Results";
import TierList from "@/components/sections/TierList";
import SynergyExplorer from "@/components/sections/SynergyExplorer";
import WinRateByRound from "@/components/sections/WinRateByRound";
import PetSpotlight from "@/components/sections/PetSpotlight";
import TrainingCurves from "@/components/sections/TrainingCurves";
import RunSimulation from "@/components/sections/RunSimulation";
import BattleSimulator from "@/components/sections/BattleSimulator";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <SectionNav />
      <Results />
      <TierList />
      <SynergyExplorer />
      <WinRateByRound />
      <PetSpotlight />
      <TrainingCurves />
      <RunSimulation />
      <BattleSimulator />
      <About />
    </main>
  );
}
