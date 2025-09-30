"use client";
import { useEffect, useRef, useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import SvgRenderer from "../SvgImage";
import { Swiper, SwiperSlide } from "swiper/react";
import chevronRight from "../../../public/svg/chevron-right.svg";
import chevronLeft from "../../../public/svg/chevron-left.svg";
import Image from "next/image";
// import HeadingParaPattren from "../HeadingParaPattren";
// import ipoBanner from "../../../public/images/ipo-banner.png";
import { EffectFade } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";
import Lines from "../Lines/lines";
import FadeAnim from "../FadeAnim";
import ParallaxAnim from "../ParallaxAnim";
import UseMediaQuery from "../UseMediaQuery";

const InitialPublicOffering = ({ data }: any) => {
  const swiperRef = useRef<any>(null);
  const isTablet = UseMediaQuery("(max-width: 1680px)");
  const isMobile = UseMediaQuery("(max-width: 767px)");
  const isSmallScreen = UseMediaQuery("(max-width: 600px)");
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [shouldDisableArrows, setShouldDisableArrows] = useState(false);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      // Call handleSlideChange with the current swiper instance
      handleSlideChange(swiperRef.current.swiper);
    }
  }, [isMobile, isTablet]);

  const slidesPerView = 1;

  // Function to check if arrow buttons should be disabled
  const checkArrowDisable = (swiper: SwiperType) => {
    const totalSlides = swiper.slides.length; // Total number of slides
    if (totalSlides <= slidesPerView) {
      setShouldDisableArrows(true);
    } else {
      setShouldDisableArrows(false);
    }
  };

  const handleSlidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const handleSlideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setActiveIndex(swiper.activeIndex);
    checkArrowDisable(swiper);
  };

  return (
    <section className="initial-public-offering-wrapper" id={data?._type}>
      <div className="sec-background-wrap">
        <div className="background-box">
          <ParallaxAnim className="asspect-ratio-img ari-ipow-bg">
            <Image
              className="ari-box"
              src={isSmallScreen ? data?.mobileImage : data?.image}
              alt="ipo-banner"
              fill
            />
          </ParallaxAnim>
        </div>
      </div>
      <div className="container">
        <div className="sec-content-wrap">
         
          <div className="slider-with-links">
            <div className="slider-with-shape-box">
              <div className="shape-box">
                <FadeAnim variant="fadeUp" className="anim-wh-auto">
                  <div className="shape-wrap"></div>
                </FadeAnim>
              </div>
              <Swiper
                slidesPerView={1}
                className="slider-wrapper"
                ref={swiperRef}
                noSwiping
                noSwipingClass={"swiper-no-swiping"}
                speed={700}
                modules={[EffectFade]}
                effect="fade"
                fadeEffect={{
                  crossFade: true,
                }}
                onSlideChange={handleSlideChange}
                onInit={(swiper) => handleSlideChange(swiper)} // to set initial state
                allowTouchMove={false}
              >
                {Array.isArray(data?.stats) &&
                  data?.stats.length > 0 &&
                  data?.stats.map((item: any, index: number) => {
                    return (
                      <SwiperSlide
                        className="slide-box swiper-no-swiping"
                        key={index}
                      >
                        <FadeAnim variant="fadeUp" className="anim-wh-auto">
                          <p className="display-1 display-1--bold display-1--public-offering slide-content">
                            {item?.title}
                          </p>
                        </FadeAnim>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>

            <div className="links-box">
              <div
                className={`link-items ${shouldDisableArrows ? "link-items-arrows-disable" : ""}`}
              >
                {Array.isArray(data?.stats) &&
                  data?.stats.length > 0 &&
                  data?.stats.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className={`link-with-line ${activeIndex === index ? "active" : ""}`}
                      >
                        <FadeAnim variant="fadeUp" className="anim-wh-auto">
                          <h5 className="heading5 link-txt">
                            {item?.subtitle}
                          </h5>
                          <Lines startPosition={"top bottom"} />
                        </FadeAnim>
                      </div>
                    );
                  })}
              </div>
              {data?.content && (
                <p className="body2-para public-slider-para-mob">
                  {data?.content}
                </p>
              )}
            </div>
            <div
              className={`slider-arrows-wrap ${shouldDisableArrows ? "disabled-btn" : ""}`}
            >
              <button
                className={`rotate-btn default ${isBeginning ? "disabled" : ""}`}
                onClick={handleSlidePrev}
              >
                <SvgRenderer url={chevronLeft.src} className="btn-svg-box" />
              </button>
              <button
                className={`rotate-btn default ${isEnd ? "disabled" : ""}`}
                onClick={handleSlideNext}
              >
                <SvgRenderer url={chevronRight.src} className="btn-svg-box" />
              </button>
            </div>
          </div>
          {data?.content && (
            <div className="para-box">
              <p className="body2-para public-slider-para">{data?.content}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InitialPublicOffering;
