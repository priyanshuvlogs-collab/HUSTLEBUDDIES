import { bookLink, reading, type Book } from '../../content/books';
import { useGsap } from '../../hooks/useGsap';
import { gsap } from '../../lib/gsap';
import { SectionHeading } from '../ui/SectionHeading';

/** Cover tint per topic, drawn from the brand gradient (no cover images needed). */
const cover: Record<Book['topic'], string> = {
  Marketing: 'from-[#1e3a8a] to-[#3b82f6]',
  Persuasion: 'from-[#4c1d95] to-[#8b5cf6]',
  Growth: 'from-[#7c2d12] to-[#f97316]',
  AI: 'from-[#0f172a] to-[#2563eb]',
};

export function Reading() {
  // Covers tip up from a slight angle as they enter, like books pulled off a shelf.
  // Reduced motion: plain fade.
  const scope = useGsap<HTMLElement>(({ reduced, scope }) => {
    gsap.from(scope.querySelectorAll('[data-book]'), {
      opacity: 0,
      ...(reduced
        ? { duration: 0.4 }
        : { y: 30, rotation: -2, duration: 0.7, stagger: 0.06, ease: 'power3.out' }),
      scrollTrigger: { trigger: scope.querySelector('ul'), start: 'top 85%', once: true },
    });
  });

  return (
    <section
      ref={scope}
      id="reading"
      aria-labelledby="reading-title"
      className="section-y border-y border-line bg-bg-elevated"
    >
      <div className="container-x">
        <SectionHeading
          id="reading-title"
          eyebrow="Recommended books"
          title={reading.title}
          intro={reading.intro}
        />
        <ul className="grid max-w-4xl grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {reading.books.map((book) => (
            <li key={book.title} data-book className="flex flex-col">
              <a
                href={bookLink(book)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
                aria-label={`${book.title} by ${book.author}, ${book.year}. Find it on Open Library (opens in a new tab)`}
              >
                <div
                  className={`relative flex aspect-[2/3] max-w-full flex-col justify-between overflow-hidden rounded-r-xl rounded-l-sm bg-gradient-to-br p-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:-translate-y-1.5 ${cover[book.topic]}`}
                >
                  {/* Spine shading on the left edge, like a real paperback. */}
                  <span aria-hidden="true" className="absolute inset-y-0 left-0 w-2 bg-black/25" />
                  <span className="pl-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/75">
                    {book.topic}
                  </span>
                  <span className="pl-2">
                    <span className="block font-heading text-lg font-bold leading-tight text-white [text-wrap:balance] sm:text-xl">
                      {book.title}
                    </span>
                    <span className="mt-2 block text-xs text-white/80">
                      {book.author} · {book.year}
                    </span>
                  </span>
                </div>
              </a>
              <p className="mt-4 text-sm text-text-muted">{book.why}</p>
              <a
                href={bookLink(book)}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                aria-hidden="true"
                className="mt-2 text-sm font-semibold text-accent"
              >
                Find on Open Library ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
