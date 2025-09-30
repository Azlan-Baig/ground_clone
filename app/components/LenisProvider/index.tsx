"use client";
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";

type LenisType = InstanceType<typeof Lenis>;

type Ctx = {
  lenis: LenisType | null;
  stopLenis: () => void;
  startLenis: () => void;
};

const LenisContext = createContext<Ctx>({
  lenis: null,
  stopLenis: () => {},
  startLenis: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisType | null>(null);
  const rafId = useRef<number | null>(null);
  const [, force] = useState(0); // to re-render once Lenis is created

  useEffect(() => {
    if (lenisRef.current) return; // guard against StrictMode double-mount

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // optional: expose for debugging
    // (window as any).lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId.current = requestAnimationFrame(raf);
    };
    rafId.current = requestAnimationFrame(raf);

    // force one re-render so context value includes the instance
    force((n) => n + 1);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const stopLenis = () => lenisRef.current?.stop();
  const startLenis = () => lenisRef.current?.start();

  // memoize the context object so consumers don't re-render unnecessarily
  const ctxValue = useMemo<Ctx>(
    () => ({
      lenis: lenisRef.current,
      stopLenis,
      startLenis,
    }),
    [/* force tick via state above */]
  );

  return <LenisContext.Provider value={ctxValue}>{children}</LenisContext.Provider>;
}
