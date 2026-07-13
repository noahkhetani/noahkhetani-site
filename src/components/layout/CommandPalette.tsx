import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FolderGit2, Github, Mail, Navigation, Search, TerminalSquare } from "lucide-react";
import { nav, site } from "../../data/site";
import { projects } from "../../data/projects";

interface Cmd {
  id: string;
  label: string;
  group: string;
  icon: React.ReactNode;
  run: () => void;
}

export function CommandPalette({
  open,
  onClose,
  onTerminal,
}: {
  open: boolean;
  onClose: () => void;
  onTerminal: () => void;
}) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const commands = useMemo<Cmd[]>(() => {
    const go = (id: string) => () => {
      onClose();
      navigate("/", { state: { scrollTo: id } });
    };
    return [
      ...nav.map((n) => ({
        id: `nav-${n.id}`,
        label: `Go to ${n.label}`,
        group: "Navigate",
        icon: <Navigation size={14} />,
        run: go(n.id),
      })),
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        label: p.name,
        group: "Projects",
        icon: <FolderGit2 size={14} />,
        run: () => {
          onClose();
          navigate(`/projects/${p.slug}`);
        },
      })),
      {
        id: "gh",
        label: "Open GitHub profile",
        group: "Links",
        icon: <Github size={14} />,
        run: () => {
          onClose();
          window.open(site.github, "_blank");
        },
      },
      {
        id: "mail",
        label: "Send an email",
        group: "Links",
        icon: <Mail size={14} />,
        run: () => {
          onClose();
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "term",
        label: "Enter terminal mode",
        group: "System",
        icon: <TerminalSquare size={14} />,
        run: () => {
          onClose();
          onTerminal();
        },
      },
    ];
  }, [navigate, onClose, onTerminal]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => setIndex(0), [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") filtered[index]?.run();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, filtered, index, onClose]);

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[16vh] backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: -12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: -12, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-[#111116]/95 shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl hairline"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <Search size={15} className="text-dim" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-dim"
              />
              <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] text-dim">esc</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center font-mono text-xs text-dim">no results. try "forge"</p>
              )}
              {filtered.map((cmd, i) => {
                const showGroup = cmd.group !== lastGroup;
                lastGroup = cmd.group;
                return (
                  <div key={cmd.id}>
                    {showGroup && (
                      <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                        {cmd.group}
                      </p>
                    )}
                    <button
                      onClick={cmd.run}
                      onMouseEnter={() => setIndex(i)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        i === index ? "bg-ember/[0.12] text-ink" : "text-mute"
                      }`}
                    >
                      <span className={i === index ? "text-ember" : "text-dim"}>{cmd.icon}</span>
                      <span className="flex-1">{cmd.label}</span>
                      {i === index && <ArrowRight size={13} className="text-ember" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
