import { Copy, Github, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TiltCard } from "../components/ui/TiltCard";
import { site } from "../data/site";

const channels = [
  {
    label: "GitHub",
    value: "@" + site.githubUser,
    href: site.github,
    icon: Github,
    hint: "where the code lives",
  },
  {
    label: "Discord",
    value: site.discord,
    copy: site.discord,
    icon: MessageCircle,
    hint: "fastest way to reach me",
  },
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
    hint: "for everything else",
  },
];

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading
        index="07"
        eyebrow="Contact"
        title="Let's build something"
        lede="I'm available for hire to build custom apps. Or just say hi, that works too."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {channels.map((c, i) => {
          const Icon = c.icon;
          const inner = (
            <>
              <div className="mb-5 inline-flex rounded-xl bg-ember/10 p-3 text-ember transition-colors duration-200 group-hover:bg-ember/20">
                <Icon size={18} />
              </div>
              <p className="font-display text-base font-medium">{c.label}</p>
              <p className="mt-1 break-all font-mono text-sm text-mute">
                {copied === c.label ? "copied ✓" : c.value}
              </p>
              <p className="mt-3 font-mono text-[11px] text-dim">{c.hint}</p>
            </>
          );
          return (
            <Reveal key={c.label} delay={i * 0.08}>
              <TiltCard className="group h-full rounded-2xl bg-surface hairline">
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block p-7">
                    {inner}
                  </a>
                ) : (
                  <button
                    className="relative block w-full p-7 text-left"
                    onClick={() => {
                      navigator.clipboard.writeText(c.copy!);
                      setCopied(c.label);
                      setTimeout(() => setCopied(null), 1500);
                    }}
                  >
                    {inner}
                    <Copy size={13} className="absolute right-6 top-7 text-dim transition-opacity duration-200 group-hover:opacity-100" />
                  </button>
                )}
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
