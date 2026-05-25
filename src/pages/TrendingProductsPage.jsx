import React from 'react';
import { useNavigate } from 'react-router-dom';
import { productsData } from '../data/productsData';

// Helper: Get trending products (best sellers or highest ratings)
const getTrendingProducts = () => {
    return productsData
        .filter((p) => p.badge === 'bestseller' || p.rating >= 4.7)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0));
};

const TrendingProductsPage = () => {
    const trendingProducts = getTrendingProducts();
    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/productdetails/${id}`);
    };

    return (
        <section className="trending-now-section">
            <div className="trending-header mb-6">
                <span className="trending-icon" role="img" aria-label="Trending">🔥</span>
                <h2 className="text-2xl font-bold">All Trending Products</h2>
            </div>
            <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 justify-items-center items-stretch mx-auto"
            >
                {trendingProducts.map((product) => (
                    <div
                        className="flex flex-col justify-between items-center text-center border rounded-xl p-4 shadow-sm bg-white h-full w-full max-w-[250px]"
                        key={product.id}
                        onClick={() => handleCardClick(product.id)}
                        style={{ cursor: 'pointer' }}
                        tabIndex={0}
                        role="button"
                        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && handleCardClick(product.id)}
                    >
                        <div className="w-full aspect-square flex items-center justify-center overflow-hidden mb-3">
                            <img src={product.image} alt={product.name} className="object-contain w-full h-full" />
                        </div>
                        <span className="trending-badge mb-2">Trending</span>
                        <div className="text-sm font-semibold line-clamp-2 min-h-[40px]">{product.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{product.category}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrendingProductsPage;
