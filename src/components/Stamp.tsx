import { useId } from "react";

type StampProps = {
  top: string;
  main: string;
  bottom: string;
  tone?: "red" | "navy";
  className?: string;
};

/** A rubber approval stamp: double frame, distressed ink. Purely visual; its words repeat elsewhere as text. */
export function Stamp({ top, main, bottom, tone = "red", className }: StampProps) {
  // Long words drop to a narrower, smaller cut so they stay inside the frame.
  const mainSize = main.length > 6 ? 31 : 37;
  const mainStretch = main.length > 6 ? "100%" : "112%";
  const id = useId().replace(/:/g, "");
  const ink = tone === "red" ? "var(--color-stamp)" : "var(--color-navy)";
  return (
    <svg
      viewBox="0 0 240 132"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ color: ink }}
    >
      <defs>
        <filter id={`ink-${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" seed="7" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 2"
            result="speckle"
          />
          <feComposite in="SourceGraphic" in2="speckle" operator="in" result="inked" />
          <feTurbulence type="turbulence" baseFrequency="0.035" numOctaves="2" seed="3" result="warp" />
          <feDisplacementMap in="inked" in2="warp" scale="2.2" />
        </filter>
      </defs>
      <g filter={`url(#ink-${id})`} fill="currentColor" stroke="currentColor">
        <rect x="4" y="4" width="232" height="124" rx="10" fill="none" strokeWidth="4" />
        <rect x="12" y="12" width="216" height="108" rx="6" fill="none" strokeWidth="1.6" />
        <line x1="26" y1="42" x2="214" y2="42" strokeWidth="1.4" />
        <line x1="26" y1="96" x2="214" y2="96" strokeWidth="1.4" />
        <text
          x="120"
          y="34"
          textAnchor="middle"
          stroke="none"
          style={{ font: "700 13px var(--font-archivo)", fontStretch: "75%", letterSpacing: "0.18em" }}
        >
          {top}
        </text>
        <text
          x="120"
          y="81"
          textAnchor="middle"
          stroke="none"
          style={{ font: `900 ${mainSize}px var(--font-archivo)`, fontStretch: mainStretch, letterSpacing: "0.04em" }}
        >
          {main}
        </text>
        <text
          x="120"
          y="113"
          textAnchor="middle"
          stroke="none"
          style={{ font: "700 12px var(--font-archivo)", fontStretch: "75%", letterSpacing: "0.16em" }}
        >
          {bottom}
        </text>
      </g>
    </svg>
  );
}
