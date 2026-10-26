import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { portfolioContent } from '../content/content';
import { ArrowDown } from 'lucide-react';
import { PortraitSilhouette } from './art/PortraitSilhouette';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useIsTouch } from '../hooks/useIsTouch';

interface HeroProps {
  isReady: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isReady }) => {
  const { hero } = portfolioContent;
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<SVGSVGElement>(null);
  const [imgError, setImgError] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  // Entrance animation after preloader
  useEffect(() => {
    if (!isReady || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const lineEls = headlineRef.current?.querySelectorAll('.hero-line-inner');
      if (lineEls && lineEls.length > 0) {
        gsap.fromTo(
          lineEls,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            duration: 1.15,
            ease: 'power3.out',
          }
        );
      }

      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          {
            opacity: 0,
            scale: 1.06,
            filter: 'blur(8px) grayscale(1) contrast(1.1)',
          },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px) grayscale(1) contrast(1.1)',
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isReady, prefersReducedMotion]);

  // Mouse parallax
  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const portrait = portraitRef.current;
    if (!section || !headline || !portrait) return;

    const portraitXTo = gsap.quickTo(portrait, 'x', { duration: 0.6, ease: 'power2.out' });
    const portraitYTo = gsap.quickTo(portrait, 'y', { duration: 0.6, ease: 'power2.out' });
    const headlineXTo = gsap.quickTo(headline, 'x', { duration: 0.6, ease: 'power2.out' });
    const headlineYTo = gsap.quickTo(headline, 'y', { duration: 0.6, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xNorm = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yNorm = (e.clientY / innerHeight - 0.5) * 2;

      // Portrait moves up to 12px, headline up to 24px in opposite direction
      portraitXTo(xNorm * 12);
      portraitYTo(yNorm * 12);
      headlineXTo(-xNorm * 24);
      headlineYTo(-yNorm * 24);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion, isTouch]);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-paper text-ink flex flex-col justify-between pt-28 pb-10 px-6 md:px-10 overflow-hidden select-none"
    >
      {/* Background Thin Oscilloscope Waveform Line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-15 overflow-hidden">
        <svg
          ref={waveformRef}
          viewBox="0 0 1600 240"
          className="w-full h-44 animate-[pulse_6s_ease-in-out_infinite]"
          fill="none"
        >
          <path
            d="M 0 120 
               L 400 120 
               Q 450 30, 500 120 
               T 600 120 
               L 700 120 
               L 750 20 
               L 790 220 
               L 830 50 
               L 870 170 
               L 910 120 
               L 1200 120 
               Q 1300 200, 1400 120 
               L 1600 120"
            stroke="currentColor"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* Centerpiece: Headline + Overlapping Grayscale Cut-Out Portrait */}
      <div className="relative my-auto w-full max-w-[1440px] mx-auto flex flex-col items-center justify-center min-h-[50vh] md:min-h-[62vh]">
        
        {/* Layer 1: Huge Two-Line Display Headline (z-index 1) - Semantic Single H1 */}
        <div
          ref={headlineRef}
          className="relative z-10 w-full text-center flex flex-col items-center justify-center leading-[0.86] tracking-[-0.035em] font-display font-bold text-ink select-none"
        >
          {/* Lab / ECE Discipline Pill above Headline */}
          <div className="overflow-hidden mb-3 md:mb-5">
            <div className="hero-line-inner inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-ink/15 bg-ink/5 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-ink/80">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
              <span>{hero.departmentTag}</span>
            </div>
          </div>

          <h1 className="w-full flex flex-col items-center justify-center">
            <div className="overflow-hidden">
              <span className="hero-line-inner block text-[clamp(34px,10.2vw,210px)] font-bold uppercase tracking-[-0.035em] whitespace-nowrap">
                {hero.headlineLine1}
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-line-inner block text-[clamp(34px,10.2vw,210px)] font-bold uppercase tracking-[-0.035em] hero-gradient-text whitespace-nowrap">
                {hero.headlineLine2}
              </span>
            </div>
          </h1>
        </div>

        {/* Layer 2: Grayscale Cut-Out Portrait in front (z-index 2) */}
        <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] sm:w-[42vw] md:w-[30vw] max-w-[390px] pointer-events-none flex items-center justify-center select-none">
          <div
            ref={portraitRef}
            className="w-full aspect-[4/5] relative flex items-center justify-center will-change-transform"
          >
            {/* Atmospheric Ambient Shadow Behind the Man (Exact aesthetic from Screenshot 1) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -inset-x-14 -inset-y-10 rounded-full bg-black/20 blur-3xl scale-125 pointer-events-none -z-10"
            />
            <div
              aria-hidden="true"
              className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-black/35 blur-2xl pointer-events-none -z-10"
            />

            {!imgError ? (
              <img
                src="/images/portrait-cutout.png"
                alt="Portrait of Aravind Shankar, ECE Engineer"
                width={390}
                height={490}
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-auto object-contain filter grayscale contrast-125 brightness-95 drop-shadow-[0_25px_60px_rgba(0,0,0,0.4)]"
                onError={() => setImgError(true)}
              />
            ) : (
              <PortraitSilhouette variant="hero" className="w-full h-full" />
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar: Corner Labels & Controls */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-4 border-t border-ink/10">
        {/* Bottom-Left: Mono label & Circular Arrow Button */}
        <div className="flex items-center gap-5">
          <button
            onClick={handleScrollDown}
            aria-label="Scroll down to About section"
            data-cursor="SCROLL"
            className="group w-12 h-12 rounded-full border border-ink/30 flex items-center justify-center hover:bg-ink hover:text-paper transition-all duration-300"
          >
            <ArrowDown
              size={18}
              className="transition-transform duration-300 group-hover:rotate-90 group-hover:translate-y-0.5"
            />
          </button>
          <div>
            <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
              {hero.badgeLabel}
            </div>
            <div className="font-mono text-[10px] tracking-wider text-mute-light uppercase mt-0.5">
              ARAVIND SHANKAR — HARDWARE & EMBEDDED SYSTEMS
            </div>
          </div>
        </div>

        {/* Bottom-Right: Short Mono Paragraph & Tags */}
        <div className="max-w-[440px] text-left md:text-right flex flex-col items-start md:items-end">
          <p className="font-mono text-xs uppercase leading-relaxed text-ink/80 tracking-wide">
            {hero.bioSnippet}
          </p>
          <div className="flex items-center gap-2 mt-3">
            {hero.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-sm bg-ink/5 border border-ink/10 font-mono text-[10px] uppercase tracking-widest text-ink"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
