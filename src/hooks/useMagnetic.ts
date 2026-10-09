import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { useCallback, type PointerEvent } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Magnetic hover: the element drifts toward the cursor by at most `max` px,
 * then springs back on leave. Disabled under reduced motion.
 */
export function useMagnetic(max = 8): {
  x: MotionValue<number>;
  y: MotionValue<number>;
  onPointerMove: (e: PointerEvent<HTMLElement>) => void;
  onPointerLeave: () => void;
} {
  const reduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 250, damping: 18, mass: 0.4 });

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      if (reduced || e.pointerType !== 'mouse') return;
      const r = e.currentTarget.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      rawX.set(Math.max(-1, Math.min(1, dx)) * max);
      rawY.set(Math.max(-1, Math.min(1, dy)) * max);
    },
    [max, rawX, rawY, reduced],
  );

  const onPointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return { x, y, onPointerMove, onPointerLeave };
}
