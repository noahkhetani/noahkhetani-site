import { skillGroups } from "../data/skills";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TiltCard } from "../components/ui/TiltCard";

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading
        index="04"
        eyebrow="Capabilities"
        title="Full stack means the whole machine"
        lede="Everything I build with, grouped by where in the stack it lives."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 3) * 0.07}>
            <TiltCard max={4} className="h-full rounded-2xl bg-surface p-6 hairline">
              <h3 className="font-display text-lg font-medium tracking-tight">{group.title}</h3>
              <p className="mb-5 mt-1 font-mono text-[11px] text-dim">{group.note}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-xs text-mute transition-colors duration-200 hover:bg-ember/10 hover:text-ember-soft hairline"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
