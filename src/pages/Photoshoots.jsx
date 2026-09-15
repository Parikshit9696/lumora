import { useState, useMemo } from 'react';
import { Camera } from 'lucide-react';
import PhotoshootCard from '../components/PhotoshootCard';
import EmptyState from '../components/EmptyState';
import { photoshoots } from '../data/photoshoots';
import { photoshootCategoryTree } from '../data/categories';

const categoryMap = {
  Portrait: ['Portrait'],
  Fashion: ['Fashion'],
  Wedding: ['Wedding', 'Pre-Wedding'],
  Events: ['Events'],
  Lifestyle: ['Lifestyle', 'Maternity', 'Travel'],
};

export default function Photoshoots() {
  const [activeTab, setActiveTab] = useState('All');
  const [activeSub, setActiveSub] = useState('All');

  const currentTree = photoshootCategoryTree.find((t) => t.name === activeTab);

  const results = useMemo(() => {
    let list = photoshoots;
    if (activeTab !== 'All') {
      const allowed = categoryMap[activeTab] || [activeTab];
      list = list.filter((s) => allowed.includes(s.category));
    }
    if (activeSub !== 'All') {
      const keyword = activeSub.split(' ')[0].toLowerCase();
      list = list.filter((s) => s.title.toLowerCase().includes(keyword));
    }
    return list;
  }, [activeTab, activeSub]);

  return (
    <div className="fade-in">
      <div className="simple-hero">
        <div className="container">
          <h1>The Photoshoot Marketplace.</h1>
          <p>Every kind of session, organised for the way you actually search — by occasion, then by style.</p>
        </div>
      </div>

      <div className="section section--tight">
        <div className="container">
          <div className="tab-row">
            <button className={activeTab === 'All' ? 'active' : ''} onClick={() => { setActiveTab('All'); setActiveSub('All'); }}>
              All
            </button>
            {photoshootCategoryTree.map((cat) => (
              <button
                key={cat.name}
                className={activeTab === cat.name ? 'active' : ''}
                onClick={() => { setActiveTab(cat.name); setActiveSub('All'); }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {currentTree && (
            <div className="filter-chip-group" style={{ marginBottom: 36 }}>
              <button className={`chip ${activeSub === 'All' ? 'active' : ''}`} onClick={() => setActiveSub('All')}>All {currentTree.name}</button>
              {currentTree.subcategories.map((sub) => (
                <button key={sub} className={`chip ${activeSub === sub ? 'active' : ''}`} onClick={() => setActiveSub(sub)}>
                  {sub}
                </button>
              ))}
            </div>
          )}

          {results.length === 0 ? (
            <EmptyState icon={Camera} title="No packages here yet" message="Try another category — new packages are added every week." />
          ) : (
            <div className="grid grid-3">
              {results.map((shoot) => (
                <PhotoshootCard key={shoot.id} shoot={shoot} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
