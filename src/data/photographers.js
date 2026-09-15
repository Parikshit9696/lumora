import { photographerAvatars, photographerCovers, portfolioShots } from './images';

const names = [
  'Ananya Rao', 'Vikram Sen', 'Meera Kapoor', 'Rohan Dsouza', 'Ishaan Malhotra', 'Kavya Nair',
  'Arjun Verma', 'Sana Sheikh', 'Devika Pillai', 'Rahul Chatterjee', 'Neha Bhatt', 'Karan Oberoi',
];

const specializations = [
  'Wedding', 'Portrait', 'Fashion', 'Wedding', 'Travel', 'Portrait',
  'Product', 'Fashion', 'Maternity', 'Corporate', 'Architecture', 'Events',
];

const cities = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Jaipur', 'Goa', 'Pune', 'Hyderabad', 'Chennai', 'Udaipur', 'Kolkata', 'Ahmedabad', 'Chandigarh',
];

const bios = [
  'Believes every couple has a story worth telling slowly, in golden light.',
  'A decade of shooting weddings across India, one honest frame at a time.',
  'Portraits that feel like conversations, not poses.',
  'Documentary-first wedding photography with a cinematic eye.',
  'Chases light across coastlines and mountains for a living.',
  'Studio portraiture with a painterly, old-world feel.',
  'Clean, considered product photography for growing brands.',
  'Editorial fashion work shaped by a background in visual design.',
  'Gentle, unhurried sessions for families welcoming new life.',
  'Corporate storytelling that makes teams look as sharp as they are.',
  'Architectural photographer obsessed with light, line, and negative space.',
  'Energetic, unscripted coverage of the moments that matter at any event.',
];

export const photographers = names.map((name, i) => ({
  id: `photographer-${i + 1}`,
  name,
  avatar: photographerAvatars[i % photographerAvatars.length],
  cover: photographerCovers[i % photographerCovers.length],
  specialization: specializations[i],
  styles: ['Candid', 'Editorial', 'Cinematic'].slice(0, (i % 3) + 1),
  city: cities[i],
  location: `${cities[i]}, India`,
  locationsServed: [cities[i], cities[(i + 3) % cities.length], cities[(i + 6) % cities.length]],
  experience: 3 + (i % 10),
  rating: (4.3 + ((i % 6) * 0.1)).toFixed(1),
  reviewCount: 40 + i * 17,
  completedShoots: 120 + i * 63,
  startingPrice: 8999 + i * 1500,
  availability: i % 4 === 0 ? 'Booked this week' : 'Available',
  bio: bios[i],
  equipment: ['Sony A7 IV', 'Canon R5', '35mm & 85mm primes', 'Profoto lighting kit'].slice(0, 2 + (i % 3)),
  portfolio: portfolioShots[specializations[i] === 'Product' ? 'Product' : specializations[i] === 'Corporate' ? 'Portrait' : specializations[i] === 'Architecture' ? 'Architecture' : specializations[i]] || portfolioShots.Portrait,
  social: {
    instagram: `https://instagram.com/lumora.${name.split(' ')[0].toLowerCase()}`,
    website: `https://lumora.studio/${name.split(' ')[0].toLowerCase()}`,
  },
}));

export function getPhotographerById(id) {
  return photographers.find((p) => p.id === id);
}
