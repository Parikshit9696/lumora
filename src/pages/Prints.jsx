import ProductCard from '../components/ProductCard';
import { printProducts } from '../data/products';

export default function Prints() {
  return (
    <div className="fade-in">
      <div className="simple-hero">
        <div className="container">
          <h1>The Print Store.</h1>
          <p>Bring your favourite frames into the physical world — canvas, metal, fine art, and more.</p>
        </div>
      </div>
      <div className="section section--tight">
        <div className="container">
          <div className="grid grid-3">
            {printProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
