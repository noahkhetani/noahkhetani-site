import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = ["EDITORS", "GAMES", "AGENTS", "SYSTEMS", "TOOLS"];

/** Cinematic boot sequence — shown once per session, skipped for reduced motion. */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (step < words.length) {
      const t = setTimeout(() => setStep(step + 1), 180);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLeaving(true), 600);
    const t2 = setTimeout(onDone, 1350);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [step, onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      animate={leaving ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="wait">
          {step < words.length ? (
            <motion.span
              key={words[step]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.12 }}
              className="font-mono text-xs tracking-[0.5em] text-dim"
            >
              {words[step]}
            </motion.span>
          ) : (
            <motion.div
              key="name"
              initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-center"
            >
              <span className="font-display text-3xl font-medium tracking-tight text-glow">
                Noah Khetani
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-transparent via-ember to-transparent"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute -bottom-16 font-mono text-[10px] text-dim">
          {Math.min(100, Math.round(((step + (step >= words.length ? 1 : 0)) / (words.length + 1)) * 100))}%
        </div>
      </div>
    </motion.div>
  );
}
