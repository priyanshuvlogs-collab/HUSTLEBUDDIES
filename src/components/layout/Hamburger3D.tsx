import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

/**
 * Hamburger icon whose bars flip in 3D (rotateX) and cross into an X when open.
 * Reduced motion: instant swap, no 3D flip.
 */
export function Hamburger3D({ open }: { open: boolean }) {
  const reduced = useReducedMotion();
  const t = { duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] as const };
  const bar = 'absolute left-0 block h-[2px] w-6 rounded bg-text-primary';
  return (
    <span className="relative block h-5 w-6 [perspective:200px]" aria-hidden="true">
      <motion.span
        className={bar}
        style={{ top: 4 }}
        animate={
          open ? { y: 5, rotate: 45, rotateX: reduced ? 0 : 180 } : { y: 0, rotate: 0, rotateX: 0 }
        }
        transition={t}
      />
      <motion.span
        className={bar}
        style={{ top: 14 }}
        animate={
          open
            ? { y: -5, rotate: -45, rotateX: reduced ? 0 : 180 }
            : { y: 0, rotate: 0, rotateX: 0 }
        }
        transition={t}
      />
    </span>
  );
}
