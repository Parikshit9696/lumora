import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Grid2x2, List, SlidersHorizontal } from 'lucide-react';
import PhotoshootCard from '../components/PhotoshootCard';
import FilterPanel from '../components/FilterPanel';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';
import { photoshoots } from '../data/photoshoots';
import { categories, photographyStyles, locationsList } from '../data/categories';
import { formatCurrency } from '../utils/formatters';

const PAGE_SIZE = 9;

export default function Explore() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [locationsFilter, setLocationsFilter] = useState([]);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [style, setStyle] = useState('All');
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  const toggleLocation = (loc) => {
    setLocationsFilter((prev) => (prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]));
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = photoshoots.filter((s) => {
      if (category !== 'All' && s.category !== category) return false;
      if (style !== 'All' && s.style !== style) return false;
      if (s.price > maxPrice) return false;
      if (Number(s.rating) < minRating) return false;
      if (locationsFilter.length && !locationsFilter.includes(s.location)) return false;
      if (query.trim() && !s.title.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });

    switch (sort) {
      case 'newest': list = [...list].sort((a, b) => a.createdDaysAgo - b.createdDaysAgo); break;
      case 'rated': list = [...list].sort((a, b) => b.rating - a.rating); break;
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      default: list = [...list].sort((a, b) => b.popularity - a.popularity);
    }
    return list;
  }, [category, style, maxPrice, minRating, locationsFilter, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const resetFilters = () => {
    setCategory('All'); setLocationsFilter([]); setMaxPrice(50000); setMinRating(0); setStyle('All'); setPage(1);
  };

  const sections = [
    {
      title: 'Category',
      type: 'chips',
      value: category,
      onChange: (v) => { setCategory(v); setPage(1); },
      options: [{ label: 'All', value: 'All' }, ...categories.map((c) => ({ label: c.name, value: c.name }))],
    },
    {
      title: 'Style',
      type: 'chips',
      value: style,
      onChange: (v) => { setStyle(v); setPage(1); },
      options: [{ label: 'All', value: 'All' }, ...photographyStyles.map((s) => ({ label: s, value: s }))],
    },
    {
      title: 'Location',
      type: 'checkbox',
      value: locationsFilter,
      onChange: toggleLocation,
      options: locationsList.map((l) => ({ label: l, value: l })),
    },
    {
      title: 'Max price',
      type: 'range',
      value: maxPrice,
      min: 3000,
      max: 50000,
      step: 1000,
      formatValue: formatCurrency,
      onChange: (v) => { setMaxPrice(v); setPage(1); },
    },
    {
      title: 'Minimum rating',
      type: 'range',
      value: minRating,
      min: 0,
      max: 5,
      step: 0.5,
      formatValue: (v) => `${v}★`,
      onChange: (v) => { setMinRating(v); setPage(1); },
    },
  ];

  return (
    <div className="fade-in">
      <div className="simple-hero">
        <div className="container">
          <h1>Explore Photography.</h1>
          <p>Search and filter through every photoshoot on LUMORA to find the exact fit for your vision.</p>
        </div>
      </div>

      <div className="section section--tight">
        <div className="container">
          <div className="page-toolbar">
            <div className="search-input">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search photoshoots…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="rated">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <div className="view-toggle">
              <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="Grid view">
                <Grid2x2 size={16} />
              </button>
              <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view">
                <List size={16} />
              </button>
            </div>
            <button className="btn btn-secondary btn-sm filter-toggle-btn" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>

          <div className="browse-layout">
            <FilterPanel sections={sections} onReset={resetFilters} open={filtersOpen} onClose={() => setFiltersOpen(false)} />
            <div className="browse-results">
              <p className="results-count">{filtered.length} photoshoots found</p>
              {paged.length === 0 ? (
                <EmptyState
                  icon={Search}
                  title="No results found"
                  message="Try adjusting your filters or search terms to see more photoshoots."
                  actionLabel="Reset Filters"
                  onAction={resetFilters}
                />
              ) : (
                <div className={view === 'grid' ? 'grid grid-3' : 'grid'} style={view === 'list' ? { gridTemplateColumns: '1fr' } : undefined}>
                  {paged.map((shoot) => (
                    <PhotoshootCard key={shoot.id} shoot={shoot} />
                  ))}
                </div>
              )}
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
