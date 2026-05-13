import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Grid } from 'lucide-react';
import logo from '../assets/logo.png';

function Header() {
    const { categories, searchQuery, setSearchQuery } = useAppContext();
    const { totalItems, getCartCount } = useCart();
    const { user, logout } = useAuth();
    const cartCount = getCartCount();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearchKey = (event) => {
        if (event.key === 'Enter') {
            navigate('/category/all');
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-blue-800 bg-blue-700 shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <img src={logo} alt="WafiMartLLC Logo" className="h-12 w-auto object-contain" />
                    </Link>

                    <div className="relative hidden md:block">
                        <button
                            type="button"
                            onClick={() => setCategoryOpen((current) => !current)}
                            className="inline-flex items-center gap-2 rounded-full border border-blue-700 bg-blue-800 px-4 py-2 text-sm font-medium text-white transition hover:border-blue-400 hover:bg-blue-700"
                        >
                            <Grid className="h-4 w-4" />
                            Shop by Category
                            <ChevronDown className={`h-4 w-4 transition ${categoryOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div
                            className={`absolute left-0 top-full z-20 mt-2 w-72 overflow-hidden rounded-3xl border border-blue-700 bg-slate-950 shadow-xl transition duration-200 ${categoryOpen ? 'opacity-100 visible scale-100' : 'pointer-events-none opacity-0 scale-95 invisible'
                                }`}
                        >
                            <div className="p-4">
                                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-slate-400">Categories</p>
                                <div className="space-y-1">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.slug}
                                            to={`/category/${category.slug}`}
                                            className="block rounded-2xl px-4 py-3 text-sm text-slate-100 transition hover:bg-blue-800"
                                            onClick={() => setCategoryOpen(false)}
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/80" />
                        <input
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            onKeyDown={handleSearchKey}
                            placeholder="Search products, brands, categories"
                            className="w-full rounded-full border border-blue-700 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                className="inline-flex items-center gap-2 rounded-full border border-blue-700 bg-blue-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                <User className="h-4 w-4 text-white" />
                                {user.username}
                                <ChevronDown className={`h-4 w-4 transition ${userDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {userDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-blue-700 bg-white shadow-lg z-50">
                                    <button
                                        type="button"
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 font-semibold border-b border-gray-200"
                                        onClick={() => {
                                            navigate('/profile');
                                            setUserDropdownOpen(false);
                                        }}
                                    >
                                        👤 Profile
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 font-semibold border-b border-gray-200"
                                        onClick={() => {
                                            navigate('/my-orders');
                                            setUserDropdownOpen(false);
                                        }}
                                    >
                                        📦 My Orders
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-semibold"
                                        onClick={() => {
                                            logout();
                                            setUserDropdownOpen(false);
                                            navigate('/');
                                        }}
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 rounded-full border border-blue-700 bg-blue-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            <User className="h-4 w-4 text-white" />
                            Sign In
                        </Link>
                    )}
                    <Link
                        to="/cart"
                        className="relative inline-flex items-center gap-2 rounded-full border border-blue-700 bg-blue-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        <ShoppingCart className="h-4 w-4 text-white" />
                        Cart
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                </div>

                <button
                    type="button"
                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-blue-700 bg-blue-800 text-white transition hover:bg-blue-700 md:hidden"
                    onClick={() => setMobileOpen((current) => !current)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            <div className={`md:hidden border-t border-blue-800 bg-blue-900 ${mobileOpen ? 'block' : 'hidden'}`}>
                <div className="space-y-3 px-4 py-4">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
                        <input
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            onKeyDown={handleSearchKey}
                            placeholder="Search products, brands, categories"
                            className="w-full rounded-full border border-blue-700 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() => setCategoryOpen((current) => !current)}
                        className="flex w-full items-center justify-between rounded-3xl border border-blue-700 bg-blue-800 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        <span>Shop by Category</span>
                        <ChevronDown className={`h-4 w-4 transition ${categoryOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {categoryOpen && (
                        <div className="space-y-1 rounded-3xl border border-blue-700 bg-slate-950 p-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.slug}
                                    to={`/category/${category.slug}`}
                                    className="block rounded-2xl px-4 py-3 text-sm text-slate-100 transition hover:bg-blue-800"
                                    onClick={() => {
                                        setCategoryOpen(false);
                                        setMobileOpen(false);
                                    }}
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    )}

                    {user ? (
                        <div className="w-full space-y-2">
                            <button
                                type="button"
                                onClick={() => {
                                    navigate('/profile');
                                    setMobileOpen(false);
                                }}
                                className="flex w-full items-center justify-between rounded-3xl border border-blue-700 bg-blue-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                <span>👤 Profile ({user.username})</span>
                                <User className="h-4 w-4 text-white" />
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    navigate('/my-orders');
                                    setMobileOpen(false);
                                }}
                                className="flex w-full items-center justify-between rounded-3xl border border-blue-700 bg-blue-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                <span>📦 My Orders</span>
                                <ShoppingCart className="h-4 w-4 text-white" />
                            </button>
                            <button
                                onClick={() => {
                                    logout();
                                    setMobileOpen(false);
                                    navigate('/');
                                }}
                                className="flex w-full items-center justify-between rounded-3xl border border-blue-700 bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
                            >
                                <span>🚪 Logout</span>
                                <User className="h-4 w-4 text-white" />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="flex items-center justify-between rounded-3xl border border-blue-700 bg-blue-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                            onClick={() => setMobileOpen(false)}
                        >
                            <span>Sign In</span>
                            <User className="h-4 w-4 text-white" />
                        </Link>
                    )}
                    <Link
                        to="/cart"
                        className="relative flex items-center justify-between rounded-3xl border border-blue-700 bg-blue-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                        onClick={() => setMobileOpen(false)}
                    >
                        <span>Cart</span>
                        <div className="relative">
                            <ShoppingCart className="h-4 w-4" />
                            {totalItems > 0 && (
                                <span className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                    {totalItems}
                                </span>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
