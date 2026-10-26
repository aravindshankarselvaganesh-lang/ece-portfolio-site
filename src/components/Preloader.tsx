import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PortraitSilhouette } from './art/PortraitSilhouette';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eceRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState<number>(0);
  const [imgFailed, setImgFailed] = useState<boolean>(false);
  const [isExited, setIsExited] = useState<boolean>(false);
  const prefersReducedMotion = useReducedMotion();

  // Guard to ensure animation runs strictly ONCE and never re-runs or resets
  const hasRunRef = useRef<boolean>(false);
  const onCompleteRef = useRef<() => void>(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    if (prefersReducedMotion) {
      document.body.style.overflow = '';
      onCompleteRef.current?.();
      setIsExited(true);
      return;
    }

    // Prevent background scrolling while preloader is active
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      const counterObj = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          // Restore body scrolling upon preloader finish
          document.body.style.overflow = '';

          // Trigger Hero page entrance strictly once
          onCompleteRef.current?.();

          // Smoothly slide up the dark preloader curtain
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              yPercent: -100,
              duration: 0.85,
              ease: 'power3.inOut',
              onComplete: () => {
                setIsExited(true);
              },
            });
          }
        },
      });

      // 1. As it loads: The white light behind the shadow gradually appears and intensifies
      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          {
            opacity: 0,
            scale: 0.35,
          },
          {
            opacity: 1,
            scale: 1.25,
            duration: 2.2,
            ease: 'power2.out',
          },
          0
        );
      }

      // 2. White ECE text emerges with the building light
      if (eceRef.current) {
        tl.fromTo(
          eceRef.current,
          {
            opacity: 0,
            scale: 0.9,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: 'power2.out',
          },
          0.1
        );
      }

      // 3. The black man's shadow slowly appears in front of the white ECE & light
      if (silhouetteRef.current) {
        tl.fromTo(
          silhouetteRef.current,
          {
            opacity: 0,
            scale: 0.88,
            filter: 'blur(16px) brightness(0.05)',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px) brightness(1)',
            duration: 2.0,
            ease: 'power2.out',
          },
          0.2
        );
      }

      // 4. Smooth, continuous percentage count strictly from 0 to 100 once
      tl.to(
        counterObj,
        {
          value: 100,
          duration: 2.2,
          ease: 'power1.inOut',
          onUpdate: () => {
            const currentVal = Math.min(100, Math.floor(counterObj.value));
            setCount(currentVal);

            if (progressLineRef.current) {
              progressLineRef.current.style.width = `${currentVal}%`;
            }
          },
        },
        0
      );

      // Brief cinematic hold at 100%
      tl.to({}, { duration: 0.25 });
    }, containerRef);

    return () => {
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []); // Run strictly once on mount

  if (isExited) return null;

  const formattedCount = count < 10 ? `00${count}` : count < 100 ? `0${count}` : `${count}`;

  return (
    <aside
      aria-label="ECE Preloader"
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#07070A] text-[#EDEDEA] flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden will-change-transform"
    >
      {/* Background Reticle Grid */}
      <div className="absolute inset-0 pointer-events-none -z-20">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Top spacing placeholder without any wording */}
      <div className="w-full h-4 sm:h-8" />

      {/* Centerpiece: Giant WHITE ECE + Building White Light + Black Man's Shadow */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center my-auto">
        {/* Giant WHITE "ECE" Typography Behind the Shadow */}
        <div
          ref={eceRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none flex flex-col items-center justify-center w-full z-0 will-change-transform"
        >
          {/* Volumetric White Light that grows as it loads */}
          <div
            ref={glowRef}
            className="absolute w-[380px] sm:w-[580px] md:w-[780px] h-[260px] sm:h-[400px] md:h-[500px] rounded-full bg-radial from-white/35 via-white/10 to-transparent blur-3xl will-change-transform"
          />

          {/* Big White ECE Letters (Strictly only ECE - no subtitles or other wordings) */}
          <div className="relative flex flex-col items-center">
            <span
              className="font-syne font-black text-[130px] sm:text-[210px] md:text-[290px] lg:text-[340px] leading-none tracking-widest text-white"
              style={{
                textShadow:
                  '0 0 35px rgba(255, 255, 255, 0.7), 0 0 80px rgba(255, 255, 255, 0.4), 0 0 140px rgba(255, 255, 255, 0.2)',
              }}
            >
              ECE
            </span>
          </div>
        </div>

        {/* The Black Man's Shadow Silhouette in Front */}
        <div
          ref={silhouetteRef}
          className="relative z-10 flex flex-col items-center justify-center will-change-transform mt-3 sm:mt-6"
        >
          <div className="relative w-[230px] sm:w-[310px] md:w-[370px] lg:w-[410px] max-h-[50vh] flex items-center justify-center">
            {/* Dark contrast drop shadow to pop against the white light */}
            <div className="absolute inset-0 bg-black/50 blur-xl scale-95 -z-10" />

            {!imgFailed ? (
              <img
                src="/images/portrait-cutout.png"
                alt="Silhouette"
                className="w-full h-auto max-h-[48vh] object-contain filter grayscale contrast-200 brightness-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
                onError={() => setImgFailed(true)}
              />
            ) : (
              <PortraitSilhouette variant="hero" className="w-[280px] sm:w-[360px] h-auto max-h-[48vh]" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Progress Counter & Progress Track (No extra wordings) */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto flex flex-col items-center gap-3 border-t border-white/10 pt-4">
        {/* Glowing Progress Line */}
        <div className="w-full h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          <div
            ref={progressLineRef}
            className="absolute left-0 top-0 h-full bg-signal shadow-[0_0_12px_#39FF88] transition-all duration-75"
            style={{ width: `${count}%` }}
          />
        </div>

        {/* Clean Numeric Counter Only */}
        <div className="flex items-baseline text-white">
          <span className="font-mono text-3xl sm:text-5xl font-bold tracking-tight">
            {formattedCount}
          </span>
          <span className="text-signal text-base sm:text-xl font-bold ml-1">%</span>
        </div>
      </div>
    </aside>
  );
};
