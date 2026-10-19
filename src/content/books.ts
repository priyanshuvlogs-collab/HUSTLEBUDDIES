/**
 * Recommended reading. Real, widely available books; "why" lines are our own
 * one-sentence reasons for recommending each. Edit freely.
 */

export interface Book {
  title: string;
  author: string;
  year: number;
  topic: 'Marketing' | 'Persuasion' | 'Growth' | 'AI';
  why: string;
}

export const reading = {
  title: 'Reading list',
  intro:
    'Books we keep coming back to. None of them are about shortcuts; all of them will make your marketing clearer.',
  books: [
    {
      title: 'This Is Marketing',
      author: 'Seth Godin',
      year: 2018,
      topic: 'Marketing',
      why: 'Start with the smallest audience you can serve well, and build from there.',
    },
    {
      title: 'Building a StoryBrand',
      author: 'Donald Miller',
      year: 2017,
      topic: 'Marketing',
      why: 'A practical framework for making your customer the hero of your message.',
    },
    {
      title: 'Influence: The Psychology of Persuasion',
      author: 'Robert B. Cialdini',
      year: 1984,
      topic: 'Persuasion',
      why: 'The principles behind why people say yes, and how to use them honestly.',
    },
    {
      title: 'Contagious: Why Things Catch On',
      author: 'Jonah Berger',
      year: 2013,
      topic: 'Persuasion',
      why: 'Research-backed reasons some ideas get shared and others don’t.',
    },
    {
      title: 'Traction',
      author: 'Gabriel Weinberg & Justin Mares',
      year: 2015,
      topic: 'Growth',
      why: 'A structured way to test marketing channels instead of guessing.',
    },
    {
      title: '$100M Offers',
      author: 'Alex Hormozi',
      year: 2021,
      topic: 'Growth',
      why: 'How to package what you sell so the value is obvious to the buyer.',
    },
    {
      title: 'Co-Intelligence: Living and Working with AI',
      author: 'Ethan Mollick',
      year: 2024,
      topic: 'AI',
      why: 'A grounded guide to working alongside AI rather than handing everything over to it.',
    },
    {
      title: 'Prediction Machines',
      author: 'Ajay Agrawal, Joshua Gans & Avi Goldfarb',
      year: 2018,
      topic: 'AI',
      why: 'Explains AI as cheaper prediction, which makes it easier to see where it fits a business.',
    },
  ] satisfies Book[],
};

/** Open Library search link (no affiliate tracking). */
export const bookLink = (b: Book) =>
  `https://openlibrary.org/search?q=${encodeURIComponent(`${b.title} ${b.author}`)}`;
