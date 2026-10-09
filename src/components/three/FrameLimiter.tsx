import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

/**
 * Used with <Canvas frameloop="demand">. Requests a frame at most 60 times per
 * second (so 120Hz screens don't double the GPU work) and stops completely
 * when `active` is false (section offscreen or tab hidden).
 */
export function FrameLimiter({ active, fps = 60 }: { active: boolean; fps?: number }) {
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    if (!active) return;
    const interval = 1000 / fps;
    let last = 0;
    let raf = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden) return;
      if (t - last >= interval - 1) {
        last = t;
        invalidate();
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, fps, invalidate]);

  return null;
}
