"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import Image from "next/image";
import aboutBg from "../../../public/images/footer-pattren.png";

gsap.registerPlugin(ScrollTrigger);

type AboutData = {
  title?: string;
  text?: string;
};

type AboutProps = {
  data: AboutData; // single object, not array
};

const AboutTpo = ({ data }: AboutProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = textRef.current;

    gsap?.to(el, {
      backgroundPosition: "0% 0%",
      ease: "power1.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
    });
  }, []);

  return (
    <section className="about-wrapper sec-padding">
      <div className="about-bg">
        <Image
          src={aboutBg}
          alt="bg-image"
          fill
          priority
          className="bg-img object-cover"
          sizes="100vw"
        />
      </div>
      <div className="container-sm">
        <div className="about-content">
          {data.title && (
            <p className="body2-black about-heading">{data.title}</p>
          )}
          {data.text && (
            <p ref={textRef} className="revealText heading2-light about-para">
              {data.text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutTpo;
