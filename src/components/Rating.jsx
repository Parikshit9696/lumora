import { Star } from 'lucide-react';

export default function Rating({ value = 0, count, size = 14, showValue = true }) {
  const rounded = Math.round(Number(value) * 2) / 2;
  return (
    <span className="rating" aria-label={`Rated ${value} out of 5`}>
      <span className="rating-stars" style={{ '--star-size': `${size}px` }}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            fill={n <= rounded ? 'currentColor' : 'none'}
            strokeWidth={1.5}
            className={n <= rounded ? 'star-filled' : 'star-empty'}
          />
        ))}
      </span>
      {showValue && <span className="rating-value">{Number(value).toFixed(1)}</span>}
      {count !== undefined && <span className="rating-count">({count})</span>}
    </span>
  );
}
