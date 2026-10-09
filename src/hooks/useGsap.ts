import { useLayoutEffect, useRef, type RefObject } from 'react';
import { gsap, MOTION } from '../lib/gsap';

type Setup = (ctx: {
  reduced: boolean;
  desktop: boolean;
  scope: HTMLElement;
}) => void | (() => void);

/**
 * Runs GSAP code scoped to a section, with automatic cleanup on unmount.
 * Uses gsap.matchMedia so each animation gets a full-motion and a
 * reduced-motion branch, and reverts cleanly if the OS setting changes.
 */
export function useGsap<T extends HTMLElement>(setup: Setup, deps: unknown[] = []): RefObject<T> {
  const scope = useRef<T>(null);
  useLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION, (context) => {
      const { reduced, desktop } = context.conditions as { reduced: boolean; desktop: boolean };
      return setup({ reduced, desktop, scope: el });
    });
    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return scope;
}
