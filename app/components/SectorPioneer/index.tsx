"use client";
import React from "react";
import Image from "next/image";
import HeadingBox from "../HeadingBox";
import { PortableText, PortableTextBlock } from "next-sanity";
import { parseContentToSpans } from "@/app/utils/parserConvertor";
import ParallaxAnim from "../ParallaxAnim";
import TextReveal from "@/components/TextReveal/index";
import TextFadeUp from "@/components/TextFadeUp/index";
import FadeAnim from "../FadeAnim";
import UseMediaQuery from "../UseMediaQuery";

type Bullet = { text: string };

type SectorPioneerData = {
  subtitle?: string;
  title: string; // can include <span> for lighter words
  description: PortableTextBlock[];
  image: string;
  imageMobile: string;
  imageLqip: string;
  heading?: string;
  imageMobileLqip?: string;
  _type?: string;
  items: {
    title: string;
    omPoints: Bullet[];
    ifmTitle: string;
    description: PortableTextBlock[];
  }[];
};

export default function SectorPioneer({ data }: { data: SectorPioneerData }) {
  const isSmallScreen = UseMediaQuery("(max-width: 600px)");
  
  return (
    <section className="sp sec-margin" id={data?._type}>
      {data?.heading && <HeadingBox title={data?.heading} />}
      <div className="container">
        {/* Top row */}
        <div className="sp__top">
          <div className="sp__copy">
            {data?.title && (
              <div className="sp__title heading1">
                <TextReveal>{parseContentToSpans(data?.title)}</TextReveal>
              </div>
            )}

            {/* <p className="sp__desc body2">{data.description}</p> */}
            {data?.description.length > 0 && (
              <div className="sp__desc body2">
                <TextReveal>
                  <PortableText value={data?.description || []} />
                </TextReveal>
              </div>
            )}
          </div>

          {data?.image && (
            <div className="sp__media">
              <div className="">
                <ParallaxAnim className="sp__media-card">
                  <Image
                    src={
                      isSmallScreen && data?.imageMobile
                        ? data?.imageMobile
                        : data?.image
                    }
                    unoptimized
                    placeholder={data?.imageMobileLqip || data?.imageLqip ? 'blur' : 'empty'}
                    blurDataURL={isSmallScreen ? data?.imageMobileLqip : data?.imageLqip}
                    alt="Sector"
                    fill
                    className="sp__media-img"
                  />
                </ParallaxAnim>
              </div>
            </div>
          )}
        </div>
        {/* Bottom cards */}
        <FadeAnim variant="fadeUp" className="anim-wh-auto">
          <div className="sp__cards">
            {data?.items?.length > 0 &&
              data?.items.map((item, index) => (
                <div key={index} className="sp-card">
                  {item?.title && (
                      <h6 className="sp-card__title heading6--medium heading6">
                        {item?.title}
                      </h6>
                  )}
                  {/* <ul className="sp-card__list">
                    {data.comparison.omPoints.map((b, i) => (
                      <li className="body2" key={i}>
                        {b?.text}
                      </li>
                    ))}
                  </ul> */}
                  {item?.description && item?.description?.length > 0 && (
                    <div className="sp-card__list body2 portableContent">
                      <PortableText value={item?.description} />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </FadeAnim>
      </div>
    </section>
  );
}
