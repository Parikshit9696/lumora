import { Minus, Plus, Trash2, Clock3 } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeItem, saveForLater } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-info">
        <p className="cart-item-name">{item.name}</p>
        {item.type === 'photoshoot' && item.meta?.date && (
          <p className="text-stone cart-item-meta">
            {formatDate(item.meta.date)} · {item.meta.time} · {item.meta.people} {item.meta.people > 1 ? 'people' : 'person'}
          </p>
        )}
        {item.meta?.license && <p className="text-stone cart-item-meta">{item.meta.license} license</p>}
        {item.meta?.size && <p className="text-stone cart-item-meta">{item.meta.size} · {item.meta.material} · {item.meta.frame}</p>}
        <div className="cart-item-actions">
          {item.type !== 'photoshoot' && (
            <div className="qty-control">
              <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} aria-label="Decrease quantity">
                <Minus size={13} />
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} aria-label="Increase quantity">
                <Plus size={13} />
              </button>
            </div>
          )}
          {item.type !== 'photoshoot' && (
            <button className="btn-ghost btn-sm" onClick={() => saveForLater(item.cartId)}>
              <Clock3 size={13} /> Save for later
            </button>
          )}
          <button className="btn-ghost btn-sm" onClick={() => removeItem(item.cartId)}>
            <Trash2 size={13} /> Remove
          </button>
        </div>
      </div>
      <div className="cart-item-price">{formatCurrency(item.price * item.quantity)}</div>
    </div>
  );
}
