import React from "react";


interface CTA {
  href:string;
  icon:string;
  isAnchorBlank:boolean;
  title:string;
}
interface Item {
  title:string;
  cta:CTA;
}
interface UsefulResourceProps {
  data: {
    title:string;
    items:Item[];
    _type:string;
  };
}

const UsefulResource = ({ data }: UsefulResourceProps) => {
  return (
    <>
      <section className="resources section scroll--section" id={data?._type}>
        <div className="wrapper d__grid">
          <div className="title__wrapper anim__title">
            <h3 className="titles title--50 clr-blue-txt">{data?.title}</h3>
          </div>
          <ul className="resource__list d__grid" id="download-list">
            {data && data?.items && data?.items?.length > 0
              ? data?.items?.map((item, index) => (
                  <li
                    className="resource__list__item animate animate-up"
                    key={index}
                  >
                    <figure>
                      <p>{item?.title}</p>
                      <a
                        href={item?.cta?.href}
                        target={item?.cta?.isAnchorBlank ? "_blank" : "_self"}
                        className="btn--download"
                        download={item?.cta?.href}
                        data-name={item.title}
                        data-file-name={item?.cta?.href}
                      >
                        <span>{item?.cta?.title}</span>
                        <i className="d__flex flex--center">
                          <svg
                            width="26"
                            height="26"
                            viewBox="0 0 26 26"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 1C9.8174 1 6.76516 2.26428 4.51472 4.51472C2.26428 6.76516 1 9.8174 1 13C1 16.1826 2.26428 19.2348 4.51472 21.4853C6.76516 23.7357 9.8174 25 13 25C16.1826 25 19.2348 23.7357 21.4853 21.4853C23.7357 19.2348 25 16.1826 25 13C25 9.8174 23.7357 6.76516 21.4853 4.51472C19.2348 2.26428 16.1826 1 13 1Z"
                              stroke="#1FED93"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17.0589 18H8.82324M12.9411 15.6822V8M12.9411 15.6822L9.7754 12.5165M12.9411 15.6822L16.1068 12.5165"
                              stroke="#1FED93"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </i>
                      </a>
                    </figure>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </section>
      {/* <div className="wrapper">
        <span className="sec-border-bottom"></span>
      </div> */}
    </>
  );
};

export default UsefulResource;
