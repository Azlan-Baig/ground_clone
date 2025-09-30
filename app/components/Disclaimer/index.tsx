"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "simplebar-react/dist/simplebar.min.css";
import ReactModal from "react-modal";
import SimpleBar from "simplebar-react";
import Select, { components } from "react-select";
import { PortableText } from "next-sanity";
import { useRouter } from "next/navigation";
import ButtonWithText from "../ButtonWithText";
import { useLenis } from "@/components/LenisProvider";
import Image from "next/image";
// import SvgRenderer from "../SvgImage";
// import close from "../../../public/svg/close.svg";

interface Option {
  value: string;
  label: string;
}

const DisclaimerModel = ({ data, locale }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [nextModalIsOpen, setNextModalIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isNotAllowed, setIsNotAllowed] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [shouldDisableArrows, setShouldDisableArrows] = useState(false);
  const { stopLenis, startLenis } = useLenis();
  const router = useRouter();
  const simpleBarRef1 = useRef<any>(null);
  const simpleBarRef2 = useRef<any>(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const holdRaf = useRef<number | null>(null);
  const popupWrapperRef = useRef<HTMLDivElement | null>(null);
  const popupContentRef1 = useRef<HTMLDivElement | null>(null);
  const popupContentRef2 = useRef<HTMLDivElement | null>(null);
  const titleBoxRef = useRef<HTMLDivElement | null>(null);
  const [scrollMaxHeight, setScrollMaxHeight] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    if (modalIsOpen) {
      setTimeout(() => {
        stopLenis();
        document.body.classList.add("cookie_active");
        document.body.classList.add("disclaimer-remove");
      }, 1000);
    } else {
      startLenis();
    }
  }, [modalIsOpen]);

