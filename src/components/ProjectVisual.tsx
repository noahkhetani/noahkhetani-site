import type { VisualKind } from "../data/projects";

/**
 * Stylized in-code "screenshot" for each project — a window mockup whose
 * skeleton UI varies by project kind. No image assets required; swap in real
 * screenshots later by replacing this component's usage.
 */
export function ProjectVisual({ kind, name }: { kind: VisualKind; name: string }) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0d0d11] hairline shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-ember/50" />
        <span className="ml-3 font-mono text-[10px] text-dim">{name.toLowerCase().replace(/\s/g, "-")}</span>
      </div>
      <div className="aspect-[16/9] p-4">{bodies[kind]}</div>
      {/* sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-ember/[0.04]" />
    </div>
  );
}

const Line = ({ w, c = "bg-white/10" }: { w: string; c?: string }) => (
  <div className={`h-1.5 rounded-full ${c}`} style={{ width: w }} />
);

const ide = (
  <div className="flex h-full gap-3">
    <div className="w-1/5 space-y-2 rounded-md bg-white/[0.03] p-2.5">
      <Line w="80%" /><Line w="60%" /><Line w="70%" c="bg-ember/30" /><Line w="50%" /><Line w="65%" /><Line w="45%" />
    </div>
    <div className="flex-1 space-y-2 rounded-md bg-white/[0.02] p-3">
      <Line w="45%" c="bg-ember/40" /><Line w="70%" /><Line w="62%" /><Line w="80%" c="bg-white/[0.07]" /><Line w="38%" /><Line w="55%" c="bg-ember/25" /><Line w="72%" /><Line w="30%" />
    </div>
    <div className="w-1/4 space-y-2 rounded-md bg-ember/[0.05] p-2.5 hairline">
      <Line w="55%" c="bg-ember/40" /><Line w="85%" /><Line w="75%" /><Line w="90%" /><Line w="40%" c="bg-ember/30" />
    </div>
  </div>
);

const os = (
  <div className="flex h-full flex-col justify-between font-mono text-[10px] leading-relaxed text-white/30">
    <div>
      <p className="text-ember/70">forgeos: kernel boot</p>
      <p>[ ok ] long mode enabled</p>
      <p>[ ok ] paging: 4-level, 512 GiB mapped</p>
      <p>[ ok ] heap initialized @ 0xffff8000_0000</p>
      <p>[ ok ] scheduler online: 4 tasks</p>
      <p className="text-white/50">&gt; init /bin/shell<span className="animate-pulse-soft text-ember">▊</span></p>
    </div>
    <div className="flex gap-2">
      {["mem", "sched", "irq", "vfs"].map((t) => (
        <span key={t} className="rounded bg-white/[0.05] px-2 py-0.5">{t}</span>
      ))}
    </div>
  </div>
);

const browser = (
  <div className="flex h-full flex-col gap-3">
    <div className="flex gap-2">
      <div className="h-5 flex-1 rounded-full bg-white/[0.05]" />
      <div className="h-5 w-5 rounded-full bg-ember/20" />
    </div>
    <div className="relative flex-1 rounded-md bg-white/[0.02] p-3">
      <div className="absolute left-6 top-4 h-2/3 w-2/5 rounded-md bg-white/[0.05] p-2 shadow-lg hairline">
        <Line w="50%" c="bg-ember/30" />
      </div>
      <div className="absolute right-8 top-10 h-1/2 w-2/5 rounded-md bg-white/[0.07] p-2 shadow-lg hairline">
        <Line w="60%" />
      </div>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/[0.06] px-3 py-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`h-2 w-2 rounded-sm ${i === 1 ? "bg-ember/50" : "bg-white/20"}`} />
        ))}
      </div>
    </div>
  </div>
);

const modeler = (
  <div className="relative h-full rounded-md bg-white/[0.02]">
    <svg viewBox="0 0 200 110" className="h-full w-full">
      <g stroke="rgba(255,255,255,0.06)">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={i * 25} y1="0" x2={i * 25} y2="110" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={i} x1="0" y1={i * 27.5} x2="200" y2={i * 27.5} />
        ))}
      </g>
      <g stroke="rgba(128,140,255,0.6)" strokeWidth="1" fill="rgba(128,140,255,0.06)">
        <path d="M80 35 L130 25 L150 55 L100 68 Z" />
        <path d="M80 35 L100 68 L95 92 L76 58 Z" fill="rgba(128,140,255,0.1)" />
        <path d="M100 68 L150 55 L143 80 L95 92 Z" fill="rgba(128,140,255,0.03)" />
      </g>
      <g fill="#6c7bff">
        {[[80, 35], [130, 25], [150, 55], [100, 68], [95, 92]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
        ))}
      </g>
    </svg>
    <div className="absolute left-2 top-2 space-y-1.5 rounded bg-white/[0.04] p-1.5">
      {[0, 1, 2].map((i) => <div key={i} className="h-3 w-3 rounded-sm bg-white/10" />)}
    </div>
  </div>
);

const agents = (
  <div className="relative h-full rounded-md bg-white/[0.02] p-3">
    <svg viewBox="0 0 200 100" className="h-full w-full">
      <g stroke="rgba(128,140,255,0.35)" strokeDasharray="3 3" fill="none">
        <path d="M45 30 C 80 30, 80 50, 105 50" />
        <path d="M45 75 C 80 75, 80 55, 105 55" />
        <path d="M135 52 L 165 52" />
      </g>
      {[
        { x: 15, y: 18, w: 30, label: true },
        { x: 15, y: 63, w: 30 },
        { x: 105, y: 40, w: 30, label: true },
        { x: 165, y: 40, w: 22 },
      ].map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width={n.w} height="24" rx="5" fill={n.label ? "rgba(128,140,255,0.1)" : "rgba(255,255,255,0.05)"} stroke={n.label ? "rgba(128,140,255,0.4)" : "rgba(255,255,255,0.1)"} />
          <rect x={n.x + 6} y={n.y + 10} width={n.w - 12} height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
        </g>
      ))}
    </svg>
    <div className="absolute bottom-2 right-2 rounded bg-ember/10 px-2 py-1 font-mono text-[9px] text-ember/70">
      trace: 47 steps
    </div>
  </div>
);

const game = (
  <div className="relative h-full overflow-hidden rounded-md bg-gradient-to-b from-[#101018] to-[#0b0b10]">
    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(transparent,rgba(108,123,255,0.06))]" />
    <svg viewBox="0 0 200 100" className="h-full w-full">
      <g stroke="rgba(255,255,255,0.05)">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1={100 + (i - 3) * 34} y1="100" x2={100 + (i - 3) * 12} y2="55" />
        ))}
        <line x1="0" y1="72" x2="200" y2="72" /><line x1="0" y1="85" x2="200" y2="85" />
      </g>
      <circle cx="70" cy="48" r="6" fill="rgba(128,140,255,0.7)" />
      <path d="M76 48 L120 40" stroke="rgba(128,140,255,0.5)" strokeWidth="1.5" />
      <circle cx="132" cy="38" r="5" fill="rgba(255,255,255,0.25)" />
      <g fill="rgba(255,255,255,0.15)" fontFamily="monospace" fontSize="7">
        <text x="8" y="12">ping 23ms</text>
        <text x="158" y="12">tick 128</text>
      </g>
    </svg>
  </div>
);

const lang = (
  <div className="h-full rounded-md bg-white/[0.02] p-3 font-mono text-[10px] leading-relaxed">
    <p><span className="text-ember/80">fn</span> <span className="text-white/60">resolve</span><span className="text-white/30">(graph: Graph) -&gt; Plan {"{"}</span></p>
    <p className="pl-4 text-white/40">let order = graph.<span className="text-ember-soft/70">topo_sort</span>()?;</p>
    <p className="pl-4 text-white/40">order.map(|n| n.lower())</p>
    <p className="text-white/30">{"}"}</p>
    <div className="mt-3 rounded bg-ember/[0.07] p-2 text-[9px] text-ember/70 hairline">
      <p>✓ type check: 0 errors</p>
      <p className="text-white/30">✓ lowered to IR in 4ms</p>
    </div>
  </div>
);

const bodies: Record<VisualKind, React.ReactNode> = {
  ide,
  os,
  terminal: os,
  browser,
  modeler,
  agents,
  game,
  lang,
};
