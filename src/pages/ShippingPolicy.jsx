import { useEffect } from 'react';

function ShippingPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-soft sm:p-12 space-y-8">

                <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Wafi Mart LLC</span>
                    <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">Shipping Policy</h1>
                    <p className="mt-2 text-sm text-slate-500">Last updated: May 2026</p>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-6 text-slate-600 leading-relaxed">
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">1. Delivery Timeline</h2>
                        <p>We process all orders within 1-2 business days. Standard shipping usually takes 3-5 business days for domestic deliveries, while express shipping options take 1-2 business days.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">2. Shipping Charges</h2>
                        <p>Shipping charges are calculated at checkout based on your location and selected delivery speed. We offer <strong>Free Standard Shipping</strong> on all orders above $50.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">3. Tracking Your Order</h2>
                        <p>Once your order has shipped, you will receive a confirmation email containing your tracking number. You can use this number on our "Track Order" page to monitor your shipment's progress.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">4. Damaged or Lost Packages</h2>
                        <p>Wafi Mart LLC is responsible for your order until it safely reaches your doorstep. If your package arrives damaged or gets lost during transit, please contact our support team immediately for a replacement or full refund.</p>
                    </section>
                </div>

            </div>
        </div>
    );
}

export default ShippingPolicy;