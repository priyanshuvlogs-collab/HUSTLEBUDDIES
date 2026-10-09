import { contact, site } from '../../content';
import { SectionHeading } from '../ui/SectionHeading';
import { ContactForm } from './ContactForm';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y relative">
      <div
        aria-hidden="true"
        className="hero-fallback pointer-events-none absolute inset-0 opacity-20"
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title={contact.title}
            intro={contact.intro}
          />
          <div className="rounded-card border border-line p-6">
            <h3 className="!text-lg text-text-primary">{contact.altTitle}</h3>
            <ul className="mt-4 space-y-2 text-text-muted">
              <li>
                Email: <span className="text-text-primary">{site.email}</span>
              </li>
              <li>
                Booking:{' '}
                <a href={site.bookingUrl} className="text-accent underline underline-offset-4">
                  {contact.bookingLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
