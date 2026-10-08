"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Info } from "lucide-react";
import { gsap, useGSAP, motionQueries } from "@/lib/gsap";
import type { Project } from "@/content/projects";
import { Stamp } from "../Stamp";
import { BinderClip } from "../BinderClip";
import { Colorways } from "./Colorways";
import { KoshFlat } from "../flats/KoshFlat";
import { CampusFlat } from "../flats/CampusFlat";
import { TenderFlat } from "../flats/TenderFlat";
import { AttendxFlat } from "../flats/AttendxFlat";

const flats = { kosh: KoshFlat, campus: CampusFlat, tender: TenderFlat, attendx: AttendxFlat };

type Props = { project: Project; index: number; total: number };

export function SpecSheet({ project, index, total }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [colorway, setColorway] = useState(project.colorways[0]?.id ?? "");
  // Alternate colorways load only once someone shows interest, not on every visit.
  const [primed, setPrimed] = useState(false);
  const prime = () => setPrimed(true);
  const Flat = flats[project.flat];
  const live = project.status === "live";
  const hasPhoto = project.colorways.length > 0;
  const flipped = index % 2 === 1;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionQueries.motion, () => {
        const q = gsap.utils.selector(rootRef);

        gsap
          .timeline({ scrollTrigger: { trigger: q(".js-flat")[0], start: "top 72%", once: true } })
          .from(q(".js-flat .flat-line"), {
            drawSVG: "0%",
            duration: 1.15,
            ease: "power2.inOut",
            stagger: { each: 0.012 },
          })
          .from(q(".js-flat .flat-fill, .js-flat .flat-seam"), { opacity: 0, duration: 0.7, stagger: 0.004 }, "-=0.7")
          .from(
            q(".js-flat .flat-callout"),
            { opacity: 0, scale: 0.2, transformOrigin: "50% 50%", duration: 0.45, stagger: 0.08, ease: "back.out(2)" },
            "-=0.35",
          )
          .from(q(".js-legend li"), { opacity: 0, x: -8, duration: 0.5, stagger: 0.05, ease: "expo.out" }, "<");

        const board = q(".js-board")[0];
        if (board) {
          const tl = gsap.timeline({ scrollTrigger: { trigger: board, start: "top 74%", once: true } });
          const print = q(".js-print");
          if (print.length) {
            tl.fromTo(
              print,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 1,
                ease: "power3.inOut",
                onComplete: () => gsap.set(print, { clipPath: "none" }),
              },
            );
          }
          tl.fromTo(
            q(".js-sheet-stamp"),
            { opacity: 0, scale: 1.85, rotation: -26 },
            { opacity: 1, scale: 0.96, rotation: -8, duration: 0.22, ease: "power3.in" },
            print.length ? "-=0.2" : 0.2,
          )
            .to(q(".js-sheet-stamp"), { scale: 1, duration: 0.3, ease: "power2.out" })
            .to(board, { y: 2, duration: 0.05, yoyo: true, repeat: 1, ease: "none" }, "<");
        }
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  const flatPanel = (
    <figure className={`js-flat lg:col-span-5 ${flipped && hasPhoto ? "lg:order-2" : ""}`}>
      <div className="relative border border-rule bg-paper px-3 pb-3 pt-8 sm:px-5 sm:pb-5">
        <span className="field-label absolute left-3 top-2.5 sm:left-5">Technical flat</span>
        <span className="field-label absolute right-3 top-2.5 sm:right-5">Not to scale</span>
        <Flat active={active} />
      </div>
      <figcaption className="mt-4">
        <ol className="js-legend grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-1">
          {project.callouts.map((text, i) => {
            const n = i + 1;
            return (
              <li
                key={n}
                onMouseEnter={() => setActive(n)}
                onMouseLeave={() => setActive(null)}
                className="flex cursor-default items-start gap-2.5 text-[0.9375rem] leading-snug"
              >
                <span
                  aria-hidden
                  className={`mt-px grid size-[1.375rem] shrink-0 place-items-center rounded-full border border-ink text-[0.6875rem] font-bold tabular-nums transition-colors duration-150 [font-stretch:80%] ${
                    active === n ? "bg-navy text-thread" : "bg-paper text-ink"
                  }`}
                >
                  {n}
                </span>
                <span className="sr-only">Callout {n}: </span>
                <span>{text}</span>
              </li>
            );
          })}
        </ol>
      </figcaption>
    </figure>
  );

  const current = project.colorways.find((c) => c.id === colorway) ?? project.colorways[0];

  const photoPanel = hasPhoto ? (
    <div className={`lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
      <figure onPointerEnter={prime} onFocusCapture={prime} onTouchStart={prime}>
        <div className="js-board relative">
          <BinderClip className="absolute -top-[30px] left-1/2 z-20 w-[92px] -translate-x-1/2 sm:w-[104px]" />
          <div className="js-print relative aspect-[16/10] overflow-hidden border border-rule bg-paper-2">
            {project.colorways.filter((c) => primed || c.id === current.id).map((c) => (
              <Image
                key={c.id}
                src={c.image}
                alt={c.alt}
                fill
                sizes="(min-width: 1360px) 760px, (min-width: 1024px) 56vw, 100vw"
                placeholder="blur"
                className={`img-outline transition-opacity duration-300 ease-out ${
                  c.fit === "device"
                    ? "object-contain py-4 drop-shadow-[0_10px_18px_rgb(20_26_46/0.3)]"
                    : "object-cover object-top"
                } ${c.id === current.id ? "opacity-100" : "opacity-0"}`}
                aria-hidden={c.id !== current.id}
              />
            ))}
          </div>
          <div
            className="js-sheet-stamp pointer-events-none absolute -bottom-7 -right-2 z-10 w-[150px] sm:-bottom-9 sm:-right-4 sm:w-[190px]"
            style={{ transform: "rotate(-8deg)" }}
          >
            <Stamp top="FIT APPROVED" main="LIVE" bottom={project.season.toUpperCase()} className="block h-auto w-full" />
          </div>
        </div>
        <figcaption className="mt-5 flex flex-col gap-3 pr-24 sm:pr-40">
          <p className="text-[0.8125rem] text-ink-3">
            Fit photo: {current.source === "live" ? "screenshot of the live site" : "screenshot from the project's repository"}.
          </p>
          {project.colorways.length > 1 ? (
            <Colorways projectName={project.id} colorways={project.colorways} value={colorway} onChange={setColorway} />
          ) : null}
        </figcaption>
      </figure>
    </div>
  ) : (
    <div className="lg:col-span-7">
      <div className="js-board relative border border-dashed border-ink/35 bg-paper-2/60 p-6 sm:p-8 lg:mt-10">
        <p className="field-label">Fit photo</p>
        <p className="mt-3 max-w-[40ch] pr-28 text-[1.0625rem] leading-relaxed text-ink-2 sm:pr-36">
          Not deployed yet, so there is no live fit to photograph. The drawing shows the screens as built, and the
          full source is open on GitHub.
        </p>
        <a
          href={project.sourceUrl}
          className="link-ink mt-6 inline-flex items-center gap-1.5 text-[1rem] font-semibold"
          target="_blank"
          rel="noreferrer"
        >
          Read the AttendX source
          <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
          <span className="sr-only">(GitHub, opens in a new tab)</span>
        </a>
        <div
          className="js-sheet-stamp pointer-events-none absolute -top-7 right-2 w-[132px] sm:-right-4 sm:w-[176px]"
          style={{ transform: "rotate(-8deg)" }}
        >
          <Stamp top="PROTO" main="SAMPLE" bottom="SOURCE ONLY" tone="navy" className="block h-auto w-full" />
        </div>
      </div>
    </div>
  );

  return (
    <article
      ref={rootRef}
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="sheet paper scroll-mt-20 border border-rule"
    >
      <div className="grid grid-cols-2 border-b border-rule sm:grid-cols-4">
        <div className="border-r border-rule px-4 py-2 sm:px-5">
          <p className="field-label">Style no.</p>
          <p className="field-value">{project.styleNo}</p>
        </div>
        <div className="border-rule px-4 py-2 sm:border-r sm:px-5">
          <p className="field-label">Season</p>
          <p className="field-value">{project.season}</p>
        </div>
        <div className="hidden border-r border-rule px-5 py-2 sm:block">
          <p className="field-label">Status</p>
          <p className="field-value flex items-center gap-2">
            <span
              aria-hidden
              className={`size-2 rounded-full ${live ? "bg-stamp" : "border border-navy bg-transparent"}`}
            />
            {live ? "Live in production" : "Proto sample"}
          </p>
        </div>
        <div className="hidden px-5 py-2 sm:block">
          <p className="field-label">Style</p>
          <p className="field-value">
            {index + 1} of {total}
          </p>
        </div>
      </div>

      <div className="px-4 pb-10 pt-8 sm:px-8 sm:pb-12 lg:px-12 lg:pt-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h3
              id={`${project.id}-title`}
              className="text-[clamp(2.25rem,4.8vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.025em] [font-stretch:112%]"
            >
              {project.name}
            </h3>
            <p className="mt-3 text-[1.0625rem] font-semibold text-ink-2 [font-stretch:90%]">{project.kind}</p>
          </div>
          <div className="lg:col-span-6">
            <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed">{project.summary}</p>
            {project.context ? (
              <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-relaxed text-ink-2">{project.context}</p>
            ) : null}
            {project.note ? (
              <p className="mt-3 flex max-w-[60ch] items-start gap-2 text-[0.875rem] leading-snug text-ink-2">
                <Info aria-hidden className="mt-0.5 size-4 shrink-0" strokeWidth={1.75} />
                {project.note}
              </p>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[1rem] font-bold text-stamp underline decoration-stamp/40 underline-offset-[0.22em] transition-[text-decoration-color] duration-150 hover:decoration-stamp"
                >
                  Open the live site
                  <ArrowUpRight aria-hidden className="size-4" strokeWidth={2.25} />
                  <span className="sr-only">({project.liveLabel}, opens in a new tab)</span>
                </a>
              ) : null}
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="link-ink inline-flex items-center gap-1.5 text-[1rem] font-semibold"
              >
                Read the source
                <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
                <span className="sr-only">(GitHub, opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-x-10 gap-y-12 lg:mt-12 lg:grid-cols-12">
          {flatPanel}
          {photoPanel}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <table className="w-full border-collapse text-left">
              <caption className="field-label pb-2 text-left">Bill of materials</caption>
              <thead>
                <tr className="border-y border-ink/70">
                  <th scope="col" className="field-label w-[22%] py-2 pr-3 font-semibold">
                    Part
                  </th>
                  <th scope="col" className="field-label w-[38%] py-2 pr-3 font-semibold">
                    Material
                  </th>
                  <th scope="col" className="field-label py-2 font-semibold">
                    Used for
                  </th>
                </tr>
              </thead>
              <tbody>
                {project.bom.map((row) => (
                  <tr key={row.part} className="border-b border-rule align-top">
                    <th scope="row" className="py-2.5 pr-3 text-[0.875rem] font-semibold uppercase tracking-[0.06em] text-ink-2 [font-stretch:80%]">
                      {row.part}
                    </th>
                    <td className="py-2.5 pr-3 text-[0.9375rem] font-semibold">{row.material}</td>
                    <td className="py-2.5 text-[0.9375rem] text-ink-2">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:col-span-4">
            <CareLabel items={project.composition} />
          </div>
        </div>
      </div>
    </article>
  );
}

/** A satin composition label: the repo's language mix, the way fibre content is printed. */
export function CareLabel({ items, note = "By GitHub's count of the code in the repository." }: { items: { label: string; pct: string }[]; note?: string }) {
  return (
    <div className="relative mx-auto max-w-[300px] lg:mx-0">
      <div className="relative bg-satin px-6 pb-6 pt-7 text-[#3b3f4a] shadow-[0_1px_2px_rgb(20_26_46/0.16),0_10px_22px_-12px_rgb(20_26_46/0.35)]">
        <span aria-hidden className="absolute inset-x-0 top-0 h-3 bg-[#ecece6] shadow-[inset_0_-1px_0_rgb(0_0_0/0.08)]" />
        <p className="text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em] [font-stretch:75%]">Composition</p>
        <ul className="mt-3 space-y-1 text-center">
          {items.map((item) => (
            <li key={item.label} className="text-[0.9375rem] font-semibold uppercase tracking-[0.06em] [font-stretch:85%]">
              <span className="tabular-nums">{item.pct}</span> {item.label}
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-[#3b3f4a]/20 pt-3 text-center text-[0.75rem] leading-snug">{note}</p>
      </div>
    </div>
  );
}
