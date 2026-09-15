import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Trash2 } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import Modal from '../components/Modal';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotifications } from '../context/NotificationContext';

export default function Settings() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const [prefs, setPrefs] = useState({ emailUpdates: true, bookingReminders: true, priceAlerts: false });
  const [passwordForm, setPasswordForm] = useState({ current: '', next: '' });
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const togglePref = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPasswordSaved(true);
    addNotification({ title: 'Password updated', message: 'Your password has been changed (simulated).', type: 'info' });
    setPasswordForm({ current: '', next: '' });
    setTimeout(() => setPasswordSaved(false), 2000);
  };

  const handleDeleteAccount = () => {
    logout();
    setDeleteOpen(false);
    navigate('/');
  };

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: 32 }}>Settings</h1>
        <div className="dashboard-layout">
          <DashboardSidebar />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 560 }}>
            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, marginBottom: 16 }}>Appearance</h3>
              <button className="btn btn-secondary" onClick={toggleTheme}>
                {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />} Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </button>
            </div>

            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, marginBottom: 16 }}>Notification Preferences</h3>
              {[
                { key: 'emailUpdates', label: 'Email updates about new photographers & packages' },
                { key: 'bookingReminders', label: 'Booking reminders' },
                { key: 'priceAlerts', label: 'Wishlist price alerts' },
              ].map((item) => (
                <label key={item.key} className="filter-checkbox" style={{ marginBottom: 12 }}>
                  <input type="checkbox" checked={prefs[item.key]} onChange={() => togglePref(item.key)} />
                  {item.label}
                </label>
              ))}
            </div>

            <div className="card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: 16, marginBottom: 16 }}>Change Password</h3>
              <form onSubmit={handlePasswordChange}>
                <div className="field">
                  <label>Current Password</label>
                  <input type="password" value={passwordForm.current} onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })} />
                </div>
                <div className="field">
                  <label>New Password</label>
                  <input type="password" value={passwordForm.next} onChange={(e) => setPasswordForm({ ...passwordForm, next: e.target.value })} />
                </div>
                {passwordSaved && <p style={{ color: 'var(--success)', marginBottom: 14 }}>Password updated.</p>}
                <button className="btn btn-primary btn-sm" type="submit">Update Password</button>
              </form>
            </div>

            <div className="card" style={{ padding: 24, borderColor: 'rgba(161,62,53,0.3)' }}>
              <h3 style={{ fontSize: 16, marginBottom: 10 }}>Delete Account</h3>
              <p className="text-stone" style={{ fontSize: 13.5, marginBottom: 16 }}>This will log you out and clear your session. Bookings and orders remain in this browser's storage.</p>
              <button className="btn btn-secondary btn-sm" onClick={() => setDeleteOpen(true)}>
                <Trash2 size={13} /> Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Account">
        <p className="text-stone" style={{ marginBottom: 20 }}>Are you sure you want to delete your account? This action cannot be undone.</p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => setDeleteOpen(false)}>Cancel</button>
          <button className="btn btn-primary" onClick={handleDeleteAccount}>Yes, Delete</button>
        </div>
      </Modal>
    </div>
  );
}
