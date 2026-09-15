import { useState, useMemo, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { photoshoots } from '../data/photoshoots';
import { photographers } from '../data/photographers';
import { galleryPhotos } from '../data/gallery';
import { digitalPhotos, printProducts } from '../data/products';

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    return {
      photoshoots: photoshoots.filter((p) => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 4),
      photographers: photographers.filter((p) => p.name.toLowerCase().includes(q) || p.specialization.toLowerCase().includes(q)).slice(0, 4),
      gallery: galleryPhotos.filter((g) => g.title.toLowerCase().includes(q) || g.category.toLowerCase().includes(q)).slice(0, 4),
      products: [...digitalPhotos, ...printProducts]
        .filter((p) => (p.title || p.name).toLowerCase().includes(q))
        .slice(0, 4),
    };
  }, [query]);

  const hasResults = results && Object.values(results).some((arr) => arr.length > 0);

  if (!open) return null;

  return createPortal(
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Site search">
      <div className="search-overlay-bar container">
        <Search size={20} />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search photographers, photoshoots, gallery, prints…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn-icon" onClick={onClose} aria-label="Close search">
          <X size={18} />
        </button>
      </div>
      <div className="search-overlay-body container">
        {!results && (
          <p className="text-stone">Start typing to search across LUMORA — photographers, photoshoots, prints, and more.</p>
        )}
        {results && !hasResults && <p className="text-stone">No results found for “{query}”.</p>}
        {results && hasResults && (
          <div className="search-results">
            {results.photoshoots.length > 0 && (
              <div className="search-result-group">
                <h4>Photoshoots</h4>
                {results.photoshoots.map((p) => (
                  <Link key={p.id} to={`/photoshoots/${p.id}`} onClick={onClose} className="search-result-row">
                    <img src={p.coverImage} alt="" />
                    <span>{p.title}</span>
                  </Link>
                ))}
              </div>
            )}
            {results.photographers.length > 0 && (
              <div className="search-result-group">
                <h4>Photographers</h4>
                {results.photographers.map((p) => (
                  <Link key={p.id} to={`/photographers/${p.id}`} onClick={onClose} className="search-result-row">
                    <img src={p.avatar} alt="" />
                    <span>{p.name}</span>
                  </Link>
                ))}
              </div>
            )}
            {results.gallery.length > 0 && (
              <div className="search-result-group">
                <h4>Gallery</h4>
                {results.gallery.map((g) => (
                  <Link key={g.id} to="/gallery" onClick={onClose} className="search-result-row">
                    <img src={g.src} alt="" />
                    <span>{g.title}</span>
                  </Link>
                ))}
              </div>
            )}
            {results.products.length > 0 && (
              <div className="search-result-group">
                <h4>Store</h4>
                {results.products.map((p) => (
                  <Link
                    key={p.id}
                    to={p.type === 'print' ? `/prints/${p.id}` : `/digital-store/${p.id}`}
                    onClick={onClose}
                    className="search-result-row"
                  >
                    <img src={p.image} alt="" />
                    <span>{p.title || p.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
