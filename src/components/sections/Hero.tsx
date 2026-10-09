import { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import { hero } from '../../content';
import { useCanRender3D } from '../../hooks/useCanRender3D';
import { useGsap } from '../../hooks/useGsap';
import { useInView } from '../../hooks/useInView';
import { gsap } from '../../lib/gsap';
import { MagneticButton } from '../ui/MagneticButton';

// Code-split: three.js + R3F only download when the scene is actually needed.
const HeroScene = lazy(() => import('../three/HeroScene'));

/**
 * Starts the 3D scene only after the first user interaction (pointer, scroll,
 * key or touch), then waits for an idle moment. The page is fully painted and
 * interactive before any WebGL work begins; the gradient placeholder covers the gap.
 */
function useDeferredStart(enabled: boolean) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!enabled) return;
    const events = ['pointermove', 'scroll', 'keydown', 'touchstart', 'wheel'] as const;
    const start = () => {
      events.forEach((e) => window.removeEventListener(e, start));
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(() => setReady(true), { timeout: 800 });
      else setTimeout(() => setReady(true), 200);
    };
    events.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, start));
  }, [enabled]);
  return ready;
}

export function Hero() {
  const can3D = useCanRender3D();
  const idle = useDeferredStart(can3D);
  const [visRef, inView] = useInView<HTMLDivElement>();

  // Headline reveal: words slide up and fade in (stagger 0.06s, 0.8s, power3.out).
  // Then the supporting copy and CTAs fade up. Reduced motion: one gentle fade.
  const scope = useGsap<HTMLElement>(({ reduced, scope }) => {
    const words = scope.querySelectorAll('[data-word]');
    const rest = scope.querySelectorAll('[data-reveal]');
    if (reduced) {
      gsap.from([...words, ...rest], { opacity: 0, duration: 0.6 });
      return;
    }
    gsap
      .timeline({ delay: 0.15 })
      .from(words, { yPercent: 110, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.06 })
      .from(rest, { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, '-=0.4');
  });

  return (
    <section
      ref={scope}
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[var(--nav-h)]"
    >
      {/* Background layer: gradient placeholder/fallback, replaced by WebGL when ready. */}
      <div ref={visRef} aria-hidden="true" className="absolute inset-0">
        <div className="hero-fallback absolute inset-0 opacity-70 lg:left-1/3" />
        {can3D && idle && (
          <Suspense fallback={null}>
            <div className="absolute inset-0 animate-[fadeIn_1.2s_ease_both] opacity-60 lg:opacity-100">
              <HeroScene active={inView} />
            </div>
          </Suspense>
        )}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg-dark to-transparent" />
      </div>

      <div className="container-x relative z-10 py-16">
        <div className="max-w-2xl lg:max-w-[52%]">
          <p data-reveal className="eyebrow">
            AI marketing agency
          </p>
          <h1 id="hero-title" aria-label={hero.headline} className="text-text-primary">
            {hero.headline.split(' ').map((w, i) => (
              <Fragment key={i}>
                <span
                  aria-hidden="true"
                  className="inline-block overflow-hidden pb-[0.08em] align-bottom"
                >
                  <span data-word className="inline-block will-change-transform">
                    {w}
                  </span>
                </span>{' '}
              </Fragment>
            ))}
          </h1>
          <p data-reveal className="mt-6 max-w-xl text-[length:var(--fs-lead)] text-text-muted">
            {hero.subheading}
          </p>
          <div data-reveal className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#contact">{hero.primaryCta}</MagneticButton>
            <MagneticButton href="#services" variant="ghost">
              {hero.secondaryCta}
            </MagneticButton>
          </div>
          <p data-reveal className="mt-12 border-l-2 border-accent/60 pl-4 text-sm text-text-muted">
            {hero.trustLine}
          </p>
        </div>
      </div>
    </section>
  );
}
