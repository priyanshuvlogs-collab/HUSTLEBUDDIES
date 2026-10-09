import { lazy, Suspense } from 'react';
import { howWeWork } from '../../content';
import { useCanRender3D } from '../../hooks/useCanRender3D';
import { useGsap } from '../../hooks/useGsap';
import { useInView } from '../../hooks/useInView';
import { gsap } from '../../lib/gsap';
import { SectionHeading } from '../ui/SectionHeading';

const ParticleScene = lazy(() => import('../three/ParticleScene'));

export function HowWeWork() {
  const can3D = useCanRender3D();
  const [bgRef, inView] = useInView<HTMLDivElement>({ rootMargin: '100px' });

  const scope = useGsap<HTMLElement>(({ reduced, desktop, scope }) => {
    const track = scope.querySelector<HTMLElement>('[data-track]')!;
    const steps = scope.querySelectorAll<HTMLElement>('[data-step]');
    const progress = scope.querySelector<HTMLElement>('[data-progress]')!;

    if (reduced || !desktop) {
      // Mobile / reduced motion: vertical list; steps fade in, line fills with scroll.
      steps.forEach((s) =>
        gsap.from(s, {
          opacity: 0,
          y: reduced ? 0 : 24,
          duration: 0.6,
          scrollTrigger: { trigger: s, start: 'top 85%', once: true },
        }),
      );
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: track, start: 'top 70%', end: 'bottom 70%', scrub: !reduced },
        },
      );
      return;
    }

    // Desktop: pin the section and translate the track horizontally as the user
    // scrolls. The gradient progress line fills in step with the scroll, and each
    // step brightens as it reaches the focus area.
    const distance = () => track.scrollWidth - track.clientWidth;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: 'top top',
        end: () => `+=${distance() + window.innerHeight * 0.5}`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    // Timeline runs 0 → 1: track and progress line span it fully; steps 2–4 light
    // up as they reach the focus area (step 1 starts in focus).
    tl.to(track, { x: () => -distance(), ease: 'none', duration: 1 }, 0).fromTo(
      progress,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', duration: 1 },
      0,
    );
    steps.forEach((s, i) => {
      if (i === 0) return;
      const at = (i / (steps.length - 1)) * 0.85;
      tl.fromTo(
        s,
        { opacity: 0.75, scale: 0.94 },
        { opacity: 1, scale: 1, duration: 0.15, ease: 'power2.out' },
        at,
      );
    });
  });

  return (
    <section
      ref={scope}
      id="how-we-work"
      aria-labelledby="hww-title"
      className="relative overflow-hidden bg-bg-dark lg:flex lg:min-h-screen lg:items-center"
    >
      <div ref={bgRef} aria-hidden="true" className="absolute inset-0 opacity-70">
        {can3D && inView && (
          <Suspense fallback={null}>
            <ParticleScene active={inView} />
          </Suspense>
        )}
      </div>
      <div className="container-x section-y relative">
        <SectionHeading
          id="hww-title"
          eyebrow="Process"
          title={howWeWork.title}
          intro={howWeWork.intro}
        />
        <div className="relative">
          {/* Progress line: horizontal on desktop, vertical on mobile. */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[19px] top-0 w-[2px] bg-white/10 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[19px] lg:h-[2px] lg:w-auto"
          >
            <div
              data-progress
              className="h-full w-full origin-top bg-accent-gradient lg:origin-left"
            />
          </div>
          <ol
            data-track
            className="relative flex flex-col gap-10 lg:flex-row lg:gap-8 lg:overflow-visible"
          >
            {howWeWork.steps.map((step, i) => (
              <li
                data-step
                key={step.title}
                className="relative pl-16 lg:w-[38%] lg:shrink-0 lg:pl-0 lg:pt-16"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-accent/60 bg-bg-dark font-heading text-sm font-bold text-text-primary"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="rounded-card border border-line bg-bg-elevated/80 p-7 backdrop-blur-sm">
                  <h3 className="text-text-primary">
                    <span className="sr-only">Step {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-3 text-text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
