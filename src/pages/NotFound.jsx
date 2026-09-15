import { Link } from 'react-router-dom';
import { Camera, Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="fade-in section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <Camera size={44} className="text-bronze" style={{ marginBottom: 20 }} />
        <h1 style={{ fontSize: 'clamp(48px, 8vw, 96px)', marginBottom: 12 }}>404</h1>
        <h2 style={{ fontSize: 24, marginBottom: 12 }}>This frame doesn't exist.</h2>
        <p className="text-stone" style={{ marginBottom: 32, maxWidth: 420, marginInline: 'auto' }}>
          The page you're looking for may have been moved, renamed, or never developed. Let's get you back in focus.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary"><Home size={15} /> Back to Home</Link>
          <Link to="/explore" className="btn btn-secondary"><Compass size={15} /> Explore Photography</Link>
        </div>
      </div>
    </div>
  );
}
