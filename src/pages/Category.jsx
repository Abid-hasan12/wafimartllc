import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

function Category() {
  const { slug } = useParams();
  const { categories, products, searchQuery } = useAppContext();

  const category = categories.find((item) => item.slug === slug) || categories[0];

  const productsInCategory = useMemo(
    () => products.filter((product) => slug === 'all' || product.categorySlug === slug),
    [products, slug]
  );

  const filteredProducts = productsInCategory.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8"> 
      <div className="rounded-[2rem] bg-white p-8 shadow-soft sm:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{category.name}</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900">Shop {category.name} products</h1>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600">
            Discover relevant products, real-time pricing, and expert selections tailored to this category.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600 shadow-soft">
          No products found for this category. Try another category or update your search.
        </div>
      )}
    </div>
  );
}

export default Category;
