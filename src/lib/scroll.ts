import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Smooth-scroll to a section id, through Lenis when available. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -8, duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
}
