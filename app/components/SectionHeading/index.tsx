import SvgRenderer from "../SvgImage";
import pattern from "../../../public/images/pattern.svg";
import FadeAnim from "../FadeAnim";

interface SectionHeadingProps {
  title: string;
  className?: string;
  isWhite?: boolean;
  isSubHeading?: boolean;
  subtTitle?: string;
}

const SectionHeading = ({
  title,
  className,
  isWhite = false,
  isSubHeading = false,
  subtTitle,
}: SectionHeadingProps) => {

  return (
    <div
      className={`heading-box ${className ?? ''} ${isWhite ? "style-white" : ""}`}
    >
      {/* <SvgRenderer url={pattern.src} className="heading-pattern" /> */}
      <div className="heading-pattern">
        <FadeAnim
          variant="fadeUp"
          className="anim-wh-auto"
        >
          <svg width="68" height="23" viewBox="0 0 68 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.707107" y="11.3135" width="15" height="15" transform="rotate(-45 0.707107 11.3135)"
            stroke="#1B7683" />
            <rect x="23.3345" y="11.3135" width="15" height="15" transform="rotate(-45 23.3345 11.3135)"
            stroke="#1B7683" />
            <rect x="45.962" y="11.3135" width="15" height="15" transform="rotate(-45 45.962 11.3135)"
            stroke="#1B7683" />
          </svg>
        </FadeAnim>
      </div>
      
      {isSubHeading ? (
        <FadeAnim
          variant="fadeUp"
          className="anim-wh-auto"
        >
          <h3 className="heading3 sec-heading">{title}</h3>
          <h3 className="heading3 sec-heading">{subtTitle}</h3>
        </FadeAnim>
      ) : (
        <FadeAnim
          variant="fadeUp"
          className="anim-wh-auto"
        >
          <h2 className="heading1 sec-heading">{title}</h2>
        </FadeAnim>
      )}
    </div>
  );
};

export default SectionHeading;
