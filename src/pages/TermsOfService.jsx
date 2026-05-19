import { useEffect } from 'react';

function TermsOfService() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-soft sm:p-12 space-y-8">

                <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Wafi Mart LLC</span>
                    <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">Terms of Service</h1>
                    <p className="mt-2 text-sm text-slate-500">Last updated: May 2026</p>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-6 text-slate-600 leading-relaxed">
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">1. Acceptance of Terms</h2>
                        <p>By accessing and shopping at Wafi Mart LLC, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you may not access our services.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">2. User Accounts</h2>
                        <p>When you create an account with us, you must provide accurate and complete information. You are solely responsible for maintaining the confidentiality of your account username and security PIN.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">3. Orders & Pricing</h2>
                        <p>We reserve the right to refuse or cancel any order for reasons including product availability, errors in product or pricing information, or suspected fraudulent activity. Prices are subject to change without notice.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">4. Limitations of Liability</h2>
                        <p>Wafi Mart LLC shall not be liable for any direct, indirect, or incidental damages resulting from the use or inability to use our platform, products, or shipping services.</p>
                    </section>
                </div>

            </div>
        </div>
    );
}

export default TermsOfService;