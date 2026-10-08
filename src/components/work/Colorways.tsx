"use client";

import { useRef, type KeyboardEvent } from "react";
import type { Colorway } from "@/content/projects";

type Props = {
  projectName: string;
  colorways: Colorway[];
  value: string;
  onChange: (id: string) => void;
};

/** Swatch chips that switch the fit photo between real variants of the product. */
export function Colorways({ projectName, colorways, value, onChange }: Props) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
    event.preventDefault();
    const index = colorways.findIndex((c) => c.id === value);
    const step = event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 1;
    const next = (index + step + colorways.length) % colorways.length;
    onChange(colorways[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span className="field-label" id={`${projectName}-colorway`}>
        Colorway
      </span>
      <div
        role="radiogroup"
        aria-labelledby={`${projectName}-colorway`}
        className="flex flex-wrap gap-2"
        onKeyDown={onKeyDown}
      >
        {colorways.map((c, i) => {
          const checked = c.id === value;
          return (
            <button
              key={c.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={checked}
              tabIndex={checked ? 0 : -1}
              onClick={() => onChange(c.id)}
              className={`group relative flex min-h-10 items-center gap-2 rounded-[3px] border bg-paper py-1.5 pl-1.5 pr-3 text-[0.875rem] font-semibold transition-[border-color,box-shadow] duration-150 ${
                checked
                  ? "border-ink shadow-[inset_0_0_0_1px_var(--color-ink)]"
                  : "border-rule text-ink-2 hover:border-ink/45"
              }`}
            >
              <span
                aria-hidden
                className="size-6 rounded-[2px] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.14)]"
                style={{ background: c.swatch }}
              />
              <span lang={c.lang}>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
