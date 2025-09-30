"use client";
import { useRef } from "react";
import SvgImage from "../SvgImage";
import Image from "next/image";
import { PortableText, PortableTextBlock } from "next-sanity";
import TextReveal from "@/components/TextReveal/index";
import TextFadeUp from "@/components/TextFadeUp/index";
import UseMediaQuery from "../UseMediaQuery";

type BannerProps = {
  data: {
    title?: PortableTextBlock[];
    video?: string;
    backgroundVideoMobile?: string;
    subtitle?: PortableTextBlock[];
    bgPattern?: string;
    desktopSrc?: string;
    mobileSrc?: string;
    _type?: string;
  };
  bgImage?: string;
};

const Banner = ({ data, bgImage }: BannerProps) => {
  const isSmallScreen = UseMediaQuery("(max-width: 600px)");

  const heroRef = useRef<HTMLDivElement | null>(null);

  // Click handler to scroll to the next section
  // Click handler to scroll to the next section
  const handleScrollDown = () => {
    const header = document.querySelector(
      ".container-head"
    ) as HTMLElement | null;
    const hero = heroRef.current;
    const nextSection = hero?.nextElementSibling as HTMLElement | null;

    // Fallback: if we can't find the next section, use old behavior (1vh minus header)
    if (!header || !nextSection) {
      const headerHeight = header?.offsetHeight ?? 0;
      const targetY = window.innerHeight - headerHeight;
      const anyWindow = window as any;
      if (anyWindow?.lenis?.scrollTo) {
        anyWindow.lenis.scrollTo(targetY, { offset: 0 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
      return;
    }

    // Compute effective header height at the FINAL position (when it's stuck)
    const rect = header.getBoundingClientRect();
    const isHeaderCurrentlyStuck = Math.abs(rect.top) < 1; // top ~ 0 when sticky

    const rem =
      parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const NON_STICKY_PADDING_REM = 2.5;
    const STICKY_PADDING_REM = 1.25;

    // Total vertical padding change is (2.5rem top + bottom) - (1.25rem top + bottom) = 2.5rem
    const headerShrinkPx =
      (NON_STICKY_PADDING_REM - STICKY_PADDING_REM) * 2 * rem; // 2 sides

    const measuredHeaderHeight = header.offsetHeight;

    // If not yet stuck, after scrolling the header will be smaller by headerShrinkPx.
    // If already stuck, its current height is the final height.
    const effectiveHeaderHeight = isHeaderCurrentlyStuck
      ? measuredHeaderHeight
      : Math.max(0, measuredHeaderHeight - headerShrinkPx);

    const targetTop = nextSection.offsetTop - effectiveHeaderHeight;

    const anyWindow = window as any;
    if (anyWindow?.lenis?.scrollTo) {
      // Lenis can scroll to an element; use a negative offset
      anyWindow.lenis.scrollTo(nextSection, { offset: -effectiveHeaderHeight });
    } else {
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} className="hero" id={data?._type}>
      {data?.video && (
        <div className="heroBg">
          <video
            className="banner-img"
            src={
              isSmallScreen && data?.backgroundVideoMobile
                ? data?.backgroundVideoMobile
                : data?.video
            }
            poster={
              isSmallScreen && data?.mobileSrc
                ? data?.mobileSrc
                : data?.desktopSrc
                  ? data?.desktopSrc
                  : ""
            }
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
      )}

      <div className="content">
        <div className="content-pos">
          {data?.title && (
            <div className="display-2 mainHeading">
              <TextReveal>
                <PortableText value={data?.title || []} />
              </TextReveal>
            </div>
          )}
          {data?.subtitle && (
            <div className="heading6 subHeading">
              <TextReveal animationDelay={0.7}>
                <PortableText value={data?.subtitle || []} />
              </TextReveal>
            </div>
          )}
        </div>
      </div>

      <div className="scroll-down">
        <span
          className="scrollIcon bounce-y"
          aria-label="Scroll down"
          onClick={handleScrollDown}
        >
          <SvgImage url={"/svg/ground-banner-arrow.svg"} />
        </span>
      </div>

      <div className="overlay" />
      {bgImage && (
        <div className="bgDots">
          <Image
            src={bgImage}
            alt="bg-image"
            fill
            priority
            className="bg-img object-cover"
            sizes="100vw"
          />
        </div>
      )}
    </section>
  );
};

export default Banner;
