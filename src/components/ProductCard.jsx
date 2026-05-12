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
    <article className="relative group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-xl">
      {added && (
        <div className="absolute left-4 top-4 z-20 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
          Added to cart
        </div>
      )}
      <div className="relative overflow-hidden rounded-t-3xl">
        <Link to={`/product/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <div className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${getBadgeStyles(product.badge)}`}>
            {getBadgeLabel(product.badge)}
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.24em] text-slate-500">{product.category}</span>
          {renderStars(product.rating)}
        </div>

        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-indigo-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm leading-6 text-slate-600 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
          <span>{product.reviews.toLocaleString()} reviews</span>
          {product.sold && (
            <span className="font-semibold text-emerald-600">✓ {product.sold.toLocaleString()}+ Sold</span>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <div>
            <span className="text-2xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-xs text-slate-500 line-through">${product.originalPrice.toFixed(2)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
