import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Clock3, CheckCircle2, ArrowRight } from 'lucide-react';

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

const badgeStyles = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Processing: 'bg-blue-100 text-blue-800',
  Shipped: 'bg-blue-100 text-blue-800',
  Delivered: 'bg-emerald-100 text-emerald-800',
};

function MyOrders() {
  const { user } = useAuth();
  const allOrders = getOrdersFromStorage();
  const filteredOrders = user
    ? allOrders.filter((order) => order.customerUsername === user.username)
    : allOrders;

  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
  );

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-slate-900">My Orders</h1>
        <p className="mt-2 text-slate-600">
          Review your recent orders and track progress from pending to delivered.
        </p>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-soft">
          <div className="mx-auto mb-8 flex h-64 w-full max-w-2xl items-center justify-center">
            <svg viewBox="0 0 640 512" className="h-full w-full text-slate-300" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M608 128H416l-32-96H256l-32 96H32C14.33 128 0 142.3 0 160v240c0 17.7 14.33 32 32 32h16v64c0 17.7 14.33 32 32 32h416c17.7 0 32-14.3 32-32v-64h16c17.7 0 32-14.3 32-32V160C640 142.3 625.7 128 608 128zM256 64h128l16 48H240L256 64zM96 176h96v96H96V176zM224 176h192v96H224V176zM448 176h96v96h-96V176zM48 408V304h64v104H48zM528 408V304h64v104H528z" />
            </svg>
          </div>
          <Package className="mx-auto h-14 w-14 text-slate-400" />
          <h2 className="mt-6 text-2xl font-semibold text-slate-900">No orders yet</h2>
          <p className="mt-3 text-slate-600">
            Start shopping to build your first order and track its progress here.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-4 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Start Shopping
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {sortedOrders.map((order) => {
            const status = getOrderStatus(order.orderDate);
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }).format(new Date(order.orderDate));

            return (
              <div key={order.orderId} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Order ID</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">#{order.orderId}</p>
                  </div>
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${badgeStyles[status] || 'bg-slate-100 text-slate-800'}`}>
                    {status}
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Date</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">{formattedDate}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Total</p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">${order.orderTotal.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
                  <p>{order.cartItems.length} item{order.cartItems.length !== 1 ? 's' : ''} ordered</p>
                  <p>Delivered to {order.customerData.fullName}</p>
                </div>

                <Link
                  to={`/my-orders/${order.orderId}`}
                  className="mt-6 inline-flex items-center justify-between rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
