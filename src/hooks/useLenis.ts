import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';
import { useReducedMotion } from './useReducedMotion';

let instance: Lenis | null = null;

/** Smoothly scroll to an in-page anchor; falls back to native scrolling. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: 'auto', block: 'start' });
  // Move keyboard focus to the target section for screen reader and keyboard users.
  el.setAttribute('tabindex', '-1');
  el.focus({ preventScroll: true });
  try {
    history.replaceState(null, '', `#${id}`);
  } catch {
    /* sandboxed frames may refuse history updates; scrolling already happened */
  }
}

/**
 * Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Disabled entirely under prefers-reduced-motion.
 */
export function useLenis() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    instance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      instance = null;
    };
  }, [reduced]);
}
