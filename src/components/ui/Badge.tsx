import type { ProjectStatus, VisualKind } from "../../data/projects";

const statusColor: Record<ProjectStatus, string> = {
  "In Development": "text-ember border-ember/30 bg-ember/10",
  Active: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  Experimental: "text-sky-400 border-sky-400/30 bg-sky-400/10",
  Prototype: "text-violet-400 border-violet-400/30 bg-violet-400/10",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide transition-opacity duration-200 ${statusColor[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse-soft" />
      {status}
    </span>
  );
}

export function Chip({ children }: { children: string }) {
  return (
    <span className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[11px] text-mute transition-colors duration-200 hover:bg-ember/10 hover:text-ember-soft hairline">
      {children}
    </span>
  );
}

const visualLabels: Record<VisualKind, string> = {
  ide: "Desktop App",
  os: "Systems",
  terminal: "CLI Tool",
  browser: "Web App",
  modeler: "3D Tool",
  agents: "AI/Simulation",
  game: "Game",
  lang: "Language",
};

export function ProjectMeta({ visual, github }: { visual: VisualKind; github?: string }) {
  return (
    <span className="font-mono text-[10px] tracking-wide text-dim/60">
      {visualLabels[visual]}
      {github && " · Open Source"}
    </span>
  );
}
