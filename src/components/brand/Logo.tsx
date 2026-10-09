import { MARK_PATHS } from './markPaths';

/**
 * Placeholder logo: geometric mark (two interlocking chevrons forming an "H")
 * plus the HUSTLE BUDDIES wordmark. Replace this component, or swap in
 * /public/logo.svg, when the final brand assets are ready.
 */

export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="hb-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="0.55" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#F97316" />
        </linearGradient>
      </defs>
      {MARK_PATHS.map((d) => (
        <path
          key={d}
          d={d}
          stroke="url(#hb-grad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="font-heading text-[0.95rem] font-bold tracking-[0.14em] text-text-primary">
        HUSTLE BUDDIES
      </span>
    </span>
  );
}
