import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check, Github, PlayCircle } from "lucide-react";
import { getProject, projects } from "../data/projects";
import { ArchDiagram } from "../components/ArchDiagram";
import { ProjectVisual } from "../components/ProjectVisual";
import { StatusBadge, Chip } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";

function Block({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-14 md:py-20">
      <Reveal>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ember">{label}</p>
        <h2 className="mb-8 font-display text-2xl font-medium tracking-tight md:text-4xl">{title}</h2>
      </Reveal>
      {children}
    </div>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = getProject(slug ?? "");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (project) document.title = `${project.name} · Noah Khetani`;
    return () => {
      document.title = "Noah Khetani · Building the tools I wish already existed";
    };
  }, [project]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="font-mono text-sm text-mute">404: project not found</p>
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft size={14} /> Back home
        </Button>
      </div>
    );
  }

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:pt-40"
    >
      {/* hero */}
      <Link to="/" className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-mute transition-colors hover:text-ink">
        <ArrowLeft size={13} /> all projects
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <StatusBadge status={project.status} />
        <span className="font-mono text-[11px] text-dim">case study {String(idx + 1).padStart(2, "0")}</span>
      </div>
      <h1 className="font-display text-4xl font-medium tracking-tight text-glow md:text-6xl">{project.name}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mute md:text-xl">{project.tagline}</p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {project.github && (
          <Button variant="ember" href={project.github}>
            <Github size={15} /> View on GitHub
          </Button>
        )}
        {project.demo && (
          <Button variant="ghost" href={project.demo}>
            Live demo <ArrowUpRight size={14} />
          </Button>
        )}
      </div>

      <Reveal className="mt-14">
        <div className="[transform:perspective(1200px)_rotateX(2deg)]">
          <ProjectVisual kind={project.visual} name={project.name} />
        </div>
      </Reveal>

      {/* overview */}
      <div className="mt-20">
        <Reveal>
          <p className="text-lg leading-[1.85] text-mute md:text-xl [&_strong]:text-ink">{project.overview}</p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="spot h-full rounded-2xl bg-surface p-7 hairline">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-dim">The Problem</p>
            <p className="text-sm leading-[1.8] text-mute md:text-base">{project.problem}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="spot h-full rounded-2xl bg-surface p-7 hairline">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ember">The Solution</p>
            <p className="text-sm leading-[1.8] text-mute md:text-base">{project.solution}</p>
          </div>
        </Reveal>
      </div>

      <div className="mt-20">
        <Block label="Architecture" title="The system, layer by layer">
          <Reveal>
            <div className="rounded-3xl bg-surface/60 p-4 hairline md:p-10">
              <ArchDiagram layers={project.architecture} />
            </div>
          </Reveal>
        </Block>

        <Block label="Engineering" title="Technical challenges">
          <div className="space-y-5">
            {project.challenges.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="spot rounded-2xl bg-surface p-7 hairline">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-sm text-ember">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="font-display text-lg font-medium">{c.title}</h3>
                      <p className="mt-2 text-sm leading-[1.8] text-mute">{c.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block label="Capabilities" title="Key features">
          <div className="grid gap-3 sm:grid-cols-2">
            {project.features.map((f, i) => (
              <Reveal key={f} delay={(i % 2) * 0.05}>
                <div className="flex items-start gap-3 rounded-xl bg-surface/70 px-5 py-4 hairline">
                  <Check size={15} className="mt-0.5 shrink-0 text-ember" />
                  <span className="text-sm text-mute">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block label="Timeline" title="How it was built">
          <div className="relative space-y-8 pl-7">
            <div className="absolute bottom-1 left-[5px] top-1 w-px bg-gradient-to-b from-ember/60 to-white/[0.06]" />
            {project.timeline.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.05}>
                <div className="relative">
                  <span className="absolute -left-7 top-1.5 h-[7px] w-[7px] rounded-full bg-ember shadow-[0_0_8px_rgba(108,123,255,0.6)]" style={{ transform: "translateX(2px)" }} />
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">{t.label}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-mute md:text-base">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block label="Showcase" title="Gallery & video">
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal>
              <ProjectVisual kind={project.visual} name={`${project.name} detail`} />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 rounded-xl bg-surface hairline">
                <PlayCircle size={32} className="text-ember/60" />
                <p className="font-mono text-xs text-dim">video showcase coming soon</p>
              </div>
            </Reveal>
          </div>
        </Block>

        <Block label="Ahead" title="Roadmap">
          <div className="grid gap-3 sm:grid-cols-2">
            {project.roadmap.map((r, i) => (
              <Reveal key={r} delay={(i % 2) * 0.05}>
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-line-bright bg-transparent px-5 py-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember/50" />
                  <span className="text-sm text-mute">{r}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>
      </div>

      {/* next project */}
      <Link
        to={`/projects/${next.slug}`}
        className="spot group mt-10 flex items-center justify-between rounded-2xl bg-surface p-8 hairline transition-shadow hover:shadow-[0_16px_60px_rgba(0,0,0,0.4)]"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">next project</p>
          <p className="mt-2 font-display text-2xl font-medium tracking-tight group-hover:text-ember-soft">
            {next.name}
          </p>
        </div>
        <ArrowUpRight size={22} className="text-dim transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ember" />
      </Link>
    </motion.article>
  );
}
