import React from "react";
import Link from "next/link";
import SvgImage from "../SvgImage";
import play from "@/public/svg/play.svg";

type Variant = "filled" | "transparent";
type IconType = "play" | "arrow" | "none";
type IconPosition = "before" | "after";

interface ButtonProps {
  title: string;
  href?: string;
  target?: "_blank" | "_self";
  onClick?: () => void;
  icon?: IconType; // 👈 pass string instead of node
  iconPosition?: IconPosition;
  variant?: Variant;
  className?: string;
}

export default function ButtonWithText({
  title,
  href,
  target = "_self",
  onClick,
  icon = "none",
  iconPosition = "after",
  variant = "filled",
  className = "",
}: ButtonProps) {
  // 👇 map icon prop to actual component
  const renderIcon = () => {
    switch (icon) {
      case "play":
        return <SvgImage url={play.src} />;
      case "arrow":
        return <SvgImage url={play} />;
      default:
        return null;
    }
  };

  const content = (
    <span
      className={`buttonWithText ${variant} ${className} flex items-center gap-2`}
    >
      {icon !== "none" && iconPosition === "before" && (
        <span className="btn-icon">{renderIcon()}</span>
      )}
      <span className="body2">{title}</span>
      {icon !== "none" && iconPosition === "after" && (
        <span className="btn-icon">{renderIcon()}</span>
      )}
    </span>
  );

  // 👉 If href exists → render <Link>
  if (href) {
    return (
      <Link
        href={href}
        target={target}
        onClick={onClick}
        className="linkWrapper"
      >
        {content}
      </Link>
    );
  }

  // 👉 Else → render <button>
  return (
    <button
      type="button"
      onClick={onClick}
      className={`buttonWrapper ${className}`}
    >
      {content}
    </button>
  );
}
