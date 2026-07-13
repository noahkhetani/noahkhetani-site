
import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const isTouch = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    isTouch.current =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }, []);

  useEffect(() => {
    if (isTouch.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        setVisible(true);
      });
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (isTouch.current) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
      aria-hidden="true"
    >
      <div
        className="absolute h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-[left,top]"
        style={{
          left: position.x,
          top: position.y,
          background:
            "radial-gradient(circle at center, rgba(108,123,255,0.05) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
