"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

const HEADER_SPACE = 80;

/**
 * Land a section's content, not its top padding, just under the fixed header.
 * Lenis already subtracts the element's scroll-margin-top, so add it back.
 */
function anchorOffset(target: HTMLElement, viaLenis: boolean) {
  const style = getComputedStyle(target);
  const padding = parseFloat(style.paddingTop) || 0;
  const margin = viaLenis ? parseFloat(style.scrollMarginTop) || 0 : 0;
  return padding - HEADER_SPACE + margin;
}

/** Smooth wheel scrolling (skipped for reduced motion) and in-page anchor handling. */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      event.preventDefault();
      const offset = id === "cover" ? 0 : anchorOffset(target, Boolean(lenis));
      if (lenis) {
        lenis.scrollTo(id === "cover" ? 0 : target, { offset, duration: 1.2 });
      } else {
        const top = id === "cover" ? 0 : target.getBoundingClientRect().top + window.scrollY + offset;
        window.scrollTo({ top, behavior: "auto" });
      }
      history.replaceState(null, "", `#${id}`);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);

    // Fonts change line lengths; recompute trigger positions once they settle.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
