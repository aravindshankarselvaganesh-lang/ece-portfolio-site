import React, { useState, useRef, useEffect, useCallback } from 'react';
import { portfolioContent, ProjectItem } from '../content/content';
import { ProjectArt } from './art/ProjectArt';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface BuildsCarouselProps {
  onOpenProject: (project: ProjectItem) => void;
}

export const BuildsCarousel: React.FC<BuildsCarouselProps> = ({ onOpenProject }) => {
  const { builds, works } = portfolioContent;
  const projects = works.projects;
  const total = projects.length;

  const [renderProgress, setRenderProgress] = useState(0);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rafActiveRef = useRef(false);

  // Event-driven physics RAF lerp loop (idle at rest, zero CPU when stationary)
  const scheduleLerp = useCallback(() => {
    if (rafActiveRef.current) return;
    rafActiveRef.current = true;

    const loop = () => {
      if (prefersReducedMotion) {
        currentProgressRef.current = targetProgressRef.current;
        setRenderProgress(targetProgressRef.current);
        rafActiveRef.current = false;
        return;
      }

      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0003) {
        currentProgressRef.current += diff * 0.12;
        setRenderProgress(currentProgressRef.current);
        requestAnimationFrame(loop);
      } else {
        currentProgressRef.current = targetProgressRef.current;
        setRenderProgress(targetProgressRef.current);
        rafActiveRef.current = false;
      }
    };

    requestAnimationFrame(loop);
  }, [prefersReducedMotion]);

  // Smooth jump to index with fluid physics momentum
  const goToIndex = useCallback(
    (newIndex: number) => {
      const clamped = Math.max(0, Math.min(total - 1, newIndex));
      targetProgressRef.current = clamped;
      scheduleLerp();
    },
    [total, scheduleLerp]
  );

  // Track gesture starting state for seamless bidirectional (left & right) stepping
  const gestureStartIndexRef = useRef(0);
  const isGestureActiveRef = useRef(false);

  // Mousepad / Trackpad continuous side-scrolling & wheel handler (both left and right)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let snapTimer: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      // Check if carousel section is visible in viewport
      const rect = el.getBoundingClientRect();
      const inView = rect.top <= 120 && rect.bottom >= window.innerHeight - 120;
      if (!inView) return;

      // Prevent slides from interacting with the categories bar and navbar at the top
      if (e.clientY < 110) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest('header')) return;

      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // ONLY advance the carousel when scrolling sideways:
      // - Horizontal trackpad swipe (absX > 0.5)
      // - Shift + wheel scroll (e.shiftKey)
      // When scrolling down or up with a regular vertical mouse wheel, let page scroll freely!
      const isSidewaysScroll = absX > 0.5 || (e.shiftKey && absY > 0);
      if (!isSidewaysScroll || (absY > 20 && absX < 3 && !e.shiftKey)) {
        return; // Allow native vertical page scrolling down/up
      }

      const delta = e.shiftKey && absY > absX ? e.deltaY : e.deltaX;

      // Advance both left (negative delta) and right (positive delta) smoothly
      if (Math.abs(delta) > 0.5) {
        e.preventDefault();

        if (!isGestureActiveRef.current) {
          isGestureActiveRef.current = true;
          gestureStartIndexRef.current = Math.round(targetProgressRef.current);
        }

        // Calibrated sensitivity for smooth, effortless bidirectional gliding
        const sensitivity = 0.0035;
        const nextTarget = targetProgressRef.current + delta * sensitivity;

        // Allow slight elastic overscroll on both ends
        targetProgressRef.current = Math.max(-0.25, Math.min(total - 1 + 0.25, nextTarget));
        scheduleLerp();

        // When gesture pauses, snap cleanly to the targeted card in that scroll direction
        if (snapTimer) clearTimeout(snapTimer);
        snapTimer = setTimeout(() => {
          const current = targetProgressRef.current;
          const diff = current - gestureStartIndexRef.current;
          let targetIndex: number;

          if (diff > 0.12) {
            // Scrolled to the right -> advance to next card(s)
            targetIndex = Math.min(
              total - 1,
              gestureStartIndexRef.current + Math.max(1, Math.round(diff))
            );
          } else if (diff < -0.12) {
            // Scrolled to the left -> advance to previous card(s)
            targetIndex = Math.max(
              0,
              gestureStartIndexRef.current - Math.max(1, Math.round(Math.abs(diff)))
            );
          } else {
            // Gentle settle to nearest card
            targetIndex = Math.max(0, Math.min(total - 1, Math.round(current)));
          }

          targetProgressRef.current = targetIndex;
          scheduleLerp();
          isGestureActiveRef.current = false;
        }, 140);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (snapTimer) clearTimeout(snapTimer);
    };
  }, [total, scheduleLerp]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') {
        goToIndex(Math.max(0, Math.round(targetProgressRef.current) - 1));
      } else if (e.key === 'ArrowRight') {
        goToIndex(Math.min(total - 1, Math.round(targetProgressRef.current) + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToIndex, total]);

  // Real-time tactile pointer / mousepad drag handling with flick inertia
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartTargetRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const hasMovedFarRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartTargetRef.current = targetProgressRef.current;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = performance.now();
    velocityRef.current = 0;
    hasMovedFarRef.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 6) {
      hasMovedFarRef.current = true;
    }

    // Measure instant velocity for momentum flick
    const now = performance.now();
    const dt = Math.max(1, now - lastPointerTimeRef.current);
    const dx = e.clientX - lastPointerXRef.current;
    velocityRef.current = dx / dt;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = now;

    // 1:1 real-time physical card tracking: 340px drag translates to 1 full card
    const progressDelta = -deltaX / 340;
    targetProgressRef.current = Math.max(
      -0.2,
      Math.min(total - 1 + 0.2, dragStartTargetRef.current + progressDelta)
    );
    scheduleLerp();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }

    const v = velocityRef.current; // px per ms
    if (Math.abs(v) > 0.35) {
      // Flick release: project target along flick direction
      const flickSteps = -Math.sign(v) * Math.min(2, Math.max(1, Math.round(Math.abs(v) * 0.9)));
      const projected = Math.round(targetProgressRef.current) + flickSteps;
      targetProgressRef.current = Math.max(0, Math.min(total - 1, projected));
    } else {
      // Gentle release: snap to nearest card
      targetProgressRef.current = Math.max(0, Math.min(total - 1, Math.round(targetProgressRef.current)));
    }
    scheduleLerp();
  };

  const activeIndex = Math.max(0, Math.min(total - 1, Math.round(renderProgress)));
  const currentProject = projects[activeIndex];

  return (
    <section
      id="builds"
      ref={containerRef}
      className="relative z-10 w-full min-h-screen bg-paper text-ink flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* Top Section Identifier & Dynamic Mousepad / Trackpad Hint */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex items-center justify-between border-b border-ink/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-ink/80 font-bold">
            {builds.sectionTag}
          </span>
        </div>

        {/* Live Scroll Progress Line & Hint */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-[11px] uppercase tracking-wider text-mute-light hidden sm:inline">
            SWIPE SIDEWAYS TO ADVANCE
          </span>
          <div className="w-24 sm:w-36 h-[2px] bg-ink/15 relative overflow-hidden rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-signal"
              style={{
                width: `${((renderProgress + 1) / total) * 100}%`,
              }}
            />
          </div>
          <span className="font-mono text-[11px] font-bold text-ink">
            0{activeIndex + 1} / 0{total}
          </span>
        </div>
      </div>

      {/* Center 3D Perspective Curved Strip of Project Cards (Screenshot 5) */}
      <div
        className="relative my-auto w-full max-w-[1440px] mx-auto min-h-[360px] sm:min-h-[420px] md:min-h-[460px] flex items-center justify-center perspective-1200 cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        data-cursor="SWIPE"
      >
        <div className="relative w-full max-w-[500px] h-[300px] sm:h-[350px] transform-style-3d flex items-center justify-center pointer-events-auto">
          {projects.map((proj, idx) => {
            // Smooth continuous difference driven by mousepad or drag
            const diff = idx - renderProgress;
            const isCenter = Math.abs(diff) < 0.35;

            // 3D perspective curve calculation
            const rotateY = prefersReducedMotion ? 0 : Math.max(-38, Math.min(38, diff * 22));
            const translateZ = prefersReducedMotion ? 0 : -Math.abs(diff) * 130;
            const translateX = prefersReducedMotion ? diff * 330 : diff * 340;
            const scale = Math.max(0.68, 1 - Math.abs(diff) * 0.1);
            const opacity = Math.abs(diff) > 2.5 ? 0 : Math.max(0.15, 1 - Math.abs(diff) * 0.35);

            // Alternating dark and light cards
            const isLightCard = idx % 2 === 1;

            return (
              <div
                key={proj.id}
                onClick={() => {
                  if (hasMovedFarRef.current) return;
                  if (isCenter) {
                    onOpenProject(proj);
                  } else {
                    goToIndex(idx);
                  }
                }}
                className={`absolute w-full h-full rounded-xl overflow-hidden shadow-2xl border border-ink/15 cursor-pointer transform-style-3d will-change-transform ${
                  isLightCard ? 'bg-[#E5E5DF] text-ink' : 'bg-[#0E0E12] text-paper'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(30 - Math.abs(diff) * 5),
                }}
              >
                {/* SVG Bespoke Project Art */}
                <div className="w-full h-full relative group">
                  <ProjectArt type={proj.artType} isLightCard={isLightCard} />

                  {/* Card Corner Info */}
                  <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm bg-black/40 text-white backdrop-blur-md">
                    REV // {proj.number}
                  </div>

                  <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-sm bg-black/40 text-white backdrop-blur-md flex items-center gap-1">
                    <span>SPECS</span>
                    <ArrowUpRight size={12} />
                  </div>

                  {/* Bottom title pill inside card */}
                  <div className="absolute bottom-4 inset-x-4 flex items-center justify-between p-3 rounded-lg bg-black/75 backdrop-blur-md text-white border border-white/10">
                    <div>
                      <div className="font-display font-bold text-sm tracking-tight uppercase">
                        {proj.title}
                      </div>
                      <div className="font-space text-xs text-signal font-medium tracking-[-0.01em] uppercase">
                        {proj.specs.mcuOrChip}
                      </div>
                    </div>
                    <span className="font-mono text-xs font-bold text-white/50">
                      {proj.number}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Caption Under the Centre Card + Counter */}
      <div
        aria-live="polite"
        className="relative z-10 w-full max-w-[1440px] mx-auto text-center py-2 flex flex-col items-center justify-center transition-all duration-300"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ink text-signal font-mono text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
          <span>{currentProject.number}</span>
          <span className="text-white/40">/</span>
          <span className="text-white/70">0{total}</span>
        </div>
        <h3 className="font-display font-black text-2xl sm:text-3xl tracking-tight uppercase text-ink">
          {currentProject.title}
        </h3>
        <p className="font-mono text-xs uppercase tracking-wider text-mute-light mt-1 max-w-[500px]">
          {currentProject.subtitle}
        </p>

        {/* Carousel controls with accessible 44x44px touch targets */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => goToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous hardware build"
            className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => onOpenProject(currentProject)}
            data-cursor="OPEN"
            className="px-5 py-2.5 rounded-full border border-ink bg-ink text-paper font-mono text-[11px] uppercase tracking-widest hover:bg-signal hover:text-ink hover:border-signal transition-all"
          >
            INSPECT SCHEMATIC
          </button>

          <button
            onClick={() => goToIndex(activeIndex + 1)}
            disabled={activeIndex === total - 1}
            aria-label="Next hardware build"
            className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Bottom Bar: Big Label Bottom-Left (Screenshot 5: "LANDING PAGES" -> "HARDWARE BUILDS") */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex items-end justify-between pt-6 border-t border-ink/10">
        <div>
          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter text-ink leading-none">
            {builds.label}
          </h2>
        </div>

        <div className="font-mono text-xs text-mute-light uppercase tracking-wider hidden sm:block">
          FABRICATION RIG // 6 DESIGNS
        </div>
      </div>
    </section>
  );
};
