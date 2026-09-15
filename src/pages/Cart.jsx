import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Tag } from 'lucide-react';
import CartItem from '../components/CartItem';
import EmptyState from '../components/EmptyState';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';

export default function Cart() {
  const { items, savedForLater, moveToCart, clearCart, totals, applyCode, couponCode } = useCart();
  const { isAuthenticated } = useAuth();
  const [code, setCode] = useState(couponCode);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleApply = (e) => {
    e.preventDefault();
    applyCode(code);
    setMessage(totals.discountRate > 0 || code === '' ? '' : 'Invalid or expired code.');
  };

  const handleCheckout = () => {
    navigate(isAuthenticated ? '/checkout' : '/login', { state: { redirectTo: '/checkout' } });
  };

  if (items.length === 0 && savedForLater.length === 0) {
    return (
      <div className="section">
        <div className="container">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            message="Browse photoshoots, prints, and digital photography to get started."
            actionLabel="Explore Photoshoots"
            actionTo="/photoshoots"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <div className="section-head">
          <h1 className="section-title">Your Cart</h1>
          {items.length > 0 && <button className="btn btn-secondary btn-sm" onClick={clearCart}>Clear Cart</button>}
        </div>

        <div className="detail-layout">
          <div>
            {items.length === 0 ? (
              <p className="text-stone" style={{ marginBottom: 24 }}>Your cart is empty, but you have items saved for later below.</p>
            ) : (
              items.map((item) => <CartItem key={item.cartId} item={item} />)
            )}

            {savedForLater.length > 0 && (
              <div style={{ marginTop: 40 }}>
                <h3 style={{ fontSize: 19, marginBottom: 16 }}>Saved for Later ({savedForLater.length})</h3>
                {savedForLater.map((item) => (
                  <div key={item.cartId} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <button className="btn btn-secondary btn-sm" style={{ marginTop: 10 }} onClick={() => moveToCart(item.cartId)}>
                        Move to Cart
                      </button>
                    </div>
                    <div className="cart-item-price">{formatCurrency(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="card booking-widget">
              <h3 style={{ marginBottom: 18 }}>Order Summary</h3>
              <form onSubmit={handleApply} style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{ flex: 1, padding: '11px 13px', border: '1px solid var(--line-strong)', borderRadius: 'var(--radius-sm)' }}
                />
                <button className="btn btn-secondary btn-sm" type="submit"><Tag size={14} /> Apply</button>
              </form>
              {message && <p className="field-error" style={{ marginBottom: 14 }}>{message}</p>}
              {totals.discountRate > 0 && <p style={{ color: 'var(--success)', fontSize: 13, marginBottom: 14 }}>Coupon applied — {Math.round(totals.discountRate * 100)}% off</p>}

              <div className="booking-widget-summary">
                <div className="summary-row"><span>Subtotal</span><span>{formatCurrency(totals.subtotal)}</span></div>
                {totals.discount > 0 && <div className="summary-row"><span>Discount</span><span>−{formatCurrency(totals.discount)}</span></div>}
                <div className="summary-row"><span>Delivery</span><span>{totals.delivery === 0 ? 'Free' : formatCurrency(totals.delivery)}</span></div>
                <div className="summary-row"><span>Taxes</span><span>{formatCurrency(totals.tax)}</span></div>
                <div className="summary-row summary-total"><span>Total</span><span>{formatCurrency(totals.total)}</span></div>
              </div>
              <button className="btn btn-primary btn-block" onClick={handleCheckout}>Proceed to Checkout</button>
              <Link to="/photoshoots" className="btn btn-secondary btn-block" style={{ marginTop: 10 }}>Continue Browsing</Link>
              <p className="text-stone" style={{ fontSize: 12, marginTop: 14, textAlign: 'center' }}>Try LUMORA10, FIRSTSHOOT, or WELCOME5</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
