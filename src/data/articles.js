import { articleImages } from './images';

const articleSeeds = [
  {
    title: 'Best Portrait Photography Ideas',
    category: 'Portrait',
    author: 'Meera Kapoor',
    readTime: '6 min read',
    preview: 'From window light to negative space — small shifts that make portraits feel intentional rather than accidental.',
  },
  {
    title: 'Wedding Photoshoot Ideas',
    category: 'Wedding',
    author: 'Ananya Rao',
    readTime: '8 min read',
    preview: 'Beyond the traditional shot list: quiet, in-between moments worth asking your photographer to capture.',
  },
  {
    title: 'Fashion Photography Trends',
    category: 'Fashion',
    author: 'Sana Sheikh',
    readTime: '5 min read',
    preview: 'What editorial teams are shooting for this season, from colour grading to set design.',
  },
  {
    title: 'How to Prepare for a Photoshoot',
    category: 'Guide',
    author: 'Rohan Dsouza',
    readTime: '4 min read',
    preview: 'A short, practical checklist to help you arrive relaxed, camera-ready, and on time.',
  },
  {
    title: 'Best Locations for Photography',
    category: 'Travel',
    author: 'Ishaan Malhotra',
    readTime: '7 min read',
    preview: 'Our favourite backdrops across India, organised by season and shooting style.',
  },
  {
    title: 'Photography Poses',
    category: 'Portrait',
    author: 'Kavya Nair',
    readTime: '5 min read',
    preview: 'Natural-looking poses for couples, families, and solo portraits that photograph well from every angle.',
  },
  {
    title: 'Professional Headshot Guide',
    category: 'Corporate',
    author: 'Rahul Chatterjee',
    readTime: '4 min read',
    preview: 'What to wear, how to prepare, and what separates a good headshot from a forgettable one.',
  },
];

export const articles = articleSeeds.map((a, i) => ({
  id: `article-${i + 1}`,
  ...a,
  image: articleImages[a.title],
  date: new Date(Date.now() - (i + 1) * 9 * 24 * 60 * 60 * 1000).toISOString(),
}));

export function getArticleById(id) {
  return articles.find((a) => a.id === id);
}
