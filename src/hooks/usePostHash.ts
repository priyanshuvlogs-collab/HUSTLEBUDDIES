import { useCallback, useEffect, useState } from 'react';

const PREFIX = 'post-';

function readSlug(): string | null {
  const h = window.location.hash.slice(1);
  return h.startsWith(PREFIX) ? h.slice(PREFIX.length) : null;
}

function writeHash(hash: string) {
  try {
    history.replaceState(null, '', hash ? `#${hash}` : window.location.pathname);
  } catch {
    /* sandboxed frames may refuse history updates; state still changes */
  }
}

/**
 * Which blog post is open, kept in the URL as `#post-<slug>` so a post can be
 * linked to directly. Plain-token hashes also work inside sandboxed previews.
 */
export function usePostHash() {
  const [slug, setSlug] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : readSlug(),
  );

  useEffect(() => {
    const onHash = () => setSlug(readSlug());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const open = useCallback((next: string) => {
    setSlug(next);
    writeHash(PREFIX + next);
  }, []);

  const close = useCallback(() => {
    setSlug(null);
    writeHash('insights');
  }, []);

  return { slug, open, close };
}