const scrollSBToTop = (ref: React.RefObject<any>) => {
  const el = getSBEl(ref); // uses your existing getSBEl()
  if (!el) return false;
  // Try smooth/instant in modern browsers, fallback for others
  try {
    el.scrollTo({ top: 0, behavior: "auto" as ScrollBehavior });
  } catch {
    el.scrollTop = 0;
  }
  return true;
};

  const openNextModal = () => {
    setNextModalIsOpen(true);
    setIsScrolledToBottom(false);

    requestAnimationFrame(() => {
      // make sure viewport is at top too (optional, harmless)
      window.scrollTo({ top: 0, behavior: "auto" });

      // reset SimpleBar #2 scroll to top as soon as it mounts
      const tryReset = () => {
        const ok = scrollSBToTop(simpleBarRef2);
        if (!ok) {
          // try again next frame if not mounted yet
          requestAnimationFrame(tryReset);
        } else {
          // after we’ve reset, evaluate whether content fits
          const scrollEl2 = getSBEl(simpleBarRef2);
          if (scrollEl2) {
            const threshold = 10;
            const fits = scrollEl2.scrollHeight - scrollEl2.clientHeight <= threshold;
            if (fits) setIsScrolledToBottom(true);
            // also recompute button states
            recomputeScrollState(simpleBarRef2);
          }
        }
      };
      tryReset();
    });
  };


  const closeNextModal = () => {
    setNextModalIsOpen(false);
    document.body.classList.add("cookie_active");
    document.documentElement.classList.remove("overflow-hidden");
    localStorage.setItem("isOpenDisclaimerModal", JSON.stringify(true));
    document.body.classList.remove("disclaimer-remove");
  };

  const isNotAllowedCountry = (countryCode: string) => {
    return data?.restrictedCountries?.some(
      (country: any) => country.value === countryCode
    );
  };

  const handleSelectChange = () => {
    if (selectedOption) {
      const notAllowed = isNotAllowedCountry(selectedOption.value);
      setIsNotAllowed(notAllowed);
      setModalIsOpen(false);
      openNextModal();
    }
  };

  const handelDisAgree = () => {
    setIsNotAllowed(true);
    setModalIsOpen(false);
    openNextModal();
  };

  const handleBackToHome = () => {
    // setNextModalIsOpen(false);
    // setModalIsOpen(false);
    // router.push(`/${locale}`);
  };

  const handleScroll = (e: any) => {
    const target = e.target as HTMLElement;
    const { scrollTop, scrollHeight, clientHeight } = target;
    const threshold = 10;
    const atBottom =
      Math.abs(scrollHeight - scrollTop - clientHeight) < threshold;
    if (atBottom && !isScrolledToBottom) setIsScrolledToBottom(true);
  };

  const [menuPlacementState, setMenuPlacementState] = useState<
    "top" | "bottom"
  >("bottom");

  const CustomMenu = (props: any) => {
    // store the resolved placement
    useEffect(() => {
      setMenuPlacementState(props.placement);
    }, [props.placement]);

    return <components.Menu {...props}>{props.children}</components.Menu>;
  };
  const CustomOption = (props: any) => {
    return (
      <components.Option
        {...props}
        className={`${props.className || "check"} option-menu-${menuPlacementState}`}
      >
        {props.children}
      </components.Option>
    );
  };

  // const getSBEl = () => {
  //   console.log("testing", simpleBarRef1.current);
  //   return simpleBarRef1.current?.getScrollElement
  //     ? (simpleBarRef1.current.getScrollElement() as HTMLElement)
  //     : null;
  // };
  const getSBEl = (ref: React.RefObject<any>) => {
    return ref.current?.getScrollElement?.() || null;
  };

  // const scrollByStep = (dir: 1 | -1, step?: number) => {
  //   const el = getSBEl();
  //   if (!el) return;
  //   const base = step ?? Math.min(Math.max(el.clientHeight * 0.12, 40), 140);
  //   el.scrollBy({ top: dir * base, behavior: "smooth" });
  // };

  const scrollByStep = (
    ref: React.RefObject<any>,
    dir: 1 | -1,
    step?: number
  ) => {
    const el = getSBEl(ref);
    if (!el) return;
    const base = step ?? Math.min(Math.max(el.clientHeight * 0.12, 40), 140);
    el.scrollBy({ top: dir * base, behavior: "smooth" });
  };

  // const recomputeScrollState = () => {
  //   const el = getSBEl();
  //   console.log(el);
  //   if (!el) return;

  //   // Use the scroll container's own scroll metrics (SimpleBar mirrors content height).
  //   const overflow = Math.max(0, el.scrollHeight - el.clientHeight);
  //   const hasOverflow = overflow > 2;

  //   setShowScrollButtons(hasOverflow);

  //   if (!hasOverflow) {
  //     setCanScrollUp(false);
  //     setCanScrollDown(false);
  //     return;
  //   }
  //   const atTop = el.scrollTop <= 0;
  //   const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

  //   setCanScrollUp(!atTop);
  //   setCanScrollDown(!atBottom);
  // };

  const recomputeScrollState = (ref: React.RefObject<any>) => {
    const el = getSBEl(ref);
    if (!el) return;

    const overflow = Math.max(0, el.scrollHeight - el.clientHeight);
    const hasOverflow = overflow > 2;
    setShowScrollButtons(hasOverflow);

    if (!hasOverflow) {
      setCanScrollUp(false);
      setCanScrollDown(false);
      return;
    }

    const atTop = el.scrollTop <= 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

    setCanScrollUp(!atTop);
    setCanScrollDown(!atBottom);
  };

  // const startHold = (dir: 1 | -1) => {
  //   const el = getSBEl();
  //   if (!el) return;
  //   const tick = () => {
  //     const step = Math.min(Math.max(el.clientHeight * 0.035, 30), 90);
  //     el.scrollBy({ top: dir * step });
  //     recomputeScrollState();
  //     holdRaf.current = requestAnimationFrame(tick);
  //   };
  //   if (holdRaf.current == null) holdRaf.current = requestAnimationFrame(tick);
  // };

  const startHold = (ref: React.RefObject<any>, dir: 1 | -1) => {
    const el = getSBEl(ref);

    if (!el) return;

    const tick = () => {
      const step = Math.min(Math.max(el.clientHeight * 0.035, 30), 90);
      el.scrollBy({ top: dir * step });
      recomputeScrollState(ref); // 👈 recompute after scrolling
      holdRaf.current = requestAnimationFrame(tick);
    };

    if (holdRaf.current == null) {
      holdRaf.current = requestAnimationFrame(tick);
    }
  };

  const stopHold = () => {
    if (holdRaf.current != null) cancelAnimationFrame(holdRaf.current);
    holdRaf.current = null;
  };

  const getContentEl = (ref: React.RefObject<any>) => {
    if (ref.current?.getContentElement) {
      return ref.current.getContentElement() as HTMLElement;
    }
    const el = getSBEl(ref);
    return el?.firstElementChild as HTMLElement | null;
  };

  const computeAvailableHeight = () => {
    // Ensure SimpleBar has a finite height; otherwise, no overflow ever occurs.
    const wrap = popupWrapperRef.current; // .popupContent_wrapper
    const content = popupContentRef1.current; // .popup_content
    const title = titleBoxRef.current; // .titleBox
    if (!wrap || !content) return;

    // Use wrapper’s inner height and subtract the static siblings (title + paddings/margins)
    const wrapRect = wrap.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    // Compute vertical paddings/margins we need to respect (safe approach)
    const cs = window.getComputedStyle(content);
    const paddings =
      parseFloat(cs.paddingTop || "0") + parseFloat(cs.paddingBottom || "0");
    const margins =
      parseFloat(cs.marginTop || "0") + parseFloat(cs.marginBottom || "0");

    let reserved = paddings + margins;
    if (title) {
      const t = title.getBoundingClientRect();
      reserved += t.height;
      const ts = window.getComputedStyle(title);
      reserved +=
        parseFloat(ts.marginTop || "0") + parseFloat(ts.marginBottom || "0");
    }

    // Some spacing between buttons / container
    const gutter = 12;

    const available = Math.max(120, wrapRect.height - reserved - gutter); // clamp minimum
    setScrollMaxHeight(Math.floor(available));
  };

  useLayoutEffect(() => {
    if (!data) return;
    setCanScrollUp(false);
    setCanScrollDown(false);
    // Delay 1 frame to ensure refs (portal content) are mounted
    const rafInit = requestAnimationFrame(() => {
      computeAvailableHeight();

      const el = getSBEl(nextModalIsOpen ? simpleBarRef2 : simpleBarRef1);
      const contentEl = getContentEl(
        nextModalIsOpen ? simpleBarRef2 : simpleBarRef1
      );
      const wrap = popupWrapperRef.current;
      const content = nextModalIsOpen
        ? popupContentRef2
        : popupContentRef1.current;
      const title = titleBoxRef.current;

      if (!wrap || !content) return;
      recomputeScrollState(nextModalIsOpen ? simpleBarRef2 : simpleBarRef1);

      // Kick a few recomputes as images/fonts settle
      const f1 = requestAnimationFrame(() => {
        computeAvailableHeight();
        recomputeScrollState(nextModalIsOpen ? simpleBarRef2 : simpleBarRef1);
      });
      const t1 = setTimeout(() => {
        computeAvailableHeight();
        recomputeScrollState(nextModalIsOpen ? simpleBarRef2 : simpleBarRef1);
      }, 140);
      const t2 = setTimeout(() => {
        computeAvailableHeight();
        recomputeScrollState(nextModalIsOpen ? simpleBarRef2 : simpleBarRef1);
      }, 420);

      if (el) {
        const onScroll = () =>
          recomputeScrollState(nextModalIsOpen ? simpleBarRef2 : simpleBarRef1);
        const onWheelTouch = () =>
          recomputeScrollState(nextModalIsOpen ? simpleBarRef2 : simpleBarRef1);

        el.addEventListener("scroll", onScroll, { passive: true });
        el.addEventListener("wheel", onWheelTouch, { passive: true });
        el.addEventListener("touchmove", onWheelTouch, { passive: true });

        const ro = new ResizeObserver(() => {
          computeAvailableHeight();
          recomputeScrollState(nextModalIsOpen ? simpleBarRef2 : simpleBarRef1);
        });
        ro.observe(el);
        if (wrap) ro.observe(wrap);
        if (contentEl) ro.observe(contentEl);

        const mo = new MutationObserver(() => {
          computeAvailableHeight();
          recomputeScrollState(nextModalIsOpen ? simpleBarRef2 : simpleBarRef1);
        });
        if (contentEl) {
          mo.observe(contentEl, {
            subtree: true,
            childList: true,
            characterData: true,
          });
        }

        const onWin = () => {
          computeAvailableHeight();
          recomputeScrollState(nextModalIsOpen ? simpleBarRef2 : simpleBarRef1);
        };
        window.addEventListener("resize", onWin);

        // Cleanup
        return () => {
          cancelAnimationFrame(f1);
          clearTimeout(t1);
          clearTimeout(t2);
          el.removeEventListener("scroll", onScroll);
          el.removeEventListener("wheel", onWheelTouch);
          el.removeEventListener("touchmove", onWheelTouch);
          ro.disconnect?.();
          mo.disconnect?.();
          window.removeEventListener("resize", onWin);
          stopHold();
        };
      }
    });

    return () => cancelAnimationFrame(rafInit);
  }, [
    modalIsOpen,
    data,
    nextModalIsOpen,
    popupWrapperRef.current,
    // simpleBarRef1?.current,
  ]);

  return (
    <>
      <div ref={popupWrapperRef}>
        <ReactModal
          appElement={
            typeof window !== "undefined"
              ? (document.getElementById("__next") ?? document.body)
              : undefined
          }
          isOpen={modalIsOpen}
          contentLabel="disclaimer Modal"
          className="disclaimer-modal-2 sty2"
          overlayClassName="disclaimer-modal-overlay"
        >
          <div className="dotted-bg fixed">
            <Image
              src={"/images/ground-main-dotted.png"}
              alt="bg-image"
              fill
              priority
              className="bg-img object-cover"
              sizes="100vw"
            />
          </div>
          <div className="modal-header">
            {data?.disclaimerPage1?.title && (
              <h2 className="heading2 modal-heading">
                {data?.disclaimerPage1?.title || ""}
              </h2>
            )}
          </div>

          <div className="modal-body" ref={popupContentRef1}>
            {showScrollButtons && (
              <button
                type="button"
                className={`scroll-btn scroll-up-btn ${!canScrollUp ? "disabled" : ""}`}
                aria-label="Scroll up"
                onClick={() => scrollByStep(simpleBarRef1, -1)}
                onMouseDown={() => canScrollUp && startHold(simpleBarRef1, -1)}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={() => canScrollUp && startHold(simpleBarRef1, -1)}
                onTouchEnd={stopHold}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                >
                  <path
                    d="M12.3164 0.5L12.3164 11.5L1.31641 11.5L1.31641 0.5L12.3164 0.5Z"
                    stroke="#1F1A42"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.14844 7.33301L6.8151 4.66634L9.48177 7.33301"
                    stroke="#1F1A42"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            <SimpleBar
              className="modal-scrollbar"
              forceVisible="y"
              autoHide={false}
              data-lenis-prevent
              ref={simpleBarRef1}
            >
              <>
                {data?.disclaimerPage1?.content && (
                  <span className="body3 modal-para">
                    <PortableText
                      value={data?.disclaimerPage1?.content || []}
                    />
                  </span>
                )}
                {/* <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                  nam id, aperiam assumenda deserunt voluptatum iste temporibus
                  esse dolorem sint expedita sapiente doloribus unde est
                  delectus in non sequi, eum vitae. Eum sequi fuga inventore
                  consectetur ab exercitationem, dolores, beatae nihil ad magni
                  odit, voluptatum repellendus cum sit et reprehenderit error
                  quam at id ullam distinctio? Delectus illo quidem corporis.
                </p> */}
              </>
            </SimpleBar>
            {showScrollButtons && (
              <button
                type="button"
                className={`scroll-btn scroll-down-btn ${!canScrollDown ? "disabled" : ""}`}
                aria-label="Scroll down"
                onClick={() => scrollByStep(simpleBarRef1, 1)}
                onMouseDown={() => canScrollDown && startHold(simpleBarRef1, 1)}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={() =>
                  canScrollDown && startHold(simpleBarRef1, 1)
                }
                onTouchEnd={stopHold}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="12"
                  viewBox="0 0 13 12"
                  fill="none"
                >
                  <path
                    d="M1.32129 11.5L1.32129 0.499999L12.3213 0.5L12.3213 11.5L1.32129 11.5Z"
                    stroke="#1F1A42"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.48926 4.66699L6.82259 7.33366L4.15592 4.66699"
                    stroke="#1F1A42"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="disclaimer-modal-select-row" data-lenis-prevent>
            <Select
              placeholder={data?.disclaimerPage1?.selectCountryLabel || ""}
              isSearchable={false}
              defaultValue={selectedOption}
              onChange={(option: any) => setSelectedOption(option)}
              options={data?.allCountries || []}
              className="disclaimer-modal-select"
              classNamePrefix="disclaimer"
              menuPlacement={"auto"}
              menuPosition={"fixed"}
              data-lenis-prevent
              components={{
                Menu: CustomMenu,
                Option: CustomOption,
              }}
              classNames={{
                control: () => `my__control control-menu-${menuPlacementState}`,
                menu: () => `my__menu menu-${menuPlacementState}`, // menu wrapper
              }}
              // menuIsOpen={true}w
            />
            <div
              className="disclaimer-modal-select-btn"
              onClick={handleSelectChange}
            >
              <p className="body1medium dis-para body2">
                {data?.disclaimerPage1?.cta?.title}
              </p>
            </div>
          </div>
        </ReactModal>
      </div>

      {/* Next Modal with dynamic content based on country selection */}
      <ReactModal
        appElement={
          typeof window !== "undefined"
            ? (document.getElementById("__next") ?? document.body)
            : undefined
        }
        isOpen={nextModalIsOpen}
        contentLabel="Next Modal"
        className="disclaimer-modal-2"
        overlayClassName="disclaimer-modal-overlay"
      >
        <div className="modal-header">
          <h2 className="heading2 modal-heading">
            {isNotAllowed
              ? data?.disclaimerPage3?.title
              : data?.disclaimerPage2?.title}
          </h2>
        </div>

        <div className="modal-body" ref={popupContentRef2}>
          <div className="dotted-bg fixed">
            <Image
              src={"/images/ground-main-dotted.png"}
              alt="bg-image"
              fill
              priority
              className="bg-img object-cover"
              sizes="100vw"
            />
          </div>
          {showScrollButtons && (
            <button
              type="button"
              className={`scroll-btn scroll-up-btn ${!canScrollUp ? "disabled" : ""}`}
              aria-label="Scroll up"
              onClick={() => scrollByStep(simpleBarRef2, -1)}
              onMouseDown={() => canScrollUp && startHold(simpleBarRef2, -1)}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={() => canScrollUp && startHold(simpleBarRef2, -1)}
              onTouchEnd={stopHold}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
              >
                <path
                  d="M12.3164 0.5L12.3164 11.5L1.31641 11.5L1.31641 0.5L12.3164 0.5Z"
                  stroke="#1F1A42"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.14844 7.33301L6.8151 4.66634L9.48177 7.33301"
                  stroke="#1F1A42"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <SimpleBar
            className="modal-scrollbar"
            forceVisible="y"
            autoHide={false}
            data-lenis-prevent
            scrollableNodeProps={{ onScroll: handleScroll }}
            ref={simpleBarRef2}
          >
            <span className="body3 modal-para">
              {isNotAllowed ? (
                <PortableText value={data?.disclaimerPage3?.content || []} />
              ) : (
                <PortableText value={data?.disclaimerPage2?.content || []} />
              )}
            </span>
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo,
              explicabo possimus in aspernatur eveniet esse et saepe reiciendis
              unde eos!
            </p> */}
          </SimpleBar>
          {showScrollButtons && (
            <button
              type="button"
              className={`scroll-btn scroll-down-btn ${!canScrollDown ? "disabled" : ""}`}
              aria-label="Scroll down"
              onClick={() => scrollByStep(simpleBarRef2, 1)}
              onMouseDown={() => canScrollDown && startHold(simpleBarRef2, 1)}
              onMouseUp={stopHold}
              onMouseLeave={stopHold}
              onTouchStart={() => canScrollDown && startHold(simpleBarRef2, 1)}
              onTouchEnd={stopHold}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
              >
                <path
                  d="M1.32129 11.5L1.32129 0.499999L12.3213 0.5L12.3213 11.5L1.32129 11.5Z"
                  stroke="#1F1A42"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.48926 4.66699L6.82259 7.33366L4.15592 4.66699"
                  stroke="#1F1A42"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="modal-footer">
          {isNotAllowed &&
          data?.disclaimerPage3?.cta?.href &&
          data?.disclaimerPage3?.cta?.title ? (
            <ButtonWithText
              title={data?.disclaimerPage3?.cta?.title || ""}
              href={data?.disclaimerPage3?.cta?.href}
              className="filled body4"
              iconPosition="before"
              onClick={handleBackToHome}
            />
          ) : (
            // Only render Agree/Cancel once fully scrolled
            <>
              {data?.disclaimerPage2?.scrollDownTitle && (
                <p
                  className={`${!isScrolledToBottom ? "hide" : ""} body2 scroll-down`}
                  aria-live="polite"
                >
                  {data?.disclaimerPage2?.scrollDownTitle}
                </p>
              )}
              <div
                className={`${!isScrolledToBottom ? "hide" : ""} model-btn-wrapper`}
              >
                {data?.disclaimerPage2?.agreeCta?.title && (
                  <ButtonWithText
                    title={data?.disclaimerPage2?.agreeCta?.title || ""}
                    className="filled body4"
                    iconPosition="before"
                    onClick={closeNextModal}
                  />
                )}
                {data?.disclaimerPage2?.cancelCta?.title && (
                  <ButtonWithText
                    title={data?.disclaimerPage2?.cancelCta?.title || ""}
                    className="bordered body4"
                    iconPosition="before"
                    onClick={handelDisAgree}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </ReactModal>
    </>
  );
};

export default DisclaimerModel;
