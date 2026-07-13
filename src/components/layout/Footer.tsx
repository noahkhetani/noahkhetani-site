import { Github, Mail } from "lucide-react";
import { site } from "../../data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
        <div className="h-full w-full animate-shimmer bg-[linear-gradient(90deg,transparent,rgba(108,123,255,0.5),transparent)] bg-[length:200%_100%]" />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-xs text-dim">
            © {new Date().getFullYear()} Noah Khetani · designed and built from scratch
          </p>
          <p className="font-mono text-[10px] text-dim/40">
            React 19 · TypeScript · Framer Motion · GSAP · Tailwind CSS
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-dim transition-colors duration-200 hover:text-ember">
            <Github size={16} />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email" className="text-dim transition-colors duration-200 hover:text-ember">
            <Mail size={16} />
          </a>
          <span className="font-mono text-[10px] text-dim/60">try ⌘K · or the Konami code</span>
        </div>
      </div>
    </footer>
  );
}
