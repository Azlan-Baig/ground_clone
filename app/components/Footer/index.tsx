// components/Footer/index.tsx
"use client";
import Image from "next/image";
import SvgImage from "../SvgImage";
import UseMediaQuery from "../UseMediaQuery";
import { PortableText, PortableTextBlock } from "next-sanity";
import { parseContentToSpans } from "@/app/utils/parserConvertor";
import TextReveal from "@/components/TextReveal/index";
import TextFadeUp from "../TextFadeUp";
import FadeAnim from "../FadeAnim";
import { trackSocialClick } from "@/app/utils/Helpers";

interface FooterProps {
  emailIcon?: string;
  globalIcon?: string;
  data: {
    _type?: string;
    copyRightText?: PortableTextBlock[];
    description?: string;
    logo?: string;
    items?: {
      email?: string;
      image?: string;
      website?: string;
      emailLabel?: string;
      websiteLabel?: string;
    }[];
    socialLinks?: {
      name: string;
      icon?: string;
      isAnchorBlank?: boolean;
      url?: string;
    }[];
  };
}

const Footer = ({ data, emailIcon, globalIcon }: FooterProps) => {
  const isTablet = UseMediaQuery("(max-width: 600px)");
  return (
    <footer className="footer container-sm" id={data?._type}>
      <div className="footer-bg">
        <Image
          src={
            isTablet
              ? "/images/ground-footer-bg-390.png"
              : "/images/ground-footer-bg.png"
          }
          alt="bg-image"
          fill
          priority
          className="bg-img object-cover"
          sizes="100vw"
        />
      </div>

      {/* Mid Section */}
      <div className="mid-sec">
        {data?.description && (
          <div className="footer-heading">
            <div className="heading2 footerItem">
              <TextReveal>{parseContentToSpans(data?.description)}</TextReveal>
            </div>
          </div>
        )}

        <div className="email-sec">
          {Array.isArray(data?.items) &&
            data?.items?.length > 0 &&
            data?.items.map((item, index: number) => {
              return (
                <div className="email-link" key={index}>
                  {item?.image && (
                    <div className="logo-box">
                      <FadeAnim variant="fadeUp" className="anim-wh-auto">
                        <SvgImage url={item?.image} />
                      </FadeAnim>
                    </div>
                  )}
                  {item?.email && item?.emailLabel && (
                    <a
                      href={`mailto:${item?.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="body1 link">
                        {emailIcon && <SvgImage url={emailIcon} />}{" "}
                        <TextFadeUp>{item?.emailLabel}</TextFadeUp>
                      </div>
                    </a>
                  )}
                  {item?.website && item?.websiteLabel && (
                    <a
                      href={item?.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="body1 link">
                        {globalIcon && <SvgImage url={globalIcon} />}{" "}
                        <TextFadeUp>{item?.websiteLabel}</TextFadeUp>
                      </div>
                    </a>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-sec">
        {data?.logo && (
          <div className="footer-logo">
            <SvgImage url={data?.logo} />
          </div>
        )}

        {/* <p className="body3 mobHide copyRights">{t.text}</p> */}
        {data?.copyRightText && data?.copyRightText?.length > 0 && (
          <div className="body3 mobHide copyRights">
              <PortableText value={data?.copyRightText || []} />
          </div>
        )}

        <div className="social-icons">
          {Array.isArray(data?.socialLinks) &&
            data?.socialLinks?.length > 0 &&
            data?.socialLinks?.map(
              (social, index) =>
                social?.icon &&
                social?.url && (
                  
                  <a
                    href={social?.url}
                    key={index}
                    target={social?.isAnchorBlank ? "_blank" : ""}
                    rel="noopener noreferrer"
                    className="icon"
                    onClick={() => trackSocialClick(social.name)}
                  >
                    <SvgImage url={social?.icon} />
                  </a>
                )
            )}
        </div>

        {data?.copyRightText && data?.copyRightText?.length > 0 && (
          <div className="body3 mobShow copyRights">
            <PortableText value={data?.copyRightText || []} />
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
