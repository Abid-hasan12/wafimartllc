import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsData } from '../data/productsData';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { ShoppingCart, Minus, Plus, Star } from 'lucide-react';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const product = productsData.find((item) => item.id.toString() === id.toString());
  const relatedProducts = productsData
    .filter((p) => p.categorySlug === product?.categorySlug && p.id.toString() !== id.toString())
    .slice(0, 4);
  if (!product) {
    return (
      <div className="max-w-md mx-auto my-10 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-soft">
        <p className="text-lg font-semibold text-slate-900">Product not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const thumbnails = [product.image, ...Array(3).fill(product.image)];

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <section className="space-y-6 rounded-[2rem] bg-white p-4 sm:p-6 md:p-8 shadow-soft">
          <div className="space-y-4">
            <img
              src={thumbnails[selectedImage]}
              alt={product.name}
              className="w-full max-h-[350px] rounded-[2rem] object-contain"
            />
            <div className="flex gap-3 overflow-x-auto">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-2xl border-2 transition ${selectedImage === index ? 'border-indigo-600 shadow-md' : 'border-slate-200 hover:border-slate-300'
                    }`}
                >
                  <img src={thumb} alt={`View ${index}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 border-t border-slate-100 pt-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-slate-700">{product.rating}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{product.reviews.toLocaleString()} reviews</p>
              </div>
              {product.badge && (
                <span className={`rounded-full px-3 py-1.5 text-xs font-bold text-white ${product.badge === 'bestseller' ? 'bg-red-500' :
                  product.badge === 'top-rated' ? 'bg-amber-500' :
                    'bg-indigo-500'
                  }`}>
                  {product.badge === 'bestseller' ? '★ Best Seller' :
                    product.badge === 'top-rated' ? '★ Top Rated' :
                      '🔥 Trending'}
                </span>
              )}
            </div>

            <h1 className="text-4xl font-semibold text-slate-900">{product.name}</h1>
            <p className="text-base leading-7 text-slate-600">{product.description}</p>

            <div className="grid gap-3 sm:grid-cols-2">
              {product.details.map((detail) => (
                <div key={detail} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
                  {detail}
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6 rounded-[2rem] bg-white p-4 sm:p-6 md:p-8 shadow-soft h-fit md:sticky md:top-24">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Price</p>
              <p className="mt-2 text-4xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
            </div>

            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.28em] text-slate-500">Quantity</p>
              <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white p-2 w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center text-sm font-semibold outline-none"
                  min="1"
                  max="99"
                />
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full rounded-full px-6 py-4 text-sm font-semibold transition flex items-center justify-center gap-2 ${addedToCart
                ? 'bg-green-600 text-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
                }`}
            >
              <ShoppingCart className="h-4 w-4" />
              {addedToCart ? 'Added to cart!' : 'Add to cart'}
            </button>

            {addedToCart && (
              <div className="rounded-3xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition">
                Product added to cart
              </div>
            )}

            <button
              onClick={handleBuyNow}
              className="w-full rounded-full border-2 border-indigo-600 bg-white px-6 py-4 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 active:scale-95"
            >
              Buy now
            </button>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-900">Delivery & returns</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>✓ Free delivery in 2-4 business days</li>
              <li>✓ Easy returns within 30 days</li>
              <li>✓ Secure checkout</li>
            </ul>
          </div>
        </aside>
      </div>

      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Related products</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">You might also like</h2>
          </div>
          <div className="grid gap-4 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
