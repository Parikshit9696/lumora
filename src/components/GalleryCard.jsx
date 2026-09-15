import { Heart, Share2, Bookmark } from 'lucide-react';

export default function GalleryCard({ photo, onOpen, liked, onLike, onSave }) {
  return (
    <figure className="gallery-card" onClick={() => onOpen(photo)}>
      <img src={photo.src} alt={photo.title} loading="lazy" />
      <div className="gallery-card-overlay">
        <div className="gallery-card-info">
          <p className="gallery-card-title">{photo.title}</p>
          <p className="gallery-card-photographer">{photo.photographerName}</p>
        </div>
        <div className="gallery-card-actions">
          <button
            aria-label="Like photo"
            className={liked ? 'active' : ''}
            onClick={(e) => {
              e.stopPropagation();
              onLike(photo);
            }}
          >
            <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button
            aria-label="Save to collection"
            onClick={(e) => {
              e.stopPropagation();
              onSave(photo);
            }}
          >
            <Bookmark size={16} />
          </button>
          <button
            aria-label="Share photo"
            onClick={(e) => {
              e.stopPropagation();
              onSave(photo, true);
            }}
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>
    </figure>
  );
}
