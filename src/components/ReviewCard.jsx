import { BadgeCheck } from 'lucide-react';
import Rating from './Rating';
import { formatDate } from '../utils/formatters';

export default function ReviewCard({ review }) {
  return (
    <div className="card review-card">
      <div className="review-card-head">
        <img src={review.avatar} alt="" className="review-card-avatar" />
        <div>
          <p className="review-card-name">{review.name}</p>
          {review.date && <p className="text-stone review-card-date">{formatDate(review.date)}</p>}
        </div>
        {review.verified && (
          <span className="badge badge-success review-card-verified">
            <BadgeCheck size={13} /> Verified booking
          </span>
        )}
      </div>
      <Rating value={review.rating} showValue={false} size={13} />
      <p className="review-card-text">{review.text}</p>
    </div>
  );
}
