import { useEffect, useRef } from "react";

/** Konami reward: a brief storm of embers rising across the screen. */
export function EmberBurst({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const embers = Array.from({ length: 160 }, () => ({
      x: Math.random() * innerWidth,
      y: innerHeight + Math.random() * 200,
      vy: -(1.5 + Math.random() * 3.5),
      vx: (Math.random() - 0.5) * 0.8,
      r: 0.8 + Math.random() * 2.2,
      life: 1,
    }));

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 3200;
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const e of embers) {
        e.x += e.vx + Math.sin(e.y * 0.01) * 0.6;
        e.y += e.vy;
        e.life = Math.max(0, 1 - t);
        ctx.fillStyle = `rgba(${Math.floor(110 + Math.random() * 40)},${Math.floor(125 + Math.random() * 40)},255,${e.life * 0.8})`;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (t < 1) raf = requestAnimationFrame(tick);
      else onDone();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99]">
      <canvas ref={ref} className="h-full w-full" />
      <p className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.3em] text-ember">
        ⬆⬆⬇⬇⬅➡⬅➡BA · the forge burns brighter
      </p>
    </div>
  );
}
