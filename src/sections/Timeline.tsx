import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { milestones } from "../data/timeline";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 65%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="relative mx-auto max-w-4xl px-6 py-28 md:py-40">
      <SectionHeading
        index="05"
        eyebrow="Trajectory"
        title="From first program to first product"
      />
      <div ref={root} className="relative pl-8 md:pl-12">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-white/[0.08] md:left-[11px]" />
        <div
          ref={line}
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gradient-to-b from-ember via-ember/70 to-ember/20 shadow-[0_0_12px_rgba(108,123,255,0.5)] md:left-[11px]"
        />
        <div className="space-y-14">
          {milestones.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.03}>
              <div className="relative">
                <span
                  className={`absolute -left-8 top-1.5 h-[9px] w-[9px] rounded-full md:-left-12 ${
                    m.future
                      ? "border border-ember/50 bg-bg"
                      : "bg-ember shadow-[0_0_10px_rgba(108,123,255,0.7)]"
                  }`}
                  style={{ transform: "translateX(3.5px)" }}
                />
                <p className={`font-mono text-[11px] uppercase tracking-[0.25em] ${m.future ? "text-ember/60" : "text-dim"}`}>
                  {m.period} {m.future && "· ahead"}
                </p>
                <h3 className="mt-2 font-display text-xl font-medium tracking-tight md:text-2xl">{m.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute md:text-base">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
