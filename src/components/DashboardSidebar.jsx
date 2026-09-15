import { NavLink } from 'react-router-dom';
import { LayoutGrid, Calendar, Heart, FolderHeart, Bell, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/profile', label: 'Overview', icon: LayoutGrid },
  { to: '/bookings', label: 'Bookings', icon: Calendar },
  { to: '/wishlist', label: 'Wishlist', icon: Heart },
  { to: '/collections', label: 'Collections', icon: FolderHeart },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar() {
  const { user } = useAuth();
  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-user">
        <img src={user?.avatar || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop'} alt="" />
        <div>
          <p className="dashboard-user-name">{user?.name}</p>
          <p className="dashboard-user-email">{user?.email}</p>
        </div>
      </div>
      <nav className="dashboard-nav">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')} end>
            <link.icon size={16} /> {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
