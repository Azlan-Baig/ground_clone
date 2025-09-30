'use client'
import { JSX, useEffect, useRef } from 'react';
// import useStyles from './styles';
// import { Box, useMediaQuery, useTheme } from '@mui/material';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { useParams } from 'next/navigation';
import React from 'react';
// import { tabletMedia } from '@themes/constants';
// import { useSelector } from 'react-redux';
// import { RootState } from '@store/store';
gsap.registerPlugin(ScrollTrigger);

type LinesProps = {
  type?: string;
  className?: string;
  shouldAnimate?: boolean;
  transformOrigin?: string;
  animationDuration?: string;
  animationDelay?: string;
  ease?: string;
  startPosition?: string;
  alwaysAnimate?: boolean;
  isFooter?: boolean;
};

const Lines = (props: LinesProps): JSX.Element => {

  const params = useParams();
  const locale:string = params.locale == 'ar' ? 'ar' :'en';
  const isRtl = locale === "ar";
  const {
    type = 'horizontal',
    className,
    transformOrigin = type === 'vertical' ? 'top' : `${isRtl ? 'right' : 'left'}`,
    animationDuration = '1.5',
    animationDelay = '0',
    ease = 'power2.out',
    startPosition = type === 'vertical' ? 'top 70%' : 'top 80%',
    shouldAnimate = false,
  } = props;

  const lineRef = useRef(null);
  const lineAnimTriggerRef = useRef(null);

  useEffect(() => {
    if (!shouldAnimate) {
      return;
    }
    if(lineRef.current){

      const line = lineRef.current;
      const animTrigger = lineAnimTriggerRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: animTrigger,
          // once: true,
          start: startPosition,
          // markers:true,
        },
      });
      // gsap.set(line, {opacity: 0})
      tl.to(animTrigger , {
        opacity: 1,
        delay: animationDelay,
      }).fromTo(
        line,
        {
          [type === 'vertical' ? 'scaleY' : 'scaleX']: 0,
          transformOrigin: transformOrigin,
          opacity: 1,
        },
        {
          [type === 'vertical' ? 'scaleY' : 'scaleX']: 1,
          duration: animationDuration,
          ease: ease,
          opacity: 1,
        }
      );
      ScrollTrigger.refresh(true);
    }
  }, [shouldAnimate]);

  return (
    <div
      className={`line-dignal ${
        type === 'vertical' ? 'l-vertical' : 'l-horzontal'
        } ${className ?? ''} ${shouldAnimate ? 'opacity-0' : ''}`}
        ref={lineAnimTriggerRef}
    >
      <i className={`line`} ref={lineRef}></i>
    </div>
  );
};

export default Lines;
