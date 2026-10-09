import { results } from '../../content';
import { useGsap } from '../../hooks/useGsap';
import { gsap } from '../../lib/gsap';
import { Counter } from '../ui/Counter';
import { SectionHeading } from '../ui/SectionHeading';

/**
 * RESULTS: REPLACE ONLY WITH VERIFIED, CLIENT-APPROVED RESULTS.
 * Card data comes from `results` in src/content.ts. Until real data exists,
 * the cards show bracketed placeholders and a visible "placeholder" badge.
 */
export function Results({ items = results.items }: { items?: typeof results.items }) {
  // Cards fade up as they enter; the numbers themselves are animated by <Counter>.
  const scope = useGsap<HTMLElement>(({ reduced, scope }) => {
    gsap.from(scope.querySelectorAll('[data-result]'), {
      opacity: 0,
      y: reduced ? 0 : 30,
      duration: 0.7,
      stagger: reduced ? 0 : 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: scope, start: 'top 75%', once: true },
    });
  });

  return (
    <section
      ref={scope}
      id="results"
      aria-labelledby="results-title"
      className="section-y bg-bg-light text-ink"
    >
      <div className="container-x">
        <SectionHeading
          id="results-title"
          eyebrow="Results"
          title={results.title}
          intro={results.intro}
          light
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {items.map((r, i) => (
            <li
              key={i}
              data-result
              className="relative rounded-card border border-black/10 bg-white p-7 shadow-[0_10px_40px_-24px_rgba(15,18,32,0.35)]"
            >
              <span className="absolute right-4 top-4 rounded-full bg-[#fff1e6] px-3 py-1 text-xs font-semibold text-[#9a3412]">
                {results.badge}
              </span>
              <p className="mt-6 font-heading text-5xl font-bold text-ink">
                {/* value 0 = no verified data yet, so show the [X] placeholder instead of "0%". */}
                {r.value > 0 ? <Counter value={r.value} suffix={r.suffix} /> : `[X]${r.suffix}`}
              </p>
              <p className="mt-2 font-medium text-ink">
                {r.metric}: increase in {r.metric.toLowerCase()} over {r.timeframe}
              </p>
              <p className="mt-6 border-t border-black/10 pt-4 text-sm text-ink-muted">
                {r.client} <span aria-hidden="true">|</span> {r.industry}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
