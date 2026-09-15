import { Link } from 'react-router-dom';
import { MapPin, BadgeCheck } from 'lucide-react';
import Rating from './Rating';
import { formatCurrency } from '../utils/formatters';

export default function PhotographerCard({ photographer }) {
  return (
    <Link to={`/photographers/${photographer.id}`} className="card photographer-card">
      <div className="photographer-card-cover">
        <img src={photographer.cover} alt="" loading="lazy" />
        <img src={photographer.avatar} alt={photographer.name} className="photographer-card-avatar" loading="lazy" />
      </div>
      <div className="photographer-card-body">
        <div className="photographer-card-name">
          <h4>{photographer.name}</h4>
          {photographer.availability === 'Available' && <BadgeCheck size={16} className="text-bronze" />}
        </div>
        <p className="text-bronze photographer-card-spec">{photographer.specialization} Photographer</p>
        <p className="photographer-card-location"><MapPin size={13} /> {photographer.location}</p>
        <Rating value={photographer.rating} count={photographer.reviewCount} size={12} />
        <div className="photographer-card-footer">
          <span>{photographer.experience}+ yrs experience</span>
          <span className="photographer-card-price">from {formatCurrency(photographer.startingPrice)}</span>
        </div>
        <span className={`badge ${photographer.availability === 'Available' ? 'badge-success' : 'badge-warning'}`}>
          {photographer.availability}
        </span>
      </div>
    </Link>
  );
}
