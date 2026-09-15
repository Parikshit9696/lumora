import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CalendarX2, MapPin, Clock } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { useBookings } from '../context/BookingContext';
import { formatCurrency, formatDate } from '../utils/formatters';

const tabs = [
  { label: 'Upcoming', statuses: ['Pending', 'Confirmed', 'In Progress'] },
  { label: 'Completed', statuses: ['Completed'] },
  { label: 'Cancelled', statuses: ['Cancelled'] },
];

const statusClass = { Pending: 'badge-warning', Confirmed: 'badge-success', 'In Progress': 'badge-warning', Completed: 'badge-success', Cancelled: 'badge-danger' };

export default function Bookings() {
  const { bookings } = useBookings();
  const [activeTab, setActiveTab] = useState(0);

  const filtered = useMemo(
    () => bookings.filter((b) => tabs[activeTab].statuses.includes(b.status)).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [bookings, activeTab]
  );

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: 32 }}>My Bookings</h1>

        <div className="tab-row">
          {tabs.map((tab, i) => (
            <button key={tab.label} className={activeTab === i ? 'active' : ''} onClick={() => setActiveTab(i)}>
              {tab.label} ({bookings.filter((b) => tab.statuses.includes(b.status)).length})
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={CalendarX2}
            title="No bookings here"
            message="Once you book a photoshoot, it will show up here."
            actionLabel="Browse Photoshoots"
            actionTo="/photoshoots"
          />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map((booking) => (
              <Link key={booking.id} to={`/bookings/${booking.id}`} className="card" style={{ display: 'flex', gap: 20, padding: 20, alignItems: 'center' }}>
                <img src={booking.image} alt={booking.photoshootTitle} style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>{booking.photoshootTitle}</p>
                  <p className="text-stone" style={{ fontSize: 13.5, margin: '4px 0' }}>by {booking.photographerName}</p>
                  <div style={{ display: 'flex', gap: 16, color: 'var(--stone)', fontSize: 13 }}>
                    <span><Clock size={13} /> {formatDate(booking.date)} · {booking.time}</span>
                    <span><MapPin size={13} /> {booking.location}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${statusClass[booking.status]}`}>{booking.status}</span>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, marginTop: 10 }}>{formatCurrency(booking.amount)}</p>
                  <p className="text-stone" style={{ fontSize: 12 }}>#{booking.id}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
