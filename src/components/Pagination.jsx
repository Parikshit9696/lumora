export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button className="btn btn-secondary btn-sm" disabled={page === 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      <div className="pagination-pages">
        {pages.map((p) => (
          <button
            key={p}
            className={`pagination-page ${p === page ? 'active' : ''}`}
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ))}
      </div>
      <button className="btn btn-secondary btn-sm" disabled={page === totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}

export function LoadMore({ onClick, hasMore, loading }) {
  if (!hasMore) return null;
  return (
    <div className="load-more">
      <button className="btn btn-secondary" onClick={onClick} disabled={loading}>
        {loading ? 'Loading…' : 'Load More'}
      </button>
    </div>
  );
}
