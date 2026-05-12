import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';

function Home() {
    const { products } = useAppContext();
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const scrollContainers = useRef({});

    const heroSlides = [
        {
            imageUrl: 'https://images.unsplash.com/photo-1510557880182-3f8f9ac5a1b6?auto=format&fit=crop&w=1200&q=80',
            title: 'Electronics Essentials',
            subtitle: 'Discover cutting-edge devices, smart home gear, and premium tech with curated deals.',
            link: '/category/electronics',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80',
            title: 'Fashion Finds',
            subtitle: 'Refresh your wardrobe with trend-forward styles, accessories, and seasonal essentials.',
            link: '/category/fashion',
        },
        {
            imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
            title: 'Home Decor Updates',
            subtitle: 'Elevate your space with stylish furniture, decor accents, and curated inspiration.',
            link: '/category/home-kitchen',
        },
    ];

    const categories = [
        { name: 'Electronics', slug: 'electronics' },
        { name: 'Home & Kitchen', slug: 'home-kitchen' },
        { name: 'Wellness', slug: 'wellness' },
        { name: 'Fashion', slug: 'fashion' },
    ];

    const getProductsByCategory = (slug) => {
        return products.filter(p => p.categorySlug === slug);
    };

    const handleScroll = (direction, categorySlug) => {
        const container = scrollContainers.current[categorySlug];
        if (!container) return;

        const scrollAmount = 300;
        const newPosition = (scrollPositions[categorySlug] || 0) + (direction === 'left' ? -scrollAmount : scrollAmount);
        
        container.scrollTo({
            left: newPosition,
            behavior: 'smooth',
        });
        
        setScrollPositions(prev => ({
            ...prev,
            [categorySlug]: newPosition
        }));
    };

    const CategorySection = ({ category }) => {
        const categoryProducts = getProductsByCategory(category.slug);
        const isHovered = hoveredCategory === category.slug;
        
        return (
            <section key={category.slug} className="space-y-6 py-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{category.name}</p>
                        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Explore {category.name}</h2>
                    </div>
                    <Link
                        to={`/category/${category.slug}`}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition"
                    >
                        View all {category.name} →
                    </Link>
                </div>

                {/* Auto-Scrolling Horizontal Slider */}
                <div 
                    className="relative"
                    onMouseEnter={() => setHoveredCategory(category.slug)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    onTouchStart={() => setHoveredCategory(category.slug)}
                    onTouchEnd={() => setHoveredCategory(null)}
                >
                    <div
                        ref={(el) => (scrollContainers.current[category.slug] = el)}
                        className={`flex gap-6 overflow-hidden scrollbar-hide ${isHovered ? 'paused-scroll' : ''}`}
                    >
                        {/* Duplicate products for seamless loop */}
                        {[...categoryProducts, ...categoryProducts].map((product, idx) => (
                            <div 
                                key={`${product.id}-${idx}`} 
                                className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                                onMouseEnter={() => setHoveredCategory(category.slug)}
                                onMouseLeave={() => setHoveredCategory(null)}
                                onTouchStart={() => setHoveredCategory(category.slug)}
                                onTouchEnd={() => setHoveredCategory(null)}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Gradient overlay at edges for polish */}
                    <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10" />
                    <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-slate-50 to-transparent pointer-events-none z-10" />
                </div>

                {/* View All Button */}
                <div className="text-center pt-6">
                    <Link
                        to={`/category/${category.slug}`}
                        className="inline-block rounded-full bg-indigo-600 text-white px-8 py-3 font-semibold transition hover:bg-indigo-700"
                    >
                        View All {category.name} Products
                    </Link>
                </div>
            </section>
        );
    };

    return (
        <div className="space-y-10">
            <HeroSlider slides={heroSlides} />

            {/* Category Overview Section */}
            <section className="space-y-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Featured categories</p>
                        <h2 className="mt-2 text-3xl font-semibold text-slate-900">Shop by department</h2>
                    </div>
                    <p className="max-w-xl text-sm leading-6 text-slate-600">
                        Explore our top-selling departments with expertly curated selections and exclusive deals.
                    </p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        {
                            name: 'Electronics',
                            slug: 'electronics',
                            image: 'https://images.unsplash.com/photo-1505694915661-3aa76541e5ad?auto=format&fit=crop&w=600&q=80',
                        },
                        {
                            name: 'Fashion',
                            slug: 'fashion',
                            image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
                        },
                        {
                            name: 'Home & Kitchen',
                            slug: 'home-kitchen',
                            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=600&q=80',
                        },
                        {
                            name: 'Wellness',
                            slug: 'wellness',
                            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
                        },
                    ].map((cat) => (
                        <Link
                            key={cat.slug}
                            to={`/category/${cat.slug}`}
                            className="group relative overflow-hidden rounded-3xl shadow-soft transition hover:shadow-xl"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                            <div className="absolute inset-0 flex items-end justify-start p-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{cat.name}</h3>
                                    <p className="mt-2 text-sm text-slate-200">Shop now</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Category Slider Sections */}
            {categories.map(category => (
                <CategorySection key={category.slug} category={category} />
            ))}
        </div>
    );
}

export default Home;
