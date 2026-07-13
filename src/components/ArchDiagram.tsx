import { useState } from "react";
import { motion } from "framer-motion";
import type { ArchLayer } from "../data/projects";

/**
 * Interactive vertical architecture diagram. Nodes light up on hover and the
 * connections carry an animated pulse travelling down the stack.
 */
export function ArchDiagram({ layers }: { layers: ArchLayer[] }) {
  const [active, setActive] = useState(0);
  const nodeH = 56;
  const gap = 40;
  const width = 340;
  const totalH = layers.length * nodeH + (layers.length - 1) * gap;

  return (
    <div className="grid items-center gap-10 md:grid-cols-2">
      <svg
        viewBox={`0 0 ${width} ${totalH + 8}`}
        className="mx-auto w-full max-w-sm"
        role="img"
        aria-label="Architecture diagram"
      >
        <defs>
          <linearGradient id="pulse" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6c7bff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#6c7bff" stopOpacity="1" />
            <stop offset="1" stopColor="#6c7bff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {layers.map((layer, i) => {
          const y = 4 + i * (nodeH + gap);
          const isActive = i === active;
          return (
            <g key={layer.name}>
              {i < layers.length - 1 && (
                <>
                  <line x1={width / 2} y1={y + nodeH} x2={width / 2} y2={y + nodeH + gap} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <motion.circle
                    r="2.5"
                    fill="#6c7bff"
                    initial={{ cy: y + nodeH, opacity: 0 }}
                    animate={{ cy: y + nodeH + gap, opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.35, ease: "linear" }}
                    cx={width / 2}
                  />
                </>
              )}
              <motion.g
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                style={{ cursor: "pointer" }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <rect
                  x={width / 2 - 120}
                  y={y}
                  width={240}
                  height={nodeH}
                  rx={12}
                  fill={isActive ? "rgba(108,123,255,0.1)" : "rgba(255,255,255,0.03)"}
                  stroke={isActive ? "rgba(108,123,255,0.55)" : "rgba(255,255,255,0.1)"}
                  strokeWidth="1"
                  style={{ transition: "all 0.3s ease" }}
                />
                {isActive && (
                  <rect x={width / 2 - 120} y={y} width={240} height={nodeH} rx={12} fill="none" stroke="url(#pulse)" strokeWidth="1.5" opacity="0.6" />
                )}
                <text
                  x={width / 2}
                  y={y + nodeH / 2 + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isActive ? "#aeb6ff" : "rgba(255,255,255,0.75)"}
                  fontSize="14"
                  fontFamily="Space Grotesk Variable, sans-serif"
                  fontWeight="500"
                  style={{ transition: "fill 0.3s ease" }}
                >
                  {layer.name}
                </text>
              </motion.g>
            </g>
          );
        })}
      </svg>

      <div className="space-y-2" role="list">
        {layers.map((layer, i) => (
          <button
            key={layer.name}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            className={`block w-full rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
              i === active
                ? "border-ember/40 bg-ember/[0.06] shadow-[0_0_30px_rgba(108,123,255,0.07)]"
                : "border-transparent bg-white/[0.02] hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-mono text-xs ${i === active ? "text-ember" : "text-dim"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={`font-display text-sm font-medium ${i === active ? "text-ink" : "text-mute"}`}>
                {layer.name}
              </span>
            </div>
            {i === active && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 pl-9 text-sm leading-relaxed text-mute"
              >
                {layer.detail}
              </motion.p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
