import { hasWebGL } from '../lib/webgl';
import { useMediaQuery } from './useMediaQuery';
import { useReducedMotion } from './useReducedMotion';

/**
 * Decides whether heavy WebGL scenes should run.
 * Off when: no WebGL, reduced motion, or a touch device under 1024px wide
 * (we never auto-play heavy 3D on mobile; a static gradient is shown instead).
 */
export function useCanRender3D(): boolean {
  const reduced = useReducedMotion();
  const smallTouch = useMediaQuery('(pointer: coarse) and (max-width: 1023px)');
  return !reduced && !smallTouch && hasWebGL();
}
