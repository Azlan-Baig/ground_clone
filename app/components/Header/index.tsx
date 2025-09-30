"use client";
import { useState, useEffect, useRef, JSX, MouseEvent } from "react";
import SvgImage from "../SvgImage";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { PortableText, PortableTextBlock } from "next-sanity";
import { trackNavigationClick, trackSocialClick } from "@/app/utils/Helpers";
type HeaderProps = {
  data: {
    logo: string;
    menu: {
      key: string;
      title: string;
      icon?: string;
      customUrlEnable: boolean;
      href: string;
    }[];
    cta: { title: string; href: string; target?: string };
    socialLinks: { url: string; icon: string; isAnchorBlank: boolean ; name: string }[];
    copyRightText: PortableTextBlock[];
    menuBg: string;
    languages: { code: string; title: string }[];
  };
  menuBg?: string;
  bannerId?: string;
};

const LOCALES = new Set(["en", "ar"]);

// ---- Lenis helpers ----
type LenisLike = { scrollTo: (target: any, opts?: any) => void } | undefined;
const getLenis = (): LenisLike =>
  typeof window !== "undefined" ? (window as any)?.lenis : undefined;

const getStickyOffset = () => {
  if (typeof window === "undefined") return 0;
  const stickyEl =
    document.querySelector(".container-head.sticky") ||
    document.querySelector(".container-head") ||
    document.querySelector("header");
  const h = (stickyEl as HTMLElement)?.offsetHeight ?? 0;
  return -h; // small negative to land just below the sticky header
};

