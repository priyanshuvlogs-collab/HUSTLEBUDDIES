import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register once; every section imports gsap from here.
gsap.registerPlugin(ScrollTrigger);

/** Media conditions passed to gsap.matchMedia() so each animation has a reduced-motion branch. */
export const MOTION = {
  full: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px)',
} as const;

export { gsap, ScrollTrigger };
