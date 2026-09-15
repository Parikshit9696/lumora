import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, MapPin, Check } from 'lucide-react';
import { calculateBookingTotal } from '../utils/price';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';

const timeSlots = ['7:00 AM', '9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'];

export default function BookingWidget({ shoot }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const { addNotification } = useNotifications();

  const [date, setDate] = useState('');
  const [time, setTime] = useState(timeSlots[2]);
  const [people, setPeople] = useState(1);
  const [location, setLocation] = useState(shoot.location);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [added, setAdded] = useState(false);

  const toggleAddon = (addon) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id) ? prev.filter((a) => a.id !== addon.id) : [...prev, addon]
    );
    setAdded(false);
  };

  const totals = useMemo(
    () => calculateBookingTotal({ basePrice: shoot.price, people, addons: selectedAddons }),
    [shoot.price, people, selectedAddons]
  );

  const minDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const handleAddToCart = () => {
    addItem({
      cartId: `shoot-${shoot.id}-${Date.now()}`,
      type: 'photoshoot',
      name: shoot.title,
      image: shoot.coverImage,
      price: totals.total,
      quantity: 1,
      meta: {
        photoshootId: shoot.id,
        photographerName: shoot.photographerName,
        date: date || minDate,
        time,
        people,
        location,
        addons: selectedAddons,
      },
    });
    addNotification({
      title: 'Added to cart',
      message: `${shoot.title} is ready for checkout.`,
      type: 'booking',
    });
    setAdded(true);
  };

  const handleBookNow = () => {
    handleAddToCart();
    navigate(isAuthenticated ? '/checkout' : '/login', { state: { redirectTo: '/checkout' } });
  };

  return (
    <div className="card booking-widget">
      <div className="booking-widget-price">
        <span className="text-stone">Starting at</span>
        <h3>{formatCurrency(shoot.price)}</h3>
      </div>
      <hr className="hairline" />

      <div className="field">
        <label htmlFor="shoot-date"><Calendar size={14} /> Select date</label>
        <input id="shoot-date" type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div className="field">
        <label><Clock size={14} /> Select time</label>
        <div className="time-slot-grid">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              className={`chip ${time === slot ? 'active' : ''}`}
              onClick={() => setTime(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="shoot-people"><Users size={14} /> Number of people</label>
        <select id="shoot-people" value={people} onChange={(e) => setPeople(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>{n} {n > 1 ? 'people' : 'person'}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="shoot-location"><MapPin size={14} /> Location preference</label>
        <input id="shoot-location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className="field">
        <label>Add-ons</label>
        <div className="addon-list">
          {shoot.addons.map((addon) => {
            const selected = selectedAddons.some((a) => a.id === addon.id);
            return (
              <button
                key={addon.id}
                type="button"
                className={`addon-row ${selected ? 'selected' : ''}`}
                onClick={() => toggleAddon(addon)}
              >
                <span className="addon-check">{selected && <Check size={12} />}</span>
                <span className="addon-name">{addon.name}</span>
                <span className="addon-price">+{formatCurrency(addon.price)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <hr className="hairline" />

      <div className="booking-widget-summary">
        <div className="summary-row"><span>Base package</span><span>{formatCurrency(totals.basePrice)}</span></div>
        {totals.peopleSurcharge > 0 && (
          <div className="summary-row"><span>Extra people</span><span>{formatCurrency(totals.peopleSurcharge)}</span></div>
        )}
        {totals.addonsTotal > 0 && (
          <div className="summary-row"><span>Add-ons</span><span>{formatCurrency(totals.addonsTotal)}</span></div>
        )}
        <div className="summary-row"><span>Taxes (5%)</span><span>{formatCurrency(totals.tax)}</span></div>
        <div className="summary-row summary-total"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>
      </div>

      <button className="btn btn-primary btn-block" onClick={handleBookNow}>
        Book Now
      </button>
      <button className="btn btn-secondary btn-block" onClick={handleAddToCart}>
        {added ? 'Added to Cart ✓' : 'Add to Cart'}
      </button>
    </div>
  );
}
