import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MaintenanceModal from './components/MaintenanceModal';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import OrderDetails from './pages/OrderDetails';
import ShippingPolicy from './pages/ShippingPolicy';
import Returns from './pages/Returns';
import FAQ from './pages/FAQ';
import TrackOrder from './pages/TrackOrder';

function App() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            {/* মেইনটেন্যান্স পপআপ সবার উপরে থাকবে */}
            <MaintenanceModal />

            <Header />

            {/* Scroll to top on route change */}
            <ScrollToTop />

            <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/category/:slug" element={<Category />} />
                    <Route path="/productdetails/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/my-orders" element={<MyOrders />} />
                    <Route path="/my-orders/:orderId" element={<OrderDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/shipping-policy" element={<ShippingPolicy />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/track-order" element={<TrackOrder />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;