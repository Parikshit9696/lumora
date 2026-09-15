import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, ShieldCheck, Sparkles, Clock } from 'lucide-react';
import '../styles/home.css';

import { heroImages, experienceImage } from '../data/images';
import { categories } from '../data/categories';
import { photoshoots } from '../data/photoshoots';
import { photographers } from '../data/photographers';
import { galleryPhotos } from '../data/gallery';
import { testimonials } from '../data/reviews';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

import PhotoshootCard from '../components/PhotoshootCard';
import PhotographerCard from '../components/PhotographerCard';
import ImageGallery from '../components/ImageGallery';

const steps = [
  { title: 'Discover', desc: 'Browse curated photographers and packages tailored to your style and city.' },
  { title: 'Choose', desc: 'Compare packages, pricing, and portfolios to find your perfect match.' },
  { title: 'Book', desc: 'Select a date, add extras, and confirm your session in minutes.' },
  { title: 'Capture', desc: 'Sit back while your photographer turns the moment into a story.' },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(() => loadJSON(STORAGE_KEYS.NEWSLETTER, false));

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroImages.length), 5500);
    return () => clearInterval(t);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    saveJSON(STORAGE_KEYS.NEWSLETTER, true);
    setSubscribed(true);
  };

  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="hero">
        {heroImages.map((src, i) => (
          <div key={src} className={`hero-slide ${i === slide ? 'active' : ''}`}>
            <img src={src} alt="" />
          </div>
        ))}
        <div className="container hero-content">
          <span className="hero-eyebrow">Photography, elevated</span>
          <h1>Turn Moments Into Stories.</h1>
          <p>Discover extraordinary photographers, premium photoshoots, and timeless visual experiences.</p>
          <div className="hero-actions">
            <Link to="/photoshoots" className="btn btn-accent">
              Explore Photoshoots <ArrowRight size={16} />
            </Link>
            <Link to="/photographers" className="btn btn-secondary" style={{ borderColor: 'rgba(246,242,234,0.5)', color: 'var(--ivory)' }}>
              Find a Photographer
            </Link>
          </div>
        </div>
        <div className="hero-dots">
          {heroImages.map((_, i) => (
            <button key={i} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Browse by category</span>
              <h2 className="section-title">Photography Beyond Ordinary.</h2>
            </div>
            <Link to="/explore" className="btn btn-secondary btn-sm">View All</Link>
          </div>
          <div className="category-scroll">
            {categories.slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/explore?category=${encodeURIComponent(cat.name)}`} className="category-tile">
                <img src={cat.image} alt={cat.name} loading="lazy" />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" style={{ maxWidth: 'var(--container)', margin: '0 auto' }} />

      {/* Featured Photoshoots */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Handpicked for you</span>
              <h2 className="section-title">Featured Photoshoots</h2>
              <p className="section-sub">Premium packages loved by our community, ready to book today.</p>
            </div>
            <Link to="/photoshoots" className="btn btn-secondary btn-sm">Browse All</Link>
          </div>
          <div className="grid grid-3">
            {photoshoots.slice(0, 6).map((shoot) => (
              <PhotoshootCard key={shoot.id} shoot={shoot} />
            ))}
          </div>
        </div>
      </section>

      {/* Photographer Spotlight */}
      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Meet the artists</span>
              <h2 className="section-title">Photographer Spotlight</h2>
            </div>
            <Link to="/photographers" className="btn btn-secondary btn-sm">See All Photographers</Link>
          </div>
          <div className="spotlight-grid">
            {photographers.slice(0, 3).map((p) => (
              <PhotographerCard key={p.id} photographer={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Gallery */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">From the community</span>
              <h2 className="section-title">Trending Photography</h2>
            </div>
            <Link to="/gallery" className="btn btn-secondary btn-sm">Open Gallery</Link>
          </div>
          <div className="masonry">
            {galleryPhotos.slice(0, 8).map((photo) => (
              <figure key={photo.id} className="gallery-card" onClick={() => setLightboxPhoto(photo)}>
                <img src={photo.src} alt={photo.title} loading="lazy" />
                <div className="gallery-card-overlay">
                  <div className="gallery-card-info">
                    <p className="gallery-card-title">{photo.title}</p>
                    <p className="gallery-card-photographer">{photo.photographerName}</p>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* How LUMORA Works */}
      <section className="section" style={{ background: 'var(--paper)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Simple, start to finish</span>
              <h2 className="section-title">How LUMORA Works</h2>
            </div>
          </div>
          <div className="steps-row">
            {steps.map((step, i) => (
              <div key={step.title} className="step-card">
                <span className="step-number">0{i + 1}</span>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Experience */}
      <section className="section">
        <div className="container">
          <div className="experience-section">
            <img src={experienceImage} alt="" />
            <div className="experience-content">
              <span className="hero-eyebrow">The LUMORA experience</span>
              <h2>Every detail, considered.</h2>
              <p>From your first search to the final delivered gallery, LUMORA is built around trust, craft, and a genuinely premium experience.</p>
              <ul className="experience-list">
                <li><ShieldCheck size={16} /> Vetted, professional photographers</li>
                <li><Sparkles size={16} /> Curated, editorial-quality portfolios</li>
                <li><Clock size={16} /> Fast, reliable delivery windows</li>
                <li><Camera size={16} /> Equipment and style transparency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Loved by our clients</span>
              <h2 className="section-title">Customer Reviews</h2>
            </div>
          </div>
          <div className="testimonial-grid">
            {testimonials.slice(0, 3).map((t) => (
              <div key={t.id} className="card review-card">
                <div className="review-card-head">
                  <img src={t.avatar} alt="" className="review-card-avatar" />
                  <div>
                    <p className="review-card-name">{t.name}</p>
                    <p className="text-stone review-card-date">{t.role}</p>
                  </div>
                </div>
                <p className="review-card-text">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section section--tight">
        <div className="container">
          <div className="newsletter-banner">
            <h2>Never miss a shoot-worthy moment.</h2>
            <p>Join the LUMORA newsletter for fresh photographers, seasonal offers, and inspiration.</p>
            {subscribed ? (
              <p style={{ color: 'var(--bronze)', fontWeight: 600 }}>You're on the list. Welcome to LUMORA.</p>
            ) : (
              <form onSubmit={handleSubscribe}>
                <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button className="btn btn-primary" type="submit">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {lightboxPhoto && (
        <ImageGallery
          photos={galleryPhotos.slice(0, 8)}
          startIndex={galleryPhotos.slice(0, 8).findIndex((p) => p.id === lightboxPhoto.id)}
          onClose={() => setLightboxPhoto(null)}
        />
      )}
    </div>
  );
}
