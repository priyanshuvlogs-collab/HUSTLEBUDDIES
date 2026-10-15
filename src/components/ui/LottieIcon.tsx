import type { LottieRefCurrentProps } from 'lottie-react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { ServiceIcon } from '../../content';
import { useInView } from '../../hooks/useInView';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// The player is code-split and only fetched when the first icon nears the viewport.
const Lottie = lazy(() => import('lottie-react'));

interface Props {
  name: ServiceIcon;
  /** Parent card hover state: loop while hovered. */
  hovered: boolean;
}

/**
 * Service icon from /public/lottie/<name>.json.
 * Plays once when it scrolls into view, loops only while the card is hovered.
 * Reduced motion: stays on the final (static) frame.
 */
export function LottieIcon({ name, hovered }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '200px', once: true });
  const [data, setData] = useState<object | null>(null);
  const lottie = useRef<LottieRefCurrentProps>(null);
  const reduced = useReducedMotion();

  // Fetch the JSON lazily, only when the card approaches the viewport.
  useEffect(() => {
    if (!inView || data) return;
    let cancelled = false;
    fetch(`${import.meta.env.BASE_URL}lottie/${name}.json`)
      .then((r) => r.json())
      .then((json) => !cancelled && setData(json))
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [inView, name, data]);

  useEffect(() => {
    const l = lottie.current;
    if (!l || !data) return;
    if (reduced) {
      l.goToAndStop(l.getDuration(true) ?? 0, true);
      return;
    }
    // Loop while hovered; on leave, the current cycle finishes and stops.
    if (l.animationItem) l.animationItem.loop = hovered;
    if (hovered) l.goToAndPlay(0, true);
  }, [hovered, reduced, data]);

  return (
    <div ref={ref} className="h-14 w-14" aria-hidden="true">
      {data && (
        <Suspense fallback={null}>
          <Lottie
            lottieRef={lottie}
            animationData={data}
            loop={false}
            autoplay={!reduced}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
          />
        </Suspense>
      )}
    </div>
  );
}
