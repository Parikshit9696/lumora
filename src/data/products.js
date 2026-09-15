import { digitalPhotoImages, printImages } from './images';
import { photographers } from './photographers';

export const digitalPhotos = digitalPhotoImages.map((img, i) => {
  const photographer = photographers[i % photographers.length];
  return {
    id: `photo-${img.id}`,
    type: 'digital-photo',
    title: img.title,
    category: img.category,
    image: img.src,
    photographerId: photographer.id,
    photographerName: photographer.name,
    resolution: '6000 × 4000px',
    rating: (4.4 + (i % 5) * 0.1).toFixed(1),
    licenses: [
      { type: 'Personal', price: 499 },
      { type: 'Commercial', price: 1999 },
      { type: 'Editorial', price: 999 },
    ],
    price: [499, 999, 1999][i % 3],
  };
});

export function getDigitalPhotoById(id) {
  return digitalPhotos.find((p) => p.id === id);
}

const printProductSeeds = [
  { name: 'Canvas Print', key: 'Canvas Prints', base: 1499, description: 'Gallery-wrapped canvas with a soft matte finish.' },
  { name: 'Framed Print', key: 'Framed Prints', base: 1899, description: 'Archival paper print in a hand-finished frame.' },
  { name: 'Poster Print', key: 'Posters', base: 599, description: 'Vivid, budget-friendly poster on premium paper.' },
  { name: 'Photo Book', key: 'Photo Books', base: 2499, description: 'Hardcover lay-flat photo book, 40 pages.' },
  { name: 'Metal Print', key: 'Metal Prints', base: 2999, description: 'High-gloss aluminium print with vibrant colour depth.' },
  { name: 'Fine Art Print', key: 'Fine Art Prints', base: 3499, description: 'Museum-grade giclée print on cotton rag paper.' },
];

export const printProducts = printProductSeeds.map((seed, i) => ({
  id: `print-${i + 1}`,
  type: 'print',
  name: seed.name,
  category: seed.key,
  image: printImages[seed.key],
  description: seed.description,
  basePrice: seed.base,
  sizes: ['Small', 'Medium', 'Large', 'Extra Large'],
  frames: seed.key === 'Framed Prints' ? ['Classic Wood', 'Modern Black', 'Minimal'] : ['None', 'Classic Wood', 'Modern Black'],
  materials: ['Standard', 'Premium', 'Museum Grade'],
}));

export function getPrintById(id) {
  return printProducts.find((p) => p.id === id);
}
