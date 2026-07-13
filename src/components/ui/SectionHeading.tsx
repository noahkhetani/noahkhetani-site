import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-ember">
          <span className="text-dim">{index}</span>
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: 32 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="h-px origin-left bg-ember/40"
          />
          {eyebrow}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-4xl font-medium tracking-tight text-glow md:text-6xl">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
