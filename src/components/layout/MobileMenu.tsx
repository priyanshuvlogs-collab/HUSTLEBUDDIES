import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { nav } from '../../content';
import { scrollToId } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Props {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen mobile menu. Links enter with a staggered slide-up.
 * Keyboard: focus is trapped inside while open, Escape closes.
 */
export function MobileMenu({ open, onClose }: Props) {
  const reduced = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = panel.current;
    // Trap focus between the header's close button and the menu links.
    const toggle = document.querySelector<HTMLElement>('[aria-controls="mobile-menu"]');
    const focusables = () => [
      ...(toggle ? [toggle] : []),
      ...Array.from(el?.querySelectorAll<HTMLElement>('a') ?? []),
    ];
    el?.querySelector<HTMLElement>('a')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const go = (id: string) => {
    onClose();
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panel}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-40 flex flex-col bg-bg-dark/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.ul
            className="flex flex-col gap-2"
            initial="hidden"
            animate="show"
            variants={{
              show: { transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: 0.05 } },
            }}
          >
            {[...nav.links, { id: 'contact', label: nav.cta }].map((link, i) => (
              <motion.li
                key={`${link.id}-${i}`}
                variants={{
                  hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
              >
                <a
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(link.id);
                  }}
                  className={`block py-2 font-heading text-3xl font-semibold ${i === nav.links.length ? 'mt-6 text-cta' : 'text-text-primary'}`}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
