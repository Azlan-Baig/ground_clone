import { JSX, useEffect } from "react";
import { gsap } from "gsap";

interface AnimatedComponentProps {
  input: string;
  titleClass?: string;
  animationDelay?: string;
  animationDuration?: string;
  animationStragger?: number;
  ease?: string;
}

const AnimatedComponent = (props: AnimatedComponentProps): JSX.Element => {
  const {
    input,
    titleClass = " ",
    animationDelay = "0",
    animationDuration = "0.7",
    animationStragger = 0.3,
    ease = "",
  } = props;
  const words = input?.trim().split(" ");

  useEffect(() => {
    const tl = gsap.timeline();
    gsap.set(".fade-hero-anim", {
      transform: "translateY(100%)",
    });
    tl.to(".fade-hero-anim-wrapper", {
      opacity: 1,
      delay: animationDelay,
    }).to(".fade-hero-anim", {
      y: 0,
      opacity: 1,
      duration: animationDuration,
      stagger: animationStragger, // Stagger the appearance of each line
      ease: ease,
    });
  }, []);
  return (
    <div className={`${titleClass} fade-hero-anim-wrapper`}>
      {words?.map((word, index) => (
        <span
          className="overflow-hidden display-1 display-1--banner-text"
          key={index}
        >
          <span className="fade-hero-anim">{word}&nbsp;</span>
        </span>
      ))}
    </div>
  );
};

export default AnimatedComponent;
