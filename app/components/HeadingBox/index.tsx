// HeadingBox.tsx
"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextFadeUp from "../TextFadeUp";

gsap.registerPlugin(ScrollTrigger);

type HeadingBoxProps = {
  title: string;
  withBG?: boolean;

  /** seconds (default 0.9) */
  duration?: number;
  /** ScrollTrigger start, e.g. "top 85%" (default) */
  start?: string;
  /** Animate only once (default true). Set false to re-run on re-entry */
  once?: boolean;
  /** Optional: pass a selector or element if you use a custom scroller (SimpleBar, etc.) */
  scroller?: string | Element | null;
};

const HeadingBox: React.FC<HeadingBoxProps> = ({
  title,
  withBG,
  duration = 0.9,
  start = "top 85%",
  once = true,
  scroller = null,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  // useLayoutEffect(() => {
  //   const root = rootRef.current;
  //   const line = lineRef.current;
  //   if (!root || !line) return;

  //   // Detect RTL from nearest ancestor or document
  //   const isRTL =
  //     typeof document !== "undefined" &&
  //     (!!root.closest('[dir="rtl"]') || document?.documentElement?.dir === "rtl");

  //   // Respect reduced motion
  //   const prefersReduced =
  //     typeof window !== "undefined" &&
  //     window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  //   // Helper: find nearest scrollable ancestor (handles SimpleBar, modals, etc.)
  //   const resolveScroller = (): Element | undefined => {
  //     if (typeof document === "undefined") return undefined;
  //     if (typeof scroller === "string") {
  //       const el = document.querySelector(scroller);
  //       if (el) return el;
  //     } else if (scroller instanceof Element) {
  //       return scroller;
  //     }

  //     // Special case: SimpleBar content wrapper
  //     const simplebar = root.closest(".simplebar-content-wrapper");
  //     if (simplebar) return simplebar as Element;

  //     // Generic nearest scrollable ancestor
  //     let el: HTMLElement | null = root.parentElement;
  //     while (el && el !== document.body) {
  //       const cs = getComputedStyle(el);
  //       const isScrollable = /(auto|scroll)/.test(
  //         `${cs.overflow}${cs.overflowY}${cs.overflowX}`
  //       );
  //       if (isScrollable && el.scrollHeight > el.clientHeight) return el;
  //       el = el.parentElement;
  //     }
  //     return undefined; // window
  //   };

  //   const targetScroller = resolveScroller();

  //   const ctx = gsap.context(() => {
  //     // Start state via transform for reliability inside flex/grid
  //     gsap.set(line, {
  //       transformOrigin: `${isRTL ? "right" : "left"} center`,
  //       scaleX: prefersReduced ? 1 : 0,
  //       willChange: "transform",
  //     });

  //     if (prefersReduced) return;

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: root,
  //         start,
  //         scroller: targetScroller,
  //         once,
  //         toggleActions: once ? "play none none none" : "play none none reset",
  //         onLeaveBack: once ? undefined : () => gsap.set(line, { scaleX: 0 }),
  //       },
  //     });

  //     tl.to(line, { scaleX: 1, duration, ease: "power2.out", delay: 0.5 });
  //   }, root);

  //   // Refresh ST on layout changes (fonts/images/resizes)
  //   const refresh = () => ScrollTrigger.refresh();
  //   window.addEventListener("load", refresh);
  //   roRef.current = new ResizeObserver(refresh);
  //   roRef.current.observe(root);

  //   return () => {
  //     window.removeEventListener("load", refresh);
  //     roRef.current?.disconnect();
  //     roRef.current = null;
  //     ctx.revert();
  //   };
  // }, [duration, start, once, scroller]);

  return (
    <TextFadeUp>
    <div
      ref={rootRef}
      className={`section-heading ${withBG ? "withBackground" : ""}`}
    >
      <div className="icon">
        <span className="dot" />
      </div>
      <div>
          <p className="body2 title">{title}</p>
        
      </div>
      <div ref={lineRef} className="line" />
    </div>
      </TextFadeUp>

  );
};

export default HeadingBox;
