"use client";
import Image from "next/image";
import React from "react";
import HeadingBox from "../HeadingBox";
import { PortableText, PortableTextBlock } from "next-sanity";
import TextFadeUp from "@/components/TextFadeUp/index";
import TextReveal from "@/components/TextReveal/index";
import UseMediaQuery from "../UseMediaQuery";
import FadeAnim from "../FadeAnim";

export type MessageFromLeadershipProps = {
  data: {
    _type?: string;
    author: {
      designation?: string;
      name?: string;
      image?: string;
      title?: string;
      imageMobile: string;

      content?: PortableTextBlock[];
    }[];
    title?: string;
  };
};

const MessageFromLeadership: React.FC<MessageFromLeadershipProps> = ({
  data,
}) => {
  const isSmallScreen = UseMediaQuery("(max-width: 600px)");

  return (
    <section className="lm sec-padding-top" id={data?._type}>
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
      {data?.author?.length > 0 &&
        data?.author.map((author, index) => (
          <div key={index} className="container-sm">
            <div className="lm__container">
              {author?.image && (
                <div className="lm__media">
                  <Image
                    fill
                    className="lm__img"
                    src={
                      isSmallScreen && author?.imageMobile
                        ? author?.imageMobile
                        : author?.image
                    }
                    alt={"leadership-image"}
                  />
                </div>
              )}

              <div className="lm__content">
                {/* <blockquote className="lm__quote body1">{data?.quote}</blockquote> */}
                {author?.content && author?.content?.length > 0 && (
                  <div className="lm__quote body1">
                    <TextReveal>
                      <PortableText value={author?.content || []} />
                    </TextReveal>
                  </div>
                )}
                {author?.name && (
                  <TextReveal>
                    <h2 className="lm__name heading2">{author?.name}</h2>
                  </TextReveal>
                )}
                {author?.designation && (
                  <TextFadeUp>
                    <p className="lm__role body1">{author?.designation}</p>
                  </TextFadeUp>
                )}
              </div>
            </div>
          </div>
        ))}
    </section>
  );
};

export default MessageFromLeadership;
