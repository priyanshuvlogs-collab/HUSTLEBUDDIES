import { footer, nav } from '../../content';
import { scrollToId } from '../../hooks/useLenis';
import { Logo } from '../brand/Logo';

const icons = {
  linkedin:
    'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.63V21h-4V9.75Z',
  x: 'M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z',
  instagram:
    'M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.75a3.05 3.05 0 1 1 0-6.1 3.05 3.05 0 0 1 0 6.1ZM17.98 7.1a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.73 0 3.05.01 4.13.06 2.77.13 4.07 1.44 4.2 4.2.05 1.08.06 1.4.06 4.14s-.01 3.05-.06 4.13c-.13 2.76-1.42 4.07-4.2 4.2-1.08.05-1.4.06-4.13.06s-3.05-.01-4.13-.06c-2.79-.13-4.07-1.45-4.2-4.2C3.62 15.05 3.6 14.73 3.6 12s.02-3.05.07-4.13c.12-2.77 1.42-4.07 4.2-4.2C8.95 3.61 9.27 3.6 12 3.6Z',
};

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-dark py-14">
      <div className="container-x grid gap-10 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-text-muted">
            AI-powered marketing, guided by people.
          </p>
          <ul className="mt-6 flex gap-3" aria-label="Social media">
            {footer.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={`Hustle Buddies on ${s.label}`}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-text-muted transition-colors hover:border-white/40 hover:text-text-primary"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[18px] w-[18px]"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d={icons[s.icon]} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer" className="grid gap-8 sm:grid-cols-2">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {nav.links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(l.id);
                  }}
                  className="text-text-muted hover:text-text-primary"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-3 text-sm">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-text-muted hover:text-text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="container-x mt-12 text-xs text-text-muted">{footer.copyright}</p>
    </footer>
  );
}
