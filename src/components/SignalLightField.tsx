import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SignalLightFieldProps {
  className?: string;
}

interface PulsePacket {
  waveIndex: number;
  xRatio: number; // 0 to 1 across the width
  speed: number;
  size: number;
}

export const SignalLightField: React.FC<SignalLightFieldProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Animation and physics state in refs for zero React render overhead
  const mouse = useRef({ x: -2000, y: -2000, targetX: -2000, targetY: -2000 });
  const velocity = useRef(0);
  const prevMouse = useRef({ x: -2000, y: -2000 });
  const excitationRadius = useRef(280);
  const isVisible = useRef(true);
  const animFrameId = useRef<number | null>(null);

  // Packets of signal energy travelling along wave traces
  const packets = useRef<PulsePacket[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Initialize pulse packets
    const WAVE_COUNT = 20;
    packets.current = Array.from({ length: 32 }, () => ({
      waveIndex: Math.floor(Math.random() * WAVE_COUNT),
      xRatio: Math.random(),
      speed: 0.0015 + Math.random() * 0.003,
      size: 2 + Math.random() * 2.5,
    }));

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Track mouse coordinates relative to container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.current.targetX = e.clientX - rect.left;
      mouse.current.targetY = e.clientY - rect.top;

      if (mouse.current.x < -1000) {
        mouse.current.x = mouse.current.targetX;
        mouse.current.y = mouse.current.targetY;
        prevMouse.current.x = mouse.current.targetX;
        prevMouse.current.y = mouse.current.targetY;
      }
    };

    const handleMouseLeave = () => {
      mouse.current.targetX = -2000;
      mouse.current.targetY = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Pause canvas when off screen to conserve resources
    const io = new IntersectionObserver(
      (entries) => {
        isVisible.current = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    let time = 0;

    const render = () => {
      if (!isVisible.current || width === 0 || height === 0) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      time += prefersReducedMotion ? 0.004 : 0.016;

      // Smooth mouse lerp
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.2;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.2;

      // Calculate instantaneous pointer motion velocity
      const dx = mouse.current.x - prevMouse.current.x;
      const dy = mouse.current.y - prevMouse.current.y;
      const dist = Math.hypot(dx, dy);
      prevMouse.current.x = mouse.current.x;
      prevMouse.current.y = mouse.current.y;

      velocity.current += (dist - velocity.current) * 0.15;

      // Expand excitation light radius as pointer moves
      const targetRadius = 260 + Math.min(velocity.current * 8, 180);
      excitationRadius.current += (targetRadius - excitationRadius.current) * 0.12;

      ctx.clearRect(0, 0, width, height);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const radius = excitationRadius.current;

      // Draw all signal channels
      const stepX = 14; // Sample resolution along X
      const pointsPerWave = Math.ceil(width / stepX) + 1;

      for (let i = 0; i < WAVE_COUNT; i++) {
        const baseNormY = (i + 1) / (WAVE_COUNT + 1);
        const baseY = baseNormY * height;

        // Wave parameters for varying harmonics
        const freq = 0.0025 + (i % 5) * 0.0012;
        const phaseSpeed = 1.0 + (i % 3) * 0.4;
        const phase = time * phaseSpeed + i * 0.7;
        const baseAmp = 8 + (i % 4) * 6;

        // Prepare points buffer for this wave
        ctx.beginPath();

        for (let j = 0; j <= pointsPerWave; j++) {
          const px = j * stepX;

          // Pure carrier wave formula + modulation
          const harmonic1 = Math.sin(px * freq + phase) * baseAmp;
          const harmonic2 = Math.cos(px * (freq * 0.45) - phase * 0.6) * (baseAmp * 0.45);
          let py = baseY + harmonic1 + harmonic2;

          // Distance from this wave point to mouse pointer
          const pDist = Math.hypot(px - mx, py - my);

          // Interaction: When pointer is near, wave bends slightly toward pointer
          if (pDist < radius && mx > -500) {
            const pullFactor = (1 - pDist / radius) * 0.35;
            py += (my - py) * pullFactor;
          }

          if (j === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }

        // Check if wave passes near mouse to determine light level
        const waveDistToMouse = Math.abs(baseY - my);
        const isNearPointer = waveDistToMouse < radius && mx > -500;

        if (isNearPointer) {
          // Dynamic phosphor light intensity based on mouse proximity
          const proximity = Math.max(0, 1 - waveDistToMouse / radius);
          const lightAlpha = 0.2 + proximity * 0.8;

          // Multi-layer glowing stroke: the signal line acts as physical neon light
          ctx.save();
          ctx.globalAlpha = lightAlpha;
          ctx.shadowColor = '#39FF88';
          ctx.shadowBlur = 12 + proximity * 18;
          ctx.lineWidth = 1.2 + proximity * 2.2;

          // Gradient across the illuminated region
          const grad = ctx.createRadialGradient(mx, my, 20, mx, my, radius);
          grad.addColorStop(0, '#FFFFFF'); // Hot white photon core
          grad.addColorStop(0.35, '#39FF88'); // High-voltage phosphor green
          grad.addColorStop(0.75, 'rgba(57, 255, 136, 0.4)');
          grad.addColorStop(1, 'rgba(57, 255, 136, 0.08)');

          ctx.strokeStyle = grad;
          ctx.stroke();
          ctx.restore();
        } else {
          // Resting background trace: faint, subtle ambient oscilloscope signal
          ctx.save();
          ctx.lineWidth = 0.9;
          ctx.strokeStyle = 'rgba(57, 255, 136, 0.07)';
          ctx.stroke();
          ctx.restore();
        }
      }

      // Render traveling pulse packets (glowing data electrons along the signals)
      for (let p = 0; p < packets.current.length; p++) {
        const pkt = packets.current[p];
        pkt.xRatio += pkt.speed;
        if (pkt.xRatio > 1) pkt.xRatio = 0;

        const px = pkt.xRatio * width;
        const baseNormY = (pkt.waveIndex + 1) / (WAVE_COUNT + 1);
        const baseY = baseNormY * height;
        const freq = 0.0025 + (pkt.waveIndex % 5) * 0.0012;
        const phaseSpeed = 1.0 + (pkt.waveIndex % 3) * 0.4;
        const phase = time * phaseSpeed + pkt.waveIndex * 0.7;
        const baseAmp = 8 + (pkt.waveIndex % 4) * 6;

        let py =
          baseY +
          Math.sin(px * freq + phase) * baseAmp +
          Math.cos(px * (freq * 0.45) - phase * 0.6) * (baseAmp * 0.45);

        const pDist = Math.hypot(px - mx, py - my);

        // Packets flare into bright stars of light when entering the pointer's light field
        if (pDist < radius && mx > -500) {
          const flare = 1 - pDist / radius;
          ctx.save();
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#39FF88';
          ctx.shadowBlur = 10 + flare * 14;
          ctx.beginPath();
          ctx.arc(px, py, pkt.size * (1 + flare * 1.5), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Dim resting pulse
          ctx.save();
          ctx.fillStyle = 'rgba(57, 255, 136, 0.2)';
          ctx.beginPath();
          ctx.arc(px, py, pkt.size * 0.75, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};
