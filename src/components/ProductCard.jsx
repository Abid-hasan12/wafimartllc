import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Star } from 'lucide-react';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const getBadgeStyles = (badge) => {
    const styles = {
      bestseller: 'bg-red-500 text-white',
      'top-rated': 'bg-amber-500 text-white',
      trending: 'bg-indigo-500 text-white',
    };
    return styles[badge] || '';
  };

  const getBadgeLabel = (badge) => {
    const labels = {
      bestseller: '★ Best Seller',
      'top-rated': '★ Top Rated',
      trending: '🔥 Trending',
    };
    return labels[badge] || '';
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < fullStars
                  ? 'fill-amber-400 text-amber-400'
                  : i === fullStars && hasHalf
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-300'
              }`}
            />
          ))}
        </div>
        <span className="text-xs font-semibold text-slate-700">{rating}</span>
      </div>
    );
  };

  return (
    <article
      className="relative group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl max-w-[270px] min-h-[250px]"
      style={{ touchAction: 'pan-y' }}
    >
      {added && (
        <div className="absolute left-2 top-2 z-20 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg">
          Added to cart
        </div>
      )}
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gray-100">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.name}
            className="h-auto w-full object-contain object-center transition duration-500 group-hover:scale-105"
            style={{ imageRendering: 'auto' }}
          />
        </Link>
        {product.badge && (
          <div className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold ${getBadgeStyles(product.badge)}`}>
            {getBadgeLabel(product.badge)}
          </div>
        )}
      </div>

      <div className="space-y-1.5 p-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{product.category}</span>
          {renderStars(product.rating)}
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-semibold text-slate-900 transition group-hover:text-indigo-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs leading-5 text-slate-600 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between gap-2 text-[10px] text-slate-500">
          <span>{product.reviews.toLocaleString()} reviews</span>
          {product.sold && (
            <span className="font-semibold text-emerald-600">✓ {product.sold.toLocaleString()}+ Sold</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-2">
          <div>
            <span className="text-base font-bold text-slate-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-xs text-slate-500 line-through">${product.originalPrice.toFixed(2)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-1 rounded-full bg-indigo-600 px-2 py-1 text-[10px] font-semibold text-white transition hover:bg-indigo-700 active:scale-95 min-w-[28px]"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
