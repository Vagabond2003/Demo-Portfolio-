"use client";

import { useRef } from "react";
import { Check } from "lucide-react";
import { ScrollTrigger, useGSAP, gsap, motionQueries } from "@/lib/gsap";
import { productLines } from "@/content/site";
import { HangTag, type HangTagHandle } from "./HangTag";

const stringLengths = [44, 84, 30, 64];
const dropAngles = [-30, 26, -22, 32];

export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  const tagRefs = useRef<(HangTagHandle | null)[]>([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionQueries.motion, () => {
        const timers: number[] = [];
        const st = ScrollTrigger.create({
          trigger: ".js-rail",
          start: "top 78%",
          once: true,
          onEnter: () => {
            tagRefs.current.forEach((tag, i) => {
              timers.push(window.setTimeout(() => tag?.drop(dropAngles[i]), i * 110));
            });
          },
        });
        return () => {
          st.kill();
          timers.forEach((t) => window.clearTimeout(t));
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="services"
      aria-labelledby="services-title"
      className="mx-auto max-w-[1360px] px-3 pt-24 sm:px-6 sm:pt-32 lg:px-10"
    >
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h2
          id="services-title"
          className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.025em] [font-stretch:108%] lg:col-span-7"
        >
          Four product lines, made to order.
        </h2>
        <p className="max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink-2 lg:col-span-5">
          Pick the line closest to your project. Each one is something I have already built and shipped, and every
          line can go out in English and <span lang="bn">বাংলা</span>.
        </p>
      </div>

      <ul className="js-rail mt-12 grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {productLines.map((line, i) => (
          <li key={line.id} className="relative px-2 pb-10 pt-1 sm:px-3">
            {/* The rail the tags hang from; segments meet into one rod on wide screens. */}
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-[5px] rounded-full bg-[linear-gradient(#f2f3f0,#9aa1ab_55%,#5b616d)] shadow-[0_2px_3px_rgb(20_26_46/0.25)] sm:inset-x-0"
            />
            <div className="flex justify-center">
              <HangTag
                ref={(handle) => {
                  tagRefs.current[i] = handle;
                }}
                stringLength={stringLengths[i]}
                width="min(100%, 296px)"
                label={`${line.name} tag`}
              >
                <div className="px-5 pb-5 pt-12">
                  <h3 className="text-[1.5rem] font-extrabold leading-[1] tracking-[-0.01em] [font-stretch:85%]">
                    {line.name}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-snug">{line.summary}</p>
                  <ul className="mt-4 space-y-1.5 border-t border-dashed border-kraft-ink/40 pt-3 text-[0.875rem]">
                    {line.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check aria-hidden className="mt-[3px] size-3.5 shrink-0" strokeWidth={2.25} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] [font-stretch:75%]">
                    Built like
                  </p>
                  <p className="mt-0.5 text-[0.9375rem] font-semibold">
                    {line.proof.map((p, j) => (
                      <span key={p.href + p.label}>
                        {j > 0 ? <span aria-hidden> · </span> : null}
                        <a href={p.href} className="hit-area underline decoration-kraft-ink/45 underline-offset-[0.2em] hover:decoration-kraft-ink">
                          {p.label}
                        </a>
                      </span>
                    ))}
                  </p>
                </div>
              </HangTag>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
