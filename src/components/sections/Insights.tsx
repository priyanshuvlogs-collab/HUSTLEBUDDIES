import { insights, posts, readingMinutes } from '../../content/posts';
import { useGsap } from '../../hooks/useGsap';
import { usePostHash } from '../../hooks/usePostHash';
import { useSpotlight } from '../../hooks/useSpotlight';
import { gsap } from '../../lib/gsap';
import { ArticleReader } from '../ui/ArticleReader';
import { SectionHeading } from '../ui/SectionHeading';

export function Insights() {
  const { slug, open, close } = usePostHash();
  const active = posts.find((p) => p.slug === slug) ?? null;
  const onMove = useSpotlight();

  // Cards rise in, staggered, when the grid enters. Reduced motion: plain fade.
  const scope = useGsap<HTMLElement>(({ reduced, scope }) => {
    gsap.from(scope.querySelectorAll('[data-post]'), {
      opacity: 0,
      y: reduced ? 0 : 30,
      duration: 0.7,
      stagger: reduced ? 0 : 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: scope.querySelector('ul'), start: 'top 80%', once: true },
    });
  });

  return (
    <section ref={scope} id="insights" aria-labelledby="insights-title" className="section-y">
      <div className="container-x">
        <SectionHeading
          id="insights-title"
          eyebrow="Insights"
          title={insights.title}
          intro={insights.intro}
        />
        <ul className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug} data-post>
              <a
                href={`#post-${post.slug}`}
                onPointerMove={onMove}
                onClick={(e) => {
                  e.preventDefault();
                  open(post.slug);
                }}
                className="spotlight group relative flex h-full flex-col rounded-card border border-line bg-bg-elevated p-7 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-accent/40"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                  {post.tag}
                </span>
                <h3 className="mt-4 text-text-primary [text-wrap:balance]">{post.title}</h3>
                <p className="mt-3 flex-1 text-text-muted">{post.excerpt}</p>
                <span className="mt-6 flex items-center justify-between text-sm text-text-muted">
                  <span>{readingMinutes(post)} min read</span>
                  <span className="font-heading font-semibold text-accent">
                    Read article
                    <span
                      aria-hidden="true"
                      className="ml-1 inline-block transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <ArticleReader post={active} onClose={close} />
    </section>
  );
}
