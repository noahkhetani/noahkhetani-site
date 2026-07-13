import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { ParticleField } from "../components/background/ParticleField";
import { Button } from "../components/ui/Button";
import { RotatingText } from "../components/ui/RotatingText";
import { usePrefersReducedMotion } from "../lib/hooks";
import { site } from "../data/site";

const Scene3D = lazy(() =>
  import("../components/background/Scene3D").then((m) => ({ default: m.Scene3D }))
);

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, delay, ease: [0.21, 0.47, 0.32, 0.98] as const },
});

export function Hero({ onExplore }: { onExplore: () => void }) {
  const reduced = usePrefersReducedMotion();
  const skip3D =
    reduced ||
    (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("no3d"));

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_600px_at_50%_-10%,rgba(108,123,255,0.09),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_80%_80%,rgba(120,110,255,0.04),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 30%, transparent 75%)",
          }}
        />
        {!skip3D && (
          <Suspense fallback={null}>
            <div className="absolute inset-0">
              <Scene3D />
            </div>
          </Suspense>
        )}
        <ParticleField density={skip3D ? 1 : 0.5} />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto max-w-4xl text-center">
        <motion.div {...enter(0.3)} className="mb-7 inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-4 py-1.5 font-mono text-[11px] tracking-wide text-mute hairline backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse-soft" />
          building Forge &amp; Ember · open for freelance work
        </motion.div>

        <motion.h1
          {...enter(0.45)}
          whileHover={reduced ? {} : { scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="font-display text-5xl font-medium leading-[1.02] tracking-tight text-glow sm:text-7xl md:text-8xl"
        >
          Noah Khetani
        </motion.h1>

        <motion.p {...enter(0.6)} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-mute md:text-2xl">
          Building the tools I wish{" "}
          <span className="text-ink">already existed.</span>
        </motion.p>

        <motion.p {...enter(0.72)} className="mt-4 font-display text-base font-medium tracking-tight text-dim md:text-xl">
          <RotatingText words={site.roles} />
        </motion.p>

        <motion.div {...enter(0.85)} className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button variant="ember" onClick={onExplore}>
            Explore Projects <ArrowDown size={15} />
          </Button>
          <Button variant="ghost" href={site.github}>
            <Github size={15} /> View GitHub
          </Button>
          <Button variant="ghost" href={`mailto:${site.email}`}>
            Contact <ArrowUpRight size={15} />
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="font-mono text-[10px] tracking-[0.3em] text-dim"
        >
          SCROLL
        </motion.span>
        <motion.span
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-ember/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
