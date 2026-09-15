import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, UserSearch } from 'lucide-react';
import PhotographerCard from '../components/PhotographerCard';
import FilterPanel from '../components/FilterPanel';
import EmptyState from '../components/EmptyState';
import { photographers } from '../data/photographers';
import { locationsList } from '../data/categories';
import { formatCurrency } from '../utils/formatters';

const specializations = ['Wedding', 'Portrait', 'Fashion', 'Travel', 'Product', 'Maternity', 'Corporate', 'Architecture', 'Events'];

export default function Photographers() {
  const [query, setQuery] = useState('');
  const [specialization, setSpecialization] = useState('All');
  const [location, setLocation] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(30000);
  const [minExperience, setMinExperience] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    return photographers.filter((p) => {
      if (specialization !== 'All' && p.specialization !== specialization) return false;
      if (location !== 'All' && p.city !== location) return false;
      if (Number(p.rating) < minRating) return false;
      if (p.startingPrice > maxPrice) return false;
      if (p.experience < minExperience) return false;
      if (query.trim() && !p.name.toLowerCase().includes(query.trim().toLowerCase())) return false;
      return true;
    });
  }, [specialization, location, minRating, maxPrice, minExperience, query]);

  const resetFilters = () => {
    setSpecialization('All'); setLocation('All'); setMinRating(0); setMaxPrice(30000); setMinExperience(0);
  };

  const sections = [
    {
      title: 'Specialization',
      type: 'chips',
      value: specialization,
      onChange: setSpecialization,
      options: [{ label: 'All', value: 'All' }, ...specializations.map((s) => ({ label: s, value: s }))],
    },
    {
      title: 'Location',
      type: 'chips',
      value: location,
      onChange: setLocation,
      options: [{ label: 'All', value: 'All' }, ...locationsList.map((l) => ({ label: l, value: l }))],
    },
    {
      title: 'Minimum rating',
      type: 'range',
      value: minRating,
      min: 0,
      max: 5,
      step: 0.5,
      formatValue: (v) => `${v}★`,
      onChange: setMinRating,
    },
    {
      title: 'Max starting price',
      type: 'range',
      value: maxPrice,
      min: 5000,
      max: 30000,
      step: 1000,
      formatValue: formatCurrency,
      onChange: setMaxPrice,
    },
    {
      title: 'Min experience (years)',
      type: 'range',
      value: minExperience,
      min: 0,
      max: 12,
      step: 1,
      formatValue: (v) => `${v}+ yrs`,
      onChange: setMinExperience,
    },
  ];

  return (
    <div className="fade-in">
      <div className="simple-hero">
        <div className="container">
          <h1>Meet Our Photographers.</h1>
          <p>A curated roster of professionals across India — every portfolio vetted before it ever reaches LUMORA.</p>
        </div>
      </div>

      <div className="section section--tight">
        <div className="container">
          <div className="page-toolbar">
            <div className="search-input">
              <Search size={16} />
              <input type="text" placeholder="Search photographers…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <button className="btn btn-secondary btn-sm filter-toggle-btn" onClick={() => setFiltersOpen(true)}>
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>

          <div className="browse-layout">
            <FilterPanel sections={sections} onReset={resetFilters} open={filtersOpen} onClose={() => setFiltersOpen(false)} />
            <div className="browse-results">
              <p className="results-count">{results.length} photographers found</p>
              {results.length === 0 ? (
                <EmptyState icon={UserSearch} title="No photographers match" message="Try widening your filters to see more results." actionLabel="Reset Filters" onAction={resetFilters} />
              ) : (
                <div className="grid grid-3">
                  {results.map((p) => <PhotographerCard key={p.id} photographer={p} />)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
