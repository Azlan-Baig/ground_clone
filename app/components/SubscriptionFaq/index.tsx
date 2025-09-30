import { PortableText, PortableTextBlock } from "next-sanity";
import React from "react";

interface Item {
  title: string;
  description: PortableTextBlock[];
}
interface SubscriptionFaqProps {
  data: {
    title: string;
    faqs: Item[];
    cta: any;
    _type: string;
  };
}

const SubscriptionFaq = ({ data }: SubscriptionFaqProps) => {
  const totalItems = data?.faqs?.length ?? 0;
  const itemsPerColumn = Math.ceil(totalItems / 2); // Splitting into 2 columns

  return (
    <section className="faq section" id={data?._type}>
      <div className="wrapper d__grid grid--wrapper">
        <div className="title__wrapper anim__title">
          <h3 className="titles title--50 clr-blue-txt">
            <span className="data-wrapper">
              <span className="animate animate-up-skew">{data?.title}</span>
            </span>
          </h3>
        </div>
        <div className="faq__col__group d__grid">
          {totalItems > 0 ? (
            <>
              <div className="faq__col d__grid grid--align-start animate animate-up animate-delay-100">
                {/* Render items for the first column */}
                {data?.faqs?.slice(0, itemsPerColumn).map((item, index) => (
                  <article key={index}>
                    <h5>{item?.title}</h5>
                    <div className="content">
                      <PortableText
                        value={item?.description || []}
                      />
                    </div>
                  </article>
                ))}
              </div>
              <div className="faq__col d__grid grid--align-start animate animate-up animate-delay-150">
                {/* Render items for the second column */}
                {data?.faqs?.slice(itemsPerColumn).map((item, index) => (
                  <article key={index}>
                    <h5>{item?.title}</h5>
                    <div className="content">
                      <PortableText
                        value={item?.description || []}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div className="btn__wrapper d__flex flex--end" id="faqDownload">
          <a
            href={data?.cta?.href || "#"}
            target="_blank"
            download=""
            className="btn btn--download d__flex flex--align--center flex--center"
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 1C12.7565 1 8.68687 2.68571 5.68629 5.68629C2.68571 8.68687 1 12.7565 1 17C1 21.2435 2.68571 25.3131 5.68629 28.3137C8.68687 31.3143 12.7565 33 17 33C21.2435 33 25.3131 31.3143 28.3137 28.3137C31.3143 25.3131 33 21.2435 33 17C33 12.7565 31.3143 8.68687 28.3137 5.68629C25.3131 2.68571 21.2435 1 17 1Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23.8236 25.6322H10.6465M17.235 22.1178V10.4697M17.235 22.1178L12.1699 17.3178M17.235 22.1178L22.3001 17.3178"
                stroke="#1FED93"
                strokeLinejoin="round"
              />
            </svg>

            <span>{data?.cta?.title || "[CTA]"}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionFaq;
