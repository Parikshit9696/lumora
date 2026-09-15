import { Link } from 'react-router-dom';

export default function EmptyState({ icon: Icon, title, message, actionLabel, actionTo, onAction }) {
  return (
    <div className="empty-state fade-in">
      {Icon && (
        <div className="empty-state-icon">
          <Icon size={30} strokeWidth={1.4} />
        </div>
      )}
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="btn btn-primary btn-sm">
          {actionLabel}
        </Link>
      )}
      {actionLabel && onAction && !actionTo && (
        <button className="btn btn-primary btn-sm" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
