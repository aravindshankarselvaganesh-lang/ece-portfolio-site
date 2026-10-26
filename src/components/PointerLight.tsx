import React, { useEffect, useRef, useState } from 'react';
import { useIsTouch } from '../hooks/useIsTouch';

interface PointerLightProps {
  activeSection?: string;
}

export const PointerLight: React.FC<PointerLightProps> = ({ activeSection }) => {
  const isTouch = useIsTouch();
  const [isVisible, setIsVisible] = useState(false);

  // References to the light layers
  const coreRef = useRef<HTMLDivElement>(null);
  const spreadRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  // Position, motion & velocity state stored in refs for 60-120fps direct GPU rendering
  const mouse = useRef({ x: -1000, y: -1000 });
  const corePos = useRef({ x: -1000, y: -1000 });
  const haloPos = useRef({ x: -1000, y: -1000 });
  const prevPos = useRef({ x: -1000, y: -1000 });
  const velocity = useRef(0);
  const spreadScale = useRef(1);
  const rippleScale = useRef(1);
  const rippleOpacity = useRef(0);
  const isFirstMove = useRef(true);
  const rafId = useRef<number | null>(null);

  const isDarkSection =
    !activeSection ||
    ['about', 'experience', 'contact'].includes(activeSection);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (isFirstMove.current) {
        corePos.current.x = e.clientX;
        corePos.current.y = e.clientY;
        haloPos.current.x = e.clientX;
        haloPos.current.y = e.clientY;
        prevPos.current.x = e.clientX;
        prevPos.current.y = e.clientY;
        isFirstMove.current = false;
        setIsVisible(true);
      }
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      velocity.current = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // High performance RAF loop: direct transform updates without triggering React renders
    const update = () => {
      // 1. Calculate pointer speed/velocity
      const dx = mouse.current.x - prevPos.current.x;
      const dy = mouse.current.y - prevPos.current.y;
      const dist = Math.hypot(dx, dy);

      prevPos.current.x = mouse.current.x;
      prevPos.current.y = mouse.current.y;

      // Dampened velocity accumulator
      velocity.current += (dist - velocity.current) * 0.18;

      // 2. Light spread calculation:
      // When moving, the beam blossoms outward (spreadScale expands up to 1.8x)
      const targetScale = 1.0 + Math.min(velocity.current * 0.035, 0.85);
      spreadScale.current += (targetScale - spreadScale.current) * 0.12;

      // 3. Spreading electromagnetic ripple when moving quickly
      if (dist > 8) {
        rippleOpacity.current = Math.min(rippleOpacity.current + dist * 0.008, 0.55);
        rippleScale.current += (spreadScale.current * 1.25 - rippleScale.current) * 0.15;
      } else {
        rippleOpacity.current *= 0.88;
        rippleScale.current += (1.0 - rippleScale.current) * 0.1;
      }

      // 4. Smooth lerp positions:
      // Core tracks tightly (~0.28 lerp)
      corePos.current.x += (mouse.current.x - corePos.current.x) * 0.28;
      corePos.current.y += (mouse.current.y - corePos.current.y) * 0.28;

      // Halo/ambient spread floats with silky fluid inertia (~0.10 lerp)
      haloPos.current.x += (mouse.current.x - haloPos.current.x) * 0.1;
      haloPos.current.y += (mouse.current.y - haloPos.current.y) * 0.1;

      // 5. Update GPU transforms directly
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${corePos.current.x}px, ${corePos.current.y}px, 0) translate(-50%, -50%) scale(${spreadScale.current})`;
      }

      if (spreadRef.current) {
        spreadRef.current.style.transform = `translate3d(${haloPos.current.x}px, ${haloPos.current.y}px, 0) translate(-50%, -50%) scale(${spreadScale.current * 1.15})`;
      }

      if (rippleRef.current) {
        rippleRef.current.style.transform = `translate3d(${corePos.current.x}px, ${corePos.current.y}px, 0) translate(-50%, -50%) scale(${rippleScale.current * 1.4})`;
        rippleRef.current.style.opacity = `${rippleOpacity.current}`;
      }

      rafId.current = requestAnimationFrame(update);
    };

    rafId.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-30 overflow-hidden transition-opacity duration-500 will-change-transform ${
        isVisible ? (isDarkSection ? 'opacity-100' : 'opacity-40') : 'opacity-0'
      }`}
      style={{ mixBlendMode: 'screen' }}
    >
      {/* Layer 1: Outer Spreading Ambient Halo — expands & trails as pointer moves */}
      <div
        ref={spreadRef}
        className="absolute top-0 left-0 w-[620px] h-[620px] rounded-full will-change-transform pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 229, 153, 0.24) 0%, rgba(16, 185, 129, 0.14) 28%, rgba(6, 78, 59, 0.06) 55%, transparent 72%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Layer 2: Dynamic Wave Ripple — blossoms outward during cursor sweeps */}
      <div
        ref={rippleRef}
        className="absolute top-0 left-0 w-[440px] h-[440px] rounded-full will-change-transform pointer-events-none border border-signal/30"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.18) 0%, rgba(0, 229, 153, 0.10) 40%, transparent 70%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Layer 3: Inner Photon Hotspot Core — crisp, luminous spotlight centered on the pointer */}
      <div
        ref={coreRef}
        className="absolute top-0 left-0 w-[240px] h-[240px] rounded-full will-change-transform pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.55) 0%, rgba(0, 229, 153, 0.35) 25%, rgba(0, 229, 153, 0.12) 55%, transparent 75%)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  );
};
