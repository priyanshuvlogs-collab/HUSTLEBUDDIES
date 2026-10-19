/**
 * Blog posts for the Insights section.
 *
 * Each post is plain data so it can be edited without touching components.
 * Block types: 'p' (paragraph), 'h2' (subheading), 'ul' (bullet list), 'note' (callout).
 * Rules: no invented statistics, clients, quotes or results. Review every post
 * before launch and update the date/author to match reality.
 */

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'note'; text: string };

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string; // ISO yyyy-mm-dd
  author: string;
  body: PostBlock[];
}

export const insights = {
  title: 'Practical notes on AI marketing',
  intro:
    'Short, plain-English articles on using AI and automation in a small business without losing the human touch.',
};

export const posts: Post[] = [
  {
    slug: 'where-ai-helps',
    title: 'Where AI actually helps in small-business marketing, and where it doesn’t',
    excerpt:
      'AI is fast at drafts, variations and sorting. It is weak at judgment, taste and knowing your customers. Here is how we split the work.',
    tag: 'AI strategy',
    date: '2026-10-19',
    author: 'Hustle Buddies team',
    body: [
      {
        type: 'p',
        text: 'Most small businesses we talk to have tried an AI writing tool at least once. Many stopped because the output sounded generic, or because checking it took as long as writing it. That is a fair reaction. AI is useful in marketing, but only for certain jobs.',
      },
      { type: 'h2', text: 'Jobs where AI earns its place' },
      {
        type: 'ul',
        items: [
          'First drafts: turning a voice note or a list of bullet points into a rough blog post, email or caption that a person then edits.',
          'Variations: writing ten versions of an ad headline so you can test them, instead of guessing which one works.',
          'Summaries: condensing reviews, survey answers or call notes so you can see common themes quickly.',
          'Repetitive admin: tagging leads, drafting replies to common questions, and filling in templates.',
        ],
      },
      { type: 'h2', text: 'Jobs that still need a person' },
      {
        type: 'ul',
        items: [
          'Deciding what to say: your positioning, your offer and what makes you different come from you, not a model.',
          'Checking facts: AI can state wrong prices, opening hours or claims with full confidence.',
          'Knowing your customers: the regular who always orders the same thing, or the complaint you hear every week, is not in any training data.',
          'Final approval: anything published under your name should be read by someone who understands the business.',
        ],
      },
      { type: 'h2', text: 'A simple test before you automate anything' },
      {
        type: 'p',
        text: 'Ask two questions. Is the task repetitive enough that a good template would cover most cases? And would a mistake be cheap to catch and fix? If both answers are yes, AI can probably help. If a mistake would reach a customer before anyone noticed, keep a person in the loop.',
      },
      {
        type: 'note',
        text: 'If you want a second opinion on where AI fits in your marketing, book a free consultation and we will walk through your current workflow with you.',
      },
    ],
  },
  {
    slug: 'never-miss-a-lead',
    title: 'Never miss a lead: setting up follow-up for missed calls and enquiries',
    excerpt:
      'A customer who calls and gets no answer often calls someone else. A simple automated follow-up keeps the conversation going while you are busy.',
    tag: 'Automation',
    date: '2026-10-19',
    author: 'Hustle Buddies team',
    body: [
      {
        type: 'p',
        text: 'Restaurants, salons, trades and clinics share a problem: the busiest moments are exactly when nobody can pick up the phone. A missed call during the lunch rush or while you are with a customer is easy to forget, and the person on the other end rarely leaves a voicemail.',
      },
      { type: 'h2', text: 'What a basic follow-up flow looks like' },
      {
        type: 'ul',
        items: [
          'A call goes unanswered, or a form or message arrives outside opening hours.',
          'Within a minute, the customer gets a short, friendly text: who you are, that you saw their call, and a way to book or reply.',
          'The enquiry lands in one place (a CRM or shared inbox) with the time, number and any reply attached.',
          'If nobody has responded after a set time, a reminder goes to the team.',
        ],
      },
      { type: 'h2', text: 'Getting the details right' },
      {
        type: 'p',
        text: 'The message should sound like your business, not a robot. Keep it short, use your real name and give one clear next step, such as a booking link or "reply with the best time to call you back". Make it easy to opt out, follow the messaging rules in your country, and never send marketing to people who only called with a question.',
      },
      { type: 'h2', text: 'Where AI fits' },
      {
        type: 'p',
        text: 'AI can help sort incoming replies, for example separating booking requests from complaints, and draft a suggested response for a person to approve. We do not recommend letting it make promises about prices, availability or refunds on its own.',
      },
      {
        type: 'note',
        text: 'This is one of the automations we set up for local businesses. If you want to see how it would work with your phone system and booking tool, get in touch.',
      },
    ],
  },
  {
    slug: 'how-we-review-ai-content',
    title: 'How we review AI-written content before it goes live',
    excerpt:
      'Every piece of AI-assisted content we publish goes through the same checklist. Here it is, so you can use it too.',
    tag: 'Responsible AI',
    date: '2026-10-19',
    author: 'Hustle Buddies team',
    body: [
      {
        type: 'p',
        text: 'We use AI to speed up drafting, not to replace editing. Before anything we help create is published, a person works through a short checklist. It is simple, and it catches most of the problems that make AI content feel off.',
      },
      { type: 'h2', text: 'The checklist' },
      {
        type: 'ul',
        items: [
          'Facts: every name, number, price, date and claim is checked against a real source or the client.',
          'Voice: it sounds like the brand, uses the words customers use, and avoids filler phrases.',
          'Specifics: it includes at least one detail that only this business could say, such as a real product, place or process.',
          'Promises: no guarantees, invented results or claims we cannot back up.',
          'Fairness: no stereotypes, and nothing that would embarrass the client if a customer read it aloud.',
          'Approval: the client signs off before it goes live.',
        ],
      },
      { type: 'h2', text: 'Why this matters' },
      {
        type: 'p',
        text: 'Search engines, platforms and customers are all getting better at spotting generic content. Content that is accurate and clearly written by people who know the business tends to hold up better over time. The review step is what turns a fast draft into something you are happy to put your name on.',
      },
      {
        type: 'note',
        text: 'Feel free to copy this checklist for your own team.',
      },
    ],
  },
];

/** Rough reading time at ~220 words per minute. */
export function readingMinutes(post: Post) {
  const words = post.body
    .map((b) => ('text' in b ? b.text : b.items.join(' ')))
    .join(' ')
    .split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
}
