"use client";
import React, { useRef, useEffect, ReactNode, JSX } from "react";
import PlusAccordion from "../../../public/svg/plusAccordion.svg";
import minusAccordion from "../../../public/svg/minusAccordion.svg";
import SvgImage from "../SvgImage";
import Lines from "../Lines/lines";

type AccordianProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
  onToggle: () => void;
  icon?: ReactNode;
  isDark?: boolean;
};

const Accordian = ({
  children,
  isOpen,
  title,
  onToggle,
  icon,
  className,
  isDark = false,
}: AccordianProps): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (isOpen) {
      // Always set height
      const height = `${el.scrollHeight}px`;
      el.style.setProperty("max-height", height);

      // Only scroll if it’s not the first render
      if (!isFirstRender.current) {
        setTimeout(() => {
          const header = document.querySelector("header") as HTMLElement | null;
          const headerHeight = header?.offsetHeight ?? 0;

          const top = el.parentElement?.getBoundingClientRect().top ?? 0;
          const scrollY = window.scrollY + top - headerHeight - 20;

          window.scrollTo({ top: scrollY, behavior: "smooth" });
        }, 500);
      }
    } else {
      el.style.setProperty("max-height", "0px");
    }

    // Mark first render after we’ve handled it
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [isOpen]);


  return (
    <>
      <div
        className={`accordion ${isOpen ? "open" : ""} ${isDark ? "dark-accordion" : ""} ${className ?? ""} `}
        onClick={onToggle}
      >
        <div className={`accordionTitleWrapper ${isOpen ? "open" : ""} `}>
          <h6 className="heading6--medium accordionTitle"> {title} </h6>
          <div className="accordionIcon">
            {icon ? (
              // <SvgImage url={isOpen ? minusAccordion.src : PlusAccordion.src} />
              <>
                {isOpen ? (
                  <svg
                    width="19"
                    height="2"
                    viewBox="0 0 19 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.833496 1H18.1668"
                      stroke="#1F1A42"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.833496 10H18.1668"
                      stroke="#1F1A42"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.50513 1.33789L9.50513 18.6712"
                      stroke="#1F1A42"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        <div
          ref={contentRef}
          className={`accordionContent ${isOpen ? "open" : ""} portableContent body2 accordian-para portable-para-spacing`}
        >
          {children}
        </div>
      </div>
      <div
        className={`accordionLine ${isOpen ? "open" : ""} ${isDark ? "dark-accordionLine" : ""}`}
      >
        <Lines startPosition={"top bottom"} />
      </div>
    </>
  );
};

export default Accordian;
