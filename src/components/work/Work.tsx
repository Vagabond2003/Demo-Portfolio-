import { projects } from "@/content/projects";
import { SpecSheet } from "./SpecSheet";

export function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto max-w-[1360px] scroll-mt-16 px-3 pt-28 sm:px-6 sm:pt-36 lg:px-10"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2
          id="work-title"
          className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.025em] [font-stretch:108%] lg:col-span-7"
        >
          Four products, specified and shipped.
        </h2>
        <p className="max-w-[48ch] text-[1.0625rem] leading-relaxed text-ink-2 lg:col-span-5">
          Each sheet is a real project: what it does, what it is made of and where you can see it running. Point at a
          numbered note to find it on the drawing.
        </p>
      </div>
      <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-24">
        {projects.map((project, i) => (
          <SpecSheet key={project.id} project={project} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
