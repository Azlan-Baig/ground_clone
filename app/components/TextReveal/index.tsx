"use client";

import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Mode = "scroll" | "newOnce";

type LineUpAnimProps = {
  children: ReactNode;
  className?: string;
  /** seconds */
  animationDuration?: number;
  /** seconds */
  animationDelay?: number;
  /** gsap ease */
  ease?: string;
  /** scrollTrigger start */
  startPosition?: string;
  /** scrollTrigger once */
  once?: boolean;
  /** optional custom trigger selector */
  trigger?: string;
  markers?: boolean;

  /** Play immediately (no scroll). Mirrors your TextLineUp. */
  initial?: boolean;
  /** "scroll" (default) or "newOnce" (immediate). Mirrors your TextLineUp. */
  mode?: Mode;
};

const LineUpAnim: React.FC<LineUpAnimProps> = ({
  children,
  className = "",
  animationDuration = 0.5,
  animationDelay = 0.1,
  ease = "power3.out",
  startPosition = "top 100%",
  once = true,
  trigger,
  markers = false,
  initial = false,
  mode = "scroll",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  // Tracks the active cleanup for current animation build
  const cleanupRef = useRef<(() => void) | null>(null);

  // Keep a ref of the current >600 state to match your global logic
  const above600Ref = useRef<boolean>(
    typeof window !== "undefined" ? window.innerWidth > 600 : false
  );

  // Live guard that reacts to body class changes
  const [isAllowed, setIsAllowed] = useState(false);

  // Force re-run effect by bumping a key
  const [reseed, setReseed] = useState(0);

  // ---- helpers (local, no re-render) ----
  const debounce = (fn: (...args: any[]) => void, delay = 500) => {
    let t: any;
    return (...args: any[]) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };

  // Observe the body class like your file does for disclaimer gating
  useEffect(() => {
    if (typeof window === "undefined" || !document?.body) return;
    const compute = () => document.body.classList.contains("disclaimer-remove");
    setIsAllowed(compute());

    const observer = new MutationObserver(() => setIsAllowed(compute()));
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  // Core animation (build/cleanup). Re-runs when `reseed` changes or inputs change.
  useLayoutEffect(() => {
    if (isAllowed) return; // allowed path = no animation setup

    const host = containerRef.current;
    if (!host) return;

    const shouldAnimate = (node: Element) => !node.getAttribute("data-animated");
    const markAnimated = (node: Element) => node.setAttribute("data-animated", "1");

    if (!shouldAnimate(host)) return;

    const isRTL = () => {
      const dirHost = getComputedStyle(host).direction === "rtl";
      const dirDoc =
        (typeof document !== "undefined" &&
          (document.documentElement.getAttribute("dir") || "").toLowerCase() === "rtl") || false;
      return dirHost || dirDoc;
    };

    host.style.visibility = "hidden";
    host.style.overflow = "hidden";

    const triggerTarget = (() => {
      if (trigger) {
        const el = document.querySelector(trigger) as Element | null;
        if (el) return el;
      }
      return (triggerRef.current as Element | null) ?? host;
    })();

    const baseAnim = {
      y: 0,
      opacity: 1,
      duration: animationDuration,
      delay: animationDelay,
      ease,
      stagger: 0.2,
      clearProps: "transform,opacity,willChange",
    } as const;

    // --- RTL manual splitter ---
    const runRTL = () => {
      const child = host.firstElementChild as HTMLElement | null;
      if (!child) return () => {};

      const originalHTML = child.innerHTML;
      child.style.direction = "rtl";

      const wordSpans: { span: HTMLSpanElement; className: string }[] = [];
      const processNode = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent || "";
          if (!text) return;
          const parts = text.split(/(\s+)/).filter((p) => p.length > 0);
          parts.forEach((part) => {
            const s = document.createElement("span");
            s.textContent = part;
            const className = (node.parentElement?.className || "").trim();
            wordSpans.push({ span: s, className });
            if (className) s.className = className;
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          if (el.tagName.toLowerCase() === "br") {
            const brSpan = document.createElement("span");
            brSpan.appendChild(document.createElement("br"));
            brSpan.className = "br-element";
            wordSpans.push({ span: brSpan, className: "" });
          } else {
            Array.from(node.childNodes).forEach(processNode);
          }
        }
      };

      Array.from(child.childNodes).forEach(processNode);

      child.innerHTML = "";
      wordSpans.forEach(({ span }) => child.appendChild(span));

      const lineGroups: HTMLSpanElement[][] = [];
      let current: HTMLSpanElement[] = [];
      let currentTop: number | null = null;

      wordSpans.forEach(({ span }) => {
        if (span.classList.contains("br-element")) {
          if (current.length) lineGroups.push(current);
          lineGroups.push([span]);
          current = [];
          currentTop = null;
          return;
        }
        const top = span.offsetTop;
        if (currentTop === null) currentTop = top;
        if (top !== currentTop) {
          if (current.length) lineGroups.push(current);
          current = [span];
          currentTop = top;
        } else {
          current.push(span);
        }
      });
      if (current.length) lineGroups.push(current);

      child.innerHTML = "";
      lineGroups.forEach((group) => {
        const wrapper = document.createElement("div");
        wrapper.className = "text-wrap";

        const brOnly = group.length === 1 && group[0].classList.contains("br-element");
        if (!brOnly) wrapper.style.overflow = "hidden";

        const lineDiv = document.createElement("div");
        lineDiv.className = "line";
        group.forEach((s) => lineDiv.appendChild(s));
        wrapper.appendChild(lineDiv);
        child.appendChild(wrapper);
      });

      const lineEls = Array.from(child.querySelectorAll<HTMLElement>(".line"));
      gsap.set(lineEls, { y: 40, opacity: 0, willChange: "transform,opacity" });
      gsap.set(host, { visibility: "visible" });

      const play = () => {
        if (initial || mode === "newOnce" || host.classList.contains("thm_animation_initial")) {
          gsap.to(lineEls, baseAnim);
        } else {
          gsap.to(lineEls, {
            ...baseAnim,
            scrollTrigger: {
              trigger: triggerTarget ?? host,
              start: startPosition,
              once,
              markers,
            },
          });
        }
      };
      play();

      return () => {
        // Kill only our trigger
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === (triggerTarget ?? host)) st.kill();
        });
        gsap.killTweensOf(lineEls);
        child.innerHTML = originalHTML;
      };
    };

    // --- LTR SplitText path ---
    const runLTR = () => {
      // ensure no stale triggers on this host
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === host) st.kill();
      });
      gsap.killTweensOf(host);

      const split = new SplitText(host, { type: "lines", linesClass: "line" });
      split.lines?.forEach((line) => {
        const wrap = document.createElement("div");
        wrap.classList.add("text-wrap");
        line.parentNode?.insertBefore(wrap, line);
        wrap.appendChild(line);
      });

      gsap.set(split.lines, { y: 40, opacity: 0, willChange: "transform,opacity" });
      gsap.set(host, { visibility: "visible" });

      const play = () => {
        if (initial || mode === "newOnce" || host.classList.contains("thm_animation_initial")) {
          gsap.to(split.lines, baseAnim);
        } else {
          gsap.to(split.lines, {
            ...baseAnim,
            scrollTrigger: {
              trigger: triggerTarget ?? host,
              start: startPosition,
              once,
              markers,
            },
          });
        }
      };
      play();

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === (triggerTarget ?? host)) st.kill();
        });
        gsap.killTweensOf(split.lines || []);
        split.revert();
      };
    };

    const run = () => {
      const cleanup = isRTL() ? runRTL() : runLTR();
      markAnimated(host);
      return cleanup;
    };

    const fontReady = (document as any).fonts?.ready as Promise<void> | undefined;

    const start = () => {
      // attach the cleanup so external events can call it
      cleanupRef.current = run();
    };

    if (fontReady && typeof fontReady.then === "function") {
      fontReady.then(() => requestAnimationFrame(start)).catch(() => requestAnimationFrame(start));
    } else {
      requestAnimationFrame(start);
    }

    // effect cleanup
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    reseed,
    isAllowed,
    animationDuration,
    animationDelay,
    ease,
    startPosition,
    once,
    trigger,
    markers,
    initial,
    mode,
  ]);

  // === Resize / Orientation logic (mirrors your global main.js) ===
