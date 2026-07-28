import { useState } from "react";
import { StartingSequence } from "./components/layout/StartingSequence";
import { Navbar } from "./components/layout/Navbar";
import { LapIndicator, MobileLapIndicator } from "./components/layout/LapIndicator";
import { TelemetryHUD } from "./components/layout/TelemetryHUD";
import { CustomCursor } from "./components/layout/CustomCursor";
import { DrsNotification } from "./components/layout/DrsNotification";
import { Footer } from "./components/layout/Footer";

import { Hero } from "./components/sections/Hero";
import { DriverProfile } from "./components/sections/DriverProfile";
import { Projects } from "./components/sections/Projects";
import { ExperienceTimeline } from "./components/sections/ExperienceTimeline";
import { SkillsTelemetry } from "./components/sections/SkillsTelemetry";
import { TechSystems } from "./components/sections/TechSystems";
import { Certifications } from "./components/sections/Certifications";
import { PitWall } from "./components/sections/PitWall";
import { Contact } from "./components/sections/Contact";

import { useScrollTelemetry } from "./hooks/useScrollTelemetry";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useDrsEasterEgg } from "./hooks/useDrsEasterEgg";

function App() {
  const [introDone, setIntroDone] = useState(false);
  const { activeIndex, activeId, progress } = useScrollTelemetry();
  const reducedMotion = useReducedMotion();
  const drsActive = useDrsEasterEgg(reducedMotion);

  return (
    <>
      <StartingSequence onDone={() => setIntroDone(true)} />
      <CustomCursor />
      <DrsNotification active={drsActive} />

      <div
        style={{ opacity: introDone ? 1 : 0, transition: "opacity 0.4s ease" }}
        aria-hidden={!introDone}
      >
        <Navbar activeId={activeId} />
        <LapIndicator activeIndex={activeIndex} progress={progress} />
        <MobileLapIndicator activeIndex={activeIndex} progress={progress} />
        <TelemetryHUD activeIndex={activeIndex} progress={progress} drsActive={drsActive} />

        <main>
          <Hero />
          <DriverProfile />
          <Projects />
          <ExperienceTimeline />
          <SkillsTelemetry />
          <TechSystems />
          <Certifications />
          <PitWall />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
