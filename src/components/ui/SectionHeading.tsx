interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  id?: string;
  light?: boolean;
}

export function SectionHeading({ eyebrow, title, intro, id, light = false }: Props) {
  return (
    <div className="mb-12 max-w-2xl md:mb-16">
      <span className={`eyebrow ${light ? '!text-[var(--accent-on-light)]' : ''}`}>{eyebrow}</span>
      <h2 id={id} className={light ? 'text-ink' : 'text-text-primary'}>
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-[length:var(--fs-lead)] ${light ? 'text-ink-muted' : 'text-text-muted'}`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
