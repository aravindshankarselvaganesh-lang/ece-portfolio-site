import React, { useEffect, useRef, useState } from 'react';
import { Zap, RotateCw } from 'lucide-react';

interface SplinePowerRigProps {
  className?: string;
  onLoaded?: () => void;
  showHelperPill?: boolean;
}

export const SplinePowerRig: React.FC<SplinePowerRigProps> = ({
  className = '',
  onLoaded,
  showHelperPill = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const appRef = useRef<any>(null);

  // Defer 3D canvas loading until section is near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isMounted = true;

    // Dynamically import @splinetool/runtime to keep initial bundle lean
    import('@splinetool/runtime')
      .then(({ Application }) => {
        if (!isMounted || !canvasRef.current) return;
        const app = new Application(canvasRef.current);
        appRef.current = app;

        return app.load('/scene.splinecode').then(() => {
          if (!isMounted) return;
          setIsLoading(false);
          onLoaded?.();
        });
      })
      .catch((err) => {
        if (import.meta.env.DEV) {
          console.warn('Spline 3D load deferred or failed:', err);
        }
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
      try {
        appRef.current?.dispose?.();
      } catch {
        // Safe disposal
      }
      appRef.current = null;
    };
  }, [shouldLoad, onLoaded]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Loading State Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm gap-3 text-signal">
          <Zap size={22} className="animate-bounce text-signal" />
          <div className="font-mono text-[10px] uppercase tracking-widest text-signal/90 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-ping" />
            <span>INITIALIZING 3D POWER CELL RIG...</span>
          </div>
        </div>
      )}

      {/* Interactive Helper Pill in Corner (Modal Mode) */}
      {showHelperPill && !isLoading && !hasError && (
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/70 font-mono text-[9px] uppercase tracking-widest">
          <RotateCw size={10} className="text-signal animate-spin [animation-duration:8s]" />
          <span>DRAG TO INSPECT 3D HARDWARE</span>
        </div>
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/30 text-white/50 font-mono text-xs">
          <span>HARDWARE 3D CELL READY</span>
        </div>
      )}
    </div>
  );
};
