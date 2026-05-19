import { useEffect } from 'react';

function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-soft sm:p-12 space-y-8">

                <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Wafi Mart LLC</span>
                    <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">Privacy Policy</h1>
                    <p className="mt-2 text-sm text-slate-500">Last updated: May 2026</p>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-6 text-slate-600 leading-relaxed">
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when creating an account, making a purchase, or communicating with our support team. This includes your name, email address, billing/shipping address, and phone number.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">2. How We Use Your Data</h2>
                        <p>Your data helps us process your transactions quickly, send order tracking updates, provide customer service, and occasionally notify you about exclusive Wafi Mart offers or website improvements.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">3. Data Protection & Security</h2>
                        <p>We implement industry-standard secure socket layer (SSL) encryption to protect your personal info. We never sell, trade, or rent your private identification data to third parties.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">4. Cookies Policy</h2>
                        <p>We use essential cookies to keep track of your shopping cart contents and remember your preferences for a smoother browsing experience on our platform.</p>
                    </section>
                </div>

            </div>
        </div>
    );
}

export default PrivacyPolicy;