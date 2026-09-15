import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MapPin, BadgeCheck, Globe, Camera } from 'lucide-react';
import { InstagramIcon } from '../components/SocialIcons';
import Breadcrumb from '../components/Breadcrumb';
import Rating from '../components/Rating';
import ReviewCard from '../components/ReviewCard';
import ImageGallery from '../components/ImageGallery';
import PhotoshootCard from '../components/PhotoshootCard';
import { getPhotographerById } from '../data/photographers';
import { photoshoots } from '../data/photoshoots';
import { seedReviewsFor } from '../data/reviews';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency, formatShortNumber } from '../utils/formatters';

export default function PhotographerProfile() {
  const { id } = useParams();
  const photographer = getPhotographerById(id);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { isWishlisted, toggleWishlist } = useWishlist();

  if (!photographer) return <Navigate to="/photographers" replace />;

  const packages = photoshoots.filter((s) => s.photographerId === photographer.id);
  const reviews = seedReviewsFor(photographer.id, photographer.name);
  const portfolioPhotos = photographer.portfolio.map((src, i) => ({ id: `${photographer.id}-p${i}`, src, title: `${photographer.name} portfolio` }));
  const wishlisted = isWishlisted(photographer.id);

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'Photographers', to: '/photographers' }, { label: photographer.name }]} />

        <div className="profile-cover">
          <img src={photographer.cover} alt="" />
        </div>

        <div className="profile-header">
          <img src={photographer.avatar} alt={photographer.name} className="profile-avatar" />
          <div className="profile-header-info">
            <h1>{photographer.name} {photographer.availability === 'Available' && <BadgeCheck size={20} className="text-bronze" style={{ verticalAlign: '-2px' }} />}</h1>
            <p className="text-bronze">{photographer.specialization} Photographer</p>
            <div className="profile-tags">
              <span className="badge"><MapPin size={12} /> {photographer.location}</span>
              <Rating value={photographer.rating} count={photographer.reviewCount} />
              <span className={`badge ${photographer.availability === 'Available' ? 'badge-success' : 'badge-warning'}`}>{photographer.availability}</span>
            </div>
          </div>
          <div className="profile-header-actions">
            <button className="btn btn-secondary" onClick={() => toggleWishlist({ id: photographer.id, type: 'photographer', title: photographer.name, image: photographer.avatar })}>
              {wishlisted ? 'Saved ♥' : 'Save'}
            </button>
            <a href={packages[0] ? `/photoshoots/${packages[0].id}` : '#'} className="btn btn-primary">
              Book This Photographer
            </a>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-block"><p className="stat-number">{photographer.experience}+</p><p>Years Experience</p></div>
          <div className="stat-block"><p className="stat-number">{formatShortNumber(photographer.completedShoots)}</p><p>Completed Shoots</p></div>
          <div className="stat-block"><p className="stat-number">{photographer.rating}</p><p>Average Rating</p></div>
          <div className="stat-block"><p className="stat-number">{formatCurrency(photographer.startingPrice)}</p><p>Starting Price</p></div>
        </div>

        <div className="detail-layout">
          <div>
            <div className="detail-section">
              <h3>Biography</h3>
              <p className="text-stone" style={{ lineHeight: 1.7 }}>{photographer.bio}</p>
            </div>

            <div className="detail-section">
              <h3>Photography Styles</h3>
              <div className="profile-tags">{photographer.styles.map((s) => <span key={s} className="badge">{s}</span>)}</div>
            </div>

            <div className="detail-section">
              <h3>Portfolio</h3>
              <div className="profile-portfolio-grid">
                {portfolioPhotos.map((p, i) => (
                  <button key={p.id} onClick={() => setLightboxIndex(i)}>
                    <img src={p.src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {packages.length > 0 && (
              <div className="detail-section">
                <h3>Packages by {photographer.name}</h3>
                <div className="grid grid-2">
                  {packages.map((s) => <PhotoshootCard key={s.id} shoot={s} />)}
                </div>
              </div>
            )}

            <div className="detail-section">
              <h3>Reviews ({reviews.length})</h3>
              <div className="grid grid-3">
                {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
            </div>
          </div>

          <div>
            <div className="card profile-side-card">
              <h4>Equipment</h4>
              <div className="equipment-list">{photographer.equipment.map((e) => <span key={e} className="badge"><Camera size={12} /> {e}</span>)}</div>
            </div>
            <div className="card profile-side-card">
              <h4>Locations Served</h4>
              <div className="locations-list">{photographer.locationsServed.map((l) => <span key={l} className="badge"><MapPin size={12} /> {l}</span>)}</div>
            </div>
            <div className="card profile-side-card">
              <h4>Connect</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <a href={photographer.social.instagram} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                  <InstagramIcon size={14} /> Instagram
                </a>
                <a href={photographer.social.website} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm">
                  <Globe size={14} /> Website
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <ImageGallery photos={portfolioPhotos} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
}
