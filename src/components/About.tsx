import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioContent } from '../content/content';
import { GlitchText } from './GlitchText';
import { SplinePowerRig } from './SplinePowerRig';
import { Zap } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const { about } = portfolioContent;
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const factsRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [glitchTrigger, setGlitchTrigger] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const bio = bioRef.current;
    const facts = factsRef.current;
    const stage = stageRef.current;

    if (!section) return;

    if (prefersReducedMotion) {
      setGlitchTrigger(true);
      return;
    }

    const ctx = gsap.context(() => {
      // Trigger glitch headline when section reaches 60% viewport
      ScrollTrigger.create({
        trigger: section,
        start: 'top 65%',
        onEnter: () => setGlitchTrigger(true),
        onEnterBack: () => setGlitchTrigger(true),
      });

      // Smooth unpinned reveal timeline for content over the 3D background
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 0.6,
        },
      });

      // Bio lines staggered reveal
      if (bio) {
        const paragraphs = bio.querySelectorAll('.bio-p');
        tl.fromTo(
          paragraphs,
          { opacity: 0.25, y: 30 },
          { opacity: 1, y: 0, stagger: 0.15, ease: 'power2.out', duration: 1 },
          0
        );
      }

      // Three facts reveal
      if (facts) {
        const factItems = facts.querySelectorAll('.fact-card');
        tl.fromTo(
          factItems,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, stagger: 0.12, ease: 'power2.out', duration: 0.8 },
          0.3
        );
      }

      // Right stage subtle floating parallax
      if (stage) {
        tl.fromTo(
          stage,
          { y: 40 },
          { y: -20, ease: 'none', duration: 1.2 },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0A0A0C] text-[#EDEDEA] flex flex-col justify-between pt-24 pb-8 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* =========================================================================
          Full-Page Interactive 3D Spline Hardware Background
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
        <SplinePowerRig className="w-full h-full" showHelperPill={false} />

        {/* Dynamic gradient overlay to ensure 100% crisp contrast for left bio text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0A0A0C]/90 via-[#0A0A0C]/50 to-transparent z-[3]"
        />

        {/* Ambient Top & Bottom Edge Blends to smoothly transition into adjacent sections */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/80 to-transparent pointer-events-none"
        />
      </div>

      {/* Top Tag & Header HUD */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold">
            {about.badge}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase hidden sm:inline">
            LIVE 3D HARDWARE BACKPLANE // INTERACTIVE
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-white/40">
            SEC // 02
          </span>
        </div>
      </div>

      {/* Center Composition: Left Bio Manifesto & Open Right 3D Visual Stage */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto my-auto flex flex-col lg:flex-row items-center justify-between gap-12 py-10 pointer-events-none">
        
        {/* Left Column: Bio Content & Facts (Interactive pointer events) */}
        <div ref={bioRef} className="w-full lg:w-5/12 flex flex-col gap-6 order-2 lg:order-1 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="font-signal uppercase">
              // CORE MANIFESTO
            </span>
          </div>

          <div className="space-y-4 text-white/80 font-sans text-base md:text-lg leading-relaxed max-w-[52ch]">
            {about.bioParagraphs.map((p, idx) => (
              <p key={idx} className="bio-p">
                {p}
              </p>
            ))}
          </div>

          {/* Three small mono facts */}
          <div ref={factsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {about.facts.map((fact) => (
              <div key={fact.label} className="fact-card flex flex-col gap-1">
                <span className="font-signal-sm uppercase">
                  {fact.label}
                </span>
                <span className="font-sans text-xs text-white/90 leading-tight">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Wide Open 3D Stage with Split Headline Overlapping Full-Page 3D Canvas */}
        <div
          ref={stageRef}
          className="relative w-full lg:w-6/12 flex flex-col justify-between items-center min-h-[380px] sm:min-h-[440px] md:min-h-[540px] order-1 lg:order-2 pointer-events-none"
        >
          {/* Top-Left Split Headline Word: "ABOUT" */}
          <div className="w-full flex justify-start select-none">
            <h2 className="font-display font-black text-[clamp(44px,11.5vw,170px)] leading-[0.82] tracking-tighter text-white">
              <GlitchText text={about.headlinePart1} trigger={glitchTrigger} />
            </h2>
          </div>

          {/* Center Stage Floating HUD Badge over the 3D Spline Battery */}
          <div className="my-auto flex flex-col items-center justify-center gap-2 select-none pointer-events-none text-center py-6">
            <div className="px-4 py-2 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] uppercase tracking-widest flex items-center gap-2.5 shadow-2xl">
              <Zap size={13} className="text-signal animate-pulse" />
              <span>3D POWER RIG // DRAG TO ROTATE SCENE</span>
            </div>
            <span className="font-mono text-[9px] text-signal/80 uppercase tracking-widest">
              3.7V LI-ION ACCUMULATOR • REAL-TIME PHYSICS
            </span>
          </div>

          {/* Bottom-Right Split Headline Word: "ME" */}
          <div className="w-full flex justify-end select-none">
            <span className="font-display font-black text-[clamp(44px,11.5vw,170px)] leading-[0.82] tracking-tighter text-white">
              <GlitchText text={about.headlinePart2} trigger={glitchTrigger} />
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Status Ticker */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex items-center justify-between text-xs font-mono text-white/40 pt-4 border-t border-white/10">
        <div>HARDWARE & SIGNAL COUPLING</div>
        <div className="flex items-center gap-2 text-white/70">
          <span className="w-1.5 h-1.5 rounded-full bg-signal" />
          <span>PASSIVE IMPEDANCE VERIFIED</span>
        </div>
      </div>
    </section>
  );
};
