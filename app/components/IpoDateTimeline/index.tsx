"use client";
import React, { JSX, useEffect, useRef, useState } from "react";
import { PortableTextBlock } from "next-sanity";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import UseMediaQuery from "../UseMediaQuery";
import SvgRenderer from "../SvgImage";
import { Swiper as SwiperType } from "swiper/types";
import { useParams } from "next/navigation";
import FadeAnim from "../FadeAnim";
import arrowRight from "../../../public/svg/ground-arrow-right.svg";
import arrowLeft from "../../../public/svg/ground-arrow-left.svg";
import Image from "next/image";
import HeadingBox from "../HeadingBox";
import SvgImage from "../SvgImage";
import { parseContentToSpans } from "@/app/utils/parserConvertor";

interface IStats {
  image?: string;
  postText?: string;
  preText?: string;
  text?: string;
  title?: string;
}

interface IInvestmentData {
  _type: string;
  title?: string;
  heading?: string;
  items: IStats[];
}

const TransactionTimeline = ({
  data,
}: {
  data: IInvestmentData;
}): JSX.Element => {
  // const stats = data?.timelineSection?.stats || [];

  const params = useParams();
  const locale: string = (params as any).locale == "ar" ? "ar" : "en";
  const isRtl = locale === "ar";

  const swiperRef = useRef<any>(null);
  const isTablet = UseMediaQuery("(max-width: 1280px)");
  const isMobile = UseMediaQuery("(max-width: 991px)");

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [shouldDisableArrows, setShouldDisableArrows] = useState(false);

  // track slidesPerView to subtract it from total
  const slidesPerView = isMobile ? 1 : 4;

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      handleSlideChange(swiperRef.current.swiper);
    }
  }, [isMobile, isTablet]);

  const checkArrowDisable = (swiper: SwiperType) => {
    const total = swiper.slides.length;
    setShouldDisableArrows(total <= slidesPerView);
  };

  const handleSlidePrev = () => {
    if (swiperRef.current?.swiper) swiperRef.current.swiper.slidePrev();
  };
  const handleSlideNext = () => {
    if (swiperRef.current?.swiper) swiperRef.current.swiper.slideNext();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setActiveIndex(swiper.activeIndex);
    setTotalSlides(swiper.slides.length);
    checkArrowDisable(swiper);
  };

  const goToGroup = (dotIndex: number) => {
    if (!swiperRef.current?.swiper) return;
    const targetIndex = dotIndex; // direct mapping since we’re showing per slide offset
    swiperRef.current.swiper.slideTo(targetIndex);
  };

  return (
    <section className="transactionTimeline sec-padding">
      {data?.heading && <HeadingBox title={data?.heading} withBG={true} />}
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
        {data?.title && (
          <div className="timelineTitle heading1">
            <h1>{parseContentToSpans(data?.title)}</h1>
          </div>
        )}

        <div className="timelineSlider">
          <Swiper
            className="slider-wrapper"
            ref={swiperRef}
            speed={700}
            onSlideChange={handleSlideChange}
            onInit={(swiper) => handleSlideChange(swiper)}
            allowTouchMove={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
                initialSlide: 0,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true,
                initialSlide: 1,
              },
              991: {
                slidesPerView: 4,
                spaceBetween: 20,
                centeredSlides: false,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: false,
              },
              1920: {
                slidesPerView: 4,
                spaceBetween: 40,
                centeredSlides: false,
              },
            }}
          >
            {data?.items?.length > 0 &&
              data?.items?.map((item: IStats, index: number) => (
                <SwiperSlide
                  className="slide-box timelineSlide"
                  key={`${item.title}-${index}`}
                >
                  <div className="timelineCard">
                    <FadeAnim
                      variant="fadeUp"
                      isRotate={true}
                      className="anim-wh-auto"
                      animationDelay={`${index * 0.2}`}
                    >
                      <div className="timelineCardContent">
                        {item?.image && (
                          <div className="timelineCardSubtitle">
                            <div className="icon">
                              <SvgImage url={item?.image} />
                            </div>
                          </div>
                        )}
                        <div className="bottomWrapper">
                          {item?.text && (
                            <p className="timelineDate display-2">{`${item?.preText ?? ""}${item?.text}${item?.postText ?? ""}`}</p>
                          )}
                          {item?.title && (
                            <p className="body2 timelineCardTitle">
                              {item.title}
                            </p>
                          )}
                        </div>
                      </div>
                    </FadeAnim>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* Controls with adjusted dots */}
       {!shouldDisableArrows && ( <div className="controls-bar">
          <ul
            className="dot-pagination"
            role="tablist"
            aria-label="Slider pagination"
          >
            {Array.from({
              length: Math.max(totalSlides - slidesPerView + 1, 0),
            }).map((_, i) => (
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
