import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    const trendingProducts = getTrendingProducts();
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
            <div className="trending-slider">
                {trendingProducts.map((product) => (
                    <div
                        className="trending-card"
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
        </section>
    );
};

export default TrendingNow;