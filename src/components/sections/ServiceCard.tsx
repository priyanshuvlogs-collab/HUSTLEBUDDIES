import { useState } from 'react';
import type { services } from '../../content';
import { useSpotlight } from '../../hooks/useSpotlight';
import { scrollToId } from '../../hooks/useLenis';
import { LottieIcon } from '../ui/LottieIcon';

type Service = (typeof services)[number];

/**
 * Service card micro-interactions:
 *  - spotlight radial gradient follows the cursor (.spotlight + useSpotlight)
 *  - lifts 6px with a soft blue glow on hover/focus
 *  - Lottie icon loops while hovered
 */
export function ServiceCard({ service }: { service: Service }) {
  const [hovered, setHovered] = useState(false);
  const onMove = useSpotlight();

  return (
    <article
      data-card
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="spotlight group relative flex h-full flex-col rounded-card border border-line bg-bg-elevated p-7 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.45)] focus-within:-translate-y-1.5"
    >
      <LottieIcon name={service.icon} hovered={hovered} />
      <h3 className="mt-6 text-text-primary">{service.title}</h3>
      <p className="mt-3 flex-1 text-text-muted">{service.description}</p>
      <a
        href={service.href}
        onClick={(e) => {
          if (!service.href.startsWith('#')) return;
          e.preventDefault();
          scrollToId(service.href.slice(1));
        }}
        className="relative z-10 mt-6 inline-flex items-center gap-2 font-heading font-semibold text-accent"
      >
        Learn more<span className="sr-only"> about {service.title}</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
      </a>
    </article>
  );
}
