import { Bell, CheckCheck } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import NotificationItem from '../components/NotificationItem';
import { useNotifications } from '../context/NotificationContext';

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = useNotifications();

  return (
    <div className="fade-in section section--tight">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="section-head">
          <div>
            <h1 className="section-title">Notifications</h1>
            {unreadCount > 0 && <p className="section-sub">{unreadCount} unread</p>}
          </div>
          {unreadCount > 0 && (
            <button className="btn btn-secondary btn-sm" onClick={markAllAsRead}><CheckCheck size={14} /> Mark all as read</button>
          )}
        </div>

        {notifications.length === 0 ? (
          <EmptyState icon={Bell} title="You're all caught up" message="Booking updates, order status, and offers will show up here." />
        ) : (
          notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onRead={markAsRead} onDelete={deleteNotification} />
          ))
        )}
      </div>
    </div>
  );
}
