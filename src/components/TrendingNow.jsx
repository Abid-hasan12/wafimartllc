import React from 'react';
import { productsData } from '../data/productsData';
import './TrendingNow.css';

// Helper: Get trending products (best sellers or highest ratings)
const getTrendingProducts = () => {
    // Flatten all categories
    const allProducts = Object.values(productsData).flat();
    // Filter best sellers or top ratings
    const trending = allProducts
        .filter(
            (p) => p.isBestSeller || p.rating >= 4.7
        )
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 12);
    return trending;
};

const TrendingNow = () => {
    const trendingProducts = getTrendingProducts();

    return (
        <section className="trending-now-section">
            <div className="trending-header">
                <span className="trending-icon" role="img" aria-label="Trending">🔥</span>
                <h2>Trending Now</h2>
            </div>
            <div className="trending-slider">
                {trendingProducts.map((product) => (
                    <div className="trending-card" key={product.id}>
                        <div className="trending-img-wrap">
                            <img src={product.image} alt={product.name} />
                            <span className="trending-badge">Trending</span>
                        </div>
                        <div className="trending-info">
                            {/* টাইটেল স্লাইস করার দরকার নেই, CSS handles line-clamp */}
                            <div className="trending-name" title={product.name}>
                                {product.name}
                            </div>
                            {/* প্রাইস ডিভটি এখান থেকে বাদ দেওয়া হয়েছে */}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrendingNow;