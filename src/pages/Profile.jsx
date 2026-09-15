import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Package, Heart, IndianRupee, Star } from 'lucide-react';
import DashboardSidebar from '../components/DashboardSidebar';
import EmptyState from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { loadJSON, STORAGE_KEYS } from '../utils/storage';

const tabs = ['Overview', 'Edit Profile', 'Orders', 'My Reviews'];

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { bookings, orders } = useBookings();
  const { count: wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState('Overview');
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', city: user?.city || '' });
  const [saved, setSaved] = useState(false);

  const totalSpending = [...bookings, ...orders].reduce((sum, b) => sum + (b.amount || 0), 0);
  const completedShoots = bookings.filter((b) => b.status === 'Completed').length;
  const myReviews = loadJSON(STORAGE_KEYS.REVIEWS, []);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: 32 }}>My Account</h1>
        <div className="dashboard-layout">
          <DashboardSidebar />

          <div>
            <div className="tab-row">
              {tabs.map((t) => (
                <button key={t} className={activeTab === t ? 'active' : ''} onClick={() => setActiveTab(t)}>{t}</button>
              ))}
            </div>

            {activeTab === 'Overview' && (
              <>
                <div className="dashboard-stats">
                  <div className="card dashboard-stat-card"><Calendar size={18} className="text-bronze" /><p className="value">{bookings.length}</p><p className="label">Total Bookings</p></div>
                  <div className="card dashboard-stat-card"><Star size={18} className="text-bronze" /><p className="value">{completedShoots}</p><p className="label">Completed Shoots</p></div>
                  <div className="card dashboard-stat-card"><Package size={18} className="text-bronze" /><p className="value">{orders.length}</p><p className="label">Orders</p></div>
                  <div className="card dashboard-stat-card"><Heart size={18} className="text-bronze" /><p className="value">{wishlistCount}</p><p className="label">Wishlist Items</p></div>
                </div>
                <div className="card" style={{ padding: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: 17 }}><IndianRupee size={16} style={{ verticalAlign: '-2px' }} /> Total Spending</h3>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 24 }}>{formatCurrency(totalSpending)}</p>
                  </div>
                </div>
                <h3 style={{ fontSize: 17, margin: '32px 0 16px' }}>Recent Bookings</h3>
                {bookings.slice(0, 3).map((b) => (
                  <Link key={b.id} to={`/bookings/${b.id}`} className="card" style={{ display: 'flex', gap: 16, padding: 16, marginBottom: 10, alignItems: 'center' }}>
                    <img src={b.image} alt="" style={{ width: 56, height: 56, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 600, fontSize: 14 }}>{b.photoshootTitle}</p>
                      <p className="text-stone" style={{ fontSize: 12.5 }}>{formatDate(b.date)}</p>
                    </div>
                    <span className="badge">{b.status}</span>
                  </Link>
                ))}
                {bookings.length === 0 && <p className="text-stone">No bookings yet.</p>}
              </>
            )}

            {activeTab === 'Edit Profile' && (
              <div className="card" style={{ padding: 28, maxWidth: 480 }}>
                <form onSubmit={handleSave}>
                  <div className="field">
                    <label>Full Name</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input value={user?.email} disabled />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>City</label>
                    <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                  </div>
                  {saved && <p style={{ color: 'var(--success)', marginBottom: 14 }}>Profile updated.</p>}
                  <button className="btn btn-primary" type="submit">Save Changes</button>
                </form>
              </div>
            )}

            {activeTab === 'Orders' && (
              orders.length === 0 ? (
                <EmptyState icon={Package} title="No orders yet" message="Prints and digital photos you purchase will appear here." actionLabel="Visit the Store" actionTo="/prints" />
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="card" style={{ padding: 20, marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <p style={{ fontWeight: 600 }}>#{order.id}</p>
                      <span className="badge badge-success">{order.status}</span>
                    </div>
                    <p className="text-stone" style={{ fontSize: 13 }}>{order.items.length} item(s) · {formatDate(order.createdAt)}</p>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginTop: 8 }}>{formatCurrency(order.amount)}</p>
                  </div>
                ))
              )
            )}

            {activeTab === 'My Reviews' && (
              myReviews.length === 0 ? (
                <EmptyState icon={Star} title="No reviews yet" message="Leave a review after a completed booking and it will show up here." />
              ) : (
                myReviews.map((r) => (
                  <div key={r.id} className="card" style={{ padding: 20, marginBottom: 14 }}>
                    <p style={{ marginBottom: 6 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
                    <p className="text-stone" style={{ fontSize: 14 }}>{r.text}</p>
                  </div>
                ))
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
