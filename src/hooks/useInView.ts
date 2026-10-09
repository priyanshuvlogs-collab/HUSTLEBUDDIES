import { useEffect, useRef, useState, type RefObject } from 'react';

interface Options extends IntersectionObserverInit {
  /** Stop observing after the first time the element enters the viewport. */
  once?: boolean;
}

/** IntersectionObserver wrapper used to start/stop animations and pause offscreen canvases. */
export function useInView<T extends Element>(options: Options = {}): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const { once = false, root = null, rootMargin = '0px', threshold = 0 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { root, rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, root, rootMargin, threshold]);

  return [ref, inView];
}
