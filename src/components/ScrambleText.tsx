import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: boolean;
  durationMs?: number;
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@<>';

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = '',
  trigger = true,
  durationMs = 900,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState<string>(text);
  const isScramblingRef = useRef(false);

  const startScramble = useCallback(() => {
    if (prefersReducedMotion || isScramblingRef.current) return;
    isScramblingRef.current = true;

    const length = text.length;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Characters resolved up to index
      const resolvedCount = Math.floor(progress * length);

      let result = '';
      for (let i = 0; i < length; i++) {
        if (text[i] === ' ') {
          result += ' ';
        } else if (i < resolvedCount) {
          result += text[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    };

    requestAnimationFrame(animate);
  }, [text, durationMs, prefersReducedMotion]);

  useEffect(() => {
    if (trigger) {
      startScramble();
    }
  }, [trigger, startScramble]);

  return (
    <span
      className={`inline-block font-mono tracking-tight ${className}`}
      onMouseEnter={startScramble}
    >
      {displayText}
    </span>
  );
};
