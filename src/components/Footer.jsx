import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-2">
            <Link to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center transition hover:opacity-85">
              <img
                src="/asset/logow.png"
                alt="WafiMartLLC Logo"
                className="h-32 w-auto object-contain"
              />
            </Link>
            <p className="text-sm leading-6 text-slate-400">
              Your premium e-commerce destination for quality products and exceptional service.
            </p>
            {/* সোশ্যাল মিডিয়া আইকনগুলো */}
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="rounded-full bg-slate-800 p-2.5 text-slate-300 transition hover:bg-blue-600 hover:text-white">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="rounded-full bg-slate-800 p-2.5 text-slate-300 transition hover:bg-pink-600 hover:text-white">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="rounded-full bg-slate-800 p-2.5 text-slate-300 transition hover:bg-sky-500 hover:text-white">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-full bg-slate-800 p-2.5 text-slate-300 transition hover:bg-blue-700 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Quick Links</h3>
            <nav className="space-y-3">
              <Link to="/" className="block text-sm text-slate-400 transition hover:text-white">
                Home
              </Link>
              <Link to="/category/all" className="block text-sm text-slate-400 transition hover:text-white">
                Categories
              </Link>
              <a href="#" className="block text-sm text-slate-400 transition hover:text-white">
                About Us
              </a>
              <a href="#" className="block text-sm text-slate-400 transition hover:text-white">
                Contact
              </a>
            </nav>
          </div>

          {/* Column 3: Customer Service */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Customer Service</h3>
            <nav className="space-y-3">
              {/* 💡 Shipping Policy Link */}
              <Link
                to="/shipping-policy"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block text-sm text-slate-400 transition hover:text-white cursor-pointer"
              >
                Shipping Policy
              </Link>

              {/* 💡 Returns Link */}
              <Link
                to="/returns"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block text-sm text-slate-400 transition hover:text-white cursor-pointer"
              >
                Returns
              </Link>

              {/* 💡 FAQ Link */}
              <Link
                to="/faq"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block text-sm text-slate-400 transition hover:text-white cursor-pointer"
              >
                FAQ
              </Link>

              {/* 💡 Track Order Link */}
              <Link
                to="/track-order"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="block text-sm text-slate-400 transition hover:text-white cursor-pointer"
              >
                Track Order
              </Link>
            </nav>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Newsletter</h3>
            <p className="text-sm text-slate-400">
              Subscribe to get special offers and updates delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="relative flex">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-l-full border border-slate-700 bg-slate-800 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-slate-600 focus:ring-1 focus:ring-slate-600"
                />
                <button
                  type="submit"
                  className="rounded-r-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-green-400">✓ Thanks for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-slate-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-400">
          <p>&copy; 2026 WafiMartLLC. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="transition hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="font-semibold text-slate-300 transition hover:text-white">
              www.wafimartllc.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
