import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, CheckCircle2, Package, Truck, MapPin, ArrowLeft } from 'lucide-react';

const orderSteps = [
  { label: 'Ordered', icon: ShoppingBag },
  { label: 'Confirmed', icon: CheckCircle2 },
  { label: 'Shipped', icon: Package },
  { label: 'Out for Delivery', icon: Truck },
  { label: 'Delivered', icon: MapPin },
];

const getOrdersFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem('wafi_orders')) || [];
  } catch {
    return [];
  }
};

const getOrderStatus = (orderDate) => {
  const ageMs = Date.now() - new Date(orderDate).getTime();
  if (ageMs < 3600000) return 'Pending';
  if (ageMs < 86400000) return 'Processing';
  if (ageMs < 259200000) return 'Shipped';
  return 'Delivered';
};

const getProgressStep = (orderDate) => {
  const ageMs = Date.now() - new Date(orderDate).getTime();
  if (ageMs < 3600000) return 1;
  if (ageMs < 86400000) return 2;
  if (ageMs < 259200000) return 3;
  if (ageMs < 345600000) return 4;
  return 5;
};

const formatDate = (orderDate) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(orderDate));

const getStatusBadge = (status) => {
  const styles = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Processing: 'bg-sky-100 text-sky-800',
    Shipped: 'bg-indigo-100 text-indigo-800',
    Delivered: 'bg-emerald-100 text-emerald-800',
  };
  return styles[status] || 'bg-slate-100 text-slate-800';
};

function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const order = useMemo(() => {
    const existingOrders = getOrdersFromStorage();
    return existingOrders.find((item) => item.orderId === orderId);
  }, [orderId]);

  if (!order) {
    return (
      <div className="rounded-[2rem] bg-white p-12 text-center shadow-soft">
        <h1 className="text-3xl font-semibold text-slate-900">Order not found</h1>
        <p className="mt-4 text-slate-600">We couldn't locate this order. Please check your order list or try again.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate('/my-orders')}
            className="rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Back to My Orders
          </button>
          <Link
            to="/"
            className="rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  const status = getOrderStatus(order.orderDate);
  const activeStep = getProgressStep(order.orderDate);

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-soft">
        <button
          type="button"
          onClick={() => navigate('/my-orders')}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to orders
        </button>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Order #{order.orderId}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadge(status)}`}>
                {status}
              </span>
              <span className="text-sm text-slate-500">Placed on {formatDate(order.orderDate)}</span>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Order total</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">${order.orderTotal.toFixed(2)}</p>
            <p className="mt-3 text-sm text-slate-600">{order.cartItems.length} item{order.cartItems.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <section className="rounded-[2rem] bg-white p-8 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">Order tracking</h2>
        <div className="mt-8 space-y-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-4">
            {orderSteps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = index + 1 <= activeStep;
              return (
                <div key={step.label} className="relative flex min-w-[12rem] flex-col items-center gap-3 text-center">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full border-2 ${
                      isCompleted ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-500'
                    }`}
                  >
                    <StepIcon className="h-6 w-6" />
                  </div>
                  <span className={`text-sm font-semibold ${isCompleted ? 'text-slate-900' : 'text-slate-500'}`}>
                    {step.label}
                  </span>
                  {index < orderSteps.length - 1 && (
                    <span className={`absolute right-0 top-1/2 h-1 w-[calc(100%+4rem)] -translate-y-1/2 ${isCompleted ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold text-slate-900">Order progress</p>
            <p className="mt-3 text-sm text-slate-600">
              Orders typically move from pending to processing, then shipped, out for delivery, and finally delivered.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Ordered items</h2>
          <div className="mt-6 space-y-4">
            {order.cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-3xl border border-slate-200 p-4">
                <img src={item.image} alt={item.name} className="h-20 w-20 rounded-3xl object-cover" />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-soft">
          <h2 className="text-xl font-semibold text-slate-900">Shipping details</h2>
          <div className="mt-6 space-y-3 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">{order.customerData.fullName}</p>
            <p>{order.customerData.fullAddress}</p>
            <p>{order.customerData.area}, {order.customerData.city}</p>
            <p>{order.customerData.phoneNumber}</p>
            <p className="mt-4 text-sm text-slate-500">Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OrderDetails;
