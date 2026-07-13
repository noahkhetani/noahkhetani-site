import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId } from "../lib/scroll";
import { Hero } from "../sections/Hero";
import { Projects } from "../sections/Projects";
import { About } from "../sections/About";
import { Architecture } from "../sections/Architecture";
import { Skills } from "../sections/Skills";
import { Timeline } from "../sections/Timeline";
import { GitHubSection } from "../sections/GitHubSection";
import { Philosophy } from "../sections/Philosophy";
import { Contact } from "../sections/Contact";

export function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      // allow layout to settle before scrolling
      setTimeout(() => scrollToId(target), 60);
    }
  }, [location.state]);

  return (
    <>
      <Hero onExplore={() => scrollToId("work")} />
      <Projects />
      <About />
      <Architecture />
      <Skills />
      <Timeline />
      <GitHubSection />
      <Philosophy />
      <Contact />
    </>
  );
}
