import { motion } from 'framer-motion';
import { useCallback, useState } from 'react';
import { nav } from '../../content';
import { scrollToId } from '../../hooks/useLenis';
import { useScrolled } from '../../hooks/useScrolled';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import { Logo } from '../brand/Logo';
import { MagneticButton } from '../ui/MagneticButton';
import { Hamburger3D } from './Hamburger3D';
import { MobileMenu } from './MobileMenu';

const ids = nav.links.map((l) => l.id);

/**
 * Sticky header. Turns glassmorphic (12px blur, 70% bg) after 80px of scroll.
 * The active section gets an underline that glides between links (layoutId).
 */
export function Nav() {
  const scrolled = useScrolled(80);
  const active = useScrollSpy(ids);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
          scrolled || open ? 'glass border-b border-line' : 'border-b border-transparent'
        }`}
      >
        <nav
          aria-label="Primary"
          className="container-x flex h-[var(--nav-h)] items-center justify-between"
        >
          <a
            href="#top"
            aria-label="Hustle Buddies, back to top"
            onClick={(e) => {
              e.preventDefault();
              close();
              scrollToId('top');
            }}
            className="relative z-50"
          >
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.links.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(link.id);
                  }}
                  className={`block px-3 py-2 text-sm font-medium transition-colors ${
                    active === link.id
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </a>
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded bg-accent-gradient"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <MagneticButton
              href="#contact"
              className="hidden !min-h-[44px] !px-5 !py-2 text-sm sm:inline-flex"
            >
              {nav.cta}
            </MagneticButton>
            <button
              type="button"
              className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-white/15 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              <Hamburger3D open={open} />
            </button>
          </div>
        </nav>
      </header>
      {/* Sibling of <header>: its backdrop-filter would otherwise trap this fixed overlay. */}
      <MobileMenu open={open} onClose={close} />
    </>
  );
}
