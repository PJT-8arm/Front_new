// useSmoothScroll.js
import { useRef } from 'react';

const SmoothScroll = () => {
  const requestRef = useRef();

  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScrollTo = (element, target, duration) => {
    const start = element.scrollTop,
          change = target - start,
          increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;
      const val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        requestRef.current = requestAnimationFrame(animateScroll);
      }
    };

    animateScroll();
  };

  return smoothScrollTo;
};

export default SmoothScroll;