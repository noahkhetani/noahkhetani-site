import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function RotatingText({ words, interval = 3500 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="ember-text whitespace-nowrap [animation:shimmer_4s_linear_infinite]"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
