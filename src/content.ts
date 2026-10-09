/**
 * All site copy lives here so it can be edited without touching components.
 *
 * Anything in [square brackets] is a placeholder. See PLACEHOLDERS.md.
 * Rule: never replace a placeholder with an invented client, statistic,
 * testimonial or credential. Use only verified, client-approved information.
 */

export type ServiceIcon = 'content' | 'ads' | 'seo' | 'automation' | 'strategy' | 'analytics';

export const site = {
  name: 'Hustle Buddies Inc',
  url: 'https://www.example.com', // [Placeholder: production domain]
  email: '[company email placeholder]',
  bookingUrl: '#contact', // [Placeholder: booking link, e.g. Calendly]
  gaId: import.meta.env.VITE_GA_ID ?? 'G-XXXXXXX',
};

export const nav = {
  links: [
    { id: 'services', label: 'Services' },
    { id: 'how-we-work', label: 'How We Work' },
    { id: 'results', label: 'Results' },
    { id: 'about', label: 'About' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ],
  cta: 'Book a Free Consultation',
};

export const hero = {
  // [Placeholder: replace with final headline copy]
  headline: 'AI-powered marketing that helps your business grow faster.',
  subheading:
    'Hustle Buddies combines strategy, creative, and automation to help you create content, run smarter campaigns, and save time on the work that slows you down.',
  primaryCta: 'Book a Free Consultation',
  secondaryCta: 'Explore Services',
  trustLine: '[Placeholder: Client logos or industries served. Do not invent client names.]',
};

export const services: {
  title: string;
  description: string;
  icon: ServiceIcon;
  href: string;
}[] = [
  {
    title: 'AI Content Creation',
    description:
      'Blog, social, and email content produced with AI and refined by human editors. Every piece follows your brand voice guidelines.',
    icon: 'content',
    href: '#contact',
  },
  {
    title: 'Paid Advertising Optimization',
    description:
      'Campaign setup, audience testing, and AI-assisted creative variation. We test methodically and keep what works.',
    icon: 'ads',
    href: '#contact',
  },
  {
    title: 'SEO and Search Visibility',
    description:
      'Keyword research, content briefs, and technical audits. We also prepare your site for AI-driven search experiences.',
    icon: 'seo',
    href: '#contact',
  },
  {
    title: 'Marketing Automation',
    description:
      'Workflow design for email, CRM, and lead routing. Fewer manual steps, faster follow-up with every lead.',
    icon: 'automation',
    href: '#contact',
  },
  {
    title: 'AI Strategy Consulting',
    description:
      'We assess where AI genuinely fits your marketing. You get a practical roadmap with clear priorities.',
    icon: 'strategy',
    href: '#contact',
  },
  {
    title: 'Analytics and Reporting',
    description:
      'Clear dashboards that connect marketing activity to business results. You always know what is working and why.',
    icon: 'analytics',
    href: '#contact',
  },
];

export const howWeWork = {
  title: 'How we work',
  intro: 'A simple, transparent process built around your goals.',
  steps: [
    { title: 'Discovery', body: 'We learn your goals, audience, and current tools.' },
    { title: 'Strategy', body: 'We design a plan with clear priorities and success measures.' },
    { title: 'Execution', body: 'We build, launch, and manage campaigns and content.' },
    { title: 'Measure and Improve', body: 'We review results weekly and refine.' },
  ],
};

/**
 * RESULTS: REPLACE ONLY WITH VERIFIED, CLIENT-APPROVED RESULTS.
 * `value` drives the animated counter. Leave at 0 until real data exists.
 */
export const results = {
  title: 'Results',
  intro: 'Example layout only. These cards will show verified client results once approved.',
  badge: 'Placeholder, not real data',
  items: [
    {
      client: '[Client name]',
      industry: '[Industry]',
      metric: '[Metric]',
      value: 0,
      suffix: '%',
      timeframe: '[timeframe]',
    },
    {
      client: '[Client name]',
      industry: '[Industry]',
      metric: '[Metric]',
      value: 0,
      suffix: '%',
      timeframe: '[timeframe]',
    },
    {
      client: '[Client name]',
      industry: '[Industry]',
      metric: '[Metric]',
      value: 0,
      suffix: '%',
      timeframe: '[timeframe]',
    },
  ],
};

export const about = {
  title: 'About Hustle Buddies',
  mission:
    '[Placeholder mission statement. Example: Help growing businesses use AI to market smarter, not just faster.]',
  responsibleTitle: 'Our responsible AI commitment',
  responsibleIntro:
    'We use AI to support human expertise, review all outputs, and protect client data.',
  principles: [
    'A person reviews every AI-generated output before it is published.',
    'Client data is never used to train public AI models.',
    'We are transparent about where and how AI is used in your work.',
    'We check content for accuracy, bias, and brand fit.',
    'You own the work we create for you.',
  ],
  teamTitle: 'The team',
  team: [
    { name: '[Name]', role: '[Role]', bio: '[One-line bio]', photo: '' },
    { name: '[Name]', role: '[Role]', bio: '[One-line bio]', photo: '' },
    { name: '[Name]', role: '[Role]', bio: '[One-line bio]', photo: '' },
  ],
};

export const faq = {
  title: 'Frequently asked questions',
  items: [
    {
      q: 'What does an engagement typically look like?',
      a: 'We start with a discovery call, then propose a plan with clear priorities. Once agreed, we execute, report on progress weekly, and adjust as we learn. [Placeholder: typical engagement length and format]',
    },
    {
      q: 'How long before we see results?',
      a: 'It depends on your starting point, channel, and goals. As a rough guide, [Placeholder: typical range, e.g. X to Y weeks] for early signals. We do not guarantee specific outcomes.',
    },
    {
      q: 'Which tools do you use?',
      a: '[Placeholder: list the AI, analytics, CRM, and automation tools you actually use.] We can also work inside the tools you already have.',
    },
    {
      q: 'How do you protect client data and handle AI-generated content?',
      a: 'Access is limited to the people working on your account, and client data is not used to train public models. Every AI-generated output is reviewed by a person before it goes live. [Placeholder: link to privacy policy and data handling details]',
    },
    {
      q: 'How is pricing structured?',
      a: '[Pricing model]. Book a free consultation and we will recommend an option that fits your goals.',
    },
  ],
};

export const contact = {
  title: 'Book a free consultation',
  intro:
    'Tell us about your business and goals. We will reply within [Placeholder: response time].',
  // Budget and service options live in src/lib/schema.ts (shared with server validation).
  successTitle: 'Thanks, we got your message.',
  successBody: 'We will be in touch soon to schedule your consultation.',
  altTitle: 'Prefer another way?',
  bookingLabel: '[Booking link placeholder]',
};

export const footer = {
  socials: [
    { label: 'LinkedIn', href: '#', icon: 'linkedin' as const }, // [Placeholder]
    { label: 'X', href: '#', icon: 'x' as const }, // [Placeholder]
    { label: 'Instagram', href: '#', icon: 'instagram' as const }, // [Placeholder]
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' }, // [Placeholder: privacy page URL]
    { label: 'Terms of Service', href: '#' }, // [Placeholder: terms page URL]
  ],
  copyright: '© 2026 Hustle Buddies Inc. All rights reserved.',
};
