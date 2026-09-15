import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatters';

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isWishlisted(product.id);
  const detailPath = product.type === 'print' ? `/prints/${product.id}` : `/digital-store/${product.id}`;
  const price = product.type === 'print' ? product.basePrice : product.price;

  const handleAdd = (e) => {
    e.preventDefault();
    addItem({
      cartId: `${product.id}-default`,
      type: product.type,
      name: product.title || product.name,
      image: product.image,
      price,
      meta: { productId: product.id, license: product.licenses?.[0]?.type },
    });
  };

  return (
    <div className="card product-card">
      <div className="product-card-media">
        <Link to={detailPath}>
          <img src={product.image} alt={product.title || product.name} loading="lazy" />
        </Link>
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={() =>
            toggleWishlist({ id: product.id, type: product.type, title: product.title || product.name, image: product.image, price })
          }
          aria-label="Toggle wishlist"
        >
          <Heart size={17} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-card-body">
        <span className="badge">{product.category}</span>
        <Link to={detailPath} className="product-card-title">
          {product.title || product.name}
        </Link>
        {product.photographerName && <p className="text-stone product-card-sub">by {product.photographerName}</p>}
        <div className="product-card-footer">
          <span className="product-card-price">{formatCurrency(price)}</span>
          <button className="btn-icon" onClick={handleAdd} aria-label="Add to cart" title="Add to cart">
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
