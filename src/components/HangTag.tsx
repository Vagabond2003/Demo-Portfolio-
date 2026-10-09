"use client";

import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";
import { gsap, Draggable, useGSAP, motionQueries } from "@/lib/gsap";

export type HangTagHandle = {
  /** Lift the tag to an angle and let it swing down to rest. */
  drop: (angle?: number) => void;
};

type HangTagProps = {
  children: ReactNode;
  /** Length of the string from the pin to the punched hole, in px. */
  stringLength: number;
  width: number | string;
  className?: string;
  tagClassName?: string;
  /** Whether the tag can be grabbed and flicked. */
  draggable?: boolean;
  label?: string;
};

const STIFFNESS = 30; // pull back to vertical
const DAMPING = 2.4; // air and string friction
const SCROLL_PUSH = 1.6; // degrees of kick per px scrolled in one frame
const MAX_ANGLE = 48;

/**
 * A kraft tag hanging on a string from a pin. It swings on a damped spring:
 * scrolling kicks it, grabbing lets you flick it, and it always settles back.
 */
export const HangTag = forwardRef<HangTagHandle, HangTagProps>(function HangTag(
  { children, stringLength, width, className = "", tagClassName = "", draggable = true, label },
  ref,
) {
  const rigRef = useRef<HTMLDivElement>(null);
  const physics = useRef({ angle: 0, vel: 0, dragging: false, active: false });

  useImperativeHandle(ref, () => ({
    drop(angle = 32) {
      const p = physics.current;
      if (!p.active) return;
      p.angle = angle;
      p.vel = 0;
    },
  }));

  useGSAP(
    () => {
      const rig = rigRef.current;
      if (!rig) return;
      const mm = gsap.matchMedia();

      mm.add({ motion: motionQueries.motion, finePointer: "(pointer: fine)" }, (context) => {
        const { motion, finePointer } = context.conditions as { motion: boolean; finePointer: boolean };
        if (!motion) return;
        const p = physics.current;
        p.active = true;
        gsap.set(rig, { transformOrigin: "50% 0%" });
        let lastScroll = window.scrollY;

        const tick = (_time: number, deltaTime: number) => {
          const dt = Math.min(deltaTime / 1000, 1 / 30);
          const y = window.scrollY;
          const dy = y - lastScroll;
          lastScroll = y;
          if (p.dragging) return;
          p.vel += (-STIFFNESS * p.angle - DAMPING * p.vel) * dt * 1;
          p.vel += gsap.utils.clamp(-60, 60, dy) * SCROLL_PUSH;
          p.angle = gsap.utils.clamp(-MAX_ANGLE, MAX_ANGLE, p.angle + p.vel * dt);
          if (Math.abs(p.angle) < 0.01 && Math.abs(p.vel) < 0.01) {
            p.angle = 0;
            p.vel = 0;
          }
          gsap.set(rig, { rotation: p.angle });
        };
        gsap.ticker.add(tick);

        // Dragging needs touch-action: none, which would trap page swipes on touch screens,
        // so only mouse and trackpad users get to grab the tag. Touch gets a tap-to-swing.
        let draggables: Draggable[] = [];
        if (draggable && finePointer) {
          let last = { r: 0, t: 0 };
          draggables = Draggable.create(rig, {
            type: "rotation",
            bounds: { minRotation: -70, maxRotation: 70 },
            cursor: "grab",
            activeCursor: "grabbing",
            onPress() {
              p.dragging = true;
              last = { r: this.rotation, t: performance.now() };
            },
            onDrag() {
              const now = performance.now();
              const dt = Math.max((now - last.t) / 1000, 1 / 240);
              p.vel = (this.rotation - last.r) / dt;
              p.angle = this.rotation;
              last = { r: this.rotation, t: now };
            },
            onRelease() {
              p.angle = this.rotation;
              p.vel = gsap.utils.clamp(-600, 600, p.vel);
              p.dragging = false;
            },
          });
        }

        const nudge = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || p.dragging) return;
          p.vel += gsap.utils.clamp(-30, 30, event.movementX) * 3;
        };
        const tap = (event: PointerEvent) => {
          if (event.pointerType === "mouse") return;
          const box = rig.getBoundingClientRect();
          p.vel += event.clientX < box.left + box.width / 2 ? 140 : -140;
        };
        rig.addEventListener("pointerenter", nudge);
        rig.addEventListener("pointerdown", tap, { passive: true });

        return () => {
          p.active = false;
          gsap.ticker.remove(tick);
          draggables.forEach((d) => d.kill());
          rig.removeEventListener("pointerenter", nudge);
          rig.removeEventListener("pointerdown", tap);
          gsap.set(rig, { rotation: 0 });
        };
      });

      return () => mm.revert();
    },
    { scope: rigRef, dependencies: [draggable] },
  );

  return (
    <div
      ref={rigRef}
      className={`relative select-none ${className}`}
      style={{ width }}
      role="group"
      aria-label={label}
    >
      {/* Pin */}
      <span
        aria-hidden
        className="absolute left-1/2 top-0 z-10 block size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f4f5f0,#9aa1ab_45%,#4c5260)] shadow-[0_1px_2px_rgb(0_0_0/0.45)]"
      />
      {/* String, visible through the punched hole */}
      <svg
        aria-hidden
        className="absolute left-1/2 top-0 -translate-x-1/2"
        width="6"
        height={stringLength + 26}
        viewBox={`0 0 6 ${stringLength + 26}`}
      >
        <path
          d={`M3 0 C 2 ${stringLength * 0.4}, 4 ${stringLength * 0.7}, 3 ${stringLength + 26}`}
          stroke="#e8dcc2"
          strokeWidth="1.6"
          fill="none"
        />
        <path
          d={`M3 0 C 2 ${stringLength * 0.4}, 4 ${stringLength * 0.7}, 3 ${stringLength + 26}`}
          stroke="#7a6a52"
          strokeWidth="1.6"
          strokeDasharray="1.5 2.5"
          fill="none"
          opacity="0.6"
        />
      </svg>
      <div
        style={{ paddingTop: stringLength }}
        className="[filter:drop-shadow(0_2px_2px_rgb(42_32_24/0.22))_drop-shadow(0_14px_16px_rgb(42_32_24/0.24))]"
      >
        <div
          className={`kraft relative ${tagClassName}`}
          style={{
            clipPath: "polygon(16% 0, 84% 0, 100% 9%, 100% 100%, 0 100%, 0 9%)",
            WebkitMaskImage: "radial-gradient(circle 6px at 50% 24px, transparent 96%, #000 100%)",
            maskImage: "radial-gradient(circle 6px at 50% 24px, transparent 96%, #000 100%)",
          }}
        >
          {/* Eyelet */}
          <span
            aria-hidden
            className="absolute left-1/2 top-[24px] block size-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-[#a9adb4] shadow-[inset_0_1px_1px_rgb(0_0_0/0.35),0_1px_0_rgb(255_255_255/0.35)]"
          />
          {children}
        </div>
      </div>
    </div>
  );
});
