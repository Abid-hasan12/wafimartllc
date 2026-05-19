import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

function ContactUs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        // 💡 এখানে ফিউচারে ব্যাকএন্ড এপিআই কানেক্ট করা যাবে
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 space-y-12">

            {/* হেডার */}
            <div className="text-center max-w-xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-indigo-600 font-semibold">Get In Touch</span>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Contact Wafi Mart LLC</h1>
                <p className="text-sm text-slate-500">Have questions about a product, shipping, or orders? Drop us a message!</p>
            </div>

            <div className="grid md:grid-cols-5 gap-8 bg-white border border-slate-100 rounded-[2rem] p-6 md:p-10 shadow-soft">

                {/* বাম পাশ: ইনফো কার্ড */}
                <div className="md:col-span-2 bg-slate-900 rounded-2xl p-6 md:p-8 text-white flex flex-col justify-between space-y-8">
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold">Contact Information</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Fill out the form and our customer success team will get back to you within 24 hours.</p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-800 rounded-xl text-indigo-400"><Phone className="w-5 h-5" /></div>
                                <div><p className="text-xs text-slate-400">Call Us</p><p className="text-sm font-semibold">+880 1234-567890</p></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-800 rounded-xl text-indigo-400"><Mail className="w-5 h-5" /></div>
                                <div><p className="text-xs text-slate-400">Email Us</p><p className="text-sm font-semibold">support@wafimartllc.com</p></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-800 rounded-xl text-indigo-400 mt-0.5"><MapPin className="w-5 h-5" /></div>
                                <div><p className="text-xs text-slate-400">Our Office</p><p className="text-sm font-semibold leading-relaxed">Banasree, Rampura, Dhaka</p></div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 text-center md:text-left">
                        Wafi Mart LLC © 2026. All Rights Reserved.
                    </div>
                </div>

                {/* ডান পাশ: কন্টাক্ট ফর্ম */}
                <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5 flex flex-col justify-center">
                    {submitted && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-sm font-semibold animate-fade-in">
                            🎉 Thank you! Your message has been sent successfully.
                        </div>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text" required placeholder="John Doe"
                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email" required placeholder="john@example.com"
                                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Subject (Optional)</label>
                        <input
                            type="text" placeholder="How can we help you?"
                            value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Your Message</label>
                        <textarea
                            rows="4" required placeholder="Write your message here..."
                            value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:bg-white resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto self-end flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-700 shadow-md shadow-indigo-100"
                    >
                        <Send className="w-4 h-4" />
                        Send Message
                    </button>
                </form>

            </div>
        </div>
    );
}

export default ContactUs;