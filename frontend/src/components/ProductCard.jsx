// components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const img = product.images?.[0] || 'https://via.placeholder.com/400x400?text=No+Image';

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group"
    >
      <Link to={`/products/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-dark-600">
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {!product.isAvailable && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white/60 uppercase tracking-widest text-xs">Out of Stock</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="bg-brand-500 text-white text-xs px-2 py-1 uppercase tracking-widest">
              {product.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-brand-400 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-brand-500 font-bold">${product.price.toFixed(2)}</span>
            <span className="text-white/40 text-xs">MOQ: {product.MOQ} pcs</span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.isAvailable}
            className="mt-3 w-full btn-outline text-xs py-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {product.isAvailable ? 'Request Quote' : 'Unavailable'}
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
