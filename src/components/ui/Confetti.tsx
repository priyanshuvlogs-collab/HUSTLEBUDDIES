import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const COLORS = ['#3B82F6', '#8B5CF6', '#F97316', '#F3F4F8'];

/**
 * Lightweight confetti burst (~1KB, no library) drawn on a canvas for ~1.6s
 * after a successful form submission. Skipped under reduced motion.
 */
export function Confetti({ fire }: { fire: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const c = canvas.current;
    if (!fire || reduced || !c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const { width, height } = c.getBoundingClientRect();
    c.width = width;
    c.height = height;
    const parts = Array.from({ length: 90 }, () => ({
      x: width / 2,
      y: height * 0.55,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 11 - 4,
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      s: Math.random() * 6 + 4,
      c: COLORS[(Math.random() * COLORS.length) | 0],
    }));
    const start = performance.now();
    let raf = 0;
    const draw = (t: number) => {
      const life = (t - start) / 1600;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = Math.max(0, 1 - life);
      for (const p of parts) {
        p.vy += 0.35;
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
        ctx.restore();
      }
      if (life < 1) raf = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, width, height);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [fire, reduced]);

  return (
    <canvas
      ref={canvas}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
