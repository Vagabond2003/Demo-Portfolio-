"use client";

import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { contact, sheets } from "@/content/site";
import { orderMailto } from "@/lib/mailto";

const navItems = sheets.filter((s) => s.id !== "cover");

export function SiteHeader() {
  const [active, setActive] = useState(0);
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const triggers = sheets.map((sheet, index) => {
        const el = document.getElementById(sheet.id);
        if (!el) return null;
        return ScrollTrigger.create({
          trigger: el,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActive(index);
          },
        });
      });
      return () => triggers.forEach((t) => t?.kill());
    },
    { scope: headerRef },
  );

  const current = sheets[active];

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-paper/[0.97] shadow-[0_1px_0_rgb(255_255_255/0.7)]"
    >
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to the work
      </a>
      <div className="mx-auto flex h-14 max-w-[1360px] items-center gap-4 px-3 sm:px-6 lg:px-10">
        <a href="#cover" className="hit-area group flex items-center gap-2.5" aria-label={`${contact.name}, back to top`}>
          <span
            aria-hidden
            className="woven woven-text grid h-[22px] place-items-center rounded-[2px] px-1.5 text-[0.625rem] font-extrabold tracking-[0.14em] [font-stretch:110%]"
          >
            {contact.monogram}
          </span>
          <span className="hidden text-[0.9375rem] font-bold tracking-[-0.01em] [font-stretch:90%] lg:inline">
            {contact.name}
          </span>
          <span className="text-[0.9375rem] font-bold [font-stretch:90%] lg:hidden">N. M. Rimon</span>
        </a>

        <nav aria-label="Sections" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = current.id === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block px-2.5 py-2 text-[0.8125rem] lg:px-3 font-semibold uppercase tracking-[0.08em] [font-stretch:80%] transition-colors duration-150 ${
                      isActive ? "text-ink" : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-2.5 bottom-1 h-px origin-left bg-ink lg:inset-x-3 transition-transform duration-300 ease-out-quint ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <p className="hidden items-baseline gap-2 border-l border-rule pl-4 lg:flex">
          <span className="field-label">Sheet</span>
          <span className="field-value w-[3.6rem]">
            {String(active + 1).padStart(2, "0")} / {String(sheets.length).padStart(2, "0")}
          </span>
          <span className="field-value hidden w-[3.8rem] text-ink-2 xl:inline">{current.label}</span>
        </p>

        <a
          href={orderMailto()}
          className="btn-order ml-auto px-3.5 py-2 text-[0.875rem] md:ml-0"
        >
          <span className="hidden sm:inline">Place an order</span>
          <span className="sm:hidden">Email</span>
          <ArrowUpRight aria-hidden className="size-4" strokeWidth={2} />
        </a>
      </div>
    </header>
  );
}
