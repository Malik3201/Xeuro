// pages/Products.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/LoadingSkeleton';
import SEOHead from '../components/SEOHead';
import { FiSearch, FiSliders } from 'react-icons/fi';

const CATEGORIES = ['All', 'Sportswear', 'Hosiery', 'Sublimation', 'Teamwear', 'Custom'];

export default function Products() {
  const dispatch = useDispatch();
  const { items, loading, total, pages } = useSelector((s) => s.products);
  const [filters, setFilters] = useState({ category: '', search: '', page: 1 });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.search) params.search = filters.search;
    params.page = filters.page;
    dispatch(fetchProducts(params));
  }, [filters, dispatch]);

  const setCategory = (cat) =>
    setFilters((f) => ({ ...f, category: cat === 'All' ? '' : cat, page: 1 }));

  return (
    <>
      <SEOHead title="Products — Xeuro Sports" description="Browse our full range of sportswear and hosiery products." />

      <div className="min-h-screen pt-20">
        {/* Header */}
        <div className="bg-dark-800 border-b border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="section-title">OUR <span className="text-brand-500">PRODUCTS</span></h1>
            <p className="text-white/40 mt-2">{total} products available</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Search + Filter bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search products..."
                className="input-field pl-10"
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-outline flex items-center gap-2 md:hidden"
            >
              <FiSliders /> Filters
            </button>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-widest rounded-sm transition-all
                  ${(filters.category === '' && cat === 'All') || filters.category === cat
                    ? 'bg-brand-500 text-white'
                    : 'border border-white/10 text-white/50 hover:border-brand-500/50 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <ProductGridSkeleton count={12} />
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-xl font-display">NO PRODUCTS FOUND</p>
              <p className="text-white/20 text-sm mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setFilters((f) => ({ ...f, page }))}
                  className={`w-10 h-10 text-sm rounded-sm transition-all
                    ${filters.page === page
                      ? 'bg-brand-500 text-white'
                      : 'border border-white/10 text-white/50 hover:border-brand-500'
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
