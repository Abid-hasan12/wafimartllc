import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import HeroSlider from '../components/HeroSlider';
import TrendingNow from '../components/TrendingNow';
import '../components/TrendingNow.css';

function Home() {
    const { products } = useAppContext();
    const scrollContainers = useRef({});

    const heroSlides = [
        {
            imageUrl: '/asset/category/electronics.png',
            title: 'Electronics Essentials',
            subtitle: 'Discover cutting-edge devices, smart home gear, and premium tech with curated deals.',
            link: '/category/electronics',
        },
        {
            imageUrl: '/asset/category/fashion.png',
            title: 'Fashion Finds',
            subtitle: 'Refresh your wardrobe with trend-forward styles, accessories, and seasonal essentials.',
            link: '/category/fashion',
        },
        {
            imageUrl: '/asset/category/home.png',
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

        const scrollAmount = container.clientWidth * 0.8;

        container.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth',
        });
    };

    const CategorySection = ({ category }) => {
        const categoryProducts = getProductsByCategory(category.slug);

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

                {/* Manual horizontal slider with arrows */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 z-20 flex items-center pl-2">
                        <button
                            type="button"
                            onClick={() => handleScroll('left', category.slug)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-soft transition hover:bg-white"
                            aria-label={`Scroll ${category.name} left`}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="absolute inset-y-0 right-0 z-20 flex items-center pr-2">
                        <button
                            type="button"
                            onClick={() => handleScroll('right', category.slug)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-soft transition hover:bg-white"
                            aria-label={`Scroll ${category.name} right`}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    <div
                        ref={(el) => (scrollContainers.current[category.slug] = el)}
                        className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth py-2 pl-14 pr-14"
                        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                    >
                        {categoryProducts.map((product) => (
                            <div
                                key={product.id}
                                className="flex-shrink-0 min-w-[min(100%,16rem)] sm:min-w-[calc(50%-1rem)] md:min-w-[calc(33.333%-1rem)] lg:min-w-[calc(25%-1rem)]"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    <div className="pointer-events-none absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-slate-50 to-transparent z-10" />
                    <div className="pointer-events-none absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-slate-50 to-transparent z-10" />
                </div>

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
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {[
                        {
                            name: 'Electronics',
                            slug: 'electronics',
                            image: '/asset/category/electronics.png',
                        },
                        {
                            name: 'Fashion',
                            slug: 'fashion',
                            image: '/asset/category/fashion.png',
                        },
                        {
                            name: 'Home & Kitchen',
                            slug: 'home-kitchen',
                            image: '/asset/category/home.png',
                        },
                        {
                            name: 'Wellness',
                            slug: 'wellness',
                            image: '/asset/category/wellness.png',
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

            {/* Trending Now Section */}
            <TrendingNow />

            {/* Category Slider Sections */}
            {categories.map(category => (
                <CategorySection key={category.slug} category={category} />
            ))}
        </div>
    );
}

export default Home;
