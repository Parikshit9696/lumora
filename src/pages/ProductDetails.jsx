import { useState, useMemo } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { getDigitalPhotoById, getPrintById } from '../data/products';
import { calculatePrintPrice } from '../utils/price';
import { formatCurrency } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotifications } from '../context/NotificationContext';

export default function ProductDetails({ type }) {
  const { id } = useParams();
  const product = type === 'print' ? getPrintById(id) : getDigitalPhotoById(id);
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addNotification } = useNotifications();

  const [license, setLicense] = useState(product?.licenses?.[0]?.type);
  const [size, setSize] = useState(product?.sizes?.[0]);
  const [frame, setFrame] = useState(product?.frames?.[0]);
  const [material, setMaterial] = useState(product?.materials?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = useMemo(() => {
    if (!product) return 0;
    if (type === 'print') {
      return calculatePrintPrice({ base: product.basePrice, size, frame, material, quantity });
    }
    return product.licenses.find((l) => l.type === license)?.price || product.price;
  }, [product, type, size, frame, material, quantity, license]);

  if (!product) return <Navigate to={type === 'print' ? '/prints' : '/digital-store'} replace />;

  const title = product.title || product.name;
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem({
      cartId: type === 'print' ? `${product.id}-${size}-${frame}-${material}` : `${product.id}-${license}`,
      type,
      name: title,
      image: product.image,
      price: type === 'print' ? price / quantity : price,
      quantity: type === 'print' ? quantity : 1,
      meta: type === 'print' ? { productId: product.id, size, frame, material } : { productId: product.id, license },
    });
    addNotification({ title: 'Added to cart', message: `${title} is in your cart.`, type: 'order' });
    setAdded(true);
  };

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <Breadcrumb
          trail={[
            { label: 'Home', to: '/' },
            { label: type === 'print' ? 'Prints' : 'Digital Store', to: type === 'print' ? '/prints' : '/digital-store' },
            { label: title },
          ]}
        />
        <div className="detail-layout">
          <div>
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 24 }}>
              <img src={product.image} alt={title} style={{ width: '100%' }} />
            </div>
            <h1 style={{ fontSize: 28, marginBottom: 8 }}>{title}</h1>
            {product.photographerName && <p className="text-stone">by {product.photographerName}</p>}
            {product.resolution && <p className="text-stone" style={{ marginTop: 6 }}>Resolution: {product.resolution}</p>}
            {product.description && <p className="text-stone" style={{ marginTop: 12, lineHeight: 1.7 }}>{product.description}</p>}
          </div>

          <div className="card booking-widget">
            <div className="booking-widget-price">
              <span className="text-stone">Price</span>
              <h3>{formatCurrency(price)}</h3>
            </div>
            <hr className="hairline" />

            {type === 'digital-photo' && (
              <div className="field">
                <label>License type</label>
                <div className="addon-list">
                  {product.licenses.map((l) => (
                    <button
                      key={l.type}
                      type="button"
                      className={`addon-row ${license === l.type ? 'selected' : ''}`}
                      onClick={() => setLicense(l.type)}
                    >
                      <span className="addon-check">{license === l.type && <Check size={12} />}</span>
                      <span className="addon-name">{l.type} License</span>
                      <span className="addon-price">{formatCurrency(l.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {type === 'print' && (
              <>
                <div className="field">
                  <label>Size</label>
                  <select value={size} onChange={(e) => setSize(e.target.value)}>
                    {product.sizes.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Frame</label>
                  <select value={frame} onChange={(e) => setFrame(e.target.value)}>
                    {product.frames.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Material</label>
                  <select value={material} onChange={(e) => setMaterial(e.target.value)}>
                    {product.materials.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label>Quantity</label>
                  <div className="qty-control" style={{ width: 130 }}>
                    <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity((q) => q + 1)}>+</button>
                  </div>
                </div>
              </>
            )}

            <button className="btn btn-primary btn-block" onClick={handleAddToCart}>
              <ShoppingBag size={15} /> {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
            <button
              className="btn btn-secondary btn-block"
              onClick={() => toggleWishlist({ id: product.id, type, title, image: product.image, price })}
            >
              <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} /> {wishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
