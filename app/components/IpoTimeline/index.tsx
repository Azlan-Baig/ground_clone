"use client";
import React, { JSX, useEffect, useMemo, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import UseMediaQuery from "../UseMediaQuery";
import SvgRenderer from "../SvgImage";
import { useParams } from "next/navigation";
import FadeAnim from "../FadeAnim";
import arrowRight from "../../../public/svg/ground-arrow-right.svg";
import arrowLeft from "../../../public/svg/ground-arrow-left.svg";
import Image from "next/image";
import HeadingBox from "../HeadingBox";

interface IStats {
  image?: string;
  postText?: string;
  preText?: string;
  text?: string;
  title?: string;
  countText?:string;
  subText? : string;
  /** Start date (ISO or parseable by Date) */
  date?: string;
  /** Optional end date for ranges */
  endDate?: string;
  subTitle?: string;
}

interface IInvestmentData {
  _type: string;
  title?: string;
  heading?: string;
  stats: IStats[];
}

const TransactionTimeline = ({ data }: { data: IInvestmentData }): JSX.Element => {
  const params = useParams();
  const locale: string = (params as any).locale === "ar" ? "ar" : "en";
  const isRtl = locale === "ar";

  const swiperRef = useRef<any>(null);
  const isTablet = UseMediaQuery("(max-width: 1280px)");
  const isMobile = UseMediaQuery("(max-width: 991px)");

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [shouldDisableArrows, setShouldDisableArrows] = useState(false);

  // Slides shown at once (for dot count)
  const slidesPerView = isMobile ? 1 : 4;

  // // Month name helper (locale-aware)
  // const getMonthName = (date: Date): string => {
  //   const options: Intl.DateTimeFormatOptions = { month: "long" };
  //   return new Intl.DateTimeFormat(isRtl ? "ar-EG" : "en-US", options).format(date);
  // };

  
  // Normalize a date to start-of-day local time
  const startOfDay = (d: Date) => {
    const c = new Date(d);
    c.setHours(0, 0, 0, 0);
    return c;
  };

  // --- Prepare items: with date (required), no subTitle, sorted ASC by start date
  const items = useMemo(() => {
    return (data?.stats ?? [])
      .filter((s) => s.date && !s.subTitle)
      .slice()
      .sort((a, b) => new Date(a.date as string).getTime() - new Date(b.date as string).getTime());
  }, [data?.stats]);

  // Format the date or date range like in the second component
  const formatRange = (start: Date, end?: Date): string => {
    const sDay = start.getDate();
    const sMonth = getMonthName(start);
    const sYear = start.getFullYear();

    if (!end) {
      return `${sMonth} ${sDay}, ${sYear}`;
    }

    const eDay = end.getDate();
    const eMonth = getMonthName(end);
    const eYear = end.getFullYear();

    if (sYear === eYear) {
      if (sMonth === eMonth) {
        // Same month + year
        return `${sMonth} ${sDay}-${eDay}, ${sYear}`;
      }
      // Different months, same year
      return `${sMonth} ${sDay} - ${eMonth} ${eDay}, ${sYear}`;
    }
    // Different years
    return `${sMonth} ${sDay}, ${sYear} - ${eMonth} ${eDay}, ${eYear}`;
  };

  // Find "current event": today in [item.date, item.endDate] if endDate exists,
  // otherwise in [item.date, nextItem.date) window; else nearest past event.
  const currentEventIndex = useMemo(() => {
    if (!items.length) return null;

    const today = startOfDay(new Date()).getTime();

    // First, try to find a window containing today
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.date) continue;
      const startT = startOfDay(new Date(it.date)).getTime();

      let endT: number | null = null;
      if (it.endDate) {
        endT = startOfDay(new Date(it.endDate)).getTime();
      } else if (i + 1 < items.length && items[i + 1].date) {
        endT = startOfDay(new Date(items[i + 1].date as string)).getTime() - 1; // up to day before next starts
      }

      const inWindow =
        endT == null ? today >= startT : today >= startT && today <= endT;

      if (inWindow) return i;
    }

    // Otherwise, choose nearest past (largest start date <= today)
    let nearestIdx: number | null = null;
    let nearestTime = -Infinity;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.date) continue;
      const t = startOfDay(new Date(it.date)).getTime();
      if (t <= today && t > nearestTime) {
        nearestTime = t;
        nearestIdx = i;
      }
    }
    return nearestIdx;
  }, [items, locale]); // locale not strictly required, but harmless

  // --- Update controls state (beginning/end, dots, etc.)
  const updateControls = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setActiveIndex(swiper.activeIndex);
    setTotalSlides(items.length);
    setShouldDisableArrows(items.length <= slidesPerView);
  };

  const handleSlidePrev = () => swiperRef.current?.swiper?.slidePrev();
  const handleSlideNext = () => swiperRef.current?.swiper?.slideNext();

  // Jump to current event when Swiper ready / breakpoints change
  useEffect(() => {
    const sw: SwiperType | undefined = swiperRef.current?.swiper;
    if (!sw) return;

    updateControls(sw);

    if (currentEventIndex != null) {
      const safeIndex = Math.max(0, Math.min(currentEventIndex, items.length - 1));
      sw.slideTo(safeIndex, 0);
      updateControls(sw);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, isTablet, items.length, currentEventIndex]);

  // Dots click
  const goToGroup = (dotIndex: number) => {
    const sw: SwiperType | undefined = swiperRef.current?.swiper;
    if (!sw) return;
    sw.slideTo(dotIndex);
  };

  const getMonthName = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { month: "long" };
    return new Intl.DateTimeFormat(isRtl ? "ar-EG" : "en-US", options).format(date);
  };
    const formatDate = (
    startDate: Date,
    endDate?: Date,
  ) => {
    const startDay = startDate.getDate();
    const startMonth = getMonthName(startDate);
    const startYear = startDate.getFullYear();
  
    let formattedDate = isRtl
      ? `${startDay} ${startMonth} ${startYear}`
      : `${startMonth} ${startDay}, ${startYear}`;
  
    if (endDate) {
      const endDay = endDate.getDate();
      const endMonth = getMonthName(endDate);
      const endYear = endDate.getFullYear();
  
      if (startYear === endYear) {
        if (startMonth === endMonth) {
          formattedDate = isRtl
            ? `${startDay}-${endDay} ${startMonth} ${startYear}`
            : `${startMonth} ${startDay}-${endDay}, ${startYear}`;
        } else {
          formattedDate = isRtl
            ? `${startDay} ${startMonth} - ${endDay} ${endMonth} ${startYear}`
            : `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${startYear}`;
        }
      } else {
        formattedDate = isRtl
          ? `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`
          : `${startMonth} ${startDay}, ${startYear} - ${endMonth} ${endDay}, ${endYear}`;
      }
    }
  
    return formattedDate;
  };
  return (
    <section className="transactionTimeline sec-padding ipoTimeline" id={data?._type}>
      {data?.title && <HeadingBox title={data?.title} withBG={true} />}

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

      <div className="container">
        <div className="timelineSlider">
          <Swiper
            className="slider-wrapper"
            ref={swiperRef}
            speed={700}
            watchSlidesProgress
            onInit={(swiper) => {
              if (currentEventIndex != null) {
                const safeIndex = Math.max(0, Math.min(currentEventIndex, items.length - 1));
                swiper.slideTo(safeIndex, 0);
              }
              updateControls(swiper);
            }}
            onSetTranslate={updateControls}
            onSlideChange={updateControls}
            onResize={updateControls}
            onBreakpoint={updateControls}
            allowTouchMove={true}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 20, centeredSlides: true, initialSlide: 0 },
              600: { slidesPerView: 3, spaceBetween: 20, centeredSlides: true, initialSlide: 1 },
              991: { slidesPerView: 4, spaceBetween: 20, centeredSlides: false },
              1440: { slidesPerView: 4, spaceBetween: 30, centeredSlides: false },
              1920: { slidesPerView: 4, spaceBetween: 40, centeredSlides: false },
              1921: { slidesPerView: 4, spaceBetween: 60, centeredSlides: false },
            }}
          >
            {items.map((item: IStats, index: number) => {
              // const start = item.date ? new Date(item.date) : null;
              // const end = item.endDate ? new Date(item.endDate) : undefined;

              const isCurrent = currentEventIndex != null && index === currentEventIndex;
              const formattedDate = formatDate(
              new Date(item?.date as string),
              item.endDate ? new Date(item.endDate) : (undefined as unknown as Date)
            );

              return (
                <SwiperSlide className="slide-box timelineSlide" key={`${item.title ?? "event"}-${index}`}>
                  <div className="timelineCard">
                    <FadeAnim
                      variant="fadeUp"
                      isRotate={true}
                      className="anim-wh-auto"
                      animationDelay={`${index * 0.2}`}
                    >
                      <div className={`timelineCardContent ${isCurrent ? "active" : ""}`}>
                        <div className="bottomWrapper">
                          <div className="bottomContentWrap">
                            {item?.subText ? (
                              <>
                                <p className="body2 timelineCardTitle">{item?.subText}</p>
                              </>
                            ) : ''}
                            {formattedDate &&  !item?.subText &&(
                              <>
                                <p className="body2 timelineCardTitle">{formattedDate}</p>
                              </>
                            )}
                          </div>
                          {item?.title && (
                            <div className="description">
                              <h6 className="heading6 timelineCardTitle">{item.title}</h6>
                            </div>
                          )}
                          {item?.countText &&  <h2 className="heading2 counterHeading">{item?.countText}</h2>}
                         {/* <h2 className="heading2 counterHeading">{index + 1}</h2> */}
                        </div>
                      </div>
                    </FadeAnim>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Controls with adjusted dots */}
        {!shouldDisableArrows && (
          <div className="controls-bar">
            <ul className="dot-pagination" role="tablist" aria-label="Slider pagination">
              {Array.from({ length: Math.max(totalSlides - slidesPerView + 1, 0) }).map((_, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={`dot ${i === activeIndex ? "active" : ""}`}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === activeIndex ? "page" : undefined}
                    onClick={() => goToGroup(i)}
                  />
                </li>
              ))}
            </ul>
            <div className="btn-wrap">
              <button
                type="button"
                className={`ctrl-btn outline ${isBeginning || shouldDisableArrows ? "disabled" : ""}`}
                onClick={handleSlidePrev}
                disabled={isBeginning || shouldDisableArrows}
                aria-label="Previous"
              >
                <SvgRenderer url={arrowLeft.src} className="btn-svg-box" />
              </button>

              <button
                type="button"
                className={`ctrl-btn solid ${isEnd || shouldDisableArrows ? "disabled" : ""}`}
                onClick={handleSlideNext}
                disabled={isEnd || shouldDisableArrows}
                aria-label="Next"
              >
                <SvgRenderer url={arrowRight.src} className="btn-svg-box" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TransactionTimeline;
