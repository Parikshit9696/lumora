import { useState, useMemo } from 'react';
import {
  LayoutGrid, Users, Camera, Image as ImageIcon, Package, Calendar, Star, Tag, Grid3x3, Bell, Settings as SettingsIcon,
  Plus, Trash2, Pencil, IndianRupee,
} from 'lucide-react';
import Modal from '../components/Modal';
import { photographers as seedPhotographers } from '../data/photographers';
import { photoshoots as seedPhotoshoots } from '../data/photoshoots';
import { galleryPhotos as seedGallery } from '../data/gallery';
import { printProducts, digitalPhotos } from '../data/products';
import { categories as seedCategories } from '../data/categories';
import { useBookings } from '../context/BookingContext';
import { useNotifications } from '../context/NotificationContext';
import { loadJSON, saveJSON } from '../utils/storage';
import { formatCurrency, formatDate } from '../utils/formatters';

const sections = [
  { key: 'overview', label: 'Overview', icon: LayoutGrid },
  { key: 'photographers', label: 'Photographers', icon: Camera },
  { key: 'users', label: 'Users', icon: Users },
  { key: 'photoshoots', label: 'Photoshoots', icon: Package },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'bookings', label: 'Bookings', icon: Calendar },
  { key: 'reviews', label: 'Reviews', icon: Star },
  { key: 'gallery', label: 'Gallery', icon: ImageIcon },
  { key: 'products', label: 'Products', icon: Tag },
  { key: 'categories', label: 'Categories', icon: Grid3x3 },
  { key: 'coupons', label: 'Coupons', icon: Tag },
  { key: 'notifications', label: 'Notifications', icon: Bell },
  { key: 'settings', label: 'Settings', icon: SettingsIcon },
];

const mockUsers = [
  { id: 'u1', name: 'Demo Explorer', email: 'demo@lumora.com', joined: '2025-11-02', bookings: 3 },
  { id: 'u2', name: 'Riya Sharma', email: 'riya.sharma@example.com', joined: '2025-12-14', bookings: 1 },
  { id: 'u3', name: 'Aman Gupta', email: 'aman.gupta@example.com', joined: '2026-01-05', bookings: 5 },
  { id: 'u4', name: 'Neha Joshi', email: 'neha.joshi@example.com', joined: '2026-02-20', bookings: 2 },
];

