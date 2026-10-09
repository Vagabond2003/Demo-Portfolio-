"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP, motionQueries } from "@/lib/gsap";
import { contact } from "@/content/site";
import { orderMailto } from "@/lib/mailto";
import { WovenLabel } from "./WovenLabel";
import { Stamp } from "./Stamp";
import { HangTag, type HangTagHandle } from "./HangTag";
import { OrderTagFace } from "./OrderTag";

const specRows = [
  { label: "Lines", value: "Web apps & SaaS · Portals & tools · Marketing sites · Redesigns" },
  { label: "Samples", value: "4 products, 3 of them live" },
  { label: "Origin", value: <>Bangladesh · works in English and <span lang="bn">বাংলা</span></> },
];

export function Cover({ qr }: { qr: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HangTagHandle>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motionQueries.motion, () => {
        document.documentElement.classList.add("gsap-ready");
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.1 });
        tl.fromTo(
          ".js-weave",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.85,
            ease: "power3.inOut",
            // An inset of zero still clips the label's shadow, so drop the clip once woven.
            onComplete: () => gsap.set(".js-weave", { clipPath: "none" }),
          },
        )
          .fromTo(
            ".js-weave-text",
            { clipPath: "inset(0 0 100% 0)" },
            {
              clipPath: "inset(0 0 0% 0)",
              duration: 1.05,
              ease: "steps(16)",
              onComplete: () => gsap.set(".js-weave-text", { clipPath: "none" }),
            },
            "-=0.2",
          )
          .fromTo(
            ".js-line > span",
            { yPercent: 108, y: 0 },
            { yPercent: 0, duration: 1, stagger: 0.09 },
            "-=0.75",
          )
          .fromTo(".js-rise", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, "-=0.8")
          .fromTo(
            ".js-stamp",
            { opacity: 0, scale: 1.9, rotation: -26 },
            { opacity: 1, scale: 0.97, rotation: -9, duration: 0.24, ease: "power3.in" },
            "-=0.55",
          )
          .to(".js-stamp", { scale: 1, duration: 0.3, ease: "power2.out" })
          .to(".js-weave", { y: 2, duration: 0.05, yoyo: true, repeat: 1, ease: "none" }, "<")
          .fromTo(
            ".js-tag",
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.35,
              ease: "none",
              onStart: () => tagRef.current?.drop(38),
            },
            "-=0.5",
          );
      });
      mm.add(motionQueries.reduce, () => {
        document.documentElement.classList.add("gsap-ready");
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="cover" aria-label="Cover" className="relative pt-[68px] sm:pt-[80px]">
      <div className="mx-auto max-w-[1360px] px-3 sm:px-6 lg:px-10">
        <div className="sheet paper border border-rule">
          {/* Running header of the tech pack */}
          <div className="grid grid-cols-2 border-b border-rule text-ink sm:grid-cols-[1.1fr_1fr_1fr_0.7fr]">
            <div className="flex items-center gap-2 border-r border-rule px-4 py-2.5 sm:px-5">
              <span className="text-[0.9375rem] font-extrabold uppercase tracking-[0.04em] [font-stretch:78%]">Tech pack</span>
              <span className="field-label">NMR-26</span>
            </div>
            <div className="border-rule px-4 py-2 sm:border-r sm:px-5">
              <p className="field-label">Prepared for</p>
              <p className="field-value">Your business</p>
            </div>
            <div className="hidden border-r border-rule px-5 py-2 sm:block">
              <p className="field-label">Style</p>
              <p className="field-value">Full-stack developer</p>
            </div>
            <div className="hidden px-5 py-2 sm:block">
              <p className="field-label">Sheet</p>
              <p className="field-value">01 / 06</p>
            </div>
          </div>

          <div className="grid gap-y-10 px-4 pb-10 pt-7 sm:px-8 sm:pt-9 lg:grid-cols-12 lg:gap-x-10 lg:px-12 lg:pb-14 lg:pt-10">
            {/* Left: the label, the offer, the actions */}
            <div className="lg:col-span-8">
              <div className="relative">
                <WovenLabel
                  className="js-weave"
                  textClassName="js-weave-text"
                  footer={
                    <div className="flex flex-col gap-1 text-[0.75rem] font-semibold uppercase tracking-[0.16em] [font-stretch:80%] sm:flex-row sm:items-center sm:justify-between sm:text-[0.8125rem]">
                      <span>Full-stack developer</span>
                      <span>
                        Made in Bangladesh <span aria-hidden>·</span>{" "}
                        <span lang="bn" className="normal-case tracking-normal [font-stretch:100%]">
                          বাংলাদেশে তৈরি
                        </span>
                      </span>
                    </div>
                  }
                >
                  <h1 className="text-[clamp(2.55rem,6.9vw,5.2rem)] font-black uppercase leading-[0.9] tracking-[-0.005em] [font-stretch:125%]">
                    Nafiz Mahmud <br className="hidden sm:block" />
                    Rimon
                  </h1>
                </WovenLabel>
                <div
                  className="js-stamp pointer-events-none absolute -bottom-[60px] right-0 z-10 w-[134px] sm:-right-6 sm:-top-8 sm:bottom-auto sm:w-[196px] lg:-right-16 lg:-top-6 lg:w-[212px]"
                  style={{ transform: "rotate(-9deg)" }}
                >
                  <Stamp top="FOR PRODUCTION" main="APPROVED" bottom="3 LIVE · 1 SAMPLE" className="block h-auto w-full" />
                </div>
                <p className="sr-only">Approved for production: three live products and one sample.</p>
              </div>

              <p className="mt-12 text-[clamp(2.05rem,4.6vw,3.9rem)] font-bold leading-[1.02] tracking-[-0.028em] sm:mt-12">
                <span className="js-line block overflow-hidden pb-[0.06em]">
                  <span className="block">Built to spec.</span>
                </span>
                <span className="js-line block overflow-hidden pb-[0.06em]">
                  <span className="block">Shipped to production.</span>
                </span>
              </p>
              <p className="js-rise mt-4 max-w-[58ch] text-[1.0625rem] leading-relaxed text-ink-2 sm:text-[1.125rem]">
                I&apos;m Nafiz, a full-stack developer in Bangladesh. I build web apps, portals, internal tools and
                marketing sites, from the first brief to a live, working release.
              </p>
              <div className="js-rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
                <a href={orderMailto()} className="btn-order px-5 py-3 text-[1rem]">
                  Place an order
                  <ArrowUpRight aria-hidden className="size-[18px]" strokeWidth={2} />
                </a>
                <a href="#work" className="link-ink hit-area inline-flex items-center gap-1.5 text-[1rem] font-semibold">
                  See the four samples
                  <ArrowDown aria-hidden className="size-4" strokeWidth={2} />
                </a>
              </div>
            </div>

            {/* Right: the order tag pinned to the sheet, and the spec block */}
            <div className="flex flex-col items-center lg:col-span-4 lg:items-stretch">
              <div className="js-tag flex justify-center lg:-mt-12">
                <HangTag ref={tagRef} stringLength={64} width={236} label="Order tag">
                  <OrderTagFace qr={qr} />
                </HangTag>
              </div>

              <dl className="js-rise mt-10 w-full border-t border-ink/70 lg:mt-12">
                {specRows.map((row) => (
                  <div key={row.label} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-rule py-2.5">
                    <dt className="field-label pt-[3px]">{row.label}</dt>
                    <dd className="field-value">{row.value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-rule py-2.5">
                  <dt className="field-label pt-[3px]">Status</dt>
                  <dd className="field-value flex items-center gap-2">
                    <span aria-hidden className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-stamp opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex size-2 rounded-full bg-stamp" />
                    </span>
                    Taking orders by email
                  </dd>
                </div>
              </dl>
              <p className="js-rise mt-3 hidden w-full text-[0.8125rem] text-ink-3 lg:block">
                Contact: <a className="link-ink text-ink" href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
