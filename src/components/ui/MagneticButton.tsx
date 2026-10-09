import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { scrollToId } from '../../hooks/useLenis';

interface Props {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
  onClick?: () => void;
}

const styles = {
  primary: 'bg-cta text-[#0a0b10] hover:shadow-[0_0_32px_rgba(249,115,22,0.45)]',
  ghost: 'border border-white/20 text-text-primary hover:border-white/40 hover:bg-white/5',
};

/**
 * CTA link with three micro-interactions:
 *  - magnetic drift toward the cursor (max 8px, useMagnetic)
 *  - gradient border shimmer on hover (.shimmer-border in CSS)
 *  - press scale 0.97 (whileTap)
 * In-page hrefs ("#id") scroll smoothly via Lenis.
 */
export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
}: Props) {
  const { x, y, onPointerMove, onPointerLeave } = useMagnetic(8);
  const isAnchor = href.startsWith('#');

  return (
    <motion.a
      href={href}
      data-cursor="hover"
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={(e) => {
        onClick?.();
        if (isAnchor && href.length > 1) {
          e.preventDefault();
          scrollToId(href.slice(1));
        }
      }}
      className={`shimmer-border inline-flex min-h-[48px] items-center justify-center rounded-full px-6 py-3 font-heading text-[0.95rem] font-semibold transition-[box-shadow,background-color,border-color] duration-300 ${styles[variant]} ${className}`}
    >
      {children}
    </motion.a>
  );
}
