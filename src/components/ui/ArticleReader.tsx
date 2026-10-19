import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { readingMinutes, type Post, type PostBlock } from '../../content/posts';
import { scrollToId, setScrollLock } from '../../hooks/useLenis';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const dateFmt = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' });

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'h2':
      return <h3 className="mt-10 text-text-primary">{block.text}</h3>;
    case 'ul':
      return (
        <ul className="mt-4 list-disc space-y-2 pl-6 marker:text-accent">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'note':
      return (
        <p className="mt-10 rounded-card border border-accent/30 bg-accent/10 p-5 text-text-primary">
          {block.text}
        </p>
      );
    default:
      return <p className="mt-4">{block.text}</p>;
  }
}

/**
 * Full-screen article view. Behaves as a modal dialog: page scroll is locked,
 * focus moves to the close button and is trapped, Escape closes, and focus
 * returns to whatever opened it. Reduced motion: plain fade, no slide.
 */
export function ArticleReader({ post, onClose }: { post: Post | null; onClose: () => void }) {
  const reduced = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!post) return;
    const opener = document.activeElement as HTMLElement | null;
    setScrollLock(true);
    panel.current?.querySelector<HTMLElement>('button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !panel.current) return;
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>('button, a[href]'));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      setScrollLock(false);
      opener?.focus?.({ preventScroll: true });
    };
  }, [post, onClose]);

  return (
    <AnimatePresence>
      {post && (
        <motion.div
          ref={panel}
          key={post.slug}
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-title"
          data-lenis-prevent
          className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-bg-dark"
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduced ? 0.15 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass sticky top-0 z-10 border-b border-line">
            <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 sm:px-6">
              <span className="eyebrow !mb-0">{post.tag}</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-text-primary hover:border-white/40"
              >
                Close<span className="sr-only"> article</span>
              </button>
            </div>
          </div>
          <article className="mx-auto max-w-3xl px-4 pb-24 pt-12 text-[length:var(--fs-lead)] leading-relaxed text-text-muted sm:px-6">
            <h2 id="article-title" className="text-text-primary [text-wrap:balance]">
              {post.title}
            </h2>
            <p className="mt-4 text-sm text-text-muted">
              {post.author} ·{' '}
              <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time> ·{' '}
              {readingMinutes(post)} min read
            </p>
            {post.body.map((b, i) => (
              <Block key={i} block={b} />
            ))}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                requestAnimationFrame(() => scrollToId('contact'));
              }}
              className="mt-10 inline-flex min-h-[48px] items-center rounded-full bg-cta px-6 font-heading font-semibold text-[#0a0b10]"
            >
              Book a free consultation
            </a>
          </article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
