"use client";
import React, { JSX, useState } from "react";
import { PortableText, PortableTextBlock } from "next-sanity";
import Accordian from "../Accordion";
import investmentHighlightImage from "../../../public/images/investmentHighlightImage.png";
import SectionHeading from "../SectionHeading";
import Image from "next/image";
import FadeAnim from "../FadeAnim";

interface IHighlights {
  description:PortableTextBlock[];
  title:string;
  _key:string;
}
interface IInvestmentData {
  _type:string;
  titleHighlight:string;
  image:string;
  highlights:IHighlights[]
}


const InvestmentSection = ({ data }: {data:IInvestmentData}):JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="investmentSection"  id={data?._type}>
     {data?.titleHighlight && <SectionHeading title={data?.titleHighlight} isWhite={true} />}
      <div className="investmentWrapper">
      {data?.image &&
       <div className="investmentImage ">

         <FadeAnim variant="fadeUp" className="anim-wh-auto">
          <div className="asspect-ratio-img investmentHighlight">
            <Image src={data?.image} alt="investmentHighlightImage" className="ari-box" fill/>
          </div>
        </FadeAnim>
        </div>
        }

        <div id="accordion" className="investmentAccordion">
          {data?.highlights &&  data?.highlights?.length > 0 ? (
            <>
              <FadeAnim variant="fadeUp" className="anim-wh-auto">
                {data &&
                  data?.highlights &&
                  data?.highlights?.length > 0 &&
                  data?.highlights?.map((item:IHighlights, index:number) => (
                      <Accordian
                        key={index}
                        title={item.title}
                        isOpen={openIndex === index}
                        onToggle={() => handleToggle(index)}
                        icon={true}
                      >
                        <PortableText value={item?.description || []} />
                      </Accordian>
                  ))}
                </FadeAnim>
            </>
          ) : null}
        </div>
      </div>
      

    </section>
  );
};

export default InvestmentSection;
