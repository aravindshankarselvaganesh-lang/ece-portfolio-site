import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioContent, ProjectItem } from '../content/content';
import { ProjectArt } from './art/ProjectArt';
import { ArrowUpRight, ChevronLeft, ChevronRight, MousePointer } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface WorksDrumProps {
  onOpenProject: (project: ProjectItem) => void;
}

export const WorksDrum: React.FC<WorksDrumProps> = ({ onOpenProject }) => {
  const { works } = portfolioContent;
  const projects = works.projects;
  const total = projects.length; // 6

  const [activeStep, setActiveStep] = useState<number>(0);
  const activeStepRef = useRef<number>(0);
  const [isPointerOver, setIsPointerOver] = useState<boolean>(false);
  const isPointerOverRef = useRef<boolean>(false);
  const currentRotationRef = useRef<number>(0);
  const snapTweenRef = useRef<gsap.core.Tween | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const drumContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Responsive radius calculation for clean, non-overlapping circular orbit
  const [radius, setRadius] = useState<number>(265);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(170);
      } else if (w < 1024) {
        setRadius(220);
      } else {
        setRadius(265);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync active step and pointer refs
  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    isPointerOverRef.current = isPointerOver;
  }, [isPointerOver]);

  // Decelerate and snap cleanly onto the nearest 60° detent
  const snapToNearestDetent = useCallback(() => {
    if (!drumContainerRef.current) return;
    if (snapTweenRef.current) snapTweenRef.current.kill();

    const targetSnap = Math.round(currentRotationRef.current / 60) * 60;
    snapTweenRef.current = gsap.to(drumContainerRef.current, {
      rotation: targetSnap,
      duration: 0.5,
      ease: 'power2.out',
      onUpdate: () => {
        const rot = gsap.getProperty(drumContainerRef.current, 'rotation') as number;
        currentRotationRef.current = rot;
        const normalizedAngle = ((-rot % 360) + 360) % 360;
        const currentIdx = Math.round(normalizedAngle / 60) % total;
        if (currentIdx !== activeStepRef.current) {
          setActiveStep(currentIdx);
          activeStepRef.current = currentIdx;
        }
      },
      onComplete: () => {
        currentRotationRef.current = targetSnap;
        const finalIdx = ((-Math.round(targetSnap / 60) % total) + total) % total;
        setActiveStep(finalIdx);
        activeStepRef.current = finalIdx;
        snapTweenRef.current = null;
      },
    });
  }, [total]);

  // 1. PIN & ROTATE EXACTLY ONE FULL ROTATION (360°), THEN MOVE TO NEXT PAGE
  // As the user scrolls down the page, this section pins and rotates exactly 360°,
  // then seamlessly unpins and continues to Chapter 06: Services.
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !drumContainerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1200',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: () => {
            if (!drumContainerRef.current) return;
            const rot = gsap.getProperty(drumContainerRef.current, 'rotation') as number;
            currentRotationRef.current = rot;
            const normalizedAngle = ((-rot % 360) + 360) % 360;
            const currentIdx = Math.round(normalizedAngle / 60) % total;
            if (currentIdx !== activeStepRef.current) {
              setActiveStep(currentIdx);
              activeStepRef.current = currentIdx;
            }
          },
        },
      });

      // Linear, exact 360° rotation from 0 to -360
      tl.fromTo(
        drumContainerRef.current,
        { rotation: 0 },
        { rotation: -360, ease: 'none' }
      );
    }, sectionRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [prefersReducedMotion, total]);

  // Smooth rotation to a specific step
  const rotateToStep = useCallback(
    (targetStep: number) => {
      if (snapTweenRef.current) snapTweenRef.current.kill();
      const targetRotation = -targetStep * 60;
      const normalizedIdx = ((targetStep % total) + total) % total;
      setActiveStep(normalizedIdx);
      activeStepRef.current = normalizedIdx;

      if (drumContainerRef.current) {
        if (prefersReducedMotion) {
          gsap.set(drumContainerRef.current, { rotation: targetRotation });
          currentRotationRef.current = targetRotation;
        } else {
          snapTweenRef.current = gsap.to(drumContainerRef.current, {
            rotation: targetRotation,
            duration: 0.75,
            ease: 'power3.out',
            onUpdate: () => {
              const rot = gsap.getProperty(drumContainerRef.current, 'rotation') as number;
              currentRotationRef.current = rot;
            },
            onComplete: () => {
              currentRotationRef.current = targetRotation;
              snapTweenRef.current = null;
            },
          });
        }
      }
    },
    [total, prefersReducedMotion]
  );

  // Jump to project via shortest angular path
  const goToProject = useCallback(
    (targetIdx: number) => {
      const currentAngle = ((-currentRotationRef.current % 360) + 360) % 360;
      const currentIdx = Math.round(currentAngle / 60) % total;
      let diff = targetIdx - currentIdx;
      if (diff > 3) diff -= total;
      if (diff < -3) diff += total;
      const currentStep = Math.round(-currentRotationRef.current / 60);
      rotateToStep(currentStep + diff);
    },
    [total, rotateToStep]
  );

  // 2. MANUAL SELECTION: If the user points on the slide, scrolling rotates to select one
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let snapTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleWheel = (e: WheelEvent) => {
      // ONLY intercept wheel if user is pointing directly on the slide ring
      if (!isPointerOverRef.current) {
        return; // Allow page scroll to drive the 1-rotation pin or move to next page
      }

      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      const delta = absX > absY ? e.deltaX : e.deltaY;

      if (Math.abs(delta) > 1.2) {
        e.preventDefault();

        if (snapTweenRef.current) {
          snapTweenRef.current.kill();
          snapTweenRef.current = null;
        }

        const sensitivity = 0.22;
        currentRotationRef.current -= delta * sensitivity;

        if (drumContainerRef.current) {
          gsap.set(drumContainerRef.current, { rotation: currentRotationRef.current });
        }

        const normalizedAngle = ((-currentRotationRef.current % 360) + 360) % 360;
        const currentIdx = Math.round(normalizedAngle / 60) % total;
        if (currentIdx !== activeStepRef.current) {
          setActiveStep(currentIdx);
          activeStepRef.current = currentIdx;
        }

        if (snapTimeout) clearTimeout(snapTimeout);
        snapTimeout = setTimeout(() => {
          snapToNearestDetent();
        }, 160);
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (snapTimeout) clearTimeout(snapTimeout);
    };
  }, [total, snapToNearestDetent]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      const currentStep = Math.round(-currentRotationRef.current / 60);
      if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
        rotateToStep(currentStep + 1);
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
        rotateToStep(currentStep - 1);
      } else if (e.key === 'Enter') {
        onOpenProject(projects[activeStepRef.current]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [rotateToStep, projects, onOpenProject]);

  // Pointer drag directly on drum
  const isDraggingRef = useRef(false);
  const lastDragYRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastDragYRef.current = e.clientY;
    if (snapTweenRef.current) snapTweenRef.current.kill();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dy = e.clientY - lastDragYRef.current;
    lastDragYRef.current = e.clientY;

    currentRotationRef.current += dy * 0.45;
    if (drumContainerRef.current) {
      gsap.set(drumContainerRef.current, { rotation: currentRotationRef.current });
    }

    const normalizedAngle = ((-currentRotationRef.current % 360) + 360) % 360;
    const currentIdx = Math.round(normalizedAngle / 60) % total;
    if (currentIdx !== activeStepRef.current) {
      setActiveStep(currentIdx);
      activeStepRef.current = currentIdx;
    }
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    snapToNearestDetent();
  };

  const activeProject = projects[activeStep];

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative z-10 w-full h-screen bg-paper text-ink flex flex-col justify-between pt-20 pb-6 px-6 md:px-12 overflow-hidden select-none"
    >
      {/* Top Header: Section tag + Top-Right Project Names List */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto flex items-start justify-between pb-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-ink/80 font-bold m-0">
              {works.sectionTag}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-mute-light hidden sm:inline">
              POINT ON SLIDE TO SELECT // SCROLL DOWN FOR 1 FULL ROTATION
            </span>
            <div className="w-24 sm:w-32 h-[2px] bg-ink/15 relative overflow-hidden rounded-full">
              <div
                className="absolute left-0 top-0 h-full bg-signal transition-all duration-150"
                style={{
                  width: `${((activeStep + 1) / total) * 100}%`,
                }}
              />
            </div>
            <span className="font-mono text-[11px] font-bold text-ink">
              0{activeStep + 1} / 0{total}
            </span>
          </div>
        </div>

        {/* Top-Right: Mono List of the 6 Project Names */}
        <div className="text-right flex flex-col gap-1">
          {projects.map((proj, idx) => {
            const isActive = idx === activeStep;
            return (
              <button
                key={proj.id}
                onClick={() => goToProject(idx)}
                className={`text-right font-mono text-[11px] uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'text-ink font-bold opacity-100 translate-x-0'
                    : 'text-ink/35 hover:text-ink/70 opacity-35 hover:translate-x-1'
                }`}
              >
                <span className="mr-2 text-[9px] text-[#065F46] font-bold">0{idx + 1}</span>
                <span>{proj.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Centerpiece Stage: Hover & Scroll selection activates ONLY when cursor points on the slides */}
      <div className="relative z-30 my-auto w-full flex items-center justify-center min-h-[480px] md:min-h-[580px]">
        {/* Precise circular bounding area matching the slides */}
        <div
          className="relative w-[500px] h-[500px] sm:w-[580px] sm:h-[580px] md:w-[640px] md:h-[640px] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerEnter={() => setIsPointerOver(true)}
          onPointerLeave={() => setIsPointerOver(false)}
          data-cursor="REVOLVE"
        >
          {/* Center Static Label: WORKS '26 */}
          <div className="absolute z-10 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="font-display font-medium text-2xl md:text-3xl uppercase tracking-widest text-ink">
              {works.drumCenterText}
            </span>
            <span className="font-mono text-[10px] text-mute-light uppercase tracking-widest mt-1">
              HEXAGONAL ROTOR
            </span>
            <span className="font-mono text-[9px] px-2.5 py-0.5 rounded-full bg-ink text-signal font-bold uppercase tracking-widest mt-1 shadow-sm">
              STEP 0{activeStep + 1} // {-activeStep * 60}°
            </span>
          </div>

          {/* Rotating Drum Container: Completes 1 full 360° turn on scroll then moves to next page */}
          <div
            ref={drumContainerRef}
            className="relative w-0 h-0 flex items-center justify-center will-change-transform"
          >
            {projects.map((proj, idx) => {
              // Hexagon angle: 0, 60, 120, 180, 240, 300 deg
              const angleDeg = idx * 60;
              const angleRad = (angleDeg * Math.PI) / 180;
              const x = Math.sin(angleRad) * radius;
              const y = -Math.cos(angleRad) * radius;
              const isActive = idx === activeStep;

              return (
                <div
                  key={proj.id}
                  style={{
                    transform: `translate(${x}px, ${y}px) rotate(${angleDeg}deg)`,
                    zIndex: isActive ? 40 : 10,
                  }}
                  className="absolute w-[140px] sm:w-[175px] md:w-[210px] h-[92px] sm:h-[115px] md:h-[132px] -translate-x-1/2 -translate-y-1/2"
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isActive) {
                        onOpenProject(proj);
                      } else {
                        goToProject(idx);
                      }
                    }}
                    className={`w-full h-full rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer group relative ${
                      isActive
                        ? 'border-signal ring-2 ring-signal/50 scale-105 shadow-[0_20px_45px_rgba(0,0,0,0.7)]'
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30 scale-95 shadow-md'
                    }`}
                  >
                    {/* SVG Thumbnail */}
                    <ProjectArt type={proj.artType} />

                    {/* Corner indicator */}
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm font-mono text-[8px] text-white">
                      0{idx + 1}
                    </div>

                    {isActive && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-signal text-ink font-mono text-[9px] font-bold flex items-center gap-1 shadow-md animate-pulse">
                        <span>OPEN</span>
                        <ArrowUpRight size={10} />
                      </div>
                    )}

                    <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/90 to-transparent text-white">
                      <div className="font-mono text-[10px] font-bold uppercase truncate">
                        {proj.title}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Hint in Mono: Automation Status + Manual Cycle Controls */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-ink/20 bg-paper/80 backdrop-blur-sm transition-all"
          >
            <MousePointer
              size={13}
              className={`transition-colors duration-300 ${
                isPointerOver ? 'text-signal' : 'text-ink/40'
              }`}
            />
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink/80">
              {isPointerOver ? 'POINTING ON SLIDE: SCROLL TO SELECT' : 'SCROLL: 1 FULL ROTATION THEN ADVANCES'}
            </span>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPointerOver ? 'bg-signal animate-pulse' : 'bg-ink/30'
              }`}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => goToProject((activeStep - 1 + total) % total)}
            aria-label="Previous project on drum"
            className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => onOpenProject(activeProject)}
            data-cursor="INSPECT"
            className="px-5 py-2.5 rounded-full bg-ink text-paper font-mono text-xs uppercase tracking-widest hover:bg-signal hover:text-ink transition-colors cursor-pointer shadow-sm"
          >
            INSPECT // {activeProject.title}
          </button>
          <button
            onClick={() => goToProject((activeStep + 1) % total)}
            aria-label="Next project on drum"
            className="w-11 h-11 rounded-full border border-ink/20 flex items-center justify-center hover:bg-ink hover:text-paper transition-colors cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