const smoothScrollToId = (id: string) => {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const offset = getStickyOffset();
  const lenis = getLenis();

  if (lenis?.scrollTo) {
    lenis.scrollTo(el, { offset });
  } else {
    const top = window.scrollY + el.getBoundingClientRect().top + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  // update hash without jumping
  history.replaceState(null, "", `#${id}`);
};

const Header = ({ data, menuBg, bannerId }: HeaderProps): JSX.Element => {
  const pathname = usePathname() || "/";
  const router = useRouter();

  // locale from first path segment (e.g., /en/about -> "en")
  const segments = pathname.split("/");
  const firstSeg = segments[1] || "";
  const currentLocale = LOCALES.has(firstSeg)
    ? firstSeg
    : (data?.languages?.[0]?.code ?? "en");

  const selectedObj = data?.languages?.find((l) => l.code === currentLocale);
  const otherLangs = (data?.languages ?? []).filter(
    (l) => l.code !== currentLocale
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Hide-on-scroll state
  const [isHidden, setIsHidden] = useState(false);
  const lastYRef = useRef(0);
  const lastDirRef = useRef<"up" | "down">("down");
  const upAccumRef = useRef(0);

  // 🌐 active section id for link highlighting
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const visibleRatiosRef = useRef<Map<string, number>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔑 Lock body/html when menu is opened
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isOpen) {
      html.classList.add("nav-menu-open");
      body.classList.add("nav-menu-open");
    } else {
      html.classList.remove("nav-menu-open");
      body.classList.remove("nav-menu-open");
    }
  }, [isOpen]);

  // ⬇️ Keep CSS var --headerHeight in sync with .container-head height
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const headerEl = document.querySelector(".container-head") as
      | HTMLElement
      | null;
    if (!headerEl) return;

    const setVar = () => {
      const h = headerEl.offsetHeight || 0;
      root.style.setProperty("--headerHeight", `${h}px`);
    };

    setVar();

    const ro = new ResizeObserver(() => setVar());
    ro.observe(headerEl);

    const onLoad = () => setVar();
    const onOrientation = () => setTimeout(setVar, 60);

    window.addEventListener("load", onLoad);
    window.addEventListener("orientationchange", onOrientation);

    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(setVar).catch(() => {});
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("load", onLoad);
      window.removeEventListener("orientationchange", onOrientation);
    };
  }, []);

  // 🎯 Active link based on which section crosses the viewport center (50%)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sectionIds =
      (data?.menu || [])
        .filter((m) => !m.customUrlEnable && !!m.key)
        .map((m) => m.key) || [];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    let raf = 0;

    const pickActive = () => {
      const vh = window.innerHeight || 0;
      const centerY = vh * 0.5;
      let bestId: string | null = null;
      let bestDist = Infinity;

      for (const el of sections) {
        const r = el.getBoundingClientRect();
        const inBand = r.top <= centerY && r.bottom >= centerY;
        if (inBand) {
          const sectionCenter = (r.top + r.bottom) / 2;
          const dist = Math.abs(sectionCenter - centerY);
          if (dist < bestDist) {
            bestDist = dist;
            bestId = el.id;
          }
        }
      }

      if (bestId && bestId !== activeKey) {
        setActiveKey(bestId);
      }
    };

    const onScrollOrResize = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pickActive);
    };

    pickActive();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.menu]);

  // 👇 Hide on scroll down, reveal after 50px upward
  useEffect(() => {
    if (typeof window === "undefined") return;

    const UP_SHOW_DELTA = 120; // reveal after scrolling up this much
    const TOP_BUFFER = 10; // always show near top
    const HIDE_AFTER_Y = 80; // don't hide until you’ve scrolled a bit

    let raf = 0;

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      const y = Math.max(window.scrollY, 0);
      const lastY = lastYRef.current;

      // Keep header visible while mobile menu is open
      if (isOpen) {
        if (isHidden) setIsHidden(false);
        lastYRef.current = y;
        lastDirRef.current = "down";
        upAccumRef.current = 0;
        return;
      }

      // Always show near the very top
      if (y <= TOP_BUFFER) {
        if (isHidden) setIsHidden(false);
        lastYRef.current = y;
        lastDirRef.current = "down";
        upAccumRef.current = 0;
        return;
      }

      const dir: "up" | "down" = y > lastY ? "down" : "up";

      if (dir !== lastDirRef.current) {
        upAccumRef.current = 0; // reset when direction flips
        lastDirRef.current = dir;
      }

      if (dir === "down") {
        if (y > HIDE_AFTER_Y && !isHidden) setIsHidden(true);
      } else {
        // up
        upAccumRef.current += lastY - y; // positive when moving up
        if ((upAccumRef.current >= UP_SHOW_DELTA || y <= TOP_BUFFER) && isHidden) {
          setIsHidden(false);
        }
      }

      lastYRef.current = y;
    };

    // init
    lastYRef.current = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isOpen, isHidden]);

  // Locale switcher — replace first segment, keep the rest + hash
  const switchLocale = (nextLocale: string) => {
    if (!nextLocale || nextLocale === currentLocale) return;

    const segs = pathname.split("/");
    const newSegs = [...segs];

    if (LOCALES.has(segs[1] ?? "")) {
      newSegs[1] = nextLocale;
    } else {
      newSegs.splice(1, 0, nextLocale);
    }

    const newPath = newSegs.join("/") || `/${nextLocale}`;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    setIsOpen(false);
    router.push(`${newPath}${hash}`, { scroll: false });
  };

  // Intercept nav clicks for in-page sections and use Lenis
  const handleNavClick = (
    e: MouseEvent<HTMLAnchorElement>,
    key?: string,
    customUrlEnable?: boolean,
    title?: string
  ) => {
    if (customUrlEnable || !key) return; // external/custom links pass through
    const el = document.getElementById(key);
    if (!el) return;
    e.preventDefault();
    setIsOpen(false);
    smoothScrollToId(key);
    if(title){
      trackNavigationClick(title);
    }
  };

  const navLinkClass = (base: string, itemKey?: string) =>
    `${base}${activeKey && itemKey === activeKey ? " active" : ""}`;

  // Single-click logo scroll to banner section (Lenis + offset)
  const handleLogoClick = (e?: MouseEvent) => {
    if (!bannerId) return;
    e?.preventDefault();
    // ensure layout settled, then scroll
    requestAnimationFrame(() => {
      smoothScrollToId(bannerId);
    });
  };

  return (
    <header className={`header ${isSticky ? "sticky" : ""} ${isHidden ? "hidden" : ""}`}>
      <div className={`container-head ${isSticky ? "sticky" : ""}`}>
        {/* Logo */}
        {!!data?.logo && (
          <a className="logo" href={bannerId ? `#${bannerId}` : "#"} onClick={handleLogoClick} aria-label="Scroll to top/banner">
            <SvgImage url={data.logo} />
          </a>
        )}

        <div className="ctaWrap">
          {/* Desktop Nav */}
          {Array.isArray(data?.menu) && data.menu.length > 0 && (
            <nav className="nav">
              {data.menu.map(
                (item, index) =>
                  (item?.key || item?.href) &&
                  item?.title && (
                    <a
                      key={index}
                      target={item?.customUrlEnable ? "_blank" : undefined}
                      href={(item?.customUrlEnable ? item?.href : `#${item?.key}`) ?? ""}
                      onClick={(e) => handleNavClick(e, item?.key, item?.customUrlEnable , item.title)}
                      className={navLinkClass("body2", item?.key)}
                      aria-current={activeKey && item?.key === activeKey ? "true" : undefined}
                    >
                      <span>{item.title}</span>
                      {item?.icon && <SvgImage url={item.icon} />}
                    </a>
                  )
              )}
            </nav>
          )}

          {/* CTA + Language (only languages shown here per your code) */}
          {Array.isArray(otherLangs) &&
            otherLangs?.length > 0 &&
            otherLangs?.map(
              (language, index) =>
                language?.title &&
                language?.code && (
                  <div key={index} className="actions">
                    <button
                      onClick={() => switchLocale(language?.code)}
                      className="lang"
                      aria-label={`Switch to ${language?.title}`}
                    >
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M12.8164 2C10.1642 2 7.6207 3.05357 5.74534 4.92893C3.86997 6.8043 2.81641 9.34784 2.81641 12C2.81641 14.6522 3.86997 17.1957 5.74534 19.0711C7.6207 20.9464 10.1642 22 12.8164 22C15.4686 22 18.0121 20.9464 19.8875 19.0711C21.7628 17.1957 22.8164 14.6522 22.8164 12C22.8164 9.34784 21.7628 6.8043 19.8875 4.92893C18.0121 3.05357 15.4686 2 12.8164 2Z"
                          stroke="#001E42"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M2.81641 12H22.8164" stroke="#001E42" strokeLinecap="round" strokeLinejoin="round" />
                        <path
                          d="M12.8164 2C15.3177 4.73835 16.7392 8.29203 16.8164 12C16.7392 15.708 15.3177 19.2616 12.8164 22C10.3151 19.2616 8.89365 15.708 8.81641 12C8.89365 8.29203 10.3151 4.73835 12.8164 2Z"
                          stroke="#001E42"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="lang-text body2">{language.title}</p>
                    </button>
                  </div>
                )
            )}

          {/* Hamburger */}
          <button
            className={`hamburger ${isOpen ? "open" : ""}`}
            onClick={() => setIsOpen((v) => !v)}
            aria-label="menu toggle"
          >
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobileMenu container ${isOpen ? "open" : ""}`}>
        <div className="mob-menu-content">
          <div className="nav-mob">
            {Array.isArray(data?.menu) &&
              data.menu.length > 0 &&
              data.menu.map(
                (item, index) =>
                  (item?.key || item?.href) &&
                  item?.title && (
                    <a
                      onClick={(e) => {
                        handleNavClick(e, item?.key, item?.customUrlEnable , item.title);
                        if (!item?.customUrlEnable && item?.key) setIsOpen(false);
                      }}
                      key={index}
                      target={item?.customUrlEnable ? "_blank" : undefined}
                      href={(item?.customUrlEnable ? item?.href : `#${item?.key}`) ?? ""}
                      className={navLinkClass("body1", item?.key)}
                      aria-current={activeKey && item?.key === activeKey ? "true" : undefined}
                    >
                      {item.title}
                      {item?.icon && <SvgImage url={item.icon} />}
                    </a>
                  )
              )}
          </div>

          {Array.isArray(otherLangs) &&
            otherLangs?.length > 0 &&
            otherLangs?.map(
              (language, index) =>
                language?.title &&
                language?.code && (
                  <div key={index} className="mob-actions">
                    <button
                      onClick={() => switchLocale(language.code)}
                      className="lang"
                      aria-label={`Switch to ${language.title}`}
                    >
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M12.8164 2C10.1642 2 7.6207 3.05357 5.74534 4.92893C3.86997 6.8043 2.81641 9.34784 2.81641 12C2.81641 14.6522 3.86997 17.1957 5.74534 19.0711C7.6207 20.9464 10.1642 22 12.8164 22C15.4686 22 18.0121 20.9464 19.8875 19.0711C21.7628 17.1957 22.8164 14.6522 22.8164 12C22.8164 9.34784 21.7628 6.8043 19.8875 4.92893C18.0121 3.05357 15.4686 2 12.8164 2Z"
                          stroke="#001E42"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M2.81641 12H22.8164" stroke="#001E42" strokeLinecap="round" strokeLinejoin="round" />
                        <path
                          d="M12.8164 2C15.3177 4.73835 16.7392 8.29203 16.8164 12C16.7392 15.708 15.3177 19.2616 12.8164 22C10.3151 19.2616 8.89365 15.708 8.81641 12C8.89365 8.29203 10.3151 4.73835 12.8164 2Z"
                          stroke="#001E42"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="lang-text body2">{language?.title}</p>
                    </button>
                  </div>
                )
            )}
        </div>

        <div className="bottom-sec">
          {!!data?.copyRightText?.length && (
            <div className="body3 disclaimer">
              <PortableText value={data.copyRightText} />
            </div>
          )}

          <div className="social-icons">
            {data?.socialLinks?.length > 0 &&
              data?.socialLinks?.map(
                (social, index) =>
                  social?.icon &&
                  social?.url && (
                    <a
                      key={index}
                      target={social?.isAnchorBlank ? "_blank" : undefined}
                      href={social.url}
                      className="icon"
                      onClick={() => trackSocialClick(social.name)}
                    >
                      <SvgImage url={social?.icon} />
                    </a>
                  )
              )}
          </div>
        </div>

        {/* Background */}
        {menuBg && (
          <div className="mob-bg">
            <Image
              src={menuBg}
              alt="bg-image"
              fill
              priority
              className="bg-img object-cover"
              sizes="100vw"
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
