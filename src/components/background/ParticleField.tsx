import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks";

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: boolean; // ember-tinted or neutral
}

/**
 * Ambient particle field: drifting points, proximity connections, and gentle
 * mouse repulsion. Canvas 2D, DPR-aware, paused when hidden or off-screen.
 */
export function ParticleField({ density = 1 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0, dpr = 1;
    let particles: P[] = [];
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(110, Math.floor((w * h) / 16000) * density);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.4,
        hue: Math.random() < 0.18,
      }));
    };

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const linkDist = 110;

      for (const p of particles) {
        // mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 22500) {
          const d = Math.sqrt(d2) || 1;
          const f = ((150 - d) / 150) * 0.35;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx + 0.05;
        p.y += p.vy - 0.02;
        if (p.x > w + 10) p.x = -10;
        if (p.x < -10) p.x = w + 10;
        if (p.y > h + 10) p.y = -10;
        if (p.y < -10) p.y = h + 10;
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist * linkDist) {
            const alpha = (1 - Math.sqrt(d2) / linkDist) * 0.1;
            ctx.strokeStyle = a.hue || b.hue ? `rgba(128,140,255,${alpha * 1.4})` : `rgba(255,255,255,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = p.hue ? "rgba(128,140,255,0.55)" : "rgba(255,255,255,0.35)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onVis = () => {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    };

    resize();
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reduced, density]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
