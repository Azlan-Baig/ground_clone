"use client";
import React from "react";
import HeadingBox from "../HeadingBox";
import Image from "next/image";
import { PortableText, PortableTextBlock } from "next-sanity";
import { parseContentToSpans } from "@/app/utils/parserConvertor";
import ParallaxAnim from "../ParallaxAnim";
import TextReveal from "@/components/TextReveal/index";
import TextFadeUp from "@/components/TextFadeUp/index";
import CountAnim from "../CountAnim";
import UseMediaQuery from "../UseMediaQuery";

type IpoOverViewProps = {
  data: {
    heading?: string;
    image?: string;
    imageMobile?: string;
    title?: string;
    _type?: string;
    bottomText?: string;
    imageLqip?: string;
    imageMobileLqip?: string;
    description?: PortableTextBlock[];
    items?: {
      postFix?: string;
      title?: string;
      value?: string;
      preFix?: string;
      isCounterEnable?: boolean
    }[];
  };
};

export default function IpoOverview({ data }: IpoOverViewProps) {
  const isSmallScreen = UseMediaQuery("(max-width: 600px)");
  return (
    <section className="ipo-section sec-margin" id={data?._type}>
      {data?.heading && <HeadingBox title={data?.heading} />}
      <div className="container">
        {data?.title && (
          <div className="heading1 mainHeading">
            <TextReveal>{parseContentToSpans(data?.title)}</TextReveal>
          </div>
        )}

        <div className="offer-section">
          <div className="offer-content sty2 body2">
            {data?.description && data?.description?.length > 0 && (
              <TextReveal>
                <PortableText value={data?.description || []} />
              </TextReveal>
            )}
          </div>
        </div>

        <div className="offer-section">
          <div className="offer-wrapper">
            {data?.image && (
              <div className="offer-image">
                <ParallaxAnim className="parallaxPT">
                  <Image
                    fill
                    unoptimized
                     placeholder={data?.imageMobileLqip || data?.imageLqip ? 'blur' : 'empty'}
                    blurDataURL={isSmallScreen ? data?.imageMobileLqip : data?.imageLqip}
                    src={
                      isSmallScreen && data?.imageMobile
                        ? data?.imageMobile
                        : data?.image
                    }
                    alt="Offer team"
                  />
                </ParallaxAnim>
              </div>
            )}

            <div className="offer-content">
              {Array.isArray(data?.items) &&
                data?.items?.length > 0 &&
                data?.items.map((item, index) => (
                  <div key={index} className="offer-item">
                    {item?.value && (
                      <TextFadeUp>
                        <h2 className="offer-number display-2">
                          {item?.preFix ?? ""}

                          {item?.isCounterEnable ? <CountAnim value={item?.value} /> :  <span>{item?.value}</span>}
                          
                          {item?.postFix ?? ""}
                        </h2>
                      </TextFadeUp>
                    )}
                    {item?.title && (
                      <TextReveal>
                        <p className="offer-text heading6 heading6--medium">
                          {item?.title}
                        </p>
                      </TextReveal>
                    )}
                  </div>
                ))}
               {data?.bottomText &&  <TextFadeUp>
                  <p className="body2 smallDescription">{data?.bottomText}</p>
                </TextFadeUp>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
