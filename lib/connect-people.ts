/**
 * In-code person mapping for /connect pages.
 * No database table – add new people here.
 */

export type BioItem = string | { bullets: string[] } | { subheader: string };

export interface ConnectPerson {
  key: string;
  name: string;
  role: string;
  bio: BioItem[];
  initials: string;
  /** Path to headshot in /public/assets/connect/. Omit to show initials avatar. */
  image?: string;
}

export const CONNECT_PEOPLE: Record<string, ConnectPerson> = {
  danmason: {
    key: 'danmason',
    name: 'Dan Mason',
    role: 'Founder',
    initials: 'DM',
    image: '/assets/connect/dan-mason.png',
    bio: [
      "I'm a technical founder and operator who has designed, built and scaled SaaS systems end-to-end for nearly 20 years. I focus on fixing the things that get in the way of doing great work \u2013 turning complex, fragmented information into clear, usable decision systems.",
      'More recently, I\u2019ve been applying that discipline to hiring through Careira.',
      { subheader: 'A few things about me' },
      {
        bullets: [
          'Favourite city: Salzburg, Austria',
          'Coffee order: Flat white',
          'Default mindset: There\u2019s usually a simpler way',
          'Ask me about: Music, cooking from scratch, or something that isn\u2019t working properly',
        ],
      },
    ],
  },
  garystacey: {
    key: 'garystacey',
    name: 'Gary Stacey',
    role: 'Head of Growth',
    initials: 'GS',
    image: '/assets/connect/gary-stacey.png',
    bio: [
      "I\u2019ve worked across financial services, advisory, and technology, helping organisations open up new opportunities, build partnerships, and turn ideas into something commercially real.",
      "At Careira, I\u2019m focused on how we bring the platform to market \u2013 where it fits, who it\u2019s for, and how it connects with the people it\u2019s built for.",
      { subheader: 'A few things about me' },
      {
        bullets: [
          'Favourite place: Somewhere warm with a view',
          'Coffee order: Americano',
          'Default mindset: There\u2019s a way to get this moving',
          'Ask me about: Growth, partnerships, or how to get something moving that\u2019s stuck',
        ],
      },
    ],
  },
};
