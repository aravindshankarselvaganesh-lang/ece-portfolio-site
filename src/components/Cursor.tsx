import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useIsTouch } from '../hooks/useIsTouch';

export const Cursor: React.FC = () => {
  const isTouch = useIsTouch();
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const isVisibleRef = useRef<boolean>(false);

  useEffect(() => {
    if (isTouch) return;

    document.body.classList.add('has-custom-cursor');

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
      xTo(e.clientX);
      yTo(e.clientY);

      // Check if hovering an element with cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      const isButtonOrLink = target?.closest('button, a, [role="button"], input, textarea');

      if (cursorTarget) {
        const label = cursorTarget.getAttribute('data-cursor') || '';
        setCursorLabel(label);
        setIsHovered(true);
      } else if (isButtonOrLink) {
        setCursorLabel('');
        setIsHovered(true);
      } else {
        setCursorLabel('');
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    const onScroll = () => {
      // Clear stuck cursor hover labels while scrolling between sections
      setIsHovered(false);
      setCursorLabel('');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ mixBlendMode: 'difference' }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 border border-white ${
          isHovered
            ? 'w-[76px] h-[76px] bg-white text-black'
            : 'w-3 h-3 bg-white text-transparent'
        }`}
      >
        <span
          ref={labelRef}
          className={`font-mono text-[10px] font-bold uppercase tracking-wider text-black select-none transition-opacity duration-200 ${
            isHovered && cursorLabel ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {cursorLabel}
        </span>
      </div>
    </div>
  );
};
