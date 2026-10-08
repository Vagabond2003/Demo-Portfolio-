"use client";

import { useRef } from "react";
import { Mail } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { orderMailto } from "@/lib/mailto";
import { HangTag, type HangTagHandle } from "./HangTag";

/**
 * Once the cover's order tag scrolls away, a small one hangs from the header so
 * the order action stays one glance away. It steps aside for the order section.
 */
export function FloatingTag() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HangTagHandle>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const cover = document.getElementById("cover");
      const order = document.getElementById("contact");
      if (!wrap || !cover || !order) return;

      gsap.set(wrap, { autoAlpha: 0, y: -16 });
      let pastCover = false;
      let atOrder = false;
      const update = () => {
        const show = pastCover && !atOrder;
        gsap.to(wrap, { autoAlpha: show ? 1 : 0, y: show ? 0 : -16, duration: 0.35, ease: "expo.out", overwrite: true });
        if (show) tagRef.current?.drop(24);
      };

      const a = ScrollTrigger.create({
        trigger: cover,
        start: "bottom 35%",
        onEnter: () => {
          pastCover = true;
          update();
        },
        onLeaveBack: () => {
          pastCover = false;
          update();
        },
      });
      const b = ScrollTrigger.create({
        trigger: order,
        start: "top 85%",
        onEnter: () => {
          atOrder = true;
          update();
        },
        onLeaveBack: () => {
          atOrder = false;
          update();
        },
      });
      return () => {
        a.kill();
        b.kill();
      };
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className="pointer-events-none fixed right-[max(16px,calc((100vw-1360px)/2-28px))] top-[55px] z-40 hidden lg:block">
      <div className="pointer-events-auto">
        <HangTag ref={tagRef} stringLength={22} width={84} draggable={false} label="Order tag">
          <a
            href={orderMailto()}
            className="flex flex-col items-center gap-1.5 px-2 pb-3 pt-10 text-center"
            aria-label="Place an order by email"
          >
            <Mail aria-hidden className="size-5" strokeWidth={1.75} />
            <span className="text-[0.75rem] font-extrabold uppercase leading-none tracking-[0.06em] [font-stretch:78%]">
              Order
            </span>
          </a>
        </HangTag>
      </div>
    </div>
  );
}
