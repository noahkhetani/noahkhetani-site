import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Command, Menu, X } from "lucide-react";
import { nav } from "../../data/site";
import { useSectionSpy } from "../../lib/hooks";
import { scrollToId } from "../../lib/scroll";

const ids = nav.map((n) => n.id);

export function Nav({ onPalette, onLogoSecret }: { onPalette: () => void; onLogoSecret: () => void }) {
  const active = useSectionSpy(ids);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const clicks = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goTo = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
    } else {
      scrollToId(id);
    }
  };

  const logoClick = (e: React.MouseEvent) => {
    clicks.current += 1;
    clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => (clicks.current = 0), 1500);
    if (clicks.current >= 5) {
      clicks.current = 0;
      e.preventDefault();
      onLogoSecret();
    }
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`flex w-full max-w-3xl items-center justify-between gap-2 rounded-full px-2 py-2 transition-all duration-500 ${
          scrolled
            ? "bg-[#101014]/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl hairline"
            : "bg-transparent"
        }`}
      >
        <Link
          to="/"
          onClick={logoClick}
          className="group flex items-center gap-2.5 rounded-full px-3 py-1.5"
          aria-label="Home"
        >
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-ember/90 to-[#4338ca] font-display text-[13px] font-bold text-[#0b0c22] shadow-[0_0_16px_rgba(108,123,255,0.35)] transition-shadow duration-300 group-hover:shadow-[0_0_26px_rgba(108,123,255,0.6)]">
            N
          </span>
          <span className="hidden font-display text-sm font-medium tracking-tight sm:block">
            noah<span className="text-ember">.</span>khetani
          </span>
        </Link>

        <div className="hidden items-center md:flex">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`group relative rounded-full px-3.5 py-1.5 text-[13px] transition-colors duration-200 ${
                active === item.id && location.pathname === "/" ? "text-ink" : "text-mute hover:text-ink"
              }`}
            >
              {active === item.id && location.pathname === "/" && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.07]"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">
                {item.label}
                <span className="absolute -bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 scale-x-0 rounded-full bg-ember/50 transition-transform duration-150 ease-out group-hover:scale-x-100" />
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onPalette}
            className="flex items-center gap-1.5 rounded-full bg-white/[0.05] px-3 py-2 text-xs text-mute transition-colors duration-200 hover:bg-white/[0.1] hover:text-ink hairline"
            aria-label="Open command palette"
          >
            <Command size={12} />
            <span className="hidden font-mono sm:inline">K</span>
          </button>
          <button
            className="rounded-full bg-white/[0.05] p-2 text-mute transition-colors duration-200 hover:text-ink md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-16 w-[calc(100%-2rem)] max-w-3xl rounded-2xl bg-[#101014]/95 p-3 shadow-2xl backdrop-blur-xl hairline md:hidden"
          >
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className="block w-full rounded-lg px-4 py-3 text-left text-sm text-mute transition-colors duration-200 hover:bg-white/[0.05] hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
