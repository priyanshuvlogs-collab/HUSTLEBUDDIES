import { services } from '../../content';
import { useGsap } from '../../hooks/useGsap';
import { gsap } from '../../lib/gsap';
import { SectionHeading } from '../ui/SectionHeading';
import { ServiceCard } from './ServiceCard';

export function Services() {
  // Cards tilt up into place (rotationX 15° → 0) and fade in, staggered, as the grid
  // scrolls into view. The animation runs on a wrapper so the card's own hover
  // transform stays free. Reduced motion: plain fade, no tilt or stagger.
  const scope = useGsap<HTMLElement>(({ reduced, scope }) => {
    const cards = scope.querySelectorAll('[data-card-wrap]');
    gsap.from(cards, {
      opacity: 0,
      ...(reduced
        ? { duration: 0.5 }
        : {
            rotationX: 15,
            y: 40,
            transformPerspective: 900,
            transformOrigin: '50% 100%',
            duration: 0.9,
            ease: 'power3.out',
            stagger: 0.1,
          }),
      scrollTrigger: { trigger: scope.querySelector('[data-grid]'), start: 'top 80%', once: true },
    });
  });

  return (
    <section
      ref={scope}
      id="services"
      aria-labelledby="services-title"
      className="section-y relative"
    >
      <div className="container-x">
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="Everything you need to market smarter with AI"
          intro="Pick one service or combine them. Every engagement pairs AI speed with human judgment."
        />
        <ul data-grid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title} data-card-wrap>
              <ServiceCard service={s} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
