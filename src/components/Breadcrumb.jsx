import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ trail = [] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {trail.map((item, i) => (
        <span key={i} className="breadcrumb-item">
          {i > 0 && <ChevronRight size={13} />}
          {item.to ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}
