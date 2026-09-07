import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import SupportCards from "@/components/sections/SupportCards";
import BlindAccessMode from "@/components/sections/BlindAccessMode";
import AccessAI from "@/components/sections/AccessAI";
import PlacesFinder from "@/components/sections/PlacesFinder";
import Jobs from "@/components/sections/Jobs";
import Resources from "@/components/sections/Resources";
import TechHub from "@/components/sections/TechHub";
import ScreenReaderDemo from "@/components/sections/ScreenReaderDemo";
import CommunityStories from "@/components/sections/CommunityStories";
import CaregiverCorner from "@/components/sections/CaregiverCorner";
import DayPlanner from "@/components/sections/DayPlanner";
import BarrierReport from "@/components/sections/BarrierReport";
import About from "@/components/sections/About";
import Footer from "@/components/sections/Footer";
import AccessibilitySettingsPanel from "@/components/sections/AccessibilitySettingsPanel";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";

export default function Landing() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [blindMode, setBlindMode] = useState(false);

  return (
    <AccessibilityProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar onOpenSettings={() => setSettingsOpen(true)} />

        <main id="main-content" tabIndex={-1} className="flex-1">
          {blindMode ? (
            <BlindAccessMode onClose={() => setBlindMode(false)} />
          ) : (
            <>
              <Hero onEnterBlindMode={() => setBlindMode(true)} />
              <SupportCards />
              <AccessAI />
              <PlacesFinder />
              <Jobs />
              <Resources />
              <TechHub />
              <ScreenReaderDemo />
              <DayPlanner />
              <BarrierReport />
              <CommunityStories />
              <CaregiverCorner />
              <About />
            </>
          )}
        </main>

        {!blindMode && <Footer />}

        <AccessibilitySettingsPanel
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />
      </div>
    </AccessibilityProvider>
  );
}
