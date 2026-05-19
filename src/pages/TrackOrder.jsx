import { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, Search } from 'lucide-react';

function TrackOrder() {
    // পেজ লোড হলে একদম উপরে স্ক্রল হবে
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [orderId, setOrderId] = useState('');
    const [trackingData, setTrackingData] = useState(null);
    const [searched, setSearched] = useState(false);

    const handleTrack = (e) => {
        e.preventDefault();
        if (!orderId.trim()) return;

        // 💡 এখানে একটি ফেক বা ডামি ট্র্যাকিং ডাটা জেনারেট করা হচ্ছে টেস্টিংয়ের জন্য
        setSearched(true);
        setTrackingData({
            id: orderId.toUpperCase(),
            status: 'Shipped', // কারেন্ট স্ট্যাটাস
            estimatedDelivery: 'May 24, 2026',
            steps: [
                { title: 'Order Placed', desc: 'We have received your order.', date: 'May 18, 2026', done: true },
                { title: 'Processing', desc: 'Your items have been packed and quality checked.', date: 'May 19, 2026', done: true },
                { title: 'Shipped', desc: 'Our courier partner has picked up your package.', date: 'May 19, 2026', done: true },
                { title: 'Out for Delivery', desc: 'Package is near your local hub.', date: 'Pending', done: false },
            ]
        });
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-soft sm:p-12 space-y-8">

                {/* হেডার */}
                <div className="text-center max-w-xl mx-auto space-y-2">
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Wafi Mart LLC</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Track Your Order</h1>
                    <p className="text-sm text-slate-500">Enter your order ID to see the real-time status of your shipment.</p>
                </div>

                <hr className="border-slate-100" />

                {/* সার্চ ফর্ম */}
                <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Enter Order ID (e.g., WM-1024)"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded-2xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        Track Status
                    </button>
                </form>

                {/* ট্র্যাকিং রেজাল্ট টাইমলাইন */}
                {searched && trackingData && (
                    <div className="mt-10 border-t border-slate-100 pt-8 space-y-8 animate-fade-in">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Order ID</p>
                                <p className="text-lg font-bold text-slate-900">{trackingData.id}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estimated Delivery</p>
                                <p className="text-lg font-bold text-indigo-600">{trackingData.estimatedDelivery}</p>
                            </div>
                        </div>

                        {/* টাইমলাইন ডিজাইন */}
                        <div className="relative border-l-2 border-slate-100 ml-4 md:ml-6 space-y-8">
                            {trackingData.steps.map((step, index) => (
                                <div key={index} className="relative pl-8 md:pl-10">
                                    {/* আইকন ডট */}
                                    <span className={`absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-4 bg-white transition-all ${step.done ? 'border-indigo-600 text-indigo-600 shadow-sm' : 'border-slate-100 text-slate-300'
                                        }`}>
                                        {index === 0 && <Clock className="h-3 w-3" />}
                                        {index === 1 && <Package className="h-3 w-3" />}
                                        {index === 2 && <Truck className="h-3 w-3" />}
                                        {index === 3 && <CheckCircle className="h-3 w-3" />}
                                    </span>

                                    {/* কন্টেন্ট */}
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className={`font-semibold md:text-lg ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                                                {step.title}
                                            </h3>
                                            <span className="text-xs font-medium text-slate-400">{step.date}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 max-w-xl">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default TrackOrder;