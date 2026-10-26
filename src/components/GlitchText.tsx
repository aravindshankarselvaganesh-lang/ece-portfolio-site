import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface GlitchTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  className = '',
  trigger = true,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isGlitching, setIsGlitching] = useState(false);
  const [sliceOffset, setSliceOffset] = useState({ x1: 0, x2: 0, clip1: '', clip2: '' });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !trigger) return;

    setIsGlitching(true);
    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      // Random slice offsets
      const top1 = Math.floor(Math.random() * 80);
      const bottom1 = top1 + Math.floor(Math.random() * 20) + 5;
      const top2 = Math.floor(Math.random() * 80);
      const bottom2 = top2 + Math.floor(Math.random() * 20) + 5;

      const x1 = (Math.random() - 0.5) * 28; // up to 14px
      const x2 = (Math.random() - 0.5) * 24;

      setSliceOffset({
        x1,
        x2,
        clip1: `polygon(0 ${top1}%, 100% ${top1}%, 100% ${bottom1}%, 0 ${bottom1}%)`,
        clip2: `polygon(0 ${top2}%, 100% ${top2}%, 100% ${bottom2}%, 0 ${bottom2}%)`,
      });

      if (frame > 12) {
        clearInterval(interval);
        setIsGlitching(false);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [trigger, prefersReducedMotion]);

  if (prefersReducedMotion || !isGlitching) {
    return <span className={`inline-block ${className}`}>{text}</span>;
  }

  return (
    <span ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Base text */}
      <span className="opacity-80">{text}</span>

      {/* Signal green glitch slice */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-signal select-none pointer-events-none opacity-70"
        style={{
          transform: `translateX(${sliceOffset.x1}px)`,
          clipPath: sliceOffset.clip1,
        }}
      >
        {text}
      </span>

      {/* White offset slice */}
      <span
        aria-hidden="true"
        className="absolute inset-0 text-white select-none pointer-events-none opacity-90"
        style={{
          transform: `translateX(${sliceOffset.x2}px)`,
          clipPath: sliceOffset.clip2,
        }}
      >
        {text}
      </span>
    </span>
  );
};
