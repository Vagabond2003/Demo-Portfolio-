"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, motionQueries } from "@/lib/gsap";
import { stages } from "@/content/site";

/**
 * The critical path, drawn as a seam: a chalk line marks the plan and the
 * thread sews along it as you scroll, reaching each stage in order.
 */
export function Process() {
  const rootRef = useRef<HTMLElement>(null);
  const [reached, setReached] = useState(stages.length);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        { wide: "(min-width: 1024px)", narrow: "(max-width: 1023.98px)", motion: motionQueries.motion },
        (ctx) => {
          const { wide, motion } = ctx.conditions as { wide: boolean; narrow: boolean; motion: boolean };
          if (!motion) {
            setReached(stages.length);
            return;
          }
          const q = gsap.utils.selector(rootRef);
          const thread = q(wide ? ".js-thread-wide" : ".js-thread-narrow")[0];
          setReached(0);
          gsap.fromTo(
            thread,
            wide ? { scaleX: 0 } : { scaleY: 0 },
            {
              ...(wide ? { scaleX: 1 } : { scaleY: 1 }),
              ease: "none",
              scrollTrigger: {
                trigger: q(".js-stations")[0],
                start: wide ? "top 78%" : "top 70%",
                end: wide ? "bottom 52%" : "bottom 60%",
                scrub: 0.6,
                onUpdate: (self) => setReached(Math.min(stages.length, Math.floor(self.progress * stages.length + 0.35))),
              },
            },
          );
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="process"
      aria-labelledby="process-title"
      className="mx-auto max-w-[1360px] scroll-mt-16 px-3 pt-28 sm:px-6 sm:pt-36 lg:px-10"
    >
      <div className="sheet paper border border-rule">
        <div className="grid grid-cols-2 border-b border-rule sm:grid-cols-4">
          <div className="border-r border-rule px-4 py-2 sm:px-5">
            <p className="field-label">Plan</p>
            <p className="field-value">Critical path</p>
          </div>
          <div className="border-rule px-4 py-2 sm:border-r sm:px-5">
            <p className="field-label">Stages</p>
            <p className="field-value">{stages.length}, in order</p>
          </div>
          <div className="hidden border-r border-rule px-5 py-2 sm:block">
            <p className="field-label">Updates</p>
            <p className="field-value">By email, with live links</p>
          </div>
          <div className="hidden px-5 py-2 sm:block">
            <p className="field-label">Sheet</p>
            <p className="field-value">04 / 06</p>
          </div>
        </div>

        <div className="px-4 pb-12 pt-9 sm:px-8 lg:px-12 lg:pb-16 lg:pt-12">
          <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <h2
              id="process-title"
              className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.025em] [font-stretch:108%] lg:col-span-7"
            >
              From brief to launch.
            </h2>
            <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2 lg:col-span-5">
              Like a production order, every project moves through the same stages, and you can see where it stands
              at each one.
            </p>
          </div>

          <ol className="js-stations relative mt-12 grid gap-9 pl-10 lg:mt-16 lg:grid-cols-5 lg:gap-8 lg:pl-0 lg:pt-12">
            {/* Wide: chalk line and thread across the top of the stations */}
            <span aria-hidden className="absolute inset-x-0 top-[11px] hidden border-t-[1.5px] border-dashed border-ink/30 lg:block" />
            <span aria-hidden className="js-thread-wide absolute inset-x-0 top-[10px] hidden h-[3px] origin-left rounded-full bg-navy lg:block" />
            {/* Narrow: the same seam down the left edge */}
            <span aria-hidden className="absolute bottom-0 left-[11px] top-0 border-l-[1.5px] border-dashed border-ink/30 lg:hidden" />
            <span aria-hidden className="js-thread-narrow absolute bottom-0 left-[10px] top-0 w-[3px] origin-top rounded-full bg-navy lg:hidden" />

            {stages.map((stage, i) => {
              const done = i < reached;
              return (
                <li key={stage.id} className="relative">
                  <span
                    aria-hidden
                    className={`absolute -left-10 top-0 grid size-[24px] place-items-center rounded-[3px] border-2 transition-colors duration-300 lg:left-0 lg:-top-12 ${
                      done ? "border-ink bg-ink" : "border-ink/40 bg-paper"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full transition-colors duration-300 ${done ? "bg-paper" : "bg-ink/30"}`} />
                  </span>
                  <h3 className="text-[1.375rem] font-extrabold leading-tight tracking-[-0.01em] [font-stretch:95%]">{stage.name}</h3>
                  <p className="mt-2 max-w-[34ch] text-[0.9375rem] leading-relaxed text-ink-2">{stage.detail}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
