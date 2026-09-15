import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

const typeLabels = { photoshoot: 'Photoshoots', photographer: 'Photographers', 'digital-photo': 'Digital Photos', print: 'Prints' };
const typeLink = { photoshoot: (id) => `/photoshoots/${id}`, photographer: (id) => `/photographers/${id}`, 'digital-photo': (id) => `/digital-store/${id}`, print: (id) => `/prints/${id}` };

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const grouped = wishlist.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  if (wishlist.length === 0) {
    return (
      <div className="section">
        <div className="container">
          <EmptyState icon={Heart} title="Your wishlist is empty" message="Save photoshoots, photographers, and photos you love to find them here later." actionLabel="Start Exploring" actionTo="/explore" />
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in section section--tight">
      <div className="container">
        <h1 className="section-title" style={{ marginBottom: 32 }}>Your Wishlist</h1>
        {Object.entries(grouped).map(([type, items]) => (
          <div key={type} style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: 18, marginBottom: 16 }}>{typeLabels[type] || type} ({items.length})</h3>
            <div className="grid grid-3">
              {items.map((item) => (
                <div key={item.id} className="card" style={{ padding: 16 }}>
                  <Link to={typeLink[type] ? typeLink[type](item.id) : '#'} style={{ display: 'flex', gap: 14 }}>
                    <img src={item.image} alt={item.title} style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 14.5 }}>{item.title}</p>
                      {item.price && <p className="text-bronze" style={{ marginTop: 4 }}>{formatCurrency(item.price)}</p>}
                    </div>
                  </Link>
                  <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
                    {(type === 'digital-photo' || type === 'print' || type === 'photoshoot') && (
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          addItem({
                            cartId: `${item.id}-wishlist-${Date.now()}`,
                            type: item.type,
                            name: item.title,
                            image: item.image,
                            price: item.price || 0,
                          })
                        }
                      >
                        <ShoppingBag size={13} /> Move to Cart
                      </button>
                    )}
                    <button className="btn btn-ghost btn-sm" onClick={() => removeFromWishlist(item.id)}>
                      <Trash2 size={13} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
