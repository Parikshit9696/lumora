import { reviewAvatars } from './images';

const testimonialSeeds = [
  { name: 'Priya & Arjun', role: 'Wedding, Udaipur', rating: 5, text: 'Every frame felt like it was waiting to be found. Our photographer understood exactly the mood we wanted, without us having to explain twice.' },
  { name: 'Rhea Malhotra', role: 'Professional Headshots', rating: 5, text: 'Fast, professional, and genuinely made me feel comfortable in front of the camera. The gallery arrived early too.' },
  { name: 'Kabir Studios', role: 'Brand Campaign', rating: 4, text: 'Great creative direction and a smooth booking process from start to finish. Would book again for our next launch.' },
  { name: 'Ananya & Family', role: 'Maternity Session', rating: 5, text: 'Gentle, patient, and so thoughtful with our toddler running around. The photos are ones we will keep forever.' },
  { name: 'Devansh Rao', role: 'Travel Story Session', rating: 5, text: 'Booked a shoot while travelling through Coorg on a whim — best decision of the trip. Stunning, natural results.' },
  { name: 'Simran Kaur', role: 'Fashion Editorial', rating: 4, text: 'The whole team clearly understood editorial direction. Loved the lighting choices and how quickly edits came back.' },
];

export const testimonials = testimonialSeeds.map((t, i) => ({
  id: `testimonial-${i + 1}`,
  ...t,
  avatar: reviewAvatars[i % reviewAvatars.length],
}));

export function seedReviewsFor(entityId) {
  return testimonialSeeds.slice(0, 3).map((t, i) => ({
    id: `${entityId}-review-${i + 1}`,
    entityId,
    name: t.name,
    avatar: reviewAvatars[i % reviewAvatars.length],
    rating: t.rating,
    text: t.text,
    date: new Date(Date.now() - (i + 1) * 12 * 24 * 60 * 60 * 1000).toISOString(),
    verified: i !== 2,
  }));
}
