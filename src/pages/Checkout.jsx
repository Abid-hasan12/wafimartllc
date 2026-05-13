import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2 } from 'lucide-react';

function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [newOrderId, setNewOrderId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    fullAddress: '',
    city: '',
    area: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [errors, setErrors] = useState({});

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-soft">
        <p className="text-2xl font-semibold text-slate-900">Your cart is empty</p>
        <p className="mt-2 text-slate-600">Add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-8 inline-flex rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Back to shopping
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.fullAddress.trim()) {
      newErrors.fullAddress = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.area.trim()) {
      newErrors.area = 'Area/Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const getSavedOrders = () => {
    const savedOrders = localStorage.getItem('wafi_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  };

  const saveOrder = (order) => {
    const existingOrders = getSavedOrders();
    const updatedOrders = [order, ...existingOrders];
    localStorage.setItem('wafi_orders', JSON.stringify(updatedOrders));
  };

  const createOrderId = () => {
    const existingOrders = getSavedOrders();
    const nextNumber = existingOrders.length + 1025;
    return `WAFI-${nextNumber}`;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const orderId = createOrderId();
    const orderData = {
      id: orderId,
      orderId,
      customerUsername: user?.username || 'Guest User',
      customerData: formData,
      cartItems: cart,
      paymentMethod,
      orderTotal: total,
      orderDate: new Date().toISOString(),
      status: 'Pending',
    };

    saveOrder(orderData);
    setNewOrderId(orderId);
    clearCart();

    setTimeout(() => {
      setOrderPlaced(true);
      setIsSubmitting(false);
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-16 text-center shadow-soft">
        <CheckCircle2 className="mx-auto h-20 w-20 text-emerald-600 mb-6" />
        <h1 className="text-4xl font-bold text-emerald-900">Thank You!</h1>
        <p className="mt-4 text-lg text-emerald-800">Your order has been placed successfully.</p>
        <p className="mt-2 text-sm text-emerald-700">
          Order confirmation has been sent to your email. You will receive your items within 2-4 business days.
        </p>

            <div className="space-y-4 rounded-3xl border border-emerald-200 bg-white p-6">
          <p className="text-sm text-slate-600">Order ID: <span className="font-semibold text-slate-900">#{newOrderId}</span></p>
          <p className="text-sm text-slate-600">Payment Method: <span className="font-semibold text-slate-900">Cash on Delivery</span></p>
          <p className="text-sm text-slate-600">Order Total: <span className="font-bold text-2xl text-emerald-600">${total.toFixed(2)}</span></p>
        </div>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => navigate('/my-orders')}
            className="w-full rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            View my orders
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
      {/* Left Column: Form */}
      <section className="space-y-8 rounded-[2rem] bg-white p-8 shadow-soft">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>
          <p className="mt-2 text-slate-600">Complete your purchase by providing your shipping details.</p>
        </div>

        {/* Shipping Details Form */}
        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-semibold text-slate-900">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-sm outline-none transition ${
                errors.fullName
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                  : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
              }`}
            />
            {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-900">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
              className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-sm outline-none transition ${
                errors.phoneNumber
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                  : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
              }`}
            />
            {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="fullAddress" className="block text-sm font-semibold text-slate-900">
              Full Address *
            </label>
            <input
              type="text"
              id="fullAddress"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleInputChange}
              placeholder="123 Main Street, Apartment 4B"
              className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-sm outline-none transition ${
                errors.fullAddress
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                  : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
              }`}
            />
            {errors.fullAddress && <p className="text-xs text-red-500">{errors.fullAddress}</p>}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="city" className="block text-sm font-semibold text-slate-900">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
                className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-sm outline-none transition ${
                  errors.city
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
                }`}
              />
              {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="area" className="block text-sm font-semibold text-slate-900">
                Area/Postal Code *
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="10001"
                className={`w-full rounded-xl border-2 bg-white px-4 py-3 text-sm outline-none transition ${
                  errors.area
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                    : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
                }`}
              />
              {errors.area && <p className="text-xs text-red-500">{errors.area}</p>}
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Payment Method</h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 cursor-pointer transition hover:border-indigo-300">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 accent-indigo-600"
                />
                <div>
                  <p className="font-semibold text-slate-900">Cash on Delivery</p>
                  <p className="text-xs text-slate-600">Pay when your order arrives</p>
                </div>
              </label>

              <label className="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 cursor-pointer opacity-50 transition hover:opacity-75">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  disabled
                  className="h-4 w-4 accent-slate-400"
                />
                <div>
                  <p className="font-semibold text-slate-700">Online Payment</p>
                  <p className="text-xs text-slate-600">Card / Mobile Banking (Coming Soon)</p>
                </div>
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-full px-8 py-4 text-lg font-bold text-white transition ${
              isSubmitting
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-lg'
            }`}
          >
            {isSubmitting ? 'Processing Order...' : 'Place Order'}
          </button>
        </form>
      </section>

      {/* Right Column: Order Summary */}
      <aside className="space-y-6 h-fit rounded-[2rem] bg-white p-8 shadow-soft sticky top-24">
        <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>

        {/* Cart Items */}
        <div className="space-y-3 border-b border-slate-200 pb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 line-clamp-1">{item.name}</p>
                <p className="text-xs text-slate-600">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="space-y-3 border-b border-slate-200 pb-6">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Tax (10%)</span>
            <span className="font-semibold text-slate-900">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Shipping</span>
            <span className="font-semibold text-green-600">Free</span>
          </div>
        </div>

        {/* Total */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <span className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-slate-500 text-center">
            By clicking "Place Order", you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default Checkout;
