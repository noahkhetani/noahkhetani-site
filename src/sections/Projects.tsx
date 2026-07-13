import { Link } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "../data/projects";
import { ProjectVisual } from "../components/ProjectVisual";
import { StatusBadge, Chip, ProjectMeta } from "../components/ui/Badge";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TiltCard } from "../components/ui/TiltCard";

export function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading
        index="01"
        eyebrow="Featured Work"
        title="Built from scratch, all of it"
        lede="Two IDEs, a 5v5 shooter with no game engine, a desktop that runs in a browser tab, a civilization sim, and more. Every one started with the same question: why doesn't this exist yet?"
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 0.08} className={p.featured && i < 2 ? "md:col-span-1" : ""}>
            <TiltCard className="group h-full rounded-2xl bg-surface p-6 hairline transition-shadow duration-500 hover:shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
              <Link to={`/projects/${p.slug}`} className="block" aria-label={`${p.name} case study`}>
                <div className="mb-5 transition-transform duration-500 group-hover:scale-[1.015]">
                  <ProjectVisual kind={p.visual} name={p.name} />
                </div>
              </Link>
              <div className="mb-1 flex items-center justify-between gap-3">
                <h3 className="font-display text-xl font-medium tracking-tight">{p.name}</h3>
                <StatusBadge status={p.status} />
              </div>
              <ProjectMeta visual={p.visual} github={p.github} />
              <p className="mb-4 mt-2 text-sm leading-relaxed text-mute">{p.tagline}</p>
              <div className="mb-6 flex flex-wrap gap-1.5">
                {p.stack.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <Link
                  to={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ember transition-colors duration-200 hover:text-ember-soft"
                >
                  Learn more
                  <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-mute transition-colors duration-200 hover:text-ink"
                  >
                    <Github size={14} /> GitHub
                  </a>
                )}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
