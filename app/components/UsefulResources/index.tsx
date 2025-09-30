"use client";
import React, { useState } from "react";
import { formatCustomDate, trackFileDownload } from "@/app/utils/Helpers";
import { useParams } from "next/navigation";
import HeadingBox from "../HeadingBox";
import FadeAnim from "../FadeAnim";

interface ICta {
  file: string;
  title: string;
  fileName: string;
  date: string;
}
interface IItem {
  cta: ICta;
}
interface IResourceData {
  _type: string;
  title: string;
  items: ICta[];
}

export default function UsefulResources({ data }: { data: IResourceData }) {
  const params = useParams();
  const locale: string = params.locale == "ar" ? "ar" : "en";

  const handleDownload = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: ICta
  ) => {
    e.preventDefault(); // Prevent the default link action
    const { file: fileUrl, fileName: orignalFilename } = item || {};
    const fileExtension = fileUrl?.split(".").pop();
    const fileLanguage = locale == "ar" ? "ar" : "en";
    if (fileUrl && orignalFilename && fileExtension) {
      trackFileDownload('eventTracker', orignalFilename, fileExtension, fileUrl, fileLanguage);
      window.open(fileUrl, "_blank");
    }
  };
  return (
    <section className="useful-resources-sec sec-margin" id={data?._type}>
      {data?.title && <HeadingBox title={data?.title} />}
      <div className="container">
        <div className="ur-content-wrapper-width">
          {/* <FadeAnim variant="fadeUp" className="anim-wh-auto"> */}
          <div className="ur-content-wrapper">
            {data &&
              data?.items &&
              data?.items?.length > 0 &&
              data?.items?.map((item, index) => {
                return (
                  item?.title &&
                  item?.file && (
                    <FadeAnim
                      variant="fadeUp"
                      key={index}
                      className="anim-wh-auto"
                    >
                      <div className="urcw-item">
                        <div className="contentWrap">
                          {item?.date && (
                            <p className="body2 date">
                              {formatCustomDate(item?.date, locale)}
                            </p>
                          )}
                          {item?.title && (
                            <h6 className="heading6--medium sectionHeading">
                              {item?.title}
                            </h6>
                          )}
                        </div>
                        {item?.file && (
                          <div className="btn-wrapper">
                            <a
                              className="download-btn default"
                              href={item?.file || ""}
                              target="_blank"
                              rel="nofollow"
                              onClick={(e) => {
                                e.preventDefault(); // Prevent the default link behavior
                                handleDownload(e, item); // Trigger your custom download handler
                              }}
                            >
                              {/* <SvgImage url={chevronRight.src} className="btn-svg-box" /> */}
                              <span className="btn-svg-box">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  viewBox="0 0 40 40"
                                  fill="none"
                                >
                                  <circle
                                    cx="20"
                                    cy="20"
                                    r="19.5"
                                    transform="matrix(-4.37114e-08 1 1 4.37114e-08 0 0)"
                                    stroke="#1F1A42"
                                  />
                                  <path
                                    d="M20 11.1582L20.0159 22.656M20 28.8424L16 24.7915L14 22.766M20 28.8424L26 22.766M20 28.8424L20.0159 22.656M12 20.7406L14 22.766M28 20.7406L26 22.766M14 22.766L15.6683 24.4434C17.2666 26.0504 20.01 24.9225 20.0159 22.656V22.656M26 22.766L24.3151 24.4466C22.7246 26.0331 20.01 24.9025 20.0159 22.656V22.656"
                                    stroke="#1F1A42"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </a>
                          </div>
                        )}
                      </div>
                    </FadeAnim>
                  )
                );
              })}
          </div>
          {/* </FadeAnim> */}
        </div>
      </div>
    </section>
  );
}
