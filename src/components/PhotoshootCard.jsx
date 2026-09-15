import { Link } from 'react-router-dom';
import { Heart, MapPin, Clock, Scale } from 'lucide-react';
import Rating from './Rating';
import { useWishlist } from '../context/WishlistContext';
import { useCompare } from '../context/CompareContext';
import { formatCurrency } from '../utils/formatters';

export default function PhotoshootCard({ shoot }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isComparing, toggleCompare, maxReached } = useCompare();
  const wishlisted = isWishlisted(shoot.id);
  const comparing = isComparing(shoot.id);

  return (
    <div className="card photoshoot-card">
      <div className="photoshoot-card-media">
        <Link to={`/photoshoots/${shoot.id}`}>
          <img src={shoot.coverImage} alt={shoot.title} loading="lazy" />
        </Link>
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={() => toggleWishlist({ id: shoot.id, type: 'photoshoot', title: shoot.title, image: shoot.coverImage, price: shoot.price })}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={17} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
        <span className="badge photoshoot-card-badge">{shoot.category}</span>
      </div>
      <div className="photoshoot-card-body">
        <Link to={`/photoshoots/${shoot.id}`} className="photoshoot-card-title">
          {shoot.title}
        </Link>
        <p className="photoshoot-card-photographer">by {shoot.photographerName}</p>
        <div className="photoshoot-card-meta">
          <span><MapPin size={13} /> {shoot.location}</span>
          <span><Clock size={13} /> {shoot.duration}</span>
        </div>
        <p className="photoshoot-card-photos">{shoot.editedPhotos} edited photos</p>
        <Rating value={shoot.rating} count={shoot.reviewCount} />
        <div className="photoshoot-card-footer">
          <div>
            <span className="text-stone" style={{ fontSize: 12 }}>Starting at</span>
            <p className="photoshoot-card-price">{formatCurrency(shoot.price)}</p>
          </div>
          <div className="photoshoot-card-actions">
            <button
              className={`btn-icon compare-toggle ${comparing ? 'active' : ''}`}
              title="Compare"
              disabled={!comparing && maxReached}
              onClick={() => toggleCompare(shoot.id)}
            >
              <Scale size={15} />
            </button>
            <Link to={`/photoshoots/${shoot.id}`} className="btn btn-primary btn-sm">
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
