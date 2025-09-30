'use client'
import Image from "next/image";
import imgSrc from "../../../public/images/cd-bg-img.png";
import UseMediaQuery from "../UseMediaQuery";
import imgMblSrc from "../../../public/images/cd-bg-img-mbl.png";
import { PortableText, PortableTextBlock } from "next-sanity";
import FadeAnim from "../FadeAnim";
import { useEffect } from "react";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

interface DestinationrProps {
  data: {
    bannerDescription: PortableTextBlock[];
    _type: string;
    secondaryWebImage: string;
    secondaryMobileImage: string;
  };
}


const CreatingDestination = ({ data }: DestinationrProps) => {
  const isSmallScreen = UseMediaQuery('(max-width: 600px)');
  useEffect(() => {
    
    gsap.registerPlugin(ScrollTrigger);
    gsap?.fromTo(
      '.cd-text-anim',
      {
        yPercent: 50,
      },
      {
        yPercent: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: '.cd-text-anim',
          start: '0% 80%',
          end: '100% 0%',
          scrub: true,
          // markers: true,
        },
      }
    );
  }, [])
  return (
    <section className="creat-destination">
      <div className="cd-content">
        <FadeAnim >
            <div className="container cd-con">
              <h2 className={`heading2 cd-heading cd-text-anim`}>
                <PortableText
                  value={data?.bannerDescription || []}
                />
                </h2>
            </div>
        </FadeAnim>
      </div>
      <div className="cd-bg-layers">
        <FadeAnim
        // animationDelay={`${2 * 0.2}`}
        variant="fadeUp"
        className="cs-bg anim-wh-auto"
        animationDuration={'1.5'}
        startPosition="top 70%"
        // markers={true}
        // startPosition="bottom bottom"
        >
        <div className="asspect-ratio-img ari-cd-bg">
          <Image className="ari-box" src={isSmallScreen ? data?.secondaryMobileImage : data?.secondaryWebImage} fill alt='creat-destination'/>
        </div>
      </FadeAnim>
      </div>
    </section>
  )
}

export default CreatingDestination;