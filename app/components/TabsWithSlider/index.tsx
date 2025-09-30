"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";

import SvgRenderer from "../SvgImage";
import pattern from "../../../public/images/pattern.svg";
import "simplebar-react/dist/simplebar.min.css";
import Lines from "../Lines/lines";
import { Swiper, SwiperSlide } from "swiper/react";
import icArrow from "../../../public/svg/ground-ic-arrow.svg";
import Image from "next/image";
import moreIcon from "../../../public/svg/more-icon.svg";
import UseMediaQuery from "../UseMediaQuery";
import ReactModal from "react-modal";
import SimpleBar from "simplebar-react";
import closeIcon from "../../../public/images/close-icon.svg";
import { Swiper as SwiperType } from "swiper/types";
import { PortableText, PortableTextBlock } from "next-sanity";
import FadeAnim from "../FadeAnim";
import HeadingBox from "../HeadingBox";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { useLenis } from "@/components/LenisProvider";

interface ITeamMember {
  content: PortableTextBlock[];
  designation: string;
  image: string;
  name?: string;
  title: string;
}
interface IItem {
  secondaryTitle: string;
  subtitle: string;
  title?: string;
  teamMembers: ITeamMember[];
  disableTeamPopup?: boolean;
}

interface ITeamData {
  teams: IItem[];
  title: string;
  closeButtonText: string;
  _type: string;
}

