import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const INTERACTIVE = 'a, button, input, select, textarea, label, [data-cursor="hover"]';

/**
 * Custom cursor: a small dot that tracks the pointer exactly and a ring that
 * follows with spring lag, expanding over interactive elements.
 * Not rendered on touch devices or under reduced motion; the native cursor stays visible.
 */
export function Cursor() {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });
  const [hovering, setHovering] = useState(false);
  const enabled = finePointer && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      setHovering(!!(e.target as Element | null)?.closest?.(INTERACTIVE));
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[250]">
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-cta"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-accent/70"
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: hovering ? 1.8 : 1, opacity: hovering ? 0.9 : 0.5 }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}
