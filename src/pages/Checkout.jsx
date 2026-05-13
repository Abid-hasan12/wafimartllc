import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CreditCard, Phone, Bank, Loader2 } from 'lucide-react';

function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    fullAddress: '',
    city: '',
    area: '',
  });
  const [selectedPaymentCategory, setSelectedPaymentCategory] = useState('mobile');
  const [selectedMobileWallet, setSelectedMobileWallet] = useState('bKash');
  const [selectedNetBank, setSelectedNetBank] = useState('Bank Asia');
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
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

  const detectCardBrand = (number) => {
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    return '';
  };

  const cardBrand = detectCardBrand(cardData.number);

  const validatePaymentInputs = () => {
    const newErrors = {};

    if (selectedPaymentCategory === 'card') {
      if (cardData.number.length !== 16) {
        newErrors.cardNumber = 'Card number must be 16 digits';
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiry)) {
        newErrors.cardExpiry = 'Expiry must be MM/YY';
      }
      if (cardData.cvv.length !== 3) {
        newErrors.cardCVV = 'CVV must be 3 digits';
      }
    }

    setPaymentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPaymentMethodLabel = () => {
    if (selectedPaymentCategory === 'mobile') return selectedMobileWallet;
    if (selectedPaymentCategory === 'card') {
      const last4 = cardData.number.slice(-4);
      return `${cardBrand || 'Card'} ending ${last4 || '••••'}`;
    }
    if (selectedPaymentCategory === 'netbanking') return selectedNetBank;
    return 'Unknown';
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

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm() || !validatePaymentInputs()) {
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
      paymentCategory: selectedPaymentCategory,
      paymentMethod: getPaymentMethodLabel(),
      orderTotal: total,
      orderDate: new Date().toISOString(),
      status: 'Pending',
    };

    saveOrder(orderData);
    localStorage.setItem('wafi_last_order', orderId);
    clearCart();

    setTimeout(() => {
      navigate('/order-success');
    }, 1500);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
      <section className="space-y-8 rounded-[2rem] bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Checkout</h1>
            <p className="mt-2 text-slate-600">Complete your purchase and pay securely with the option you trust.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
            <ShieldCheck className="h-4 w-4" />
            Secure Checkout
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="space-y-8">
          <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Shipping information</h2>

            <div className="space-y-4">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm font-semibold text-slate-900">Full Name *</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                      errors.fullName
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                        : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-900">Phone Number *</label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder=" +1 (555) 000-0000"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                      errors.phoneNumber
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                        : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.phoneNumber && <p className="text-xs text-red-500">{errors.phoneNumber}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="fullAddress" className="block text-sm font-semibold text-slate-900">Full Address *</label>
                <input
                  id="fullAddress"
                  name="fullAddress"
                  type="text"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  placeholder="123 Main Street, Apartment 4B"
                  className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                    errors.fullAddress
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                      : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
                  }`}
                />
                {errors.fullAddress && <p className="text-xs text-red-500">{errors.fullAddress}</p>}
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-semibold text-slate-900">City *</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                      errors.city
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                        : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.city && <p className="text-xs text-red-500">{errors.city}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="area" className="block text-sm font-semibold text-slate-900">Area/Postal Code *</label>
                  <input
                    id="area"
                    name="area"
                    type="text"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                      errors.area
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                        : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
                    }`}
                  />
                  {errors.area && <p className="text-xs text-red-500">{errors.area}</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Payment method</h2>
                <p className="mt-1 text-sm text-slate-600">Select the payment option that works best for you.</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
                <ShieldCheck className="h-4 w-4" />
                Secure payment
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {[
                { id: 'mobile', label: 'Mobile Banking', description: 'bKash, Nagad, Rocket', icon: Phone },
                { id: 'card', label: 'Credit/Debit Card', description: 'Visa or Mastercard', icon: CreditCard },
                { id: 'netbanking', label: 'Net Banking', description: 'Popular banks', icon: Bank },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedPaymentCategory(option.id)}
                  className={`w-full rounded-3xl border px-5 py-4 text-left transition ${
                    selectedPaymentCategory === option.id
                      ? 'border-indigo-600 bg-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                        <option.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{option.label}</p>
                        <p className="text-sm text-slate-500">{option.description}</p>
                      </div>
                    </div>
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full border ${selectedPaymentCategory === option.id ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white text-slate-500'}`}>
                      ?
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-6">
              {selectedPaymentCategory === 'mobile' && (
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-900">Choose your wallet</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {['bKash', 'Nagad', 'Rocket'].map((wallet) => (
                      <button
                        key={wallet}
                        type="button"
                        onClick={() => setSelectedMobileWallet(wallet)}
                        className={`rounded-3xl border px-4 py-3 text-sm font-semibold transition ${
                          selectedMobileWallet === wallet
                            ? 'border-indigo-600 bg-indigo-600 text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-indigo-300'
                        }`}
                      >
                        {wallet}
                      </button>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-slate-500">You will be redirected to your wallet provider to finish the payment.</p>
                </div>
              )}

              {selectedPaymentCategory === 'card' && (
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Card payment details</p>
                      <p className="text-sm text-slate-500">Securely enter your card information.</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {cardBrand || 'Visa/Mastercard'}
                    </span>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label htmlFor="cardNumber" className="text-sm font-semibold text-slate-900">Card Number</label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        inputMode="numeric"
                        value={cardData.number}
                        onChange={(e) => {
                          const sanitized = e.target.value.replace(/\D/g, '').slice(0, 16);
                          setCardData((prev) => ({ ...prev, number: sanitized }));
                          if (paymentErrors.cardNumber) {
                            setPaymentErrors((prev) => ({ ...prev, cardNumber: '' }));
                          }
                        }}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                          paymentErrors.cardNumber
                            ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                            : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
                        }`}
                      />
                      {paymentErrors.cardNumber && <p className="text-xs text-red-500">{paymentErrors.cardNumber}</p>}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="cardExpiry" className="text-sm font-semibold text-slate-900">Expiry Date</label>
                        <input
                          id="cardExpiry"
                          name="cardExpiry"
                          type="text"
                          inputMode="numeric"
                          value={cardData.expiry}
                          onChange={(e) => {
                            let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
                            if (value.length >= 3) {
                              value = `${value.slice(0, 2)}/${value.slice(2)}`;
                            }
                            setCardData((prev) => ({ ...prev, expiry: value }));
                            if (paymentErrors.cardExpiry) {
                              setPaymentErrors((prev) => ({ ...prev, cardExpiry: '' }));
                            }
                          }}
                          placeholder="MM/YY"
                          className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                            paymentErrors.cardExpiry
                              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                              : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
                          }`}
                        />
                        {paymentErrors.cardExpiry && <p className="text-xs text-red-500">{paymentErrors.cardExpiry}</p>}
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="cardCVV" className="text-sm font-semibold text-slate-900">CVV</label>
                        <input
                          id="cardCVV"
                          name="cardCVV"
                          type="password"
                          inputMode="numeric"
                          value={cardData.cvv}
                          onChange={(e) => {
                            const sanitized = e.target.value.replace(/\D/g, '').slice(0, 3);
                            setCardData((prev) => ({ ...prev, cvv: sanitized }));
                            if (paymentErrors.cardCVV) {
                              setPaymentErrors((prev) => ({ ...prev, cardCVV: '' }));
                            }
                          }}
                          placeholder="123"
                          className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${
                            paymentErrors.cardCVV
                              ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-200'
                              : 'border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100'
                          }`}
                        />
                        {paymentErrors.cardCVV && <p className="text-xs text-red-500">{paymentErrors.cardCVV}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentCategory === 'netbanking' && (
                <div className="rounded-3xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-semibold text-slate-900">Choose your bank</p>
                  <select
                    value={selectedNetBank}
                    onChange={(e) => setSelectedNetBank(e.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-1 focus:ring-indigo-100"
                  >
                    {['Bank Asia', 'BRAC Bank', 'Dutch-Bangla Bank', 'Eastern Bank'].map((bank) => (
                      <option key={bank} value={bank}>{bank}</option>
                    ))}
                  </select>
                  <p className="mt-4 text-sm text-slate-500">Net banking transfers are processed securely through your bank.</p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-full px-8 py-4 text-lg font-bold text-white transition ${
              isSubmitting
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-lg'
            }`}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Verifying payment...
              </span>
            ) : (
              'Complete Purchase'
            )}
          </button>
        </form>
      </section>

      <aside className="space-y-6 h-fit rounded-[2rem] bg-white p-8 shadow-soft sticky top-24">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-900">Order Summary</h2>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Secure
          </span>
        </div>

        <div className="space-y-3 border-b border-slate-200 pb-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900 line-clamp-1">{item.name}</p>
                <p className="text-xs text-slate-600">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

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

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-slate-900">Total</span>
            <span className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</span>
          </div>
          <p className="text-xs text-slate-500 text-center">
            By clicking "Complete Purchase", you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default Checkout;
