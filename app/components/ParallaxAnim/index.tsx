"use client";

import React, { JSX, useLayoutEffect, useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Iprops = {
  className?: string;
  children: JSX.Element;
};

function ParallaxAnim(props: Iprops) {
  const { className = "", children } = props;

  const imgRef = useRef<HTMLDivElement | null>(null);
  const paralaxImgWrapper = useRef<HTMLDivElement | null>(null);

  // keep active build cleanup
  const cleanupRef = useRef<(() => void) | null>(null);
  // trigger rebuilds
  const [reseed, setReseed] = useState(0);

  // ---------- Core GSAP build (runs on mount & whenever reseed changes) ----------
  useLayoutEffect(() => {
    const wrapper = paralaxImgWrapper.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    const build = () => {
      const wrapperHeight = wrapper.offsetHeight;

      // if height not ready yet, retry once shortly
      if (wrapperHeight === 0) {
        const id = setTimeout(() => setReseed((n) => n + 1), 50);
        return () => clearTimeout(id);
      }

      const ctx = gsap.context(() => {
        gsap.set(img, {
          height: wrapperHeight,
          scale: 1.15,
          willChange: "transform",
          transformOrigin: "center center",
        });

        gsap.to(img, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            refreshPriority: -1,
            // markers: true,
          },
        });
      }, wrapper);

      cleanupRef.current = () => {
        try {
          ctx.revert();
        } catch {}
      };

      // ensure measurements are correct after we build
      const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cancelAnimationFrame(raf);
        cleanupRef.current?.();
        cleanupRef.current = null;
      };
    };

    const cleanup = build();
    return () => {
      if (cleanup) cleanup();
    };
  }, [reseed]);

  // ---------- Handle page load late refresh ----------
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };
    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // ---------- Resize / Orientation logic (bucket-based + delta guard) ----------
  useEffect(() => {
    if (typeof window === "undefined") return;

    const BREAKPOINTS = [1920, 1680, 1440, 1280, 991, 600, 0]; // descending
    const bucketOf = (w: number) => {
      for (let i = 0; i < BREAKPOINTS.length; i++) if (w >= BREAKPOINTS[i]) return BREAKPOINTS[i];
      return 0;
    };

    let currentBucket = bucketOf(window.innerWidth);
    let lastWidth = window.innerWidth;

    const debounce = (fn: (...args: any[]) => void, delay = 300) => {
      let t: any;
      return (...args: any[]) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), delay);
      };
    };

    const killAndReseed = () => {
      // kill current build
      cleanupRef.current?.();
      cleanupRef.current = null;

      // clear inline leftovers; next build will set correct values
      const img = imgRef.current;
      if (img) {
        img.style.willChange = "";
        img.style.transform = "";
        img.style.height = "";
      }

      const rebuild = () => {
        setReseed((n) => n + 1);
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };

      const fontsReady = (document as any).fonts?.ready;
      if (fontsReady && typeof fontsReady.then === "function") {
        fontsReady.then(rebuild).catch(rebuild);
      } else {
        rebuild();
      }
    };

    const onResize = debounce(() => {
      const w = window.innerWidth;
      const nb = bucketOf(w);
      const widthDelta = Math.abs(w - lastWidth);

      if (nb !== currentBucket) {
        currentBucket = nb;
        lastWidth = w;
        killAndReseed();
        return;
      }

      // big change inside same bucket (tune/remove 80px as you like)
      if (widthDelta >= 80) {
        lastWidth = w;
        killAndReseed();
      } else {
        lastWidth = w;
      }
    }, 300);

    const onOrientation = debounce(() => {
      killAndReseed();
    }, 300);

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onOrientation);

    return () => {
      window.removeEventListener("resize", onResize as any);
      window.removeEventListener("orientationchange", onOrientation as any);
    };
  }, []);

  return (
    <div
      className={`asspect-ratio-img overflow-hidden ${className}`}
      ref={paralaxImgWrapper}
    >
      <div className="ari-box" ref={imgRef}>
        {children}
      </div>
    </div>
  );
}

export default ParallaxAnim;
