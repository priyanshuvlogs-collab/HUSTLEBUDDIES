import { useEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
}

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * Writes text directly to the DOM (no re-render per frame).
 * Reduced motion: shows the final value immediately.
 */
export function Counter({ value, suffix = '', duration = 1.6 }: Props) {
  const [ref, inView] = useInView<HTMLSpanElement>({ once: true, threshold: 0.6 });
  const reduced = useReducedMotion();
  const out = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = out.current;
    if (!el || !inView) return;
    if (reduced || value === 0) {
      el.textContent = `${value}`;
      return;
    }
    const proxy = { n: 0 };
    const tween = gsap.to(proxy, {
      n: value,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = `${Math.round(proxy.n)}`;
      },
    });
    return () => {
      tween.kill();
    };
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span ref={out} aria-hidden="true">
        0
      </span>
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}
