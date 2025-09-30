'use client'
import React, { useEffect, useRef, ReactNode, JSX } from 'react';
// import { Box, useMediaQuery } from '@mui/material';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
// import { tabletMedia } from '@themes/constants';
// import useStyles from './styles';
// import { useSelector } from 'react-redux';
// import { RootState } from '@store/store';
import UseMediaQuery from '../UseMediaQuery';
import { useParams } from 'next/navigation';


type FadeInProps = {
  className?: string;
  isWhite?: boolean;
  isAnim?: boolean;
  transformOrigin?: string;
  animationDuration?: string;
  animationDelay?: string;
  ease?: string;
  startPosition?: string;
  alwaysAnimate?: boolean;
  children?: ReactNode;
  animContainerClassName?: string;
  once?: boolean;
  trigger?: string;
  variant?: string;
  isRotate?: boolean;
  forText?: boolean;
  markers?: boolean;
  isFooter?: boolean;
};

const FadeAnim = (props: FadeInProps): JSX.Element => {
//   const headerHeight = useSelector<RootState>((state) => state.header.headerHeight as number);
//   const classes = useStyles();
  const isTablet = UseMediaQuery('(max-width: 600px)');
  const fadeContainerRef = useRef<HTMLDivElement  | null>(null);
  const triggerContainerRef = useRef<HTMLDivElement  | null>(null);
  const params = useParams();
  const locale:string = params.locale == 'ar' ? 'ar' :'en';
  const isRtl = locale === "ar";
  const {
    children,
    animationDelay = '0',
    ease = '',
    startPosition = 'top 80%',
    isAnim = true,
    alwaysAnimate = false,
    variant = 'fadeIn',
    animationDuration = `${variant === 'fadeIn' ? 1.7 : 0.7}`,
    trigger = '',
    once = true,
    animContainerClassName = '',
    className = '',
    isRotate = false,
    forText = false,
    markers = false,
    isFooter = false,
  } = props;

  useEffect(() => {
    const fadeContainer = fadeContainerRef.current;
    const triggerContainer = triggerContainerRef.current;
    gsap.registerPlugin(ScrollTrigger);
  
    if (fadeContainer) {
      let targetElements: HTMLElement[] | NodeListOf<Element>;
      if (animContainerClassName) {
        targetElements = fadeContainer.querySelectorAll(`.${animContainerClassName}`);
      } else {
        targetElements = [fadeContainer]; // ✅ wrap in array
      }
  
      if (variant === "fadeUp") {
        const height = fadeContainer.offsetHeight;
        gsap.fromTo(
          targetElements,
          { ...(isRotate ? { x: isRtl ? -height : height } : { y: height }), opacity: 0 },
          {
            ...(isRotate ? { x: 0 } : { y: 0 }),
            opacity: 1,
            duration: animationDuration,
            delay: animationDelay,
            ease,
            scrollTrigger: {
              trigger: trigger || triggerContainer,
              once,
              markers,
              start: startPosition || "top bottom", // ✅ better start
            },
          }
        );
      }
    }
  
    ScrollTrigger.refresh(true); // ✅ recalc after mount
  }, []);
  

  return (isAnim) || alwaysAnimate ? (
    <div
    //   component={forText ? 'span' : 'div'}
      className={`fade-wrapper ${className ? className : ''} ${forText ? 'span-cs' : 'div-cs'} `}
      ref={triggerContainerRef}
    >
      <div 
      // component={forText ? 'span' : 'div'} 
      className={`fade-container ${forText ? 'span-cs' : 'div-cs'} opacity-0`} ref={fadeContainerRef}>
        {children as React.ReactElement}
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};
export const scrollTriggerInstance = ScrollTrigger;

export default FadeAnim;
