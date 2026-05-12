import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

function Cart() {
  const { cart, updateQuantity, removeFromCart, subtotal, tax, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-soft">
        <ShoppingBag className="mx-auto h-16 w-16 text-slate-300 mb-4" />
        <p className="text-2xl font-semibold text-slate-900">Your cart is empty</p>
        <p className="mt-2 text-slate-600">Start shopping to add items to your cart!</p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <section className="space-y-6 rounded-[2rem] bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-slate-900">Shopping cart</h1>

        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 rounded-3xl border border-slate-200 p-6 transition hover:border-slate-300"
            >
              <Link to={`/product/${item.id}`} className="flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-32 rounded-2xl object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    to={`/product/${item.id}`}
                    className="text-lg font-semibold text-slate-900 hover:text-indigo-600 transition"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600">{item.category}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-slate-50 p-2 w-fit">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 hover:bg-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-10 text-center text-sm font-semibold outline-none"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-slate-600 hover:bg-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 hover:bg-red-50 transition"
                    aria-label="Remove from cart"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <p className="text-2xl font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-slate-500">${item.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <aside className="space-y-6 h-fit rounded-[2rem] bg-white p-8 shadow-soft sticky top-24">
        <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>

        <div className="space-y-4 border-b border-slate-100 pb-6">
          <div className="flex justify-between text-sm text-slate-600">
            <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-slate-600">
            <span>Shipping</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>
        </div>

        <div className="flex justify-between text-xl font-bold text-slate-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <Link
          to="/checkout"
          className="block text-center w-full rounded-full bg-indigo-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
        >
          Proceed to checkout
        </Link>

        <Link
          to="/"
          className="block text-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
        >
          Continue shopping
        </Link>

        <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Safe checkout</p>
          <p>✓ Secure SSL encryption</p>
          <p>✓ Money-back guarantee</p>
          <p>✓ Free returns within 30 days</p>
        </div>
      </aside>
    </div>
  );
}

export default Cart;
