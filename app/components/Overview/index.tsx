"use client";
import React from "react";
import Image from "next/image";
import ParallaxAnim from "../ParallaxAnim";
import HeadingBox from "../HeadingBox";
import { PortableText, PortableTextBlock } from "next-sanity";
import { parseContentToSpans } from "@/app/utils/parserConvertor";
import TextReveal from "@/components/TextReveal/index";
import TextFadeUp from "@/components/TextFadeUp/index";
import UseMediaQuery from "../UseMediaQuery";

interface OverviewProps {
  data: {
    _type: string;
    title: string; // for HeadingBox
    heading: string; // main h2 heading
    subheading?: string; // optional subheading above
    paragraphs: string[]; // array of body paragraphs
    backgroundImage: string;
    mobileBackgroundImage?: string;
    imageAlt?: string;
    description?: PortableTextBlock[];
    image?: string;
    imageMobile?: string;
  };
}

const Overview = ({ data }: OverviewProps) => {
  const isSmallScreen = UseMediaQuery("(max-width: 600px)");

  return (
    <section className="sec-margin" id={data._type}>
      {/* Section Heading */}
      {data?.heading && <HeadingBox title={data.heading} />}
      <div className="container">
        <div className="overview-wrapper">
          {/* Content */}
          <div className="overview-content">
            {data?.subheading && (
              <TextReveal>
                <p className="body2-black sub-heading">{data.subheading}</p>
              </TextReveal>
            )}

            {data?.title && (
              <div className="heading1 heading">
                <TextReveal>{parseContentToSpans(data?.title)}</TextReveal>
              </div>
            )}

            {Array.isArray(data?.description) &&
              data?.description?.length > 0 && (
                <div className="para-sec body2">
                  {data?.description?.map((para, index) => (
                    // <p className="body2" key={index}>
                    //   {"para"}
                    // </p>
                    // <PortableText key={index} value={para || []} />

                    <TextReveal key={index}>
                      <PortableText value={para || []} />
                    </TextReveal>
                  ))}
                </div>
              )}
          </div>

          {/* Image */}
          {data?.image && (
            <div className="overview-img">
              <ParallaxAnim className="overview-img-p">
                <Image
                  className="ari-box"
                  src={
                    isSmallScreen && data?.imageMobile
                      ? data?.imageMobile
                      : data?.image
                  }
                  alt={data?.imageAlt || "overview"}
                  fill
                />
              </ParallaxAnim>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Overview;
