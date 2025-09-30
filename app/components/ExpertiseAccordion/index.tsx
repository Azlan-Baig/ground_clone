"use client";
import React, {
  useRef,
  useEffect,
  ReactNode,
  JSX,
  createContext,
  useContext,
  ReactElement,
  useState,
} from "react";
import Image from "next/image";
import SvgRenderer from "../SvgImage";
import icArrow from "../../../public/svg/arrow-down.svg";
import { parseContentToSpans } from "@/app/utils/parserConvertor";

/* =========================================================
   Types that the Group will inject into each child item
   ========================================================= */
export type AccordionInjectedProps = {
  /** injected by AccordionGroup */
  index?: number;
};

/* =========================================================
   Your Accordian component (with injected index support)
   ========================================================= */
export type AccordianProps = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean; // still supported; ignored when wrapped in AccordionGroup
  className?: string;
  onToggle?: () => void; // still called for side effects
  icon?: ReactNode;
  isDark?: boolean;
  subTitle?: string;
  coreText?: string;
  representText?: string;
  image?: string;
  preText?: string;
  postText?: string;
  text?: string;
  imageLqip?: string;
} & AccordionInjectedProps;

/** Internal context used only when wrapped by AccordionGroup */
type GroupCtx = {
  openIndex: number;
  setOpenIndex: (i: number) => void;
  count: number;
};
const AccordionContext = createContext<GroupCtx | null>(null);

const Accordian = ({
  children,
  isOpen,
  title,
  text,
  onToggle,
  icon,
  className,
  isDark = false,
  subTitle,
  coreText,
  representText,
  image,
  preText,
  postText,
  imageLqip,
  index, // injected by group
}: AccordianProps): JSX.Element => {
  const contentRef = useRef<HTMLDivElement>(null);
  const group = useContext(AccordionContext);

  // Effective open state (group wins if present)
  const isOpenEff = group ? group.openIndex === (index ?? -1) : isOpen;

  // Smooth expand/collapse
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const target = isOpenEff ? `${el.scrollHeight}px` : "0px";
    el.style.setProperty("max-height", target);
    el.style.setProperty("overflow", "hidden");
    el.style.setProperty(
      "transition",
      "max-height 400ms ease, opacity 300ms ease, transform 300ms ease"
    );
    el.style.setProperty("opacity", isOpenEff ? "1" : "0");
    el.style.setProperty("transform", isOpenEff ? "translateY(0)" : "translateY(-4px)");
    el.setAttribute("aria-hidden", (!isOpenEff).toString());
  }, [isOpenEff]);

  const handleToggle = () => {
    if (group && typeof index === "number") {
      // If current is open, move to next; else open this
      if (group.openIndex === index) group.setOpenIndex(index + 1);
      else group.setOpenIndex(index);
    } else {
      onToggle?.();
    }
  };
  
  return (
    <>
      <div
        className={`accordion sec-expertiesAccordion ${isOpenEff ? "open" : ""} ${isDark ? "dark-accordion" : ""} ${className ?? ""}`}
        onClick={handleToggle}
        role="button"
        aria-expanded={isOpenEff}
      >
        {image && (
          <div className="box-img">
            {/* Next 13+: use `fill` instead of layout="fill" */}
            <Image src={image}
              placeholder={imageLqip ? 'blur' : 'empty'}
              unoptimized
              blurDataURL={imageLqip}
              fill alt="accordion-bg"  
            />
          </div>
        )}

        <div className={`accordionTitleWrapper expertiesAccordion ${isOpenEff ? "open" : ""}`}>
          <div className="accordion--title">
            {title && (
              <div className="heading6 accordionTitle">
                <h6>{title}</h6>
              </div>
            )}
            {text && (
              <div className="display-2 boxPercentage">
                <p>{`${preText ?? ""}${text}${postText ?? ""}`}</p>
              </div>
            )}
          </div>
        </div>

        <div
          ref={contentRef}
          className={`accordionContent ${isOpenEff ? "open" : ""} accordian-para portable-para-spacing`}
          style={{
            maxHeight: isOpenEff ? undefined : 0,
            opacity: isOpenEff ? 1 : 0,
            transform: isOpenEff ? "translateY(0)" : "translateY(-4px)",
            willChange: "max-height, opacity, transform",
          }}
        >
          <div className="contentBox--detail">
            {subTitle && (
              <div className="body1 contentTitle">
                <p>{subTitle}</p>
              </div>
            )}
            <div className="content-listing">
              <ul>
                {representText && (
                  <li className="heading6">{parseContentToSpans(representText)}</li>
                )}
                {coreText && <li className="heading6">{parseContentToSpans(coreText)}</li>}
              </ul>
            </div>
            {children}
          </div>
        </div>

        <div className="accordionIcon">
          {icon ? (
            <>
              {isOpenEff ? (
                <button className="rounded_btn reverse" aria-label="Collapse">
                  <SvgRenderer url={icArrow.src} className="btn-svg-box" />
                </button>
              ) : (
                <button
                  className={`${!text ? "marginSpace" : ""} rounded_btn`}
                  aria-label="Expand"
                >
                  <SvgRenderer url={icArrow.src} className="btn-svg-box" />
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Accordian;

/* =========================================================
   AccordionGroup: manages which item is open
   - When closing the current (clicking it), opens the next item.
   - Strongly typed so cloneElement knows about `index` & `isOpen`.
   ========================================================= */
type InjectedByGroup = {
  isOpen?: boolean;
  onToggle?: () => void;
} & AccordionInjectedProps;

type AccordionChild = ReactElement<Partial<InjectedByGroup>>;

type AccordionGroupProps = {
  children: AccordionChild | AccordionChild[];
  /** which index starts open (default: 0) */
  defaultOpen?: number;
  /** keep one always open (default: true) */
  keepOneOpen?: boolean;
};

export const AccordionGroup = ({
  children,
  defaultOpen = 0,
  keepOneOpen = true,
}: AccordionGroupProps) => {
  const items = React.Children.toArray(children) as AccordionChild[];
  const count = items.length;
  const safeDefault = Math.min(Math.max(defaultOpen, 0), Math.max(count - 1, 0));
  const [openIndex, setOpenIndexRaw] = useState<number>(safeDefault);

  const setOpenIndex = (i: number) => {
    if (count === 0) return;
    if (keepOneOpen) {
      // wrap into 0..count-1
      const next = ((i % count) + count) % count;
      setOpenIndexRaw(next);
    } else {
      setOpenIndexRaw(i); // allow -1 to mean "all closed"
    }
  };

  return (
    <AccordionContext.Provider value={{ openIndex, setOpenIndex, count }}>
      {items.map((child, idx) =>
        React.cloneElement<Partial<InjectedByGroup>>(child, {
          index: idx,
          isOpen: openIndex === idx,
          // (optional) preserve user's onToggle side-effects
          onToggle: () => {
            if (openIndex === idx) setOpenIndex(idx + 1);
            else setOpenIndex(idx);
            // run original onToggle if provided
            const orig = (child.props as any)?.onToggle as (() => void) | undefined;
            orig?.();
          },
        })
      )}
    </AccordionContext.Provider>
  );
};
