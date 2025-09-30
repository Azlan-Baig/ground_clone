"use client";

import Image from "next/image";
import React from "react";
import ParallaxAnim from "../ParallaxAnim";
import Lines from "../Lines/lines";
import CountAnim from "../CountAnim";
import FadeAnim from "../FadeAnim";

interface IpoFactProps {
  data: {
    image?: string;
    items?: { title: string; value: string }[];
    heading?: string;
    title?: string;
  };
}

const IpoFact = ({ data }: IpoFactProps) => {
  if (!data?.items) return null;

  // Split items array into two halves
  const midIndex = Math.ceil(data.items.length / 2);
  const firstHalf = data.items.slice(0, midIndex);
  const secondHalf = data.items.slice(midIndex);

  // Helper to render one group of items
  const renderItems = (items: typeof data.items) =>
    items?.map((item, index) => (
      <div className="card-wrapper" key={index}>
        <div
          className={`counter-card ${index % 2 === 1 ? "counter-card--offset" : ""}`}
        >
          <FadeAnim variant="fadeUp" className="anim-wh-auto">
            <h1 className="display-1 counter-number">
              <CountAnim  value={item.value} />
              <Lines
                type="horizontal"
                className="card-style"
                animationDelay={`${0.5}`}
                startPosition="top 85%"
                shouldAnimate={true}
              />
            </h1>
            <p className="body1-light middle-heading">{item.title}</p>
          </FadeAnim>
        </div>
      </div>
    ));

  return (
    <section className="ipo-fact-wrapper sec-bottom-padding">
      <div className="heading-sec">
        {data?.heading && (
          <p className="body2-black  ipo-fact-heading">{data.heading}</p>
        )}
        {data?.title && <h1 className="heading1 ipo-fact-sub">{data.title}</h1>}
      </div>
      <div className="content-sec">
        {/* Left side image */}
        {data?.image && (
          <div className="fact-img">
            <ParallaxAnim className="overview-img-p">
              <Image
                className="ari-box"
                src={data.image}
                fill
                alt="overview"
                priority
              />
            </ParallaxAnim>
          </div>
        )}

        {/* Right side content */}
        <div className="fact-content">
          {/* First half */}
          <div className="fact-mid-sec">{renderItems(firstHalf)}</div>

          {/* Second half */}
          <div className="fact-end-sec">{renderItems(secondHalf)}</div>
        </div>
      </div>
    </section>
  );
};

export default IpoFact;
