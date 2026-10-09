import { useEffect, useState } from 'react';

/** Returns the id of the section currently nearest the top third of the viewport. */
export function useScrollSpy(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(',');

  useEffect(() => {
    const els = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);

  return active;
}
