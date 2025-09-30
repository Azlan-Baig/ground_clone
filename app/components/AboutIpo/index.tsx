import { PortableText, PortableTextBlock } from "next-sanity";
import React from "react";

interface Stat {
  count:string;
  enableCounter:boolean;
  icon:string|null;
  isIconEnabled:boolean;
  subtitle:string;
  title:string|null;
  isValueInPercentage:boolean;
  _key:string;

}

interface AboutIpoProps {
  data: {
    subtitle: string;
    title: string;
    _type: string;
    description:PortableTextBlock[];
    stats?: Stat[];
    secondaryText:PortableTextBlock[];
  };
}

const AboutIpo = ({ data }: AboutIpoProps) => {

  return (
    <section className="ipo scroll--section pt-0" id={data?._type}>
      <div className="d__grid grid--align-start">
        <div className="ipo__content d__grid">
          <div className="  ">
            <div className="anim__title">
              <h2 className="sub-titles sub-titles--26 clr--overline">
                {data?.subtitle}
              </h2>
            </div>
            <h3 className="animate animate-up animate-delay-100">{data?.title}</h3>
          </div>
          {data?.description ? (
            <div className="d__grid content-para">
              {/* <p>{content}</p> */}
              <PortableText value={data?.description || []}  />
            </div>
          ) : null}
        </div>
        <ul className="ipo__stats d__grid">
          {data &&  data?.stats &&data?.stats?.length>0 &&
            data?.stats?.map((shareDetailsItem: Stat, index: number) => (
              <li className="animate animate-in-inline" key={index}>
                <p className="stat__title">{shareDetailsItem.subtitle}</p>
                <div className="stat__info d__flex flex--between flex--align--center">
                  {shareDetailsItem.isValueInPercentage ? (
                    <div className="d__flex">
                      <h4 className="counterup">{shareDetailsItem.count}</h4>
                      <span>%</span>
                    </div>
                  ) : (
                    <h4 className="">{shareDetailsItem.count}</h4>
                  )}
                </div>
              </li>
            ))}
        </ul>
        <div className="ipo__note">
          {/* <p>{ipoNote}</p> */}
          <PortableText value={data?.secondaryText || []} />
        </div>
      </div>
    </section>
  );
};

export default AboutIpo;
