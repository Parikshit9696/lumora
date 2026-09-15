import { SlidersHorizontal, X } from 'lucide-react';

export default function FilterPanel({ title = 'Filters', sections, onReset, open, onClose }) {
  return (
    <>
      <aside className={`filter-panel ${open ? 'open' : ''}`}>
        <div className="filter-panel-head">
          <h4><SlidersHorizontal size={16} /> {title}</h4>
          <div className="filter-panel-head-actions">
            <button className="btn-ghost btn-sm" onClick={onReset}>Reset</button>
            <button className="btn-icon filter-panel-close" onClick={onClose} aria-label="Close filters">
              <X size={16} />
            </button>
          </div>
        </div>
        {sections.map((section) => (
          <div key={section.title} className="filter-section">
            <h5>{section.title}</h5>
            {section.type === 'chips' && (
              <div className="filter-chip-group">
                {section.options.map((opt) => (
                  <button
                    key={opt.value}
                    className={`chip ${section.value === opt.value ? 'active' : ''}`}
                    onClick={() => section.onChange(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            {section.type === 'checkbox' && (
              <div className="filter-checkbox-group">
                {section.options.map((opt) => (
                  <label key={opt.value} className="filter-checkbox">
                    <input
                      type="checkbox"
                      checked={section.value.includes(opt.value)}
                      onChange={() => section.onChange(opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            )}
            {section.type === 'range' && (
              <div className="filter-range">
                <input
                  type="range"
                  min={section.min}
                  max={section.max}
                  step={section.step || 1}
                  value={section.value}
                  onChange={(e) => section.onChange(Number(e.target.value))}
                />
                <span className="text-stone">{section.formatValue ? section.formatValue(section.value) : section.value}</span>
              </div>
            )}
          </div>
        ))}
      </aside>
      {open && <div className="filter-panel-scrim" onClick={onClose} />}
    </>
  );
}
