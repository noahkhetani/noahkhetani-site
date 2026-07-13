import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../components/ui/Reveal";

const tenets = [
  {
    title: "Build it yourself",
    text: "I learn the most when there's nothing between me and the problem. No engine, no framework doing the hard part for me.",
  },
  {
    title: "Complexity stays inside",
    text: "Hard problems belong in the implementation. The person using the software should only ever see the simple part.",
  },
  {
    title: "Fast, always",
    text: "Good software should be fast, understandable, useful, and well-designed. Slow tools waste everyone's time, including mine.",
  },
  {
    title: "Solve your own problems",
    text: "Every project I build starts with something that bugged me personally. If it annoys me every day, that's the next project.",
  },
];

const line1 = ["Building", "the", "tools", "I", "wish"];
const line2 = ["already", "existed."];

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const glow = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden py-32 md:py-48">
      <motion.div
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_400px_at_50%_50%,rgba(108,123,255,0.06),transparent)]"
      />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-ember">Philosophy</p>
        </Reveal>
        <motion.blockquote style={{ y }} className="font-display text-3xl font-medium leading-tight tracking-tight text-glow sm:text-5xl md:text-6xl">
          <span>“</span>
          {line1.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, delay: i * 0.085, ease: [0.21, 0.47, 0.32, 0.98] }}
              viewport={{ once: true }}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.4, delay: line1.length * 0.085, ease: [0.21, 0.47, 0.32, 0.98] }}
            viewport={{ once: true }}
            className="ember-text [animation:shimmer_5s_linear_infinite]"
          >
            {line2.join(" ")}”
          </motion.span>
        </motion.blockquote>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-mute md:text-lg">
            Most of my projects start with the same question: why doesn't this exist yet? Then I
            try to build it. That one sentence decides what I work on, how I build it, and when
            it's actually done.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-4 text-left sm:grid-cols-2">
          {tenets.map((t, i) => (
            <Reveal key={t.title} delay={0.1 + i * 0.07}>
              <div className="spot h-full rounded-2xl bg-surface/70 p-6 hairline">
                <h3 className="font-display text-base font-medium">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
