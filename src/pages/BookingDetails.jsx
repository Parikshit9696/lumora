import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { MapPin, Clock, Users, FileDown, Star, MessageCircle } from 'lucide-react';
import Modal from '../components/Modal';
import Breadcrumb from '../components/Breadcrumb';
import { useBookings } from '../context/BookingContext';
import { useNotifications } from '../context/NotificationContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import { loadJSON, saveJSON, STORAGE_KEYS } from '../utils/storage';

const statusClass = { Pending: 'badge-warning', Confirmed: 'badge-success', 'In Progress': 'badge-warning', Completed: 'badge-success', Cancelled: 'badge-danger' };

export default function BookingDetails() {
  const { id } = useParams();
  const { bookings, rescheduleBooking, cancelBooking } = useBookings();
  const { addNotification } = useNotifications();
  const booking = bookings.find((b) => b.id === id);

  const [rescheduleOpen, setRescheduleOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [newDate, setNewDate] = useState(booking?.date || '');
  const [newTime, setNewTime] = useState(booking?.time || '');
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewImage, setReviewImage] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  if (!booking) return <Navigate to="/bookings" replace />;

  const handleReschedule = () => {
    rescheduleBooking(booking.id, newDate, newTime);
    addNotification({ title: 'Booking rescheduled', message: `${booking.photoshootTitle} moved to ${formatDate(newDate)}.`, type: 'booking' });
    setRescheduleOpen(false);
  };

  const handleCancel = () => {
    cancelBooking(booking.id);
    addNotification({ title: 'Booking cancelled', message: `${booking.photoshootTitle} has been cancelled.`, type: 'booking' });
  };

  const handleReview = (e) => {
    e.preventDefault();
    const reviews = loadJSON(STORAGE_KEYS.REVIEWS, []);
    saveJSON(STORAGE_KEYS.REVIEWS, [
      ...reviews,
      { id: `rev-${Date.now()}`, bookingId: booking.id, rating: reviewStars, text: reviewText, hasImage: reviewImage, date: new Date().toISOString() },
    ]);
    addNotification({ title: 'Review submitted', message: 'Thanks for sharing your experience!', type: 'update' });
    setReviewSubmitted(true);
    setReviewOpen(false);
  };

  return (
    <div className="fade-in section section--tight">
      <div className="container" style={{ maxWidth: 800 }}>
        <Breadcrumb trail={[{ label: 'Home', to: '/' }, { label: 'My Bookings', to: '/bookings' }, { label: booking.id }]} />

        <div className="card" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
            <img src={booking.image} alt="" style={{ width: 110, height: 110, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
            <div>
              <span className={`badge ${statusClass[booking.status]}`}>{booking.status}</span>
              <h1 style={{ fontSize: 24, margin: '8px 0 4px' }}>{booking.photoshootTitle}</h1>
              <p className="text-stone">by {booking.photographerName} · Booking #{booking.id}</p>
            </div>
          </div>

          <div className="detail-meta-grid" style={{ padding: '20px 0' }}>
            <div className="detail-meta-item"><span>Date</span><strong><Clock size={13} /> {formatDate(booking.date)}</strong></div>
            <div className="detail-meta-item"><span>Time</span><strong>{booking.time}</strong></div>
            <div className="detail-meta-item"><span>Location</span><strong><MapPin size={13} /> {booking.location}</strong></div>
            <div className="detail-meta-item"><span>People</span><strong><Users size={13} /> {booking.people}</strong></div>
          </div>

          {booking.addons?.length > 0 && (
            <div className="detail-section">
              <h3 style={{ fontSize: 17 }}>Add-ons</h3>
              <ul className="included-list">
                {booking.addons.map((a) => <li key={a.id}>{a.name} — {formatCurrency(a.price)}</li>)}
              </ul>
            </div>
          )}

          <div className="detail-section">
            <h3 style={{ fontSize: 17 }}>Payment</h3>
            <div className="summary-row summary-total"><span>Total Paid</span><span>{formatCurrency(booking.amount)}</span></div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
              <>
                <button className="btn btn-secondary" onClick={() => setRescheduleOpen(true)}>Reschedule</button>
                <button className="btn btn-secondary" onClick={handleCancel}>Cancel Booking</button>
              </>
            )}
            <button className="btn btn-secondary" onClick={() => window.print()}><FileDown size={15} /> Download Invoice</button>
            <a href="/contact" className="btn btn-secondary"><MessageCircle size={15} /> Contact Photographer</a>
            {booking.status === 'Completed' && !reviewSubmitted && (
              <button className="btn btn-primary" onClick={() => setReviewOpen(true)}><Star size={15} /> Leave a Review</button>
            )}
          </div>
        </div>

        <Link to="/bookings" className="btn btn-ghost">← Back to all bookings</Link>
      </div>

      <Modal open={rescheduleOpen} onClose={() => setRescheduleOpen(false)} title="Reschedule Booking">
        <div className="field">
          <label>New date</label>
          <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
        </div>
        <div className="field">
          <label>New time</label>
          <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
        </div>
        <button className="btn btn-primary btn-block" onClick={handleReschedule}>Confirm Reschedule</button>
      </Modal>

      <Modal open={reviewOpen} onClose={() => setReviewOpen(false)} title="Leave a Review">
        <form onSubmit={handleReview}>
          <div className="field">
            <label>Rating</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setReviewStars(n)} style={{ background: 'transparent', border: 'none' }}>
                  <Star size={22} fill={n <= reviewStars ? 'var(--champagne-dark)' : 'none'} color="var(--champagne-dark)" />
                </button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Your review</label>
            <textarea required value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="How was your session?" />
          </div>
          <label className="filter-checkbox" style={{ marginBottom: 18 }}>
            <input type="checkbox" checked={reviewImage} onChange={(e) => setReviewImage(e.target.checked)} />
            Attach a photo from the shoot (simulated)
          </label>
          <button className="btn btn-primary btn-block" type="submit">Submit Review</button>
        </form>
      </Modal>
    </div>
  );
}
