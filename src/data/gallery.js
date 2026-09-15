import { galleryImages } from './images';
import { photographers } from './photographers';

export const galleryPhotos = galleryImages.map((img, i) => ({
  ...img,
  photographerId: photographers[i % photographers.length].id,
  photographerName: photographers[i % photographers.length].name,
  likes: 40 + i * 11,
}));

export const galleryCategories = ['All', 'Trending', 'Editorial', 'Portrait', 'Fashion', 'Wedding', 'Travel'];
