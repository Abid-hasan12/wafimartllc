import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { productsData } from '../data/productsData';
import './TrendingNow.css';

// Helper: Get trending products (best sellers or highest ratings)
const getTrendingProducts = () => {
    // productsData is already an array
    const trending = productsData
        .filter((p) => p.badge === 'bestseller' || p.rating >= 4.7)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 12);
    return trending;
};

const TrendingNow = () => {
    // Always get 6 trending products for display
    const trendingProducts = getTrendingProducts().slice(0, 6);
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/productdetails/${id}`);
    };

    return (
        <section className="trending-now-section">
            <div className="trending-header">
                <span className="trending-icon" role="img" aria-label="Trending">🔥</span>
                <h2>Trending Now</h2>
            </div>
            <div
                className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-items-center items-stretch mx-auto"
            >
                {trendingProducts.map((product, idx) => (
                    <div
                        className={`trending-card block${idx === 5 ? ' md:last:hidden lg:last:block' : ''}`}
                        key={product.id}
                        onClick={() => handleCardClick(product.id)}
                        style={{ cursor: 'pointer' }}
                        tabIndex={0}
                        role="button"
                        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCardClick(product.id)}
                    >
                        <div className="trending-img-wrap">
                            <img src={product.image} alt={product.name} />
                            <span className="trending-badge">Trending</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <Link
                    to="/trending-products"
                    className="inline-block px-8 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200 text-lg"
                >
                    Explore More
                </Link>
            </div>
        </section>
    );
};

export default TrendingNow;