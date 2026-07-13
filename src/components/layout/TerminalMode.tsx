import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../../data/projects";
import { site } from "../../data/site";

interface Row {
  kind: "in" | "out";
  text: string;
}

const banner = [
  "nksh v1.0 (noah khetani shell)",
  'type "help" for commands, "exit" to leave',
  "",
];

export function TerminalMode({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setRows(banner.map((text) => ({ kind: "out", text })));
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [rows]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const [name, ...args] = cmd.split(/\s+/);
    const out = (...lines: string[]) =>
      setRows((r) => [...r, { kind: "in", text: raw }, ...lines.map((text) => ({ kind: "out" as const, text }))]);

    switch (name) {
      case "":
        setRows((r) => [...r, { kind: "in", text: "" }]);
        break;
      case "help":
        out(
          "available commands:",
          "  whoami       about me",
          "  ls           list projects",
          "  open <name>  open a project page",
          "  contact      how to reach me",
          "  neofetch     system info",
          "  clear        clear the screen",
          "  exit         leave terminal mode",
        );
        break;
      case "whoami":
        out("noah khetani. student developer.", "building the tools i wish already existed.", "available for hire if you need an app built.");
        break;
      case "ls":
        out(...projects.map((p) => `  ${p.slug.padEnd(18)} ${p.status.toLowerCase()}`));
        break;
      case "open": {
        const p = projects.find((x) => x.slug.includes(args[0] ?? "") && args[0]);
        if (p) {
          out(`opening ${p.slug}…`);
          setTimeout(() => {
            onClose();
            navigate(`/projects/${p.slug}`);
          }, 400);
        } else out(`open: project not found. try "ls"`);
        break;
      }
      case "contact":
        out(`  github   ${site.github}`, `  discord  ${site.discord}`, `  email    ${site.email}`);
        break;
      case "neofetch":
        out(
          "        ▲        noah@khetani",
          "       ▲ ▲       ------------",
          "      ▲   ▲      os: browseros lite (runs in a tab)",
          "     ▲ ▲ ▲ ▲     editor: ember (building it myself)",
          "                 langs: ts, js, py, c, c++",
          "                 uptime: always building",
        );
        break;
      case "sudo":
        out("nice try. permission granted anyway, you seem trustworthy.");
        break;
      case "clear":
        setRows([]);
        break;
      case "exit":
        onClose();
        break;
      default:
        out(`nksh: command not found: ${name}. try "help"`);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            className="flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-[#0c0c10] shadow-[0_0_60px_rgba(108,123,255,0.08)] hairline"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.focus();
            }}
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-ember/60" />
              <span className="font-mono text-[11px] text-dim">nksh · terminal mode</span>
              <button onClick={onClose} className="ml-auto font-mono text-[11px] text-dim hover:text-ink">✕</button>
            </div>
            <div ref={scrollRef} className="flex-1 space-y-0.5 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
              {rows.map((row, i) =>
                row.kind === "in" ? (
                  <p key={i} className="text-white/80">
                    <span className="text-ember">❯</span> {row.text}
                  </p>
                ) : (
                  <p key={i} className="whitespace-pre text-mute">{row.text}</p>
                )
              )}
              <p className="flex items-center gap-2 text-white/80">
                <span className="text-ember">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      run(input);
                      setInput("");
                    }
                    if (e.key === "Escape") onClose();
                  }}
                  className="flex-1 bg-transparent caret-ember outline-none"
                  spellCheck={false}
                  autoComplete="off"
                />
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
