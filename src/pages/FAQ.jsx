import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

function FAQ() {
    // পেজ লোড হলে একদম উপরে স্ক্রল হবে
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // কোন প্রশ্নটা ওপেন আছে তা ট্র্যাক করার জন্য স্টেট (ডিফল্ট প্রথমটা ওপেন থাকবে)
    const [openIndex, setOpenIndex] = useState(0);

    const faqData = [
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit/debit cards, PayPal, and secure mobile banking payments. All transactions are fully encrypted and secured."
        },
        {
            question: "Can I change or cancel my order?",
            answer: "You can change or cancel your order within 2 hours of placing it. Please contact our support team immediately with your order ID to make changes."
        },
        {
            question: "Do you ship internationally?",
            answer: "Currently, Wafi Mart LLC primarily delivers domestically. However, we are expanding our services rapidly. Please check our Shipping Policy page for the most updated delivery locations."
        },
        {
            question: "How do I return a product?",
            answer: "If you are not satisfied with your purchase, you can return it within 30 days. The item must be unused and in its original packaging. Please check our Returns page for detailed instructions."
        },
        {
            question: "Is there a warranty on electronic products?",
            answer: "Yes, all our electronic products and premium gadgets come with a standard 1-year brand warranty unless specified otherwise on the product details page."
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
            <div className="rounded-[2rem] bg-white p-8 border border-slate-100 shadow-soft sm:p-12 space-y-8">

                <div className="text-center max-w-xl mx-auto space-y-2">
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Have Questions?</span>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Frequently Asked Questions</h1>
                    <p className="text-sm text-slate-500">Find quick answers to the most common inquiries about Wafi Mart LLC.</p>
                </div>

                <hr className="border-slate-100" />

                {/* FAQ Accordion List */}
                <div className="space-y-4">
                    {faqData.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className={`rounded-2xl border transition-all duration-200 ${isOpen ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 bg-white hover:border-slate-200'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                    className="flex w-full items-center justify-between p-5 text-left font-semibold text-slate-900 md:text-lg"
                                >
                                    <span>{faq.question}</span>
                                    <span className={`ml-4 shrink-0 rounded-full p-1 bg-slate-50 border border-slate-100 text-slate-600 transition-transform ${isOpen ? 'rotate-180 text-indigo-600' : ''}`}>
                                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                    </span>
                                </button>

                                {/* অ্যানিমেটেড কন্টেন্ট হোল্ডার */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 border-t border-slate-100/50' : 'max-h-0'
                                        }`}
                                >
                                    <p className="p-5 text-sm md:text-base text-slate-600 leading-relaxed bg-white rounded-b-2xl">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default FAQ;