import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Nav } from "./components/layout/Nav";
import { Footer } from "./components/layout/Footer";
import { Preloader } from "./components/layout/Preloader";
import { CommandPalette } from "./components/layout/CommandPalette";
import { TerminalMode } from "./components/layout/TerminalMode";
import { EmberBurst } from "./components/EmberBurst";
import { Home } from "./pages/Home";
import { ProjectPage } from "./pages/ProjectPage";
import { useKonami } from "./lib/hooks";
import { setLenis } from "./lib/scroll";
import { CursorGlow } from "./components/ui/CursorGlow";

const CONSOLE_ART = `
%c  ███╗   ██╗ ██╗  ██╗
  ████╗  ██║ ██║ ██╔╝
  ██╔██╗ ██║ █████╔╝
  ██║╚██╗██║ ██╔═██╗
  ██║ ╚████║ ██║  ██╗
  ╚═╝  ╚═══╝ ╚═╝  ╚═╝
%c
  You read consoles. I like you already.
  This site was built from scratch. React, TS, canvas, and one accent color.

  Try:  ⌘K / Ctrl+K  →  command palette
        "terminal mode" in the palette
        the Konami code (you know the one)

  %chttps://github.com/NoahKhetani
`;

export default function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("nk-visited"));
  const [palette, setPalette] = useState(false);
  const [terminal, setTerminal] = useState(false);
  const [burst, setBurst] = useState(false);
  const location = useLocation();

  useEffect(() => {
    history.scrollRestoration = "manual";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    setLenis(lenis);
    if (import.meta.env.DEV) (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    console.log(
      CONSOLE_ART,
      "color:#6c7bff;font-weight:bold",
      "color:#92929c;font-family:monospace",
      "color:#6c7bff"
    );
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!location.state) window.scrollTo({ top: 0 });
  }, [location.pathname, location.state]);

  useKonami(() => setBurst(true));

  const finishLoading = useCallback(() => {
    sessionStorage.setItem("nk-visited", "1");
    setLoading(false);
  }, []);

  return (
    <div className="noise min-h-screen">
      <CursorGlow />
      <AnimatePresence>{loading && <Preloader onDone={finishLoading} />}</AnimatePresence>

      <Nav onPalette={() => setPalette(true)} onLogoSecret={() => setBurst(true)} />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />

      <CommandPalette open={palette} onClose={() => setPalette(false)} onTerminal={() => setTerminal(true)} />
      <TerminalMode open={terminal} onClose={() => setTerminal(false)} />
      {burst && <EmberBurst onDone={() => setBurst(false)} />}
    </div>
  );
}
