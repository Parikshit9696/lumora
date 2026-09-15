import { useState } from 'react';
import '../styles/locations.css';
import { MapPin, Sun, IndianRupee, Camera } from 'lucide-react';
import { photoLocations } from '../data/locations';

export default function Locations() {
  const [active, setActive] = useState(photoLocations[0].id);
  const activeLocation = photoLocations.find((l) => l.id === active);

  return (
    <div className="fade-in">
      <div className="simple-hero">
        <div className="container">
          <h1>Location Explorer.</h1>
          <p>Discover the best photography backdrops across India, with season and cost guidance from our photographer community.</p>
        </div>
      </div>

      <div className="section section--tight">
        <div className="container">
          <div className="mock-map">
            {photoLocations.map((loc) => (
              <button
                key={loc.id}
                className="map-pin"
                style={{ top: loc.coords.top, left: loc.coords.left }}
                onClick={() => setActive(loc.id)}
              >
                <span className="map-pin-label">{loc.city}</span>
                <span className="map-pin-dot" style={{ background: active === loc.id ? 'var(--ink)' : 'var(--bronze)' }} />
              </button>
            ))}
          </div>

          {activeLocation && (
            <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: 56, overflow: 'hidden' }}>
              <img src={activeLocation.image} alt={activeLocation.city} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 260 }} />
              <div style={{ padding: 32 }}>
                <h2 style={{ fontSize: 24, marginBottom: 16 }}><MapPin size={18} style={{ verticalAlign: '-2px' }} /> {activeLocation.city}</h2>
                <p className="text-stone" style={{ marginBottom: 6 }}><Camera size={13} /> Best for: {activeLocation.style}</p>
                <p className="text-stone" style={{ marginBottom: 6 }}><Sun size={13} /> Best time: {activeLocation.bestTime}</p>
                <p className="text-stone" style={{ marginBottom: 16 }}><IndianRupee size={13} /> Approx. cost: {activeLocation.approxCost}</p>
                <p style={{ fontSize: 13.5, color: 'var(--charcoal)' }}>Popular photographers: {activeLocation.popularPhotographers.join(', ')}</p>
              </div>
            </div>
          )}

          <h3 style={{ fontSize: 20, marginBottom: 24 }}>All Locations</h3>
          <div className="location-card-grid">
            {photoLocations.map((loc) => (
              <div key={loc.id} className="card" onClick={() => setActive(loc.id)} style={{ cursor: 'pointer' }}>
                <img src={loc.image} alt={loc.city} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
                <div className="location-card-body">
                  <h4 style={{ fontSize: 16, marginBottom: 8 }}>{loc.city}</h4>
                  <div className="location-fact-row"><span>Style</span><span>{loc.style}</span></div>
                  <div className="location-fact-row"><span>Best time</span><span>{loc.bestTime}</span></div>
                  <div className="location-fact-row"><span>Cost</span><span>{loc.approxCost}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
