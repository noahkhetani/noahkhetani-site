import type { ReactNode } from "react";
import { Magnetic } from "./Magnetic";

const styles = {
  primary:
    "bg-ink text-bg hover:bg-white shadow-[0_0_24px_rgba(255,255,255,0.08)] hover:shadow-[0_0_32px_rgba(255,255,255,0.16)]",
  ember:
    "bg-ember/90 text-[#0b0c22] hover:bg-ember shadow-[0_0_28px_rgba(108,123,255,0.25)] hover:shadow-[0_0_40px_rgba(108,123,255,0.4)]",
  ghost:
    "bg-white/[0.04] text-ink hairline hover:bg-white/[0.08] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
} as const;

export function Button({
  children,
  variant = "ghost",
  href,
  onClick,
  className = "",
}: {
  children: ReactNode;
  variant?: keyof typeof styles;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const cls = `inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium tracking-tight cursor-pointer select-none transition-all duration-200 ${styles[variant]} ${className}`;
  const inner = href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={cls} onClick={onClick as never}>
      {children}
    </a>
  ) : (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
  return <Magnetic>{inner}</Magnetic>;
}
