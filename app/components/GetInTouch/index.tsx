"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import FadeAnim from "../FadeAnim";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper as SwiperType } from "swiper/types";
import HeadingBox from "../HeadingBox";
import { parseContentToSpans } from "@/app/utils/parserConvertor";
import SvgRenderer from "../SvgImage";
// ✅ arrow icons (adjust paths if needed)
import arrowRight from "../../../public/svg/ground-arrow-right.svg";
import arrowLeft from "../../../public/svg/ground-arrow-left.svg";
import TextReveal from "@/components/TextReveal/index";

// link icons
import emailIcon from "../../../public/svg/emailIcon.svg";
import globalIcon from "../../../public/svg/globalDarkIcon.svg";

interface Item {
  email?: string;
  emailLabel?: string;
  image?: string;
  mailToIcon?: string;
  mailTo?: string;
  mailToLabel?: string;
  websiteIcon?: string;
  website?: string;
  websiteLabel?: string;
  title?: string;
}

interface DescriptionChild {
  text: string;
  marks?: string[];
}

interface DescriptionBlock {
  _key: string;
  _type: string;
  style?: string;
  children: DescriptionChild[];
}

interface IAdvisor {
  title?: string;
  key?: string | null;
  description?: DescriptionBlock[];
  isSlider?: boolean | null;
  items: Item[];
}

interface GetInTouchProps {
  emailIcon?: string;
  globalIcon?: string;
  data: {
    _type: string;
    advisors: IAdvisor[];
    title: string;
    boxTitle?: string;
    heading?: string;
  };
}

type SliderUIState = {
  isBeginning: boolean;
  isEnd: boolean;
  activeIndex: number;
  totalSlides: number;
  visible: number; // slidesPerView currently active via breakpoints
  shouldDisableArrows: boolean;
};

