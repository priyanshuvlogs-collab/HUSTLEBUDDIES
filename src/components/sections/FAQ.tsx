import { faq } from '../../content';
import { Accordion } from '../ui/Accordion';
import { SectionHeading } from '../ui/SectionHeading';

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y bg-bg-light text-ink">
      <div className="container-x">
        <SectionHeading id="faq-title" eyebrow="FAQ" title={faq.title} light />
        <Accordion items={faq.items} />
      </div>
    </section>
  );
}