// === Resize / Orientation logic with breakpoint buckets ===
useEffect(() => {
  if (typeof window === "undefined") return;

  // Descending so we can pick the first match
  const BREAKPOINTS = [1920, 1680, 1440, 1280, 991, 600, 0];

  const bucketOf = (w: number) => {
    for (let i = 0; i < BREAKPOINTS.length; i++) {
      if (w >= BREAKPOINTS[i]) return BREAKPOINTS[i];
    }
    return 0;
  };

  // Keep current bucket + last width for delta-based fallbacks
  const currentBucketRef = { val: bucketOf(window.innerWidth) };
  const lastWidthRef = { val: window.innerWidth };

  const killAndReseed = () => {
    cleanupRef.current?.();
    cleanupRef.current = null;

    const host = containerRef.current;
    if (host) {
      host.removeAttribute("data-animated");
      host.style.visibility = "";
      host.style.overflow = "";
    }

    const rebuild = () => {
      setReseed((x) => x + 1);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const fontsReady = (document as any).fonts?.ready;
    if (fontsReady && typeof fontsReady.then === "function") {
      fontsReady.then(rebuild).catch(rebuild);
    } else {
      rebuild();
    }
  };

  const debounce = (fn: (...args: any[]) => void, delay = 300) => {
    let t: any;
    return (...args: any[]) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };

  const onResize = debounce(() => {
    const w = window.innerWidth;
    const nextBucket = bucketOf(w);
    const prevBucket = currentBucketRef.val;
    const widthDelta = Math.abs(w - lastWidthRef.val);

    // Rebuild if we crossed a breakpoint bucket (e.g., 1920→1680→1440)
    if (nextBucket !== prevBucket) {
      currentBucketRef.val = nextBucket;
      lastWidthRef.val = w;
      killAndReseed();
      return;
    }

    // Optional: if layout shifts a lot within same bucket, still rebuild
    // Tweak 80px to your taste, or remove if you only want bucket-based.
    if (widthDelta >= 80) {
      lastWidthRef.val = w;
      killAndReseed();
    } else {
      lastWidthRef.val = w;
    }
  }, 300);

  const onOrientation = debounce(() => {
    // Orientation change → always rebuild
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
      ref={triggerRef}
      className={`thm_animation_line__up ${
        initial ? "thm_animation_initial" : ""
      } ${className}`}
    >
      {/* If allowed, render plain children; otherwise mount the animation host */}
      {isAllowed ? <span>{children}</span> : <div ref={containerRef}>{children}</div>}
    </div>
  );
};

export default LineUpAnim;
