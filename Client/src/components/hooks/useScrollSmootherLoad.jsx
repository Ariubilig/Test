import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const useScrollSmootherLoad = (wrapperRef, preloaderDone) => {
  const smootherRef = useRef(null);

  useEffect(() => {
    if (!preloaderDone) return;
    if (!wrapperRef.current) return;
    if (ScrollTrigger.isTouch === 1) return; // Mobile device disable ScrollSmoother
    if (smootherRef.current) return; // Prevent double initialization

    const content = wrapperRef.current.querySelector("#smooth-content");
    if (!content) return;

    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current,
      content,
      smooth: 1.5,
      effects: true,
      normalizeScroll: true, // use ONE normalization
      ignoreMobileResize: true,
    });

    ScrollTrigger.refresh();

    return () => {
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, [preloaderDone]); // dont care about wrapperRef
};
