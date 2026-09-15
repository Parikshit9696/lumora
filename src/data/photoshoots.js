import { categoryImages, portfolioShots } from './images';
import { photographers } from './photographers';

const packageSeeds = [
  { title: 'Timeless Wedding Coverage', category: 'Wedding', duration: '8 hours', photos: 300, price: 45999 },
  { title: 'Intimate Engagement Session', category: 'Wedding', duration: '2 hours', photos: 60, price: 12999 },
  { title: 'Classic Pre-Wedding Story', category: 'Pre-Wedding', duration: '4 hours', photos: 120, price: 22999 },
  { title: 'Professional Headshot Session', category: 'Portrait', duration: '1 hour', photos: 20, price: 4999 },
  { title: 'Creative Outdoor Portrait', category: 'Portrait', duration: '2 hours', photos: 40, price: 8499 },
  { title: 'Personal Portrait Session', category: 'Portrait', duration: '1.5 hours', photos: 30, price: 6999 },
  { title: 'Fashion Editorial Shoot', category: 'Fashion', duration: '5 hours', photos: 80, price: 28999 },
  { title: 'Model Portfolio Build', category: 'Fashion', duration: '4 hours', photos: 70, price: 24999 },
  { title: 'Brand Campaign Shoot', category: 'Fashion', duration: '6 hours', photos: 100, price: 39999 },
  { title: 'Birthday Celebration Coverage', category: 'Events', duration: '3 hours', photos: 90, price: 14999 },
  { title: 'Corporate Event Coverage', category: 'Events', duration: '5 hours', photos: 150, price: 21999 },
  { title: 'Concert & Live Event Coverage', category: 'Events', duration: '4 hours', photos: 120, price: 18999 },
  { title: 'Family Lifestyle Session', category: 'Lifestyle', duration: '2 hours', photos: 50, price: 9999 },
  { title: 'Maternity Glow Session', category: 'Maternity', duration: '1.5 hours', photos: 35, price: 8999 },
  { title: 'Newborn Comfort Session', category: 'Lifestyle', duration: '2 hours', photos: 45, price: 10999 },
  { title: 'Travel Story Session', category: 'Travel', duration: 'Full day', photos: 200, price: 32999 },
  { title: 'Product Photography Package', category: 'Product', duration: '3 hours', photos: 60, price: 15999 },
  { title: 'Corporate Headshot Batch', category: 'Corporate', duration: '4 hours', photos: 100, price: 19999 },
];

const styleFor = (category) => (category === 'Wedding' || category === 'Pre-Wedding' ? 'Cinematic' : category === 'Fashion' ? 'Editorial' : 'Candid');

export const photoshoots = packageSeeds.map((seed, i) => {
  const photographer = photographers[i % photographers.length];
  const shotSet =
    portfolioShots[seed.category] ||
    portfolioShots[seed.category === 'Pre-Wedding' ? 'Wedding' : seed.category === 'Maternity' ? 'Portrait' : 'Portrait'];
  return {
    id: `shoot-${i + 1}`,
    title: seed.title,
    category: seed.category,
    coverImage: categoryImages[seed.category] || shotSet[0],
    gallery: shotSet,
    photographerId: photographer.id,
    photographerName: photographer.name,
    photographerAvatar: photographer.avatar,
    location: photographer.city,
    duration: seed.duration,
    editedPhotos: seed.photos,
    rawFilesIncluded: i % 3 === 0,
    deliveryTime: `${3 + (i % 5)} business days`,
    style: styleFor(seed.category),
    equipment: photographer.equipment,
    price: seed.price,
    rating: photographer.rating,
    reviewCount: 12 + i * 5,
    popularity: 100 - i * 3,
    createdDaysAgo: (i * 7) % 90,
    included: [
      'Pre-shoot consultation call',
      `${seed.duration} of dedicated shoot time`,
      `${seed.photos} professionally edited photographs`,
      'Private online gallery for downloads',
    ],
    excluded: ['Travel outside city limits', 'Physical prints & albums', 'Hair & makeup services'],
    cancellationPolicy:
      'Full refund for cancellations made at least 7 days before the shoot. 50% refund within 3–7 days. No refund within 48 hours of the scheduled session.',
    faqs: [
      { q: 'How soon will I receive my photos?', a: `Edited photos are delivered within ${3 + (i % 5)} business days of the shoot.` },
      { q: 'Can I reschedule my session?', a: 'Yes, sessions can be rescheduled once, free of charge, up to 48 hours before the shoot.' },
      { q: 'Do you shoot outdoors in bad weather?', a: 'We monitor conditions closely and will suggest an alternate date or indoor location if needed.' },
    ],
    addons: [
      { id: 'extra-photos', name: 'Extra 20 edited photos', price: 2499 },
      { id: 'extra-hour', name: 'Additional hour of coverage', price: 3999 },
      { id: 'drone', name: 'Drone photography', price: 5999 },
      { id: 'album', name: 'Premium photo album', price: 6999 },
      { id: 'raw-files', name: 'All raw files', price: 3499 },
      { id: 'express', name: 'Express 24-hour delivery', price: 2999 },
      { id: 'second-shooter', name: 'Additional photographer', price: 7999 },
    ],
  };
});

export function getPhotoshootById(id) {
  return photoshoots.find((p) => p.id === id);
}
