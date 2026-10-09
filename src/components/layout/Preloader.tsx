import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { MARK_PATHS } from '../brand/markPaths';

const KEY = 'hb-preloaded';

function shouldShow(): boolean {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(KEY) !== '1';
  } catch {
    return false;
  }
}

/**
 * Branded intro: the logo mark draws in (SVG stroke via pathLength), then the
 * screen wipes upward. Total ≤ 1.5s. Shown once per session; never under reduced motion.
 * The page renders underneath the whole time, so it never delays content.
 */
export function Preloader() {
  const [visible, setVisible] = useState(shouldShow);

  useEffect(() => {
    if (!visible) return;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* storage unavailable: fine, just show again next time */
    }
    const t = window.setTimeout(() => setVisible(false), 950);
    return () => window.clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          className="fixed inset-0 z-[300] grid place-items-center bg-bg-dark"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <svg viewBox="0 0 40 40" className="h-20 w-20" fill="none">
            {MARK_PATHS.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke={i === 2 ? '#F97316' : '#3B82F6'}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeInOut' }}
              />
            ))}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
