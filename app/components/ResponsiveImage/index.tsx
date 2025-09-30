// components/ResponsiveImage.tsx
"use client";

import Image, { ImageProps } from "next/image";

interface ResponsiveImageProps {
  desktopSrc?: string ;
  tabletSrc?: string;
  mobileSrc?: string;
  alt: string;
  width?: number;
  height?: number;
  imageProps?: Omit<ImageProps, "src" | "alt" | "width" | "height">;
  className?: string;
}

export default function ResponsiveImage({
  desktopSrc,
  tabletSrc,
  mobileSrc,
  alt,
  width,
  height,
  imageProps,
  className,
}: ResponsiveImageProps) {
  return (
    <picture>
      {/* Mobile: up to 600px */}
      {mobileSrc && <source srcSet={mobileSrc} media="(max-width: 600px)" />}

      {/* Tablet: 601px to 991px */}
      {tabletSrc && (
        <source
          srcSet={tabletSrc}
          media="(min-width: 601px) and (max-width: 991px)"
        />
      )}

      {/* Fallback (desktop) */}
     {desktopSrc && <Image
        src={desktopSrc}
        alt={alt}
        width={width}
        height={height}
        fill
        className={className}
        {...imageProps}
      />}
    </picture>
  );
}
