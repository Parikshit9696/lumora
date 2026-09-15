import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, Clock, Image as ImageIcon, Check, X as XIcon, ChevronDown, ShieldCheck } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Rating from '../components/Rating';
import BookingWidget from '../components/BookingWidget';
import ReviewCard from '../components/ReviewCard';
import ImageGallery from '../components/ImageGallery';
import PhotoshootCard from '../components/PhotoshootCard';
import { getPhotoshootById, photoshoots } from '../data/photoshoots';
import { seedReviewsFor } from '../data/reviews';

export default function PhotoshootDetails() {
  const { id } = useParams();
  const shoot = getPhotoshootById(id);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  if (!shoot) return <Navigate to="/photoshoots" replace />;

  const galleryPhotos = shoot.gallery.map((src, i) => ({ id: `${shoot.id}-${i}`, src, title: shoot.title }));
  const reviews = seedReviewsFor(shoot.id, shoot.title);
  const related = photoshoots.filter((s) => s.category === shoot.category && s.id !== shoot.id).slice(0, 3);

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <Breadcrumb
          trail={[
            { label: 'Home', to: '/' },
            { label: 'Photoshoots', to: '/photoshoots' },
            { label: shoot.title },
          ]}
        />

        <div className="detail-gallery">
          <button onClick={() => setLightboxIndex(0)}>
            <img src={galleryPhotos[0].src} alt={shoot.title} />
          </button>
          {galleryPhotos.slice(1, 5).map((p, i) => (
            <button key={p.id} onClick={() => setLightboxIndex(i + 1)}>
              <img src={p.src} alt="" />
            </button>
          ))}
        </div>

        <div className="detail-layout">
          <div>
            <div className="detail-title-row">
              <div>
                <span className="badge">{shoot.category}</span>
                <h1>{shoot.title}</h1>
                <Rating value={shoot.rating} count={shoot.reviewCount} />
              </div>
            </div>

            <Link to={`/photographers/${shoot.photographerId}`} className="detail-photographer-strip">
              <img src={shoot.photographerAvatar} alt={shoot.photographerName} />
              <div>
                <p className="name">{shoot.photographerName}</p>
                <p className="text-stone" style={{ fontSize: 13 }}>View full portfolio</p>
              </div>
            </Link>

            <div className="detail-meta-grid">
              <div className="detail-meta-item"><span>Location</span><strong><MapPin size={13} /> {shoot.location}</strong></div>
              <div className="detail-meta-item"><span>Duration</span><strong><Clock size={13} /> {shoot.duration}</strong></div>
              <div className="detail-meta-item"><span>Edited Photos</span><strong><ImageIcon size={13} /> {shoot.editedPhotos}</strong></div>
              <div className="detail-meta-item"><span>Delivery</span><strong>{shoot.deliveryTime}</strong></div>
            </div>

            <div className="detail-section">
              <h3>About this session</h3>
              <p className="text-stone" style={{ lineHeight: 1.7 }}>
                A {shoot.style.toLowerCase()}-style {shoot.category.toLowerCase()} session shot by {shoot.photographerName}, delivered as {shoot.editedPhotos} professionally
                edited photographs within {shoot.deliveryTime.toLowerCase()}. {shoot.rawFilesIncluded ? 'Raw files are included with this package.' : 'Raw files can be added as an add-on.'}
              </p>
              <div className="profile-tags" style={{ marginTop: 14 }}>
                {shoot.equipment.map((e) => <span key={e} className="badge">{e}</span>)}
              </div>
            </div>

            <div className="detail-section">
              <h3>What's Included</h3>
              <ul className="included-list">
                {shoot.included.map((item) => (
                  <li key={item}><Check size={16} className="text-bronze" /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h3>What's Not Included</h3>
              <ul className="excluded-list">
                {shoot.excluded.map((item) => (
                  <li key={item}><XIcon size={16} /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h3><ShieldCheck size={18} style={{ verticalAlign: '-3px' }} /> Cancellation Policy</h3>
              <p className="text-stone" style={{ fontSize: 14.5, lineHeight: 1.7 }}>{shoot.cancellationPolicy}</p>
            </div>

            <div className="detail-section">
              <h3>Frequently Asked Questions</h3>
              {shoot.faqs.map((faq, i) => (
                <div key={faq.q} className="faq-item">
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    {faq.q}
                    <ChevronDown size={16} style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>
                  {openFaq === i && <p className="faq-answer">{faq.a}</p>}
                </div>
              ))}
            </div>

            <div className="detail-section">
              <h3>Reviews ({reviews.length})</h3>
              <div className="grid grid-3">
                {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
              </div>
            </div>
          </div>

          <BookingWidget shoot={shoot} />
        </div>

        {related.length > 0 && (
          <div className="detail-section" style={{ marginTop: 60 }}>
            <h3>You might also like</h3>
            <div className="grid grid-3">
              {related.map((s) => <PhotoshootCard key={s.id} shoot={s} />)}
            </div>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <ImageGallery photos={galleryPhotos} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
}
