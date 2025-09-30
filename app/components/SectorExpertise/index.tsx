"use client";
import React, { useState } from "react";
import SectionHeading from "../SectionHeading";
import ExpertiseAccordion from "../ExpertiseAccordion";
import ButtonWithText from "../ButtonWithText";
import { PortableText, PortableTextBlock } from "next-sanity";
import FadeAnim from "../FadeAnim";
import { useParams } from "next/navigation";
import HeadingBox from "../HeadingBox";
import TextReveal from "@/components/TextReveal/index";
import { parseContentToSpans } from "@/app/utils/parserConvertor";

interface IFAQ {
  description?: PortableTextBlock[];
  title: string;
  percentage: string;
  coreText?: string;
  image?: string;
  postText?: string;
  preText?: string;
  representText?: string;
  subTitle?: string;
  imageLqip?: string;
  text?: string;
  _key: string;
}

interface IFaqData {
  heading?: string;
  _type: string;
  title?: string;
  description?: PortableTextBlock[];
  items: IFAQ[];
}

export default function Faqs({ data }: { data: IFaqData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const params = useParams();
  const locale = params.locale || "en";

  return (
    <section className="sec-sectionExperties sec-margin" id={data?._type}>
      {data?.heading && <HeadingBox title={data?.heading} />}
      <div className="container">
        <div className="sectionExperties--wrapper">
          <div className="contentBox">
            {data?.title && (
              <div className="heading1 sec-title">
                <TextReveal>{parseContentToSpans(data?.title)}</TextReveal>
                {/* <h2>
                Bespoke, industry-specific FM solutions for{" "}
                <span>Saudi Arabia’s</span> strategic sectors
              </h2> */}
              </div>
            )}
            {data?.description && data?.description?.length > 0 && (
              <div className="body2 sec-description">
                <TextReveal>
                  <PortableText value={data?.description || []} />
                </TextReveal>
              </div>
            )}
          </div>
          <div className="accordionBox">
            <FadeAnim variant="fadeUp" className="anim-wh-auto">
              {data &&
                data?.items &&
                data?.items?.length > 0 &&
                data?.items?.map(
                  (item, index) =>
                    item?.title && (
                      <ExpertiseAccordion
                        key={index}
                        title={item?.title}
                        text={item?.text}
                        preText={item?.preText}
                        postText={item?.postText}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                        icon={true}
                        isDark={true}
                        subTitle={item?.subTitle}
                        representText={item?.representText}
                        coreText={item?.coreText}
                        image={item?.image}
                        imageLqip={item?.imageLqip}
                      >
                        <PortableText value={item?.description || []} />
                      </ExpertiseAccordion>
                    )
                )}
            </FadeAnim>
          </div>
        </div>
      </div>
    </section>
  );
}
