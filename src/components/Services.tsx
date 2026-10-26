import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { portfolioContent } from '../content/content';
import { ScrambleText } from './ScrambleText';
import { ProjectArt } from './art/ProjectArt';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useIsTouch } from '../hooks/useIsTouch';

export const Services: React.FC = () => {
  const { services } = portfolioContent;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  // Floating preview card following cursor
  useEffect(() => {
    if (prefersReducedMotion || isTouch) return;
    const preview = previewRef.current;
    if (!preview) return;

    const xTo = gsap.quickTo(preview, 'x', { duration: 0.35, ease: 'power2.out' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.35, ease: 'power2.out' });
    const rotTo = gsap.quickTo(preview, 'rotation', { duration: 0.35, ease: 'power2.out' });

    let prevX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - prevX;
      prevX = e.clientX;
      const rot = Math.max(-5, Math.min(5, deltaX * 0.4));

      xTo(e.clientX + 30);
      yTo(e.clientY - 120);
      rotTo(rot);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion, isTouch]);

  const activeService = hoveredIdx !== null ? services.items[hoveredIdx] : null;

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-paper text-ink flex flex-col justify-between pt-20 pb-0 px-6 md:px-12 select-none"
    >
      {/* Floating Preview Card Following Cursor */}
      {!isTouch && !prefersReducedMotion && (
        <div
          ref={previewRef}
          aria-hidden="true"
          className={`fixed top-0 left-0 pointer-events-none z-50 w-[300px] h-[200px] rounded-xl overflow-hidden shadow-2xl border border-white/20 transition-opacity duration-300 ${
            hoveredIdx !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          {activeService && (
            <div className="w-full h-full relative bg-[#0D0D11]">
              <ProjectArt type={activeService.artType} />
              <div className="absolute bottom-2 left-3 right-3 p-2 bg-black/80 backdrop-blur-md rounded border border-white/10 flex items-center justify-between text-white">
                <span className="font-mono text-[9px] uppercase tracking-wider text-signal">
                  {activeService.deliverable}
                </span>
                <span className="font-mono text-[9px] text-white/50">{activeService.index}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Top Header with Scramble Heading (Screenshot 7) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col gap-4 border-b border-ink/10 pb-6">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal" />
          <span className="font-mono text-xs uppercase tracking-widest text-ink/70">
            {services.sectionTag}
          </span>
        </div>

        <h2 className="font-display font-black text-[clamp(44px,8vw,120px)] leading-[0.88] tracking-tighter text-ink uppercase">
          <ScrambleText text={services.headline} />
        </h2>

        <p className="font-mono text-xs uppercase tracking-wider text-mute-light max-w-[600px]">
          {services.subtitle}
        </p>
      </div>

      {/* 5 Large Rows of Services */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto my-auto py-8 flex flex-col">
        {services.items.map((item, idx) => {
          const isHovered = hoveredIdx === idx;
          const isDimmed = hoveredIdx !== null && !isHovered;

          return (
            <div
              key={item.index}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`group relative flex flex-col lg:flex-row items-start lg:items-center justify-between py-7 px-4 border-b border-ink/10 transition-all duration-300 cursor-pointer ${
                isDimmed ? 'opacity-35' : 'opacity-100'
              } ${isHovered ? 'translate-x-4 bg-ink/[0.02]' : 'translate-x-0'}`}
              data-cursor="INQUIRE"
            >
              {/* Left: Index & Big Title */}
              <div className="flex items-baseline gap-6">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-ink text-signal font-bold shadow-sm">
                  {item.index}
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-ink group-hover:text-black">
                  {item.title}
                </h3>
              </div>

              {/* Middle: One-line Description */}
              <div className="max-w-[480px] my-2 lg:my-0">
                <p className="font-sans text-sm sm:text-base text-ink/75 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Right: Tags & Deliverable Arrow */}
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-sm bg-ink/5 border border-ink/10 font-mono text-[9px] uppercase tracking-wider text-ink/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center text-ink group-hover:bg-ink group-hover:text-paper transition-colors">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Bar on the Seam (Screenshots 7 & 8 seam) */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto -mb-6 flex justify-center">
        <div className="w-full max-w-4xl bg-[#0A0A0C] text-[#EDEDEA] rounded-full p-2.5 sm:p-3 px-6 shadow-2xl border border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/90">
              {services.bottomBarText}
            </span>
          </div>

          <a
            href="#contact"
            className="px-4 py-1.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-signal transition-colors flex items-center gap-1.5"
            data-cursor="LET'S TALK"
          >
            <span>{services.enquireLabel}</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
