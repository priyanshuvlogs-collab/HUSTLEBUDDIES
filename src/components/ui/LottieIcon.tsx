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

  // Reduced motion: hold the final frame. Layers stop drawing at their out-point,
  // so the last visible frame is totalFrames - 1, not totalFrames.
  const showFinalFrame = () => {
    const l = lottie.current;
    if (l) l.goToAndStop(Math.max(0, (l.getDuration(true) ?? 1) - 1), true);
  };

  useEffect(() => {
    const l = lottie.current;
    if (!l || !data) return;
    if (reduced) {
      showFinalFrame();
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
            onDOMLoaded={reduced ? showFinalFrame : undefined}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid meet' }}
          />
        </Suspense>
      )}
    </div>
  );
}
