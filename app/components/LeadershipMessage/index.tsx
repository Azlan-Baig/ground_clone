import { PortableText, PortableTextBlock } from "next-sanity";
import Image from "next/image";
import React from "react";

interface IAuthor {
  designation: string;
  name: string;
}
interface Leader {
  isContentRight: boolean;
  image: string;
  content: PortableTextBlock[];
  author: IAuthor;
}

interface LeadershipMessageProps {
  data: {
    title: string;
    message: Leader[];
    _type: string;
  };
}

const LeadershipMessage = ({ data }: LeadershipMessageProps) => {
  return (
    <div className="leadership scroll--section" id={data?._type}>
      <div className="leadership__message" >
        <div className="title__wrapper title--pattern">
          <div className="wrapper anim__title">
            <h3 className="titles title--50 clr--brand">{data?.title}</h3>
          </div>
        </div>
        <article className="wrapper messages d__grid">
          {data?.message &&
            data?.message?.length > 0 &&
            data?.message?.map((leader, index) => (
              <figure
                className={index === 0 ? "chairman" : index === 1 ? "ceo" : ""}
                key={index}
              >
                <picture className="animate animate-up animate-delay-100">
                  <Image
                    src={leader.image}
                    alt="company"
                    loading="eager"
                    className="fluid"
                    width={100}
                    height={100}
                  />
                </picture>
                <figcaption className="animate animate-up animate-delay-200">
                  <div className="content">
                    <PortableText
                      value={leader?.content || []}
                    />
                  </div>
                  <div className="leader__info">
                    <h4>{leader.author?.name}</h4>
                    <p>{leader.author?.designation}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
        </article>
      </div>
    </div>
  );
};

export default LeadershipMessage;
