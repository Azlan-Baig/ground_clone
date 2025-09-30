"use client"
import Image from "next/image";
import ButtonWithText from "../ButtonWithText";
import { PortableText } from "next-sanity";
import FadeAnim from "../FadeAnim";
import ParallaxAnim from "../ParallaxAnim";
import SectionHeading from "../SectionHeading";
import UseMediaQuery from "../UseMediaQuery";

const AboutMasar = ({ data }: any) => {
  const isSmallScreen = UseMediaQuery("(max-width: 600px)");
  
  return (
    <section className="about-masar sec-block-padding" id={data?._type}>
      <div className="container am-wrapper">
        <div className="am-left-grid ">
          <div className="am-para">
            <FadeAnim variant="fadeUp" className="anim-wh-auto">
              <div className="body2 portable-para-spacing">
                <PortableText
                  value={data?.description || []}
                />
              </div>
            </FadeAnim>
          </div>
        </div>
        <div className="am-right-grid">
          <ParallaxAnim className="ari-am-img">
            <Image
              src={isSmallScreen ? data?.mobileImage : data?.image}
              alt="about masar"
              fill
              className="about-img"
            />
          </ParallaxAnim>
          <div className="cta-link">
            <FadeAnim variant="fadeUp" className="anim-wh-auto">
              <ButtonWithText
                title={data?.cta.title}
                target="_blank"
                href={data?.cta.href}
              />
            </FadeAnim>
          </div>
        </div>
      </div>
      <div className="am-wrapper am-wrapper-mb">
        <div className="am-right-grid am-para-w">
          <div className="am-para-mb">
            <FadeAnim variant="fadeUp" className="anim-wh-auto">
              <div className="body2 portable-para-spacing">
                <PortableText
                  value={data?.description || []}
                />
              </div>
            </FadeAnim>
          </div>
          <div>
            <FadeAnim variant="fadeUp" className="anim-wh-auto">
              <ButtonWithText
                title={data?.cta.title}
                target="_blank"
                href={data?.cta.href}
              />
            </FadeAnim>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMasar;
