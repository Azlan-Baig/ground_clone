"use client";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import ReactPlayer from "react-player";
import Modal from "react-modal";
import Image from "next/image";
import FadeAnim from "../FadeAnim";
import SvgImage from "../SvgImage";
import TextReveal from "@/components/TextReveal/index";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/LenisProvider";
import {
  trackVideoEvent,
  trackVideoEventByPercentage,
  trackVideoOpenEvent,
} from "@/app/utils/Helpers";
import { useParams } from "next/navigation";
gsap.registerPlugin(ScrollTrigger);

interface ICta {
  title?: string;
  href?: string;
  video: string;
}
interface SubscribeProps {
  data: {
    backgroundVideo?: string;
    title: string;
    backgroundImage?: string;
    mobileBackgroundImage?: string;
    cta: ICta;
    _type: string;
  };
}

const Subscribe = ({ data }: SubscribeProps) => {
  const params = useParams();
  const locale: string = params.locale == "ar" ? "ar" : "en";
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { stopLenis, startLenis } = useLenis();
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [milestones, setMilestones] = useState<{ [key: number]: boolean }>({
    25: false,
    50: false,
    75: false,
    100: false,
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const mediaZoomRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null); // NEW

  // store active cleanup for the current GSAP build
  const cleanupRef = useRef<(() => void) | null>(null);
  // re-run the build effect when this changes
  const [reseed, setReseed] = useState(0);

  // ========= Modal / Lenis =========
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (modalIsOpen) {
      html.classList.add("nav-menu-open");
      body.classList.add("nav-menu-open");
      setTimeout(() => stopLenis(), 500);
    } else {
      html.classList.remove("nav-menu-open");
      body.classList.remove("nav-menu-open");
      setTimeout(() => startLenis(), 500);
    }
  }, [modalIsOpen, stopLenis, startLenis]);

  const openModal = () => {
    setModalIsOpen(true);
    setIsPlaying(true);
    trackVideoOpenEvent('eventTracker', 'play', data.title, 'video', data.cta.video, locale);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setIsPlaying(false);
    trackVideoEvent('eventTracker', 'pause', videoDuration, 'video', data.title, data.cta.video, currentTime.toString(), locale);
  };

  // ========= Core GSAP build (kills & rebuilds on reseed) =========
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = mediaZoomRef.current;
    const content = contentRef.current;
    if (!section || !media || !content) return;

    const ctx = gsap.context(() => {
      // initial states
      gsap.set(content, {autoAlpha: 0, y: 16 });
      gsap.set(media, {
        scale: 0.5,
        borderRadius: "0rem",
        willChange: "transform,border-radius",
        transformOrigin: "center center",
      });

      // ---- 1) Media zoom (scrubbed)
      gsap.to(media, {
        scale: 1,
        borderRadius: "0px",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // when section top hits bottom of viewport
          end: "top 40%",      // until section top reaches 40% from top
          scrub: 1.2,
          refreshPriority: -1,
        },
      });

      // ---- 2) Content reveal near end (scrubbed)
gsap.fromTo(
  content,
  { autoAlpha: 0, y: 16 },
  {
    autoAlpha: 1,
    y: 0,
    ease: "power2.out",
    immediateRender: false,           // <— add this
    scrollTrigger: {
      trigger: section,
      start: "top 30%",
      end: "top 10%",
      scrub: true,
    },
  }
);

// ---- 3) Content fade OUT when scrolling past (scrubbed)
gsap.fromTo(
  content,
  { autoAlpha: 1, y: 0 },
  {
    autoAlpha: 0,
    y: -30,
    ease: "power2.in",
    immediateRender: false,           // <— and here
    scrollTrigger: {
      trigger: section,
      start: "center 20%",
      end: "bottom top",
      scrub: true,
    },
  }
);

    }, section);

    // expose a cleanup that fully tears down this build
    cleanupRef.current = () => {
      try {
        ctx.revert();
      } catch {}
    };

    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(id);
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [reseed]);

  // ========= Handle hard refresh or late load =========
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // ========= Resize / Orientation: bucket-based + delta guard =========
  useEffect(() => {
    if (typeof window === "undefined") return;

    const BREAKPOINTS = [1920, 1680, 1440, 1280, 991, 600, 0]; // descending
    const bucketOf = (w: number) => {
      for (let i = 0; i < BREAKPOINTS.length; i++) {
        if (w >= BREAKPOINTS[i]) return BREAKPOINTS[i];
      }
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

      // clear any inline style leftovers (next build will set them)
      const media = mediaZoomRef.current;
      if (media) {
        media.style.willChange = "";
        media.style.transform = "";
        media.style.borderRadius = "";
      }
      const content = contentRef.current;
      if (content) {
        content.style.opacity = "";
        content.style.visibility = "";
        content.style.transform = "";
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

    const handlePause = () => {
    const _videoDuration = Math.round(videoDuration);
    const _currentTime = Math.round(currentTime);
    if (_videoDuration != _currentTime) {
      trackVideoEvent('eventTracker', 'pause', videoDuration, 'video', data.title, data.cta.video, currentTime.toString(), locale);
    }
  };

  const handlePlay = () => {
    if (currentTime > 1) {
      trackVideoEvent('eventTracker', 'play', videoDuration, 'video', data.title, data.cta.video, currentTime.toString(), locale);
    }
  };

  const handleEnded = () => {
    trackVideoEventByPercentage('eventTracker', 'completed', '100%', 'video', videoDuration, data.title, data.cta.video, currentTime.toString(), locale);
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    setCurrentTime(progress.playedSeconds);

    const percentWatched = Math.round(
      (progress.playedSeconds / videoDuration) * 100
    );

    if (percentWatched == 0 && progress.playedSeconds < 1) {
      trackVideoEventByPercentage('eventTracker', 'progress', '0%', 'video', videoDuration, data.title, data.cta.video, '0', locale);
    }

    if (percentWatched >= 25 && !milestones[25]) {
      trackVideoEventByPercentage('eventTracker', 'progress', '25%', 'video', videoDuration, data.title, data.cta.video, progress.playedSeconds.toString(), locale);
      setMilestones((prev) => ({ ...prev, 25: true }));
    }

    if (percentWatched >= 50 && !milestones[50]) {
      trackVideoEventByPercentage('eventTracker', 'progress', '50%', 'video', videoDuration, data.title, data.cta.video, progress.playedSeconds.toString(), locale);
      setMilestones((prev) => ({ ...prev, 50: true }));
    }

    if (percentWatched >= 75 && !milestones[75]) {
      trackVideoEventByPercentage('eventTracker', 'progress', '75%', 'video', videoDuration, data.title, data.cta.video, progress.playedSeconds.toString(), locale);
      setMilestones((prev) => ({ ...prev, 75: true }));
    }

    if (percentWatched >= 100 && !milestones[100]) {
      trackVideoEventByPercentage('eventTracker', 'progress', '100%', 'video', videoDuration, data.title, data.cta.video, videoDuration.toString(), locale);
      setMilestones((prev) => ({ ...prev, 100: true }));
    }
  };
  return (
    <>
      <section className="subscribe" id={data?._type} ref={sectionRef}>
        <div className="dotted-bg">
          <Image
            src={"/images/ground-main-dotted.png"}
            alt="bg-image"
            fill
            priority
            className="bg-img object-cover"
            sizes="100vw"
          />
        </div>

        <div className="s-bg-layer">
          <div className="ari-s-bg">
            <div className="asspect-ratio-img overflow-hidden ari-s-bg">
              {/* This is the wrapper we tween (scale 0.5 → 1) */}
              <div className="media-zoom" ref={mediaZoomRef}>
                <div className="ari-box">
                  {data?.backgroundVideo ? (
                    <video
                      className="banner-img"
                      src={data.backgroundVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                  ) : (
                    <Image
                      className="ari-box"
                      src={data?.backgroundImage ?? ""}
                      fill
                      alt="creat-destination"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content wrapper that reveals after zoom completes */}
        <div className="s-content">
          <div className="container-sm">
            <div className="sc-wrapper" ref={contentRef}>
              {data?.title && (
                <h2 className="heading1 title">{data?.title}</h2>
              )}
              {data?.cta?.title && data?.cta?.video && (
                <span className="body2 videoCta" onClick={openModal}>
                  <span className="text">{data?.cta?.title || ""}</span>
                  <span className="playIcon">
                    <SvgImage url="/svg/ground-play-icon.svg" />
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="video-modal"
        overlayClassName="video-modal-overlay modal-overlay backdrop-modal-overlay"
      >
        <div className="dotted-bg">
          <Image
            src={"/images/ground-main-dotted.png"}
            alt="bg-image"
            fill
            priority
            className="bg-img object-cover"
            sizes="100vw"
          />
        </div>
        <div className="btn-subs-cross" onClick={closeModal}>
          <span className="btn-svg-box">
            <p className="body2 closeText">Close</p>
            <SvgImage url="/svg/ground-cross-icon.svg" />
          </span>
        </div>

        {data?.cta?.video && (
          <div className="video-subs-wrapper">
            <ReactPlayer
              url={data?.cta?.video || ""}
              controls
              width="100%"
              height="100%"
              playing={isPlaying}
              className={"video-subs"}
              onDuration={(duration) => setVideoDuration(duration)}
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleEnded}
              onProgress={handleProgress}
            />
          </div>
        )}
      </Modal>
    </>
  );
};

export default Subscribe;
