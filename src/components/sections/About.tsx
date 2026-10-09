import { about } from '../../content';
import { useGsap } from '../../hooks/useGsap';
import { gsap } from '../../lib/gsap';
import { ParallaxShapes } from '../three/ParallaxShapes';
import { SectionHeading } from '../ui/SectionHeading';
import { TeamCard } from './TeamCard';

export function About() {
  // Content blocks fade up on entry; the background shapes handle the parallax.
  const scope = useGsap<HTMLElement>(({ reduced, scope }) => {
    scope.querySelectorAll('[data-fade]').forEach((el) =>
      gsap.from(el, {
        opacity: 0,
        y: reduced ? 0 : 30,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      }),
    );
  });

  return (
    <section
      ref={scope}
      id="about"
      aria-labelledby="about-title"
      className="section-y relative overflow-hidden"
    >
      <ParallaxShapes />
      <div className="container-x relative">
        <SectionHeading
          id="about-title"
          eyebrow="About"
          title={about.title}
          intro={about.mission}
        />

        <div
          data-fade
          className="grid gap-10 rounded-card border border-line bg-bg-elevated/70 p-8 backdrop-blur-sm md:grid-cols-[1fr_1.4fr] md:p-12"
        >
          <div>
            <h3 className="text-text-primary">{about.responsibleTitle}</h3>
            <p className="mt-4 text-text-muted">{about.responsibleIntro}</p>
          </div>
          <ul className="space-y-4">
            {about.principles.map((p) => (
              <li key={p} className="flex gap-3 text-text-primary">
                <svg
                  viewBox="0 0 20 20"
                  className="mt-1 h-5 w-5 shrink-0 text-accent"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 10.5l4 4 8-9"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <h3 data-fade className="mt-20 text-text-primary">
          {about.teamTitle}
        </h3>
        <ul data-fade className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {about.team.map((m, i) => (
            <TeamCard key={i} member={m} />
          ))}
        </ul>
      </div>
    </section>
  );
}
