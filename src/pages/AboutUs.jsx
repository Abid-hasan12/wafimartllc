import { useEffect } from 'react';
import { ShieldCheck, Truck, Clock, Award } from 'lucide-react';

function AboutUs() {
    // পেজ লোড হলে অটোমেটিক স্ক্রিনের একদম উপরে চলে যাবে
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-16">

            {/* হেডার সেকশন */}
            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-soft sm:p-12 text-center max-w-4xl mx-auto space-y-4">
                <span className="text-xs uppercase tracking-[0.3em] text-indigo-600 font-semibold">Who We Are</span>
                <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">About Wafi Mart LLC</h1>
                <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed md:text-lg">
                    Welcome to Wafi Mart LLC, your premium e-commerce destination dedicated to bringing high-quality products, real-time pricing, and an exceptional shopping experience right to your doorstep.
                </p>
            </div>

            {/* আমাদের বৈশিষ্ট্য / ফিচার সেকশন */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Premium Quality</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">We carefully curate and source only genuine, long-lasting products for our customers.</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <Truck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Reliable Shipping</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Fast, safe, and secure delivery network to ensure your package arrives right on time.</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">24/7 Support</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Our dedicated customer support team is always here to assist with any queries.</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                        <Award className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Secure Payment</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Shop with peace of mind using our industry-standard encrypted checkout processes.</p>
                </div>
            </div>

            {/* মিশন ও ভিশন সেকশন */}
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white border border-slate-100 rounded-[2rem] p-8 md:p-12 shadow-soft">
                <div className="space-y-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Our Mission & Promise</h2>
                    <p className="text-slate-600 leading-relaxed">
                        At Wafi Mart LLC, our mission is simple: to connect people with products they love through a seamless, honest, and modern digital platform. We aim to build long-term trust rather than just making transactions.
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                        Whether you are looking for high-end consumer technology, daily essentials, or unique curated collections, we make sure each item passes a strict quality assessment before shipping.
                    </p>
                </div>

                {/* কাউন্টার / স্ট্যাটস পার্ট */}
                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100/50">
                        <p className="text-3xl font-extrabold text-indigo-600">10K+</p>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Happy Customers</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100/50">
                        <p className="text-3xl font-extrabold text-indigo-600">500+</p>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Premium Products</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100/50">
                        <p className="text-3xl font-extrabold text-indigo-600">99.9%</p>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Satisfaction Rate</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-slate-100/50">
                        <p className="text-3xl font-extrabold text-indigo-600">24/7</p>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">Active Support</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AboutUs;