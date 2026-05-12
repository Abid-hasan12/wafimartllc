import { createContext, useContext, useEffect, useState } from 'react';
import { productsData, categories as importedCategories } from '../data/productsData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [products] = useState(productsData);
  const [categorySlug, setCategorySlug] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  const categories = [
    { name: 'All Departments', slug: 'all' },
    ...importedCategories,
  ];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = categorySlug === 'all' || product.categorySlug === categorySlug;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppContext.Provider
      value={{
        categories,
        products,
        filteredProducts,
        categorySlug,
        setCategorySlug,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
