import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';
import { digitalPhotos } from '../data/products';

const categories = ['All', 'Nature', 'Architecture', 'Portrait', 'Fashion', 'Travel', 'Abstract', 'Wedding', 'Lifestyle', 'Business'];

export default function DigitalStore() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return digitalPhotos.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (query.trim() && !p.title.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [category, query]);

  return (
    <div className="fade-in">
      <div className="simple-hero">
        <div className="container">
          <h1>Digital Photo Store.</h1>
          <p>License stunning photography instantly — personal, editorial, or commercial use, delivered digitally.</p>
        </div>
      </div>
      <div className="section section--tight">
        <div className="container">
          <div className="page-toolbar">
            <div className="search-input">
              <Search size={16} />
              <input type="text" placeholder="Search digital photographs…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
          </div>
          <div className="filter-chip-group" style={{ marginBottom: 32 }}>
            {categories.map((c) => (
              <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <EmptyState title="No photographs found" message="Try a different category or search term." />
          ) : (
            <div className="grid grid-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
