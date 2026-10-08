import type { ReactNode } from "react";

type WovenLabelProps = {
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  /** Extra hook classes on the woven field and its lettering (used by the cover motion). */
  fieldClassName?: string;
  textClassName?: string;
};

/**
 * An end-fold woven label sewn onto the sheet: satin navy field, folded ends,
 * a running stitch around the edge and lettering in ivory thread.
 */
export function WovenLabel({ children, footer, className = "", fieldClassName = "", textClassName = "" }: WovenLabelProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`woven relative overflow-hidden rounded-[3px] shadow-[0_1px_0_rgb(255_255_255/0.6),0_2px_3px_rgb(14_22_49/0.25),0_14px_28px_-14px_rgb(14_22_49/0.55)] ${fieldClassName}`}
      >
        {/* Folded ends */}
        <span aria-hidden className="absolute inset-y-0 left-0 w-3 bg-navy-2 shadow-[inset_-1px_0_0_rgb(255_255_255/0.08)] sm:w-4" />
        <span aria-hidden className="absolute inset-y-0 right-0 w-3 bg-navy-2 shadow-[inset_1px_0_0_rgb(255_255_255/0.08)] sm:w-4" />
        {/* Running stitch that holds it to the sheet */}
        <div aria-hidden className="pointer-events-none absolute inset-x-[20px] inset-y-[8px] sm:inset-x-[26px] sm:inset-y-[10px]">
          <svg className="h-full w-full overflow-visible">
            <rect
              width="100%"
              height="100%"
              fill="none"
              stroke="var(--color-thread)"
              strokeOpacity="0.42"
              strokeWidth="1.2"
              strokeDasharray="6 5"
              rx="1"
            />
          </svg>
        </div>
        <div className={`woven-text relative px-7 pb-5 pt-6 sm:px-10 sm:pb-7 sm:pt-8 lg:px-12 ${textClassName}`}>
          {children}
          {footer ? (
            <div className="mt-4 border-t border-gold/60 pt-3 sm:mt-6 sm:pt-4">{footer}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
