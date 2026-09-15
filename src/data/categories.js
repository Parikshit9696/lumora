import { categoryImages } from './images';

export const categories = [
  { id: 'wedding', name: 'Wedding', image: categoryImages.Wedding, description: 'Timeless coverage of your biggest day.' },
  { id: 'portrait', name: 'Portrait', image: categoryImages.Portrait, description: 'Studio and natural-light portraiture.' },
  { id: 'fashion', name: 'Fashion', image: categoryImages.Fashion, description: 'Editorial shoots for brands and models.' },
  { id: 'pre-wedding', name: 'Pre-Wedding', image: categoryImages['Pre-Wedding'], description: 'Romantic sessions before the big day.' },
  { id: 'events', name: 'Events', image: categoryImages.Events, description: 'Birthdays, concerts, and private events.' },
  { id: 'product', name: 'Product', image: categoryImages.Product, description: 'Clean, commercial product photography.' },
  { id: 'maternity', name: 'Maternity', image: categoryImages.Maternity, description: 'Gentle sessions celebrating new life.' },
  { id: 'travel', name: 'Travel', image: categoryImages.Travel, description: 'Documentary style travel storytelling.' },
  { id: 'corporate', name: 'Corporate', image: categoryImages.Corporate, description: 'Headshots and brand photography.' },
  { id: 'food', name: 'Food', image: categoryImages.Food, description: 'Appetising food and menu photography.' },
  { id: 'architecture', name: 'Architecture', image: categoryImages.Architecture, description: 'Interiors, exteriors, and real estate.' },
  { id: 'lifestyle', name: 'Lifestyle', image: categoryImages.Lifestyle, description: 'Everyday moments, beautifully told.' },
];

export const photoshootCategoryTree = [
  {
    name: 'Portrait',
    subcategories: ['Personal Portrait', 'Professional Headshots', 'Creative Portrait', 'Outdoor Portrait'],
  },
  {
    name: 'Fashion',
    subcategories: ['Fashion Editorial', 'Model Portfolio', 'Brand Campaign'],
  },
  {
    name: 'Wedding',
    subcategories: ['Wedding Photography', 'Engagement', 'Pre-Wedding', 'Couple Session'],
  },
  {
    name: 'Events',
    subcategories: ['Birthday', 'Corporate', 'Concert', 'Private Events'],
  },
  {
    name: 'Lifestyle',
    subcategories: ['Family', 'Maternity', 'Newborn', 'Travel'],
  },
];

export const photographyStyles = [
  'Candid', 'Editorial', 'Documentary', 'Cinematic', 'Classic', 'Fine Art', 'Minimalist', 'Vintage',
];

export const locationsList = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Pune', 'Jaipur', 'Goa', 'Udaipur', 'Hyderabad', 'Chennai', 'Kolkata',
];
