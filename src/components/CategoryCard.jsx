import { Link } from 'react-router-dom';

function CategoryCard({ category }) {
  return (
    <Link
      to={`/category/${category.slug}`}
      className="group flex min-h-[120px] flex-1 flex-col justify-center rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-soft transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl"
    >
      <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Category</span>
      <h3 className="mt-3 text-xl font-semibold tracking-tight group-hover:text-slate-800">{category.name}</h3>
      <span className="mt-4 text-sm text-slate-500">Browse curated products</span>
    </Link>
  );
}

export default CategoryCard;
