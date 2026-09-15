export function SkeletonCard() {
  return (
    <div className="card skeleton-card">
      <div className="skeleton" style={{ aspectRatio: '4 / 5' }} />
      <div className="skeleton-card-body">
        <div className="skeleton" style={{ height: 14, width: '70%' }} />
        <div className="skeleton" style={{ height: 12, width: '45%' }} />
        <div className="skeleton" style={{ height: 12, width: '30%' }} />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, className = 'grid grid-3' }) {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonLine({ width = '100%', height = 14 }) {
  return <div className="skeleton" style={{ width, height }} />;
}

export function SkeletonImage({ aspect = '16 / 10' }) {
  return <div className="skeleton" style={{ aspectRatio: aspect, width: '100%' }} />;
}
