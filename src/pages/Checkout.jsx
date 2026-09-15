import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, CreditCard, Smartphone, Landmark, Wallet } from 'lucide-react';
import '../styles/checkout.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingContext';
import { useNotifications } from '../context/NotificationContext';
import { validateCheckoutInfo, hasErrors } from '../utils/validation';
import { formatCurrency } from '../utils/formatters';

const steps = ['Customer Info', 'Delivery / Shoot Info', 'Order Summary', 'Payment', 'Confirmation'];
const paymentMethods = [
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'netbanking', label: 'Net Banking', icon: Landmark },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
];

export default function Checkout() {
  const { items, totals, clearCart } = useCart();
  const { user } = useAuth();
  const { createBookingsAndOrder } = useBookings();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [info, setInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState(null);

  useEffect(() => {
    if (items.length === 0 && !confirmedOrderId) {
      navigate('/cart', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, confirmedOrderId]);

  if (items.length === 0 && !confirmedOrderId) {
    return null;
  }

  const update = (patch) => setInfo((prev) => ({ ...prev, ...patch }));

  const goNext = () => {
    if (step === 0) {
      const errs = validateCheckoutInfo(info);
      setErrors(errs);
      if (hasErrors(errs)) return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      const result = createBookingsAndOrder(items, info, paymentMethod);
      addNotification({
        title: 'Booking / Order Confirmed',
        message: `Order ${result.orderId} has been confirmed.`,
        type: 'order',
      });
      setConfirmedOrderId(result.orderId);
      clearCart();
      setProcessing(false);
      setStep(4);
    }, 1400);
  };

  return (
    <div className="fade-in section section--tight">
      <div className="container" style={{ maxWidth: 860 }}>
        <h1 className="section-title" style={{ marginBottom: 32 }}>Checkout</h1>

        <div className="checkout-stepper">
          {steps.map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
              <div className={`checkout-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                <span className="checkout-step-circle">{i < step ? '✓' : i + 1}</span>
                <span>{label}</span>
              </div>
              {i < steps.length - 1 && <div className="checkout-step-line" />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="card" style={{ padding: 28 }}>
            <h3 style={{ marginBottom: 20 }}>Customer Information</h3>
            <div className="grid grid-2">
              <div className="field">
                <label>Full Name</label>
                <input value={info.name} onChange={(e) => update({ name: e.target.value })} />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className="field">
                <label>Email</label>
                <input type="email" value={info.email} onChange={(e) => update({ email: e.target.value })} />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
              <div className="field">
                <label>Phone</label>
                <input value={info.phone} onChange={(e) => update({ phone: e.target.value })} />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>
            </div>
            <button className="btn btn-primary" onClick={goNext}>Continue</button>
          </div>
        )}

        {step === 1 && (
          <div className="card" style={{ padding: 28 }}>
            <h3 style={{ marginBottom: 20 }}>Delivery / Shoot Information</h3>
            <div className="grid grid-2">
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Address</label>
                <input value={info.address} onChange={(e) => update({ address: e.target.value })} />
                {errors.address && <span className="field-error">{errors.address}</span>}
              </div>
              <div className="field">
                <label>City</label>
                <input value={info.city} onChange={(e) => update({ city: e.target.value })} />
                {errors.city && <span className="field-error">{errors.city}</span>}
              </div>
              <div className="field">
                <label>Pincode</label>
                <input value={info.pincode} onChange={(e) => update({ pincode: e.target.value })} />
                {errors.pincode && <span className="field-error">{errors.pincode}</span>}
              </div>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label>Notes for photographer / delivery (optional)</label>
                <textarea value={info.notes} onChange={(e) => update({ notes: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" onClick={goBack}>Back</button>
              <button className="btn btn-primary" onClick={goNext}>Continue</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card" style={{ padding: 28 }}>
            <h3 style={{ marginBottom: 20 }}>Order Summary</h3>
            {items.map((item) => (
              <div key={item.cartId} className="summary-row" style={{ padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
                <span>{item.name} × {item.quantity}</span>
                <span>{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
            <div className="booking-widget-summary" style={{ marginTop: 16 }}>
              <div className="summary-row"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
              {totals.discount > 0 && <div className="summary-row"><span>Discount</span><span>−{formatCurrency(totals.discount)}</span></div>}
              <div className="summary-row"><span>Delivery</span><span>{totals.delivery === 0 ? 'Free' : formatCurrency(totals.delivery)}</span></div>
              <div className="summary-row"><span>Taxes</span><span>{formatCurrency(totals.tax)}</span></div>
              <div className="summary-row summary-total"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="btn btn-secondary" onClick={goBack}>Back</button>
              <button className="btn btn-primary" onClick={goNext}>Continue to Payment</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card" style={{ padding: 28 }}>
            <h3 style={{ marginBottom: 20 }}>Payment</h3>
            <div className="payment-method-grid">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  className={`payment-method ${paymentMethod === m.id ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod(m.id)}
                >
                  <m.icon size={20} style={{ marginBottom: 8 }} /><br />
                  {m.label}
                </button>
              ))}
            </div>
            <p className="text-stone" style={{ fontSize: 13, marginBottom: 20 }}>
              This is a frontend simulation — no real payment is processed and no card details are collected.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-secondary" onClick={goBack} disabled={processing}>Back</button>
              <button className="btn btn-primary" onClick={handlePay} disabled={processing}>
                {processing ? 'Processing…' : `Pay ${formatCurrency(totals.total)}`}
              </button>
            </div>
          </div>
        )}

        {step === 4 && confirmedOrderId && (
          <div className="card confirmation-box">
            <div className="confirmation-icon"><CheckCircle2 size={38} /></div>
            <h2 style={{ fontSize: 26, marginBottom: 10 }}>Booking / Order Confirmed</h2>
            <p className="text-stone" style={{ marginBottom: 6 }}>Your order ID</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, marginBottom: 24 }}>{confirmedOrderId}</p>
            <p className="text-stone" style={{ marginBottom: 28 }}>
              A confirmation has been added to your notifications. You can track everything from My Bookings.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => navigate('/bookings')}>View My Bookings</button>
              <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
