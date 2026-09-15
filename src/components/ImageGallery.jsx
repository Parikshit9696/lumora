import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ZoomIn, Heart, Download, Share2 } from 'lucide-react';

export default function ImageGallery({ photos, startIndex = 0, onClose, onLike, likedIds = [] }) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [photos.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, next, prev]);

  const photo = photos[index];
  if (!photo) return null;

  return createPortal(
    <div className="lightbox">
      <div className="lightbox-topbar">
        <div>
          <p className="lightbox-title">{photo.title}</p>
          {photo.photographerName && <p className="lightbox-photographer">{photo.photographerName}</p>}
        </div>
        <div className="lightbox-actions">
          <button onClick={() => onLike?.(photo)} aria-label="Favorite">
            <Heart size={19} fill={likedIds.includes(photo.id) ? 'currentColor' : 'none'} />
          </button>
          <button onClick={() => setZoomed((z) => !z)} aria-label="Zoom">
            <ZoomIn size={19} />
          </button>
          <button aria-label="Download">
            <Download size={19} />
          </button>
          <button aria-label="Share">
            <Share2 size={19} />
          </button>
          <button onClick={onClose} aria-label="Close">
            <X size={22} />
          </button>
        </div>
      </div>
      <button className="lightbox-nav lightbox-prev" onClick={prev} aria-label="Previous image">
        <ChevronLeft size={26} />
      </button>
      <div className="lightbox-stage">
        <img src={photo.src} alt={photo.title} className={zoomed ? 'zoomed' : ''} />
      </div>
      <button className="lightbox-nav lightbox-next" onClick={next} aria-label="Next image">
        <ChevronRight size={26} />
      </button>
      <div className="lightbox-counter">
        {index + 1} / {photos.length}
      </div>
    </div>,
    document.body
  );
}
