import { useGsap } from '../../hooks/useGsap';
import { gsap } from '../../lib/gsap';

/** Decorative floating shapes. `speed` is the parallax factor (0.2x–0.6x of scroll). */
const SHAPES = [
  {
    speed: 0.2,
    cls: 'left-[4%] top-[8%] h-40 w-40 rounded-full bg-[radial-gradient(circle_at_30%_30%,#93c5fd,#3b82f6_45%,#1e3a8a)] opacity-40',
  },
  {
    speed: 0.45,
    cls: 'right-[6%] top-[22%] h-24 w-24 rotate-12 rounded-3xl bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] opacity-35',
  },
  {
    speed: 0.6,
    cls: 'bottom-[12%] left-[38%] h-16 w-16 rounded-full bg-[radial-gradient(circle_at_30%_30%,#fdba74,#f97316)] opacity-35',
  },
  {
    speed: 0.3,
    cls: 'bottom-[4%] right-[18%] h-32 w-32 rounded-full border-[10px] border-[#8b5cf6]/30',
  },
];

/**
 * Parallax layer for the About section. Each shape moves upward at its own
 * speed as the section scrolls, creating depth without a WebGL context.
 * Reduced motion: shapes stay static.
 */
export function ParallaxShapes() {
  const ref = useGsap<HTMLDivElement>(({ reduced, scope }) => {
    if (reduced) return;
    const section = scope.parentElement ?? scope;
    scope.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
      const speed = Number(el.dataset.speed);
      gsap.fromTo(
        el,
        { y: () => 240 * speed },
        {
          y: () => -240 * speed,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {SHAPES.map((s) => (
        <div key={s.cls} data-speed={s.speed} className={`absolute blur-[1px] ${s.cls}`} />
      ))}
    </div>
  );
}
