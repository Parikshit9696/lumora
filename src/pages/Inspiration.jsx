import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { articles } from '../data/articles';
import { formatDate } from '../utils/formatters';

const categories = ['All', 'Portrait', 'Wedding', 'Fashion', 'Guide', 'Travel', 'Corporate'];

export default function Inspiration() {
  const [category, setCategory] = useState('All');
  const filtered = category === 'All' ? articles : articles.filter((a) => a.category === category);
  const [featured, ...rest] = filtered;

  return (
    <div className="fade-in">
      <div className="simple-hero">
        <div className="container">
          <h1>Inspiration & Guides.</h1>
          <p>Editorial ideas, preparation guides, and location notes from the LUMORA photography community.</p>
        </div>
      </div>

      <div className="section section--tight">
        <div className="container">
          <div className="filter-chip-group" style={{ marginBottom: 40 }}>
            {categories.map((c) => (
              <button key={c} className={`chip ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
            ))}
          </div>

          {featured && (
            <Link to={`/inspiration/${featured.id}`} className="card" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', marginBottom: 40, overflow: 'hidden' }}>
              <img src={featured.image} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 280 }} />
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span className="badge" style={{ width: 'fit-content', marginBottom: 14 }}>{featured.category}</span>
                <h2 style={{ fontSize: 28, marginBottom: 12 }}>{featured.title}</h2>
                <p className="text-stone" style={{ marginBottom: 16 }}>{featured.preview}</p>
                <p className="text-stone" style={{ fontSize: 13 }}>{featured.author} · <Clock size={12} style={{ verticalAlign: '-1px' }} /> {featured.readTime} · {formatDate(featured.date)}</p>
              </div>
            </Link>
          )}

          <div className="grid grid-3">
            {rest.map((article) => (
              <Link key={article.id} to={`/inspiration/${article.id}`} className="card">
                <img src={article.image} alt={article.title} style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} />
                <div style={{ padding: 20 }}>
                  <span className="badge" style={{ marginBottom: 10 }}>{article.category}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, margin: '4px 0 8px' }}>{article.title}</h3>
                  <p className="text-stone" style={{ fontSize: 13.5, marginBottom: 12 }}>{article.preview}</p>
                  <p className="text-stone" style={{ fontSize: 12.5 }}>{article.author} · {article.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