function useAdminCollection(storageKey, seed) {
  const [items, setItems] = useState(() => loadJSON(storageKey, seed));
  const persist = (next) => {
    setItems(next);
    saveJSON(storageKey, next);
  };
  const add = (item) => persist([{ ...item, id: item.id || `${storageKey}-${Date.now()}` }, ...items]);
  const remove = (id) => persist(items.filter((i) => i.id !== id));
  const update = (id, patch) => persist(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  return { items, add, remove, update };
}

export default function AdminDashboard() {
  const [active, setActive] = useState('overview');
  const { bookings, orders, updateBookingStatus } = useBookings();
  const { addNotification } = useNotifications();

  const photographers = useAdminCollection('admin-photographers', seedPhotographers);
  const photoshoots = useAdminCollection('admin-photoshoots', seedPhotoshoots);
  const gallery = useAdminCollection('admin-gallery', seedGallery);
  const products = useAdminCollection('admin-products', [...printProducts, ...digitalPhotos]);
  const categories = useAdminCollection('admin-categories', seedCategories);
  const coupons = useAdminCollection('admin-coupons', [
    { id: 'c1', code: 'LUMORA10', discount: '10%' },
    { id: 'c2', code: 'FIRSTSHOOT', discount: '15%' },
    { id: 'c3', code: 'WELCOME5', discount: '5%' },
  ]);
  const [reviews, setReviews] = useState(() => loadJSON('reviews', []));

  const [modal, setModal] = useState(null); // { type, entity }
  const [formValue, setFormValue] = useState('');

  const totalRevenue = [...bookings, ...orders].reduce((sum, b) => sum + (b.amount || 0), 0);
  const pendingBookings = bookings.filter((b) => b.status === 'Pending').length;

  const monthlyRevenue = useMemo(() => {
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    return months.map((m, i) => ({ month: m, value: 20000 + i * 8000 + (totalRevenue > 0 ? totalRevenue / 6 : 0) }));
  }, [totalRevenue]);
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.value));

  const approveReview = (id) => {
    const next = reviews.map((r) => (r.id === id ? { ...r, approved: true } : r));
    setReviews(next);
    saveJSON('reviews', next);
  };

  const openQuickAdd = (type) => {
    setFormValue('');
    setModal({ type });
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!formValue.trim()) return;
    if (modal.type === 'category') categories.add({ name: formValue, image: seedCategories[0].image, description: 'New category' });
    if (modal.type === 'coupon') coupons.add({ code: formValue.toUpperCase(), discount: '10%' });
    if (modal.type === 'gallery') gallery.add({ src: seedGallery[0].src, title: formValue, category: 'Trending', photographerName: 'LUMORA Team' });
    if (modal.type === 'notification') addNotification({ title: formValue, message: 'Sent by admin.', type: 'update' });
    setModal(null);
  };

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: 32 }}>Admin Dashboard</h1>
        <div className="dashboard-layout">
          <aside className="dashboard-sidebar">
            <nav className="dashboard-nav">
              {sections.map((s) => (
                <button key={s.key} className={active === s.key ? 'active' : ''} onClick={() => setActive(s.key)}>
                  <s.icon size={16} /> {s.label}
                </button>
              ))}
            </nav>
          </aside>

          <div>
            {active === 'overview' && (
              <>
                <div className="dashboard-stats">
                  <div className="card dashboard-stat-card"><Users size={18} className="text-bronze" /><p className="value">{mockUsers.length}</p><p className="label">Total Users</p></div>
                  <div className="card dashboard-stat-card"><Camera size={18} className="text-bronze" /><p className="value">{photographers.items.length}</p><p className="label">Photographers</p></div>
                  <div className="card dashboard-stat-card"><Calendar size={18} className="text-bronze" /><p className="value">{bookings.length}</p><p className="label">Total Bookings</p></div>
                  <div className="card dashboard-stat-card"><IndianRupee size={18} className="text-bronze" /><p className="value">{formatCurrency(totalRevenue)}</p><p className="label">Total Revenue</p></div>
                </div>
                <div className="dashboard-stats">
                  <div className="card dashboard-stat-card"><Package size={18} className="text-bronze" /><p className="value">{orders.length}</p><p className="label">Orders</p></div>
                  <div className="card dashboard-stat-card"><Calendar size={18} className="text-bronze" /><p className="value">{pendingBookings}</p><p className="label">Pending Bookings</p></div>
                  <div className="card dashboard-stat-card"><Package size={18} className="text-bronze" /><p className="value">{photoshoots.items.length}</p><p className="label">Photoshoot Packages</p></div>
                  <div className="card dashboard-stat-card"><ImageIcon size={18} className="text-bronze" /><p className="value">{gallery.items.length}</p><p className="label">Gallery Photos</p></div>
                </div>

                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ fontSize: 16, marginBottom: 8 }}>Revenue (Last 6 Months)</h3>
                  <div className="bar-chart">
                    {monthlyRevenue.map((m) => (
                      <div key={m.month} className="bar-chart-col">
                        <div className="bar-chart-bar" style={{ height: `${(m.value / maxRevenue) * 100}%` }} />
                        <span className="bar-chart-label">{m.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {active === 'photographers' && (
              <EntityTable
                title="Photographers"
                columns={['Name', 'Specialization', 'City', 'Rating', 'Price']}
                rows={photographers.items.map((p) => ({ id: p.id, img: p.avatar, cells: [p.name, p.specialization, p.city, p.rating, formatCurrency(p.startingPrice)] }))}
                onDelete={photographers.remove}
                onAddClick={() => openQuickAdd('photographer')}
              />
            )}

            {active === 'users' && (
              <EntityTable
                title="Users"
                columns={['Name', 'Email', 'Joined', 'Bookings']}
                rows={mockUsers.map((u) => ({ id: u.id, cells: [u.name, u.email, formatDate(u.joined), u.bookings] }))}
              />
            )}

            {active === 'photoshoots' && (
              <EntityTable
                title="Photoshoot Packages"
                columns={['Title', 'Category', 'Photographer', 'Price']}
                rows={photoshoots.items.map((s) => ({ id: s.id, img: s.coverImage, cells: [s.title, s.category, s.photographerName, formatCurrency(s.price)] }))}
                onDelete={photoshoots.remove}
                onAddClick={() => openQuickAdd('photoshoot')}
              />
            )}

            {active === 'orders' && (
              <EntityTable
                title="Orders"
                columns={['Order ID', 'Items', 'Status', 'Amount']}
                rows={orders.map((o) => ({ id: o.id, cells: [o.id, `${o.items.length} item(s)`, o.status, formatCurrency(o.amount)] }))}
              />
            )}

            {active === 'bookings' && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Booking</th><th>Photographer</th><th>Date</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td>{b.photoshootTitle}</td>
                        <td>{b.photographerName}</td>
                        <td>{formatDate(b.date)}</td>
                        <td><span className="badge">{b.status}</span></td>
                        <td>
                          <select value={b.status} onChange={(e) => updateBookingStatus(b.id, e.target.value)}>
                            {['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && <tr><td colSpan={5} style={{ textAlign: 'center', padding: 24 }}>No bookings yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            )}

            {active === 'reviews' && (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Review</th><th>Rating</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {reviews.map((r) => (
                      <tr key={r.id}>
                        <td style={{ maxWidth: 340 }}>{r.text}</td>
                        <td>{'★'.repeat(r.rating)}</td>
                        <td><span className={`badge ${r.approved ? 'badge-success' : 'badge-warning'}`}>{r.approved ? 'Approved' : 'Pending'}</span></td>
                        <td>{!r.approved && <button className="btn btn-secondary btn-sm" onClick={() => approveReview(r.id)}>Approve</button>}</td>
                      </tr>
                    ))}
                    {reviews.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', padding: 24 }}>No reviews submitted yet.</td></tr>}
                  </tbody>
                </table>
              </div>
            )}

            {active === 'gallery' && (
              <EntityTable
                title="Gallery"
                columns={['Title', 'Category', 'Photographer']}
                rows={gallery.items.map((g) => ({ id: g.id, img: g.src, cells: [g.title, g.category, g.photographerName || 'LUMORA Team'] }))}
                onDelete={gallery.remove}
                onAddClick={() => openQuickAdd('gallery')}
              />
            )}

            {active === 'products' && (
              <EntityTable
                title="Products"
                columns={['Name', 'Category', 'Price']}
                rows={products.items.map((p) => ({ id: p.id, img: p.image, cells: [p.title || p.name, p.category, formatCurrency(p.basePrice || p.price)] }))}
                onDelete={products.remove}
              />
            )}

            {active === 'categories' && (
              <EntityTable
                title="Categories"
                columns={['Name', 'Description']}
                rows={categories.items.map((c) => ({ id: c.id, img: c.image, cells: [c.name, c.description] }))}
                onDelete={categories.remove}
                onAddClick={() => openQuickAdd('category')}
              />
            )}

            {active === 'coupons' && (
              <EntityTable
                title="Coupons"
                columns={['Code', 'Discount']}
                rows={coupons.items.map((c) => ({ id: c.id, cells: [c.code, c.discount] }))}
                onDelete={coupons.remove}
                onAddClick={() => openQuickAdd('coupon')}
              />
            )}

            {active === 'notifications' && (
              <div className="card" style={{ padding: 24, maxWidth: 480 }}>
                <h3 style={{ fontSize: 16, marginBottom: 16 }}>Send a Notification</h3>
                <button className="btn btn-primary" onClick={() => openQuickAdd('notification')}><Plus size={14} /> Compose Notification</button>
              </div>
            )}

            {active === 'settings' && (
              <div className="card" style={{ padding: 24, maxWidth: 480 }}>
                <h3 style={{ fontSize: 16, marginBottom: 16 }}>Platform Settings</h3>
                <label className="filter-checkbox" style={{ marginBottom: 12 }}><input type="checkbox" defaultChecked /> Enable new photographer applications</label>
                <label className="filter-checkbox" style={{ marginBottom: 12 }}><input type="checkbox" defaultChecked /> Show trending gallery on homepage</label>
                <label className="filter-checkbox"><input type="checkbox" /> Maintenance mode</label>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal open={!!modal} onClose={() => setModal(null)} title="Quick Add">
        <form onSubmit={handleQuickAdd}>
          <div className="field">
            <label>{modal?.type === 'notification' ? 'Notification title' : modal?.type === 'coupon' ? 'Coupon code' : 'Name'}</label>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} autoFocus />
          </div>
          <button className="btn btn-primary btn-block" type="submit">Add</button>
        </form>
      </Modal>
    </div>
  );
}

function EntityTable({ title, columns, rows, onDelete, onAddClick }) {
  return (
    <div>
      <div className="section-head" style={{ marginBottom: 20 }}>
        <h3 style={{ fontSize: 17 }}>{title} ({rows.length})</h3>
        {onAddClick && <button className="btn btn-primary btn-sm" onClick={onAddClick}><Plus size={14} /> Add {title.replace(/s$/, '')}</button>}
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th></th>
              {columns.map((c) => <th key={c}>{c}</th>)}
              {onDelete && <th></th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.img && <img src={row.img} alt="" className="admin-thumb" />}</td>
                {row.cells.map((cell, i) => <td key={i}>{cell}</td>)}
                {onDelete && (
                  <td>
                    <div className="admin-row-actions">
                      <button className="btn-icon" style={{ width: 30, height: 30 }}><Pencil size={12} /></button>
                      <button className="btn-icon" style={{ width: 30, height: 30 }} onClick={() => onDelete(row.id)}><Trash2 size={12} /></button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={columns.length + 2} style={{ textAlign: 'center', padding: 24 }}>No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