const GetInTouch = ({ data }: GetInTouchProps) => {
  // Per-slider UI state
  const [sliderStates, setSliderStates] = useState<{
    [idx: number]: SliderUIState;
  }>({});

  // Per-slider refs
  const swiperRefs = useRef<{ [idx: number]: React.MutableRefObject<any> }>({});

  // Safely get current slidesPerView considering breakpoints
  const getVisible = (swiper: SwiperType) => {
    // swiper.params.slidesPerView can be number | "auto"
    const param = swiper?.params?.slidesPerView as unknown;
    if (typeof param === "number") return Math.max(1, Math.floor(param));
    // fallback to runtime value
    const runtime = (swiper as any)?.slidesPerView;
    if (typeof runtime === "number" && runtime > 0) return Math.floor(runtime);
    return 1;
  };

  const setStateFor = (index: number, next: Partial<SliderUIState>) => {
    setSliderStates((prev) => {
      const prevState = prev[index] || {
        isBeginning: true,
        isEnd: false,
        activeIndex: 0,
        totalSlides: 0,
        visible: 1,
        shouldDisableArrows: false,
      };
      const merged = { ...prevState, ...next };
      merged.shouldDisableArrows = merged.totalSlides <= merged.visible;
      return { ...prev, [index]: merged };
    });
  };

  const handleInitOrResize = (index: number, swiper: SwiperType) => {
    const visible = getVisible(swiper);
    const totalSlides = swiper?.slides?.length || 0;
    setStateFor(index, {
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
      activeIndex: swiper.activeIndex,
      totalSlides,
      visible,
    });
  };

  const handleSlideChange = (index: number, swiper: SwiperType) => {
    const visible = getVisible(swiper);
    const totalSlides = swiper?.slides?.length || 0;
    setStateFor(index, {
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
      activeIndex: swiper.activeIndex,
      totalSlides,
      visible,
    });
  };

  const handlePrev = (index: number) => {
    const ref = swiperRefs.current[index];
    ref?.current?.swiper?.slidePrev();
  };

  const handleNext = (index: number) => {
    const ref = swiperRefs.current[index];
    ref?.current?.swiper?.slideNext();
  };

  const goToGroup = (index: number, dotIndex: number) => {
    const ref = swiperRefs.current[index];
    ref?.current?.swiper?.slideTo(dotIndex);
  };

  return (
    <section className="advisorsSection sec-margin" id={data?._type}>
      {data?.heading && <HeadingBox title={data?.heading || ""} />}
      <div className="container">
        {data?.title && (
          <TextReveal>
            <div className="advisorsHeading heading1">
              {parseContentToSpans(data?.title)}
            </div>
          </TextReveal>
        )}

        {data?.advisors?.map((item, index) => {
          // Ensure a ref exists
          if (!swiperRefs.current[index]) {
            swiperRefs.current[index] = React.createRef();
          }

          const {
            isBeginning = true,
            isEnd = false,
            activeIndex = 0,
            totalSlides = item?.items?.length || 0,
            visible = 1,
            shouldDisableArrows = totalSlides <= visible,
          } = sliderStates[index] || {};

          // Dots count: total - visible + 1 (never negative)
          const dots = Math.max(totalSlides - visible + 1, 0);

          return (
            <div
              key={index}
              className="advisorsSliderWrapper"
              id={`${item?.key || `slider-${index}`}`}
            >
              {item?.title && (
                <FadeAnim
                  animationDelay="0.3"
                  variant="fadeUp"
                  className="anim-wh-auto"
                >
                  <h6 className="advisorsSubHeading heading6--mediun">
                    {item?.title}
                  </h6>
                </FadeAnim>
              )}

              <div className="advisorsSlider">
                {item?.isSlider ? (
                  <>
                    <Swiper
                      loop={false}
                      ref={swiperRefs.current[index]}
                      slidesPerView={1}
                      spaceBetween={20}
                      onInit={(swiper) => handleInitOrResize(index, swiper)}
                      onResize={(swiper) => handleInitOrResize(index, swiper)}
                      onSlideChange={(swiper) =>
                        handleSlideChange(index, swiper)
                      }
                      breakpoints={{
                        600: { slidesPerView: 2, spaceBetween: 30 },
                        992: { slidesPerView: 3, spaceBetween: 32 },
                        1281: { slidesPerView: 3, spaceBetween: 40 },
                      }}
                    >
                      {Array.isArray(item?.items) &&
                        item?.items?.length > 0 &&
                        item?.items.map((slideItem, slideIndex) => (
                          <SwiperSlide key={slideIndex}>
                            <FadeAnim
                              animationDelay="0.3"
                              variant="fadeUp"
                              className="anim-wh-auto"
                            >
                              <div className="advisorsSlide">
                                <div
                                  className="advisorsSlideWrapper"
                                  key={slideIndex}
                                >
                                  {slideItem?.image && (
                                    <div className="advisorLogo">
                                      <Image
                                        src={slideItem?.image}
                                        alt={slideItem?.title || "logo"}
                                        quality={100}
                                        className="advisorLogoImg"
                                        fill
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="advisorLinks">
                                  {slideItem?.email &&
                                    slideItem?.emailLabel && (
                                      <div className="styleInheriter body1">
                                        <a
                                          href={`mailto:${slideItem?.email}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {emailIcon && (
                                            <div className="icon">
                                              <SvgRenderer
                                                url={'/svg/emailIcon.svg'}
                                                className="mailToIconImg"
                                              />
                                            </div>
                                          )}
                                          <span className="body1">
                                            {slideItem?.emailLabel}
                                          </span>
                                        </a>
                                      </div>
                                    )}
                                  {slideItem?.website &&
                                    slideItem?.websiteLabel && (
                                      <div className="styleInheriter body1">
                                        <a
                                          href={slideItem?.website}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {globalIcon && (
                                            <div className="icon">
                                              <SvgRenderer
                                                url={'/svg/globalDarkIcon.svg'}
                                                className="websiteImg"
                                              />
                                            </div>
                                          )}
                                          <span className="body1">
                                            {slideItem?.websiteLabel}
                                          </span>
                                        </a>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </FadeAnim>
                          </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* ✅ Controls bar (dots + arrows) per slider */}
                    <div className="controls-bar">
                      <ul
                        className="dot-pagination"
                        role="tablist"
                        aria-label="Slider pagination"
                      >
                        {Array.from({ length: dots }).map((_, i) => (
                          <li key={i}>
                            <button
                              type="button"
                              className={`dot ${i === activeIndex ? "active" : ""}`}
                              aria-label={`Go to slide ${i + 1}`}
                              aria-current={
                                i === activeIndex ? "page" : undefined
                              }
                              onClick={() => goToGroup(index, i)}
                            />
                          </li>
                        ))}
                      </ul>

                      <div className="btn-wrap">
                        <button
                          type="button"
                          className={`ctrl-btn outline ${isBeginning || shouldDisableArrows ? "disabled" : ""}`}
                          onClick={() => handlePrev(index)}
                          disabled={isBeginning || shouldDisableArrows}
                          aria-label="Previous"
                        >
                          <SvgRenderer
                            url={arrowLeft.src}
                            className="btn-svg-icon"
                          />
                        </button>

                        <button
                          type="button"
                          className={`ctrl-btn solid ${isEnd || shouldDisableArrows ? "disabled" : ""}`}
                          onClick={() => handleNext(index)}
                          disabled={isEnd || shouldDisableArrows}
                          aria-label="Next"
                        >
                          <SvgRenderer
                            url={arrowRight.src}
                            className="btn-svg-icon"
                          />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  // Static grid mode

                  <div className="advisorsStaticGrid">
                    {item?.items?.length > 0 &&
                      item?.items?.map((slideItem, idx) => (
                        <div className="advisorsStaticGridWrapper" key={idx}>
                          <FadeAnim
                            animationDelay="0.3"
                            variant="fadeUp"
                            className="anim-wh-auto"
                          >
                            <div className="advisorsSlideWrapper">
                              {slideItem?.image && (
                                <div className="advisorLogo">
                                  <Image
                                    src={slideItem.image}
                                    alt={slideItem?.title || "logo"}
                                    quality={100}
                                    className="advisorLogoImg"
                                    fill
                                  />
                                </div>
                              )}
                            </div>
                            <div className="advisorLinks">
                              {slideItem?.email && slideItem?.emailLabel && (
                                <div className="styleInheriter body1">
                                  <a
                                    href={`mailto:${slideItem?.email}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {emailIcon && (
                                      <div className="icon">
                                         <SvgRenderer
                                            url={'/svg/emailIcon.svg'}
                                            className="mailToIconImg"
                                          />
                                      </div>
                                    )}
                                    <span className="body1">
                                      {slideItem?.emailLabel}
                                    </span>
                                  </a>
                                </div>
                              )}
                              {slideItem?.website &&
                                slideItem?.websiteLabel && (
                                  <div className="styleInheriter">
                                    <a
                                      href={slideItem?.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {globalIcon && (
                                        <div className="icon">
                                           <SvgRenderer
                                              url={'/svg/globalDarkIcon.svg'}
                                              className="websiteImg"
                                            />
                                        </div>
                                      )}
                                      <span className="body1">
                                        {slideItem?.websiteLabel}
                                      </span>
                                    </a>
                                  </div>
                                )}
                            </div>
                          </FadeAnim>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GetInTouch;
