import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Item {
  q: string;
  a: string;
}

/**
 * Accessible accordion (button + aria-expanded/aria-controls).
 * Panels open with a smooth height animation; reduced motion uses a quick fade.
 */
export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const base = useId();

  return (
    <ul className="divide-y divide-black/10 border-y border-black/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-btn-${i}`;
        const panelId = `${base}-panel-${i}`;
        return (
          <li key={item.q}>
            <h3 className="!text-[length:var(--fs-body)]">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                data-cursor="hover"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-heading text-lg font-semibold text-ink md:text-xl"
              >
                {item.q}
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-black/15 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                >
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 text-ink-muted">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
