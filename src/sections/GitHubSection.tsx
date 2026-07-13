import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TiltCard } from "../components/ui/TiltCard";
import { ContributionGraph } from "../components/ContributionGraph";
import { featuredProjects } from "../data/projects";
import { site } from "../data/site";

const u = site.githubUser;

export function GitHubSection() {
  return (
    <section id="github" className="relative border-y border-line bg-surface/40 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="06"
          eyebrow="Open Source"
          title="The work, in public"
          lede="Commits, streaks, and the repositories where these projects live. 22 repos and counting."
        />

        <Reveal>
          <div className="spot mb-6 overflow-hidden rounded-2xl bg-bg/60 p-6 hairline">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-dim">Contribution graph</p>
            <ContributionGraph username={u} />
          </div>
        </Reveal>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="spot h-full overflow-hidden rounded-2xl bg-bg/60 p-6 hairline">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-dim">Statistics</p>
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&hide_border=true&bg_color=00000000&text_color=92929c&title_color=6c7bff&icon_color=6c7bff&ring_color=6c7bff`}
                alt="GitHub statistics"
                loading="lazy"
                className="w-full"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="spot h-full overflow-hidden rounded-2xl bg-bg/60 p-6 hairline">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-dim">Languages</p>
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&hide_border=true&bg_color=00000000&text_color=92929c&title_color=6c7bff`}
                alt="Most used languages"
                loading="lazy"
                className="w-full"
              />
            </div>
          </Reveal>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <TiltCard max={4} className="h-full rounded-xl bg-bg/60 p-5 hairline">
                <a href={p.github} target="_blank" rel="noreferrer" className="block">
                  <div className="mb-3 flex items-center justify-between">
                    <Github size={15} className="text-dim" />
                    <ArrowUpRight size={13} className="text-dim" />
                  </div>
                  <p className="break-all font-mono text-sm text-ink">{p.github?.split("/").pop()}</p>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-mute">{p.tagline}</p>
                  <p className="mt-3 font-mono text-[10px] text-ember/70">{p.stack[0]}</p>
                </a>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="flex justify-center">
            <Button variant="ghost" href={site.github}>
              <Github size={15} /> Full profile on GitHub
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
