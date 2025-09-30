"use client";
import { useState, useEffect, useRef } from "react";
import { setCookie } from "cookies-next";
import { PortableText } from "next-sanity";
// import { components } from "../Footer";
import React from "react";

const CookieConsent = ({ data }: any) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const consentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const hasConsented = localStorage.getItem("cookieConsent");
    setIsVisible(true);
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (consentRef.current) {
      const height = consentRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--CookiesHeight",
        `${height}px`
      );
    }
  }, [isVisible]);

  const handleAccept = (): void => {
    setCookie("accept_cookie", "true");
    setIsVisible(false);
  };

  const handleDecline = (): void => {
    localStorage.setItem("cookieConsent", "false");
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div
        ref={consentRef}
        className={`cookieConsent ${isVisible ? "cookieConsentSlideUp" : ""}`}
      >
        <div className="cookieConsent-Wrapper">
          <div className="textWrap">
            <span className={"heading6 descriptionTxt"}>
              {data?.cookieBanner?.description1 &&
                data?.cookieBanner?.description1?.length > 0 && (
                  <PortableText
                    value={data?.cookieBanner?.description1 || []}
                  />
                )}
            </span>
          </div>
          <div className={"buttonContainer"}>
            {data?.cookieBanner?.allowButtonText && (
              <button className="filled body2 btnCookie" onClick={handleAccept}>
                {data?.cookieBanner?.allowButtonText}
              </button>
            )}
            {data?.cookieBanner?.allowButtonText && (
              <button
                className="bordered body2 btnCookie"
                onClick={handleDecline}
              >
                {data?.cookieBanner?.DeclineButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default CookieConsent;
