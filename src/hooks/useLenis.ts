import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    // Initialize Lenis with smooth easing and calibrated trackpad responsiveness
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    // Ensure scroll starts unconditionally at the top (first page) on reload/mount
    const resetToTop = () => {
      try {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        lenis.scrollTo(0, { immediate: true });
      } catch (e) {}
    };

    resetToTop();
    const t1 = setTimeout(resetToTop, 50);
    const t2 = setTimeout(resetToTop, 150);
    const t3 = setTimeout(() => {
      resetToTop();
      ScrollTrigger.refresh();
    }, 300);

    const onBeforeUnload = () => {
      resetToTop();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    window.addEventListener('load', resetToTop);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('load', resetToTop);
      window.removeEventListener('beforeunload', onBeforeUnload);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return lenisRef;
}
