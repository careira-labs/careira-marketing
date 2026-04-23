/**
 * In-code person mapping for /connect pages.
 * No database table – add new people here.
 */

export type BioItem = string | { bullets: string[] };

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
    bio: [
      'I help people do their best work by fixing the things that get in the way.',
      "I'm a technical founder and operator who has built and scaled complex SaaS systems end-to-end:",
      {
        bullets: [
          'Co-founded channelcentral and built the iQuote CPQ platform prior to exit.',
          'Led data and operational systems at Enable during sustained international growth.',
        ],
      },
      "My work has consistently centred on turning fragmented, inconsistent information into systems that support better decisions at scale. I've designed and built Careira to apply that discipline to hiring.",
    ],
  },
  garystacey: {
    key: 'garystacey',
    name: 'Gary Stacey',
    role: 'Head of Growth',
    initials: 'GS',
    bio: [
      'Gary builds commercial momentum around emerging technology businesses.',
      'He has worked internationally across global banking, big four advisory, and technology ventures \u2013 including building managed services models in cloud computing and contributing to a successful North American security MBI.',
      "Gary\u2019s focus is business development and growth: opening conversations, refining Careira\u2019s go-to-market positioning, and shaping how Careira\u2019s capability is presented to the market. He leads partnerships and market engagement to ensure adoption keeps pace with our product ambitions.",
    ],
  },
};
