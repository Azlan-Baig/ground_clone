"use client";

import React, { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Mode = "scroll" | "newOnce";
type Props = {
  children: ReactNode;
  className?: string;
  /** Play immediately (no scroll) */
  initial?: boolean;
  /** "newOnce" plays immediately; otherwise uses ScrollTrigger */
  mode?: Mode;
};

export default function TextFadeUp({
  children,
  className = "",
  initial = false,
  mode = "scroll",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const shouldAnimate = (el: Element) => !el.getAttribute("data-animated");
  const markAnimated = (el: Element) => el.setAttribute("data-animated", "1");

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!shouldAnimate(el)) return;

    // Avoid flash on first paint
    el.style.visibility = "hidden";
    el.style.overflow = "hidden";

    const run = () => {
      // Clean any previous triggers/tweens tied to this element (hot-reload safety)
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
      gsap.killTweensOf(el);

      // Initial state
      gsap.set(el, {
        y: 40,
        opacity: 0,
        willChange: "transform,opacity",
      });

      // Reveal after setup
      gsap.set(el, { visibility: "visible" });

      const animation = {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "transform,opacity,willChange",
      } as const;

      if (
        initial ||
        mode === "newOnce" ||
        el.classList.contains("thm_animation_initial")
      ) {
        gsap?.to(el, animation);
      } else {
        gsap?.to(el, {
          ...animation,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        });
      }

      markAnimated(el);

      // Cleanup function to kill ScrollTriggers and GSAP tweens
      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
        gsap.killTweensOf(el);
      };
    };

    // Respect font loading to prevent layout shift
    const fontReady = (document as any).fonts?.ready as
      | Promise<void>
      | undefined;
    const startSetup = () => requestAnimationFrame(() => run());

    if (fontReady && typeof fontReady.then === "function") {
      fontReady.then(startSetup).catch(startSetup);
    } else {
      startSetup();
    }
  }, [initial, mode]);

  return (
    <div
      ref={ref}
      className={`thm_animation_fade__up ${initial ? "thm_animation_initial" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
