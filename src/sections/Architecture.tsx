import { ArchDiagram } from "../components/ArchDiagram";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { getProject } from "../data/projects";

export function Architecture() {
  const forge = getProject("forge-ide")!;
  return (
    <section id="architecture" className="relative border-y border-line bg-surface/40 py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          index="03"
          eyebrow="Under the Hood"
          title="How the systems fit together"
          lede="Forge's architecture, layer by layer. Hover a layer to inspect it. Every project page has its own diagram like this one."
        />
        <Reveal>
          <div className="rounded-3xl bg-bg/60 p-6 hairline md:p-12">
            <ArchDiagram layers={forge.architecture} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
