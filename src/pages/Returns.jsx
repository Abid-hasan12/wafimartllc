import { useEffect } from 'react';

function Returns() {
    // পেজ লোড হলে একদম উপরে স্ক্রল হবে
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-soft sm:p-12 space-y-8">

                <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Wafi Mart LLC</span>
                    <h1 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900">Return & Refund Policy</h1>
                    <p className="mt-2 text-sm text-slate-500">Last updated: May 2026</p>
                </div>

                <hr className="border-slate-100" />

                <div className="space-y-6 text-slate-600 leading-relaxed">
                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">1. 30-Day Return Window</h2>
                        <p>We want you to be completely satisfied with your purchase. If you are not happy with your product, you can request a return or exchange within <strong>30 days</strong> of receiving your item.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">2. Eligibility for Returns</h2>
                        <p>To be eligible for a return, your item must be unused, in the same condition that you received it, and in its original packaging. Items that show signs of wear or are missing original tags may not be accepted.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">3. Refund Process</h2>
                        <p>Once we receive and inspect your returned item, we will send you an email notification. If approved, your refund will be processed automatically, and a credit will be applied to your original method of payment within 5-7 business days.</p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-xl font-semibold text-slate-900">4. Return Shipping</h2>
                        <p>Customers are responsible for paying their own shipping costs for returning items, unless the return is due to a mistake on our part (e.g., wrong or defective product received).</p>
                    </section>
                </div>

            </div>
        </div>
    );
}

export default Returns;