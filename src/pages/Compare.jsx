import { Link } from 'react-router-dom';
import { Scale, X } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { useCompare } from '../context/CompareContext';
import { getPhotoshootById } from '../data/photoshoots';
import { formatCurrency } from '../utils/formatters';

const rows = [
  { label: 'Price', get: (s) => formatCurrency(s.price) },
  { label: 'Duration', get: (s) => s.duration },
  { label: 'Edited Photos', get: (s) => s.editedPhotos },
  { label: 'Raw Files', get: (s) => (s.rawFilesIncluded ? 'Included' : 'Add-on') },
  { label: 'Delivery Time', get: (s) => s.deliveryTime },
  { label: 'Photographer', get: (s) => s.photographerName },
  { label: 'Rating', get: (s) => `${s.rating} (${s.reviewCount})` },
  { label: 'Location', get: (s) => s.location },
  { label: 'Style', get: (s) => s.style },
  { label: 'Add-ons available', get: (s) => s.addons.length },
];

export default function Compare() {
  const { compareIds, toggleCompare, clearCompare } = useCompare();
  const shoots = compareIds.map(getPhotoshootById).filter(Boolean);

  if (shoots.length === 0) {
    return (
      <div className="section">
        <div className="container">
          <EmptyState icon={Scale} title="Nothing to compare yet" message="Select up to 3 photoshoots from Explore or the Marketplace using the compare icon." actionLabel="Browse Photoshoots" actionTo="/photoshoots" />
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <div className="section-head">
          <h1 className="section-title">Compare Photoshoots</h1>
          <button className="btn btn-secondary btn-sm" onClick={clearCompare}>Clear All</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 14, borderBottom: '1px solid var(--line)' }}></th>
                {shoots.map((s) => (
                  <th key={s.id} style={{ padding: 14, borderBottom: '1px solid var(--line)', minWidth: 220 }}>
                    <img src={s.coverImage} alt={s.title} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: 10 }} />
                    <Link to={`/photoshoots/${s.id}`} style={{ fontFamily: 'var(--font-display)', fontSize: 16 }}>{s.title}</Link>
                    <div>
                      <button className="btn-ghost btn-sm" onClick={() => toggleCompare(s.id)}><X size={12} /> Remove</button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td style={{ padding: 14, borderBottom: '1px solid var(--line)', color: 'var(--stone)', fontSize: 13.5, fontWeight: 600 }}>{row.label}</td>
                  {shoots.map((s) => (
                    <td key={s.id} style={{ padding: 14, borderBottom: '1px solid var(--line)', textAlign: 'center', fontSize: 14 }}>{row.get(s)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
