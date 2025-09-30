"use client";
import Image from "next/image";
import { ReactSVG } from "react-svg";

type SvgImageProps = {
  url: string;
  className?: string;
};

const SvgImage: React.FC<SvgImageProps> = ({ url, className = "" }) => {
  return (
    url && (
      <>
        {url?.endsWith(".svg") ? (
          <ReactSVG src={url} className={`${className}`} />
        ) : (
          <Image src={url} alt="image" className={`${className}`} />
        )}
      </>
    )
  );
};

export default SvgImage;
