"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { contact, productLines } from "@/content/site";
import { orderMailto } from "@/lib/mailto";

const options = [...productLines.map((l) => ({ id: l.id, name: l.name })), { id: "unsure", name: "Not sure yet" }];

function HandlingMarks() {
  return (
    <div aria-hidden className="flex items-end gap-5 text-carton-ink/85">
      {/* This way up */}
      <svg viewBox="0 0 48 48" className="size-11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="square">
        <path d="M14 34V12M8 18l6-6 6 6M34 34V12M28 18l6-6 6 6M6 40h36" />
      </svg>
      {/* Keep dry */}
      <svg viewBox="0 0 48 48" className="size-11" fill="none" stroke="currentColor" strokeWidth="2.6">
        <path d="M6 22a18 12 0 0 1 36 0Z" strokeLinejoin="round" />
        <path d="M24 22v15a4 4 0 0 1-8 0" strokeLinecap="round" />
        <path d="M10 6v4M18 4v4M30 4v4M38 6v4" strokeLinecap="round" />
      </svg>
      {/* Fragile */}
      <svg viewBox="0 0 48 48" className="size-11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round">
        <path d="M14 6h20l-2 12a8 8 0 0 1-16 0Z" />
        <path d="M24 26v12M16 42h16" strokeLinecap="square" />
        <path d="M22 9l3 4-3 3" strokeWidth="1.8" />
      </svg>
    </div>
  );
}

export function Contact() {
  const [line, setLine] = useState("apps");
  const [copied, setCopied] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const chosen = options.find((o) => o.id === line)!;
  const href = orderMailto(chosen.id === "unsure" ? undefined : chosen.name);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const index = options.findIndex((o) => o.id === line);
    const step = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const next = (index + step + options.length) % options.length;
    setLine(options[next].id);
    refs.current[next]?.focus();
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="carton relative mt-28 scroll-mt-14 sm:mt-36">
      {/* Carton seam and tape across the top */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-carton-ink/25" />
      <span
        aria-hidden
        className="absolute left-1/2 top-0 h-full w-[min(26%,240px)] -translate-x-1/2 bg-[rgb(255_250_235/0.11)] shadow-[inset_1px_0_0_rgb(255_255_255/0.12),inset_-1px_0_0_rgb(0_0_0/0.06)]"
      />

      <div className="relative mx-auto max-w-[1360px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-carton-ink/80 pb-6">
          <div>
            <p className="font-stencil text-[1.125rem] font-extrabold uppercase tracking-[0.12em] text-carton-ink/85">
              Ship to
            </p>
            <p className="font-stencil text-[clamp(3.1rem,11vw,6rem)] font-black uppercase leading-[0.86] tracking-[0.01em] text-carton-ink/90">
              Your business
            </p>
          </div>
          <HandlingMarks />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2
              id="contact-title"
              className="text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold leading-[0.98] tracking-[-0.025em] [font-stretch:108%]"
            >
              Have something to build? Send the brief.
            </h2>
            <p className="mt-5 max-w-[56ch] text-[1.0625rem] leading-relaxed">
              Tell me what you need, who it is for and when you would like it live. Pick a line below and your email
              opens with the subject filled in and a short brief to complete.
            </p>

            <div className="mt-8">
              <p id="order-line" className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] [font-stretch:75%]">
                What are you ordering?
              </p>
              <div
                role="radiogroup"
                aria-labelledby="order-line"
                className="mt-3 flex flex-wrap gap-2"
                onKeyDown={onKeyDown}
              >
                {options.map((o, i) => {
                  const checked = o.id === line;
                  return (
                    <button
                      key={o.id}
                      ref={(el) => {
                        refs.current[i] = el;
                      }}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      tabIndex={checked ? 0 : -1}
                      onClick={() => setLine(o.id)}
                      className={`min-h-11 rounded-[3px] border-2 px-3.5 py-2 text-[0.9375rem] font-semibold transition-[background-color,color,border-color] duration-150 ${
                        checked
                          ? "border-carton-ink bg-carton-ink text-carton"
                          : "border-carton-ink/45 text-carton-ink hover:border-carton-ink"
                      }`}
                    >
                      {o.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href={href} className="btn-order px-6 py-3.5 text-[1.0625rem]">
                Email your brief
                <ArrowUpRight aria-hidden className="size-[18px]" strokeWidth={2} />
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex min-h-[3.25rem] items-center gap-2 rounded-[3px] border-2 border-carton-ink/70 px-4 py-3 text-[0.9375rem] font-semibold transition-[border-color,scale] duration-150 hover:border-carton-ink active:scale-[0.96]"
              >
                <span className="relative size-4">
                  <Copy
                    aria-hidden
                    className={`absolute inset-0 size-4 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                      copied ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0"
                    }`}
                    strokeWidth={2}
                  />
                  <Check
                    aria-hidden
                    className={`absolute inset-0 size-4 transition-[opacity,scale,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                      copied ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]"
                    }`}
                    strokeWidth={2.4}
                  />
                </span>
                {copied ? "Copied" : "Copy email address"}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Email address copied" : ""}
              </span>
            </div>
            <p className="mt-4 text-[0.9375rem]">
              Or write directly to{" "}
              <a href={`mailto:${contact.email}`} className="font-semibold underline decoration-carton-ink/45 underline-offset-[0.22em] hover:decoration-carton-ink">
                {contact.email}
              </a>
              .
            </p>
          </div>

          {/* Shipping label */}
          <div className="lg:col-span-5 lg:pt-3">
            <div className="mx-auto max-w-[420px] -rotate-[1.2deg] bg-satin p-1.5 text-ink shadow-[0_2px_3px_rgb(34_26_19/0.22),0_18px_32px_-16px_rgb(34_26_19/0.55)] lg:ml-auto lg:mr-0">
              <div className="border-2 border-ink">
                <div className="flex items-center justify-between border-b-2 border-ink px-4 py-2">
                  <span className="text-[0.8125rem] font-extrabold uppercase tracking-[0.14em] [font-stretch:80%]">
                    Shipping label
                  </span>
                  <span className="field-value">CTN 01 / 01</span>
                </div>
                <dl className="divide-y divide-ink/25">
                  {[
                    ["From", `${contact.name}, ${contact.origin}`],
                    ["To", "Your business, anywhere"],
                    ["Contents", "1 × web product, built to spec"],
                    ["Handling", "Reply by email"],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[6rem_1fr] gap-3 px-4 py-2.5">
                      <dt className="field-label pt-[3px]">{k}</dt>
                      <dd className="field-value">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex items-end justify-between gap-4 border-t-2 border-ink px-4 py-3">
                  <p className="font-stencil text-[1.75rem] font-black uppercase leading-none tracking-[0.02em]">
                    Made in Bangladesh
                  </p>
                  <p lang="bn" className="pb-0.5 text-[1rem] font-semibold">
                    বাংলাদেশে তৈরি
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
