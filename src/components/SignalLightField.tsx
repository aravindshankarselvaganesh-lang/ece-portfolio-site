import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SignalLightFieldProps {
  className?: string;
}

interface ArcPoint {
  x: number;
  y: number;
}

interface ElectricArc {
  points: ArcPoint[];
  subBranches: ArcPoint[][];
  life: number;
  maxLife: number;
  width: number;
  intensity: number;
}

export const SignalLightField: React.FC<SignalLightFieldProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mouse & motion physics
  const mouse = useRef({ x: -2000, y: -2000, targetX: -2000, targetY: -2000 });
  const prevMouse = useRef({ x: -2000, y: -2000 });
  const velocity = useRef(0);
  const isVisible = useRef(true);
  const animFrameId = useRef<number | null>(null);

  // Active electric arcs
  const arcs = useRef<ElectricArc[]>([]);
  const sparkParticles = useRef<
    { x: number; y: number; vx: number; vy: number; life: number; size: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

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

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      mouse.current.targetX = e.touches[0].clientX - rect.left;
      mouse.current.targetY = e.touches[0].clientY - rect.top;

      if (mouse.current.x < -1000) {
        mouse.current.x = mouse.current.targetX;
        mouse.current.y = mouse.current.targetY;
        prevMouse.current.x = mouse.current.targetX;
        prevMouse.current.y = mouse.current.targetY;
      }
    };

    const handleTouchEnd = () => {
      mouse.current.targetX = -2000;
      mouse.current.targetY = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const io = new IntersectionObserver(
      (entries) => {
        isVisible.current = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Recursive midpoint displacement generator for electric lightning signal
    const generateLightningPoints = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number,
      subdivide: number = 4
    ): ArcPoint[] => {
      if (subdivide <= 0) {
        return [
          { x: x1, y: y1 },
          { x: x2, y: y2 },
        ];
      }

      const midX = (x1 + x2) / 2;
      const midY = (y1 + y2) / 2;

      // Perpendicular normal vector
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy);
      if (len < 1) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];

      const nx = -dy / len;
      const ny = dx / len;

      // Jagged displacement like the lightning bolt in the chip
      const offset = (Math.random() - 0.5) * displace;
      const ptX = midX + nx * offset;
      const ptY = midY + ny * offset;

      const left = generateLightningPoints(x1, y1, ptX, ptY, displace * 0.55, subdivide - 1);
      const right = generateLightningPoints(ptX, ptY, x2, y2, displace * 0.55, subdivide - 1);

      return left.slice(0, -1).concat(right);
    };

    // Spawn an electric signal arc
    const spawnArc = (
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      intensity: number = 1
    ) => {
      const dist = Math.hypot(toX - fromX, toY - fromY);
      const points = generateLightningPoints(fromX, fromY, toX, toY, dist * 0.45, 4);

      // 1 or 2 small sub-branches forking off the main lightning signal
      const subBranches: ArcPoint[][] = [];
      if (points.length > 5 && Math.random() > 0.3) {
        const branchIndex = Math.floor(Math.random() * (points.length - 3)) + 1;
        const startPt = points[branchIndex];
        const angle = Math.atan2(toY - fromY, toX - fromX) + (Math.random() - 0.5) * 1.2;
        const subLen = dist * (0.3 + Math.random() * 0.3);
        const endX = startPt.x + Math.cos(angle) * subLen;
        const endY = startPt.y + Math.sin(angle) * subLen;
        subBranches.push(generateLightningPoints(startPt.x, startPt.y, endX, endY, subLen * 0.4, 3));
      }

      arcs.current.push({
        points,
        subBranches,
        life: 1,
        maxLife: 6 + Math.floor(Math.random() * 5),
        width: 1.5 + intensity * 1.5,
        intensity,
      });

      // Spawn subtle electric sparks
      for (let s = 0; s < 3; s++) {
        const randPt = points[Math.floor(Math.random() * points.length)];
        const spAngle = Math.random() * Math.PI * 2;
        const spSpeed = 1 + Math.random() * 3;
        sparkParticles.current.push({
          x: randPt.x,
          y: randPt.y,
          vx: Math.cos(spAngle) * spSpeed,
          vy: Math.sin(spAngle) * spSpeed,
          life: 1,
          size: 1 + Math.random() * 2,
        });
      }
    };

    let tick = 0;

    const render = () => {
      if (!isVisible.current || width === 0 || height === 0) {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      tick++;

      // Smooth mouse lerp
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.35;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.35;

      const dx = mouse.current.x - prevMouse.current.x;
      const dy = mouse.current.y - prevMouse.current.y;
      const dist = Math.hypot(dx, dy);
      prevMouse.current.x = mouse.current.x;
      prevMouse.current.y = mouse.current.y;

      velocity.current += (dist - velocity.current) * 0.2;

      ctx.clearRect(0, 0, width, height);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const chipCenterX = width * 0.5;
      const chipCenterY = height * 0.52;

      // When cursor is active inside the container
      if (mx > -100 && mx < width + 100 && my > -100 && my < height + 100) {
        // Spawn electric signal arcs when pointer moves or is near the chip
        const moveThreshold = prefersReducedMotion ? 25 : 4;
        const isMoving = dist > moveThreshold;
        const chipDist = Math.hypot(mx - chipCenterX, my - chipCenterY);

        // 1. As pointer moves, spawn outward branching electrical signals
        if (isMoving && tick % 2 === 0) {
          const arcCount = Math.min(1 + Math.floor(velocity.current * 0.15), 4);
          for (let a = 0; a < arcCount; a++) {
            const spreadRadius = 140 + Math.min(velocity.current * 6, 260);
            const angle = Math.random() * Math.PI * 2;
            const targetX = mx + Math.cos(angle) * spreadRadius;
            const targetY = my + Math.sin(angle) * spreadRadius;
            spawnArc(mx, my, targetX, targetY, Math.min(1.4, 0.7 + velocity.current * 0.05));
          }
        }

        // 2. Coupling with the chip in the center: Arcs leap between pointer & chip
        if (chipDist < 480 && Math.random() < 0.25) {
          spawnArc(mx, my, chipCenterX + (Math.random() - 0.5) * 80, chipCenterY + (Math.random() - 0.5) * 60, 1.2);
        }

        // 3. Resting ambient micro-signals around cursor
        if (!isMoving && Math.random() < 0.08) {
          const idleRadius = 70 + Math.random() * 60;
          const idleAngle = Math.random() * Math.PI * 2;
          spawnArc(mx, my, mx + Math.cos(idleAngle) * idleRadius, my + Math.sin(idleAngle) * idleRadius, 0.7);
        }

        // 4. Soft radial electric field glow around pointer matching chip's turquoise/cyan aura
        const fieldRadius = 160 + Math.min(velocity.current * 4, 180);
        const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, fieldRadius);
        glowGrad.addColorStop(0, 'rgba(60, 253, 137, 0.22)'); // Chip's #3cfd89
        glowGrad.addColorStop(0.3, 'rgba(34, 211, 238, 0.14)'); // Electric cyan
        glowGrad.addColorStop(0.7, 'rgba(46, 114, 113, 0.06)'); // Chip rim teal
        glowGrad.addColorStop(1, 'transparent');

        ctx.save();
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mx, my, fieldRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        // Idle electric pulses from the central chip when no finger or cursor is active (e.g. mobile idle state)
        if (tick % 70 === 0 && Math.random() < 0.5) {
          const idleAngle = Math.random() * Math.PI * 2;
          const idleDist = 70 + Math.random() * 90;
          spawnArc(
            chipCenterX,
            chipCenterY,
            chipCenterX + Math.cos(idleAngle) * idleDist,
            chipCenterY + Math.sin(idleAngle) * idleDist,
            0.85
          );
        }
      }

      // Draw all active electric signal arcs
      for (let i = arcs.current.length - 1; i >= 0; i--) {
        const arc = arcs.current[i];
        const alpha = arc.life / arc.maxLife;

        // Draw primary lightning signal
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'miter';

        // Outer electric bloom (matching chip signal glow #3cfd89 / cyan)
        ctx.shadowColor = '#3cfd89';
        ctx.shadowBlur = 14 * alpha;
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.7 * alpha})`;
        ctx.lineWidth = arc.width * 2.2;

        ctx.beginPath();
        arc.points.forEach((pt, idx) => {
          if (idx === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        });
        ctx.stroke();

        // Inner hot-white electric signal core
        ctx.shadowColor = '#00F5FF';
        ctx.shadowBlur = 6 * alpha;
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 * alpha})`;
        ctx.lineWidth = Math.max(1, arc.width * 0.85);
        ctx.stroke();

        // Sub-branches
        arc.subBranches.forEach((sub) => {
          ctx.strokeStyle = `rgba(60, 253, 137, ${0.65 * alpha})`;
          ctx.lineWidth = Math.max(0.8, arc.width * 0.55);
          ctx.beginPath();
          sub.forEach((pt, sIdx) => {
            if (sIdx === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
          });
          ctx.stroke();
        });

        ctx.restore();

        // Life decay
        arc.life -= 1;
        if (arc.life <= 0) {
          arcs.current.splice(i, 1);
        }
      }

      // Update & render electric sparks
      for (let s = sparkParticles.current.length - 1; s >= 0; s--) {
        const sp = sparkParticles.current[s];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.92;
        sp.vy *= 0.92;
        sp.life -= 0.05;

        if (sp.life <= 0) {
          sparkParticles.current.splice(s, 1);
          continue;
        }

        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${sp.life})`;
        ctx.shadowColor = '#3cfd89';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
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
