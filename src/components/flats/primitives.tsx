import type { ReactNode } from "react";

/** Shared drawing kit for the technical flats: solid outlines draw on, seams and fills fade in. */

export type CalloutSpec = {
  n: number;
  /** Badge position. */
  x: number;
  y: number;
  /** Point on the drawing the leader line touches. */
  tx: number;
  ty: number;
};

export function Line({ d, className = "", width = 1.25 }: { d: string; className?: string; width?: number }) {
  return <path d={d} className={`flat-line ${className}`} fill="none" stroke="currentColor" strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" />;
}

export function Box({
  x,
  y,
  w,
  h,
  r = 0,
  width = 1.25,
  fill,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  width?: number;
  fill?: string;
}) {
  return (
    <>
      {fill ? <rect x={x} y={y} width={w} height={h} rx={r} className="flat-fill" fill={fill} stroke="none" /> : null}
      <rect x={x} y={y} width={w} height={h} rx={r} className="flat-line" fill="none" stroke="currentColor" strokeWidth={width} />
    </>
  );
}

/** A dashed topstitch seam inside a panel. */
export function Seam({ x, y, w, h, r = 0 }: { x: number; y: number; w: number; h: number; r?: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      className="flat-seam"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeDasharray="3 2.5"
      opacity="0.55"
    />
  );
}

/** A text line drawn as a bar, the way flats abstract copy. */
export function Bar({
  x,
  y,
  w,
  h = 3,
  tone = 1,
  light = false,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  tone?: number;
  light?: boolean;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={h / 2}
      className="flat-fill"
      fill={light ? "var(--color-paper)" : "currentColor"}
      opacity={light ? 0.75 : Math.min(0.22 * tone, 0.9)}
    />
  );
}

/** A filled region (dark sidebar, highlighted row, board) at a given ink density. */
export function Fill({ x, y, w, h, r = 0, density = 0.08 }: { x: number; y: number; w: number; h: number; r?: number; density?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} className="flat-fill" fill="currentColor" opacity={density} />;
}

export function ViewLabel({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      className="flat-fill"
      fill="currentColor"
      opacity="0.7"
      style={{ font: "600 9px var(--font-archivo)", fontStretch: "75%", letterSpacing: "0.16em" }}
    >
      {children}
    </text>
  );
}

export function Dot({ cx, cy, r = 3, filled = false }: { cx: number; cy: number; r?: number; filled?: boolean }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      className="flat-line"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.1"
    />
  );
}

export function Callouts({ items, active }: { items: CalloutSpec[]; active: number | null }) {
  return (
    <g className="flat-callouts">
      {items.map((c) => {
        const on = active === c.n;
        return (
          <g key={c.n} className="flat-callout" data-n={c.n}>
            <line
              x1={c.x}
              y1={c.y}
              x2={c.tx}
              y2={c.ty}
              stroke="currentColor"
              strokeWidth={on ? 1.3 : 0.9}
              opacity={on ? 1 : 0.7}
              className="flat-leader"
            />
            <circle cx={c.tx} cy={c.ty} r={2.2} fill="currentColor" />
            <circle
              cx={c.x}
              cy={c.y}
              r={10.5}
              fill={on ? "var(--color-navy)" : "var(--color-paper)"}
              stroke="currentColor"
              strokeWidth="1.2"
              style={{ transition: "fill 160ms" }}
            />
            <text
              x={c.x}
              y={c.y + 4}
              textAnchor="middle"
              fill={on ? "var(--color-thread)" : "currentColor"}
              style={{ font: "700 11.5px var(--font-archivo)", fontStretch: "80%", transition: "fill 160ms" }}
            >
              {c.n}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export function FlatSvg({
  viewBox,
  title,
  children,
}: {
  viewBox: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <svg viewBox={viewBox} role="img" aria-label={title} className="h-auto w-full text-ink">
      {children}
    </svg>
  );
}