const TabsWithSlider = ({ data }: { data: ITeamData }) => {
  const [activeTab, setActiveTab] = useState(0);
  const swiperRef = useRef<any>(null);
  const isTablet = UseMediaQuery("(max-width: 1210px)");
  const isMobile = UseMediaQuery("(max-width: 768px)");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [selectedMember, setSelectedMember] = useState<ITeamMember>();
  const [shouldDisableArrows, setShouldDisableArrows] = useState(false);
  const { stopLenis, startLenis} = useLenis();
  const slidesPerView = isMobile ? 2 : isTablet ? 3 : 4;

  useEffect(() => {
    if (swiperRef.current?.swiper) handleSlideChange(swiperRef.current.swiper);
  }, [activeTab, isMobile, isTablet]);

  const checkArrowDisable = (swiper: SwiperType) => {
    const totalSlides = swiper.slides.length;
    setShouldDisableArrows(totalSlides <= slidesPerView);
  };

  const handleTabClick = (tab: number) => setActiveTab(tab);

  const handleSlidePrev = () => swiperRef.current?.swiper?.slidePrev();
  const handleSlideNext = () => swiperRef.current?.swiper?.slideNext();

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    checkArrowDisable(swiper);
  };

  useEffect(() => {
  const inst: SwiperType | undefined = swiperRef.current?.swiper;
  if (!inst) return;

  // Wait a tick so the new slides (from the new tab) are in the DOM
  const id = requestAnimationFrame(() => {
    // Make sure Swiper re-measures slides & pagination
    inst.updateSlides();
    inst.update();
    inst.pagination?.update?.();

    // Jump to the first slide (no animation to avoid flicker)
    inst.slideTo(0, 0);

    // Recompute arrows / height after the jump
    handleSlideChange(inst);
    updateSwiperHeight();
  });

  return () => cancelAnimationFrame(id);
}, [activeTab]);
  // lock body when modal open
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (modalIsOpen) {
      html.classList.add("nav-menu-open");
      body.classList.add("nav-menu-open");
      setTimeout(()=>{
        stopLenis()
      },500)
    } else {
      html.classList.remove("nav-menu-open");
      body.classList.remove("nav-menu-open");
      setTimeout(()=>{
        startLenis()
      },500)
    }
  }, [modalIsOpen]);

  const [swiperHeight, setSwiperHeight] = useState("auto");
  const updateSwiperHeight = () => {
    setTimeout(() => {
      if (swiperRef.current?.swiper) {
        const swiperWrapper = swiperRef.current.swiper.wrapperEl;
        setSwiperHeight(swiperWrapper.offsetHeight + 1);
      }
    }, 100);
  };

  useEffect(() => {
    const handleResize = () => {
      setSwiperHeight("auto");
      setTimeout(updateSwiperHeight, 200);
    };
    if (swiperRef.current?.swiper) {
      updateSwiperHeight();
      swiperRef.current.swiper.on("slideChange", updateSwiperHeight);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (item: ITeamMember) => {
    setSelectedMember(item);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);

  /* ============ SimpleBar scroll buttons ============ */
  const simpleBarRef = useRef<any>(null);
  const holdRaf = useRef<number | null>(null);

  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [scrollMaxHeight, setScrollMaxHeight] = useState<number | undefined>(
    undefined
  );

  // modal layout refs to compute available height
  const popupWrapperRef = useRef<HTMLDivElement | null>(null);
  const popupContentRef = useRef<HTMLDivElement | null>(null);
  const titleBoxRef = useRef<HTMLDivElement | null>(null);

  const getSBEl = () =>
    simpleBarRef.current?.getScrollElement
      ? (simpleBarRef.current.getScrollElement() as HTMLElement)
      : null;

  const getContentEl = () => {
    if (simpleBarRef.current?.getContentElement) {
      return simpleBarRef.current.getContentElement() as HTMLElement;
    }
    const el = getSBEl();
    return el?.firstElementChild as HTMLElement | null;
  };

  const recomputeScrollState = () => {
    const el = getSBEl();
    if (!el) return;

    // Use the scroll container's own scroll metrics (SimpleBar mirrors content height).
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

  const computeAvailableHeight = () => {
    // Ensure SimpleBar has a finite height; otherwise, no overflow ever occurs.
    const wrap = popupWrapperRef.current; // .popupContent_wrapper
    const content = popupContentRef.current; // .popup_content
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

  const scrollByStep = (dir: 1 | -1, step?: number) => {
    const el = getSBEl();
    if (!el) return;
    const base = step ?? Math.min(Math.max(el.clientHeight * 0.12, 40), 140);
    el.scrollBy({ top: dir * base, behavior: "smooth" });
  };

  const startHold = (dir: 1 | -1) => {
    const el = getSBEl();
    if (!el) return;
    const tick = () => {
      const step = Math.min(Math.max(el.clientHeight * 0.035, 30), 90);
      el.scrollBy({ top: dir * step });
      recomputeScrollState();
      holdRaf.current = requestAnimationFrame(tick);
    };
    if (holdRaf.current == null) holdRaf.current = requestAnimationFrame(tick);
  };

  const stopHold = () => {
    if (holdRaf.current != null) cancelAnimationFrame(holdRaf.current);
    holdRaf.current = null;
  };

  // Bind / measure when modal opens or member changes
  useLayoutEffect(() => {
    if (!modalIsOpen) return;

    computeAvailableHeight();

    const el = getSBEl();
    const contentEl = getContentEl();
    const wrap = popupWrapperRef.current;

    // Kick a few recomputes as images/fonts settle
    const f1 = requestAnimationFrame(() => {
      computeAvailableHeight();
      recomputeScrollState();
    });
    const t1 = setTimeout(() => {
      computeAvailableHeight();
      recomputeScrollState();
    }, 140);
    const t2 = setTimeout(() => {
      computeAvailableHeight();
      recomputeScrollState();
    }, 420);

    if (el) {
      const onScroll = () => recomputeScrollState();
      const onWheelTouch = () => recomputeScrollState();
      el.addEventListener("scroll", onScroll, { passive: true });
      el.addEventListener("wheel", onWheelTouch, { passive: true });
      el.addEventListener("touchmove", onWheelTouch, { passive: true });

      const ro = new ResizeObserver(() => {
        computeAvailableHeight();
        recomputeScrollState();
      });
      ro.observe(el);
      if (wrap) ro.observe(wrap);
      if (contentEl) ro.observe(contentEl);

      // Changes inside PortableText (e.g., async hydration) — watch DOM mutations
      const mo = new MutationObserver(() => {
        computeAvailableHeight();
        recomputeScrollState();
      });
      if (contentEl)
        mo.observe(contentEl, {
          subtree: true,
          childList: true,
          characterData: true,
        });

      // Recompute when images load
      const imgs = contentEl
        ? Array.from(contentEl.querySelectorAll("img"))
        : [];
      const imgHandlers: Array<
        [(this: GlobalEventHandlers, ev: Event) => any, HTMLImageElement]
      > = [];
      imgs.forEach((img) => {
        const h = () => {
          computeAvailableHeight();
          recomputeScrollState();
        };
        imgHandlers.push([h, img]);
        img.addEventListener("load", h);
      });

      const onWin = () => {
        computeAvailableHeight();
        recomputeScrollState();
      };
      window.addEventListener("resize", onWin);

      return () => {
        cancelAnimationFrame(f1);
        clearTimeout(t1);
        clearTimeout(t2);
        el.removeEventListener("scroll", onScroll);
        el.removeEventListener("wheel", onWheelTouch);
        el.removeEventListener("touchmove", onWheelTouch);
        ro.disconnect?.();
        mo.disconnect?.();
        imgHandlers.forEach(([h, img]) => img.removeEventListener("load", h));
        window.removeEventListener("resize", onWin);
        stopHold();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen, selectedMember]);

  return (
    <>
      <section
        className="tabs-with-slider-wrapper sec-padding"
        id={data?._type}
      >
        <div className="dotted-bg">
          <Image
            src={"/images/ground-main-dotted2.png"}
            alt="bg-image"
            fill
            priority
            className="bg-img object-cover"
            sizes="100vw"
          />
        </div>
        <div className="section-header">
          {data?.title && <HeadingBox title={data?.title} withBG={true} />}
        </div>
        <div className="container">
          <div className="tabs-with-slider">
            {/* Tab Navigation */}
            <div className="tab-nav">
              {data?.teams?.length > 0 &&
                data?.teams?.map((item, index) => (
                  <div
                    key={index}
                    className={`${activeTab === index ? "active" : ""} tab-title-wrap`}
                    onClick={() => handleTabClick(index)}
                  >
                    {item?.title && (
                      <FadeAnim variant="fadeUp" className="anim-wh-auto">
                        <div className="body2 tab-title">
                          <p>{item?.title}</p>
                          {
                            <div className="iconBox">
                              <div className="icon-wrapper">
                                <span></span>
                                <span></span>
                              </div>
                            </div>
                          }
                        </div>
                        <Lines startPosition={"top bottom"} />
                      </FadeAnim>
                    )}
                  </div>
                ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              <Swiper
                style={{ height: swiperHeight }}
                slidesPerView={4}
                className="slider-wrapper"
                ref={swiperRef}
                speed={700}
                onSlideChange={handleSlideChange}
                onInit={(swiper) => handleSlideChange(swiper)}
                allowTouchMove={true}
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  el: ".swiper-pagination-custom",
                  bulletClass: "custom-bullet",
                  bulletActiveClass: "custom-bullet-active",
                }}
                breakpoints={{
                  0: { slidesPerView: 1, spaceBetween: 20 },
                  600: { slidesPerView: 3, spaceBetween: 20 },
                  991: { slidesPerView: 4, spaceBetween: 29 },
                  1440: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    centeredSlides: false,
                  },
                  1920: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    centeredSlides: false,
                  },
                }}
              >
                {data?.teams?.length > 0 &&
                  data?.teams[activeTab]?.teamMembers?.map((item, index) => {
                    return (
                      <SwiperSlide className="slide-box" key={index}>
                        <FadeAnim
                          variant="fadeUp"
                          isRotate={true}
                          className="anim-wh-auto cs-slider"
                          animationDuration="1.2"
                          animationDelay={`${index * 0.2}`}
                        >
                          {item?.image && (
                            <div className="slide-img-wrap asspect-ratio-img tabs-with-slider-img">
                              <Image
                                src={item?.image}
                                alt="leader-image"
                                layout="fill"
                                quality={100}
                              />
                            </div>
                          )}
                          <div className="card-body">
                            <div className={`card-content-wrap ${activeTab === 0 ? 'firstSlider' : ''}`}>
                              {item?.name && (
                                <div className="body1 card-title">
                                  <p>{item?.name}</p>
                                </div>
                              )}
                              {item?.designation && (
                                <div className="body3 card-subtitle">
                                  <p>{item?.designation}</p>
                                </div>
                              )}
                            </div>
                            {!data?.teams[activeTab]?.disableTeamPopup && (
                              <button
                                className="rounded_btn"
                                onClick={() => openModal(item)}
                              >
                                <SvgRenderer
                                  url={moreIcon.src}
                                  className="btn-svg-box"
                                />
                              </button>
                            )}
                          </div>
                        </FadeAnim>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>

              {/* Arrows */}
              <div
                className={`${shouldDisableArrows ? "marginHide" : ""} pagination--wrapper`}
              >
                {/* ✅ Dots outside Swiper */}
                <div
                  className={`slider-dots-wrap ${shouldDisableArrows ? "hide" : ""}`}
                >
                  <div className="swiper-pagination-custom"></div>
                </div>
                {!shouldDisableArrows && (
                  <div
                    className={`slider-arrows-wrap ${shouldDisableArrows ? "disabled-btn" : ""}`}
                  >
                    <button
                      className={`slider_arrow ${isBeginning ? "disabled" : ""}`}
                      onClick={handleSlidePrev}
                    >
                      <SvgRenderer url={icArrow.src} className="btn-svg-box" />
                    </button>
                    <button
                      className={`slider_arrow ${isEnd ? "disabled" : ""}`}
                      onClick={handleSlideNext}
                    >
                      <SvgRenderer
                        url={icArrow.src}
                        className="btn-svg-box arrow-left"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="leader Modal"
        className="leader-modal"
        overlayClassName="leader-modal-overlay backdrop-modal-overlay"
      >
        <div className="popup--wrapper">
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

        <div className="popupContent_wrapper" ref={popupWrapperRef}>
          <div className="sec-img">
            {selectedMember?.image && (
              <div className="slide-img-wrap asspect-ratio-img tabs-with-slider-img">
                <Image
                  src={selectedMember?.image}
                  alt="leader-image"
                  layout="fill"
                  quality={100}
                />
              </div>
            )}
          </div>

          <div className="popup_content" ref={popupContentRef}>
            <div className="titleBox" ref={titleBoxRef}>
              {selectedMember?.name && (
                <div className="heading3 modal-heading">
                  <h3>{selectedMember?.name}</h3>
                </div>
              )}
              {selectedMember?.designation && (
                <div className="body1 modal-subHeading">
                  <p>{selectedMember?.designation} </p>
                </div>
              )}
            </div>

            {/* ===== Scrollable text with Up/Down buttons ===== */}
            <div className="modal-scroll-wrap">
              {showScrollButtons && (
                <button
                  type="button"
                  className={`scroll-btn scroll-up-btn ${!canScrollUp ? "disabled" : ""}`}
                  aria-label="Scroll up"
                  onClick={() => scrollByStep(-1)}
                  onMouseDown={() => canScrollUp && startHold(-1)}
                  onMouseUp={stopHold}
                  onMouseLeave={stopHold}
                  onTouchStart={() => canScrollUp && startHold(-1)}
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

              {/* The key: give SimpleBar a concrete maxHeight */}
              <SimpleBar
                className="modal-scrollbar"
                forceVisible="y"
                  data-lenis-prevent
                autoHide={false}
                ref={simpleBarRef}
                style={
                  scrollMaxHeight ? { maxHeight: scrollMaxHeight } : undefined
                }
              >
                {selectedMember?.content &&
                  selectedMember?.content?.length > 0 && (
                    <span className="body3 modal-para">
                      <PortableText value={selectedMember?.content || []} />
                    </span>
                  )}
              </SimpleBar>

              {showScrollButtons && (
                <button
                  type="button"
                  className={`scroll-btn scroll-down-btn ${!canScrollDown ? "disabled" : ""}`}
                  aria-label="Scroll down"
                  onClick={() => scrollByStep(1)}
                  onMouseDown={() => canScrollDown && startHold(1)}
                  onMouseUp={stopHold}
                  onMouseLeave={stopHold}
                  onTouchStart={() => canScrollDown && startHold(1)}
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
            {/* ===== /scrollable area ===== */}
          </div>
        </div>

        {data?.closeButtonText && (
          <button className="close--btn" onClick={closeModal}>
            <div className="body2">
              <p>{data?.closeButtonText}</p>
            </div>
            <SvgRenderer url={closeIcon.src} className="btn-svg-box" />
          </button>
        )}

        </div>
      </ReactModal>
    </>
  );
};

export default TabsWithSlider;
