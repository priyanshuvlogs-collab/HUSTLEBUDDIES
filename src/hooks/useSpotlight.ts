import { useCallback, type PointerEvent } from 'react';

/**
 * Card spotlight: writes the cursor position into CSS variables (--mx, --my)
 * so a radial gradient in CSS can follow it. No React re-renders per move.
 */
export function useSpotlight() {
  return useCallback((e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
}
