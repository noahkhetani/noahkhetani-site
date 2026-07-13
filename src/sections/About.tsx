import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

const paragraphs = [
  {
    key: "why-code",
    text: "I'm a student developer. I started programming because I wanted to know how the things I used every day actually worked, and building my own versions turned out to be the only answer that stuck. My first projects were games, because games don't let you fake it. Either it runs and it's fun, or it doesn't and it isn't.",
  },
  {
    key: "why-scratch",
    text: "Somewhere along the way I noticed a pattern in what I enjoy: building the whole thing myself. A desktop environment in vanilla JavaScript. A 5v5 shooter in Three.js with no game engine. A civilization simulation where the behavior isn't scripted. Frameworks are fine, but I learn the most when there's nothing between me and the problem.",
  },
  {
    key: "why-tools",
    text: "Right now most of my time goes into developer tools, because they're the software I live inside. Ember is my small, fast, local-first editor. Forge is the ambitious one: an AI-first IDE built to compete with the environments I use today. Both come from the same place, which is using a tool every day and thinking I could make this better.",
  },
  {
    key: "hire",
    text: "I also take on freelance work building custom apps. If you have something you want built, get in touch.",
  },
];

const stats = [
  { value: "22", label: "public repositories" },
  { value: "2", label: "IDEs in development" },
  { value: "18", label: "weapons in Specter" },
  { value: "Open", label: "available for custom app work" },
];

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading
        index="02"
        eyebrow="About"
        title="Built to understand"
        lede="Not a resume. Just the short version of why I make software this way."
      />
      <div className="grid gap-16 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-7">
          {paragraphs.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.06}>
              <p className="text-base leading-[1.85] text-mute md:text-lg [&>span]:text-ink">
                {p.text}
              </p>
            </Reveal>
          ))}
        </div>
        <div className="space-y-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 + i * 0.07}>
              <div className="spot rounded-2xl bg-surface p-6 hairline">
                <p className="font-display text-3xl font-medium text-glow">{s.value}</p>
                <p className="mt-1 font-mono text-xs text-dim">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
