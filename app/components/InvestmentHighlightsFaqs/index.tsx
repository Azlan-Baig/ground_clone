"use client";
import React, { useState } from "react";
import SectionHeading from "../SectionHeading";
import Accordian from "../Accordion";
import ButtonWithText from "../ButtonWithText";
import { PortableText, PortableTextBlock } from "next-sanity";
import FadeAnim from "../FadeAnim";
import { trackFileDownload } from "@/app/utils/Helpers";
import { useParams } from "next/navigation";
import HeadingBox from "../HeadingBox";

interface IFAQ {
  description?: PortableTextBlock[];
  title: string;
  _key: string;
}

interface IFaqData {
  heading?: string;
  _type: string;
  title: string;
  highlights: IFAQ[];
}

export default function Faqs({ data }: { data: IFaqData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const params = useParams();
  const locale = params.locale || "en";
  return (
    <section className="faqs-sec sec-margin" id={data?._type}>
      {data?.heading && <HeadingBox title={data?.heading} />}
      <div className="container">
        <div className="fs-wrapper">
          <div className="fsw-right-grid">
            <>
              <FadeAnim variant="fadeUp" className="anim-wh-auto">
                {data &&
                  data?.highlights &&
                  data?.highlights?.length > 0 &&
                  data?.highlights?.map(
                    (item, index) =>
                      item?.title && (
                        <Accordian
                          key={index}
                          title={item?.title}
                          isOpen={openIndex === index}
                          onToggle={() => handleToggle(index)}
                          icon={true}
                          isDark={true}
                        >
                          <PortableText value={item?.description || []} />
                        </Accordian>
                      )
                  )}
              </FadeAnim>
            </>
          </div>
        </div>
      </div>
    </section>
  );
}
