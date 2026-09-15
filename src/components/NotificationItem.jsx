import { Bell, Calendar, Package, Sparkles, Tag, Trash2 } from 'lucide-react';
import { timeAgo } from '../utils/formatters';

const iconFor = {
  booking: Calendar,
  order: Package,
  update: Sparkles,
  price: Tag,
  info: Bell,
};

export default function NotificationItem({ notification, onRead, onDelete }) {
  const Icon = iconFor[notification.type] || Bell;
  return (
    <div className={`notification-item ${notification.read ? '' : 'unread'}`} onClick={() => onRead(notification.id)}>
      <div className="notification-icon">
        <Icon size={17} />
      </div>
      <div className="notification-content">
        <p className="notification-title">{notification.title}</p>
        <p className="notification-message">{notification.message}</p>
        <p className="text-stone notification-time">{timeAgo(notification.createdAt)}</p>
      </div>
      <button
        className="btn-icon notification-delete"
        aria-label="Delete notification"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(notification.id);
        }}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
