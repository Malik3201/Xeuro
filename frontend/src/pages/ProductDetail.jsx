// pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowLeft, FiCheck } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import toast from 'react-hot-toast';
import api from '../utils/api';
import SEOHead from '../components/SEOHead';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(50);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(({ data }) => { setProduct(data); setQuantity(data.MOQ); })
      .catch(() => toast.error('Product not found'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-white/30 font-display text-4xl animate-pulse">LOADING...</div>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="text-center">
        <p className="text-white/30 font-display text-4xl">PRODUCT NOT FOUND</p>
        <Link to="/products" className="btn-outline mt-6 inline-flex items-center gap-2">
          <FiArrowLeft /> Back to Products
        </Link>
      </div>
    </div>
  );

  const imgs = product.images?.length ? product.images : [{ url: 'https://via.placeholder.com/800?text=No+Image' }];
  const customizations = Object.entries(product.customizationOptions || {})
    .filter(([, v]) => v)
    .map(([k]) => ({ sublimation: 'Sublimation', embroidery: 'Embroidery', screenPrint: 'Screen Print', privateLabel: 'Private Label' }[k]));

  const waMsg = `Hi Xeuro Sports! I'm interested in ${product.name} (Qty: ${quantity}). Please send a quote.`;

  return (
    <>
      <SEOHead title={`${product.name} — Xeuro Sports`} description={product.description?.slice(0, 160)} />

      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <Link to="/products" className="inline-flex items-center gap-2 text-white/40 hover:text-brand-500 text-sm mb-8 transition-colors">
            <FiArrowLeft /> Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Images */}
            <div>
              <div className="aspect-square bg-dark-700 rounded-sm overflow-hidden mb-4">
                <motion.img
                  key={activeImg}
                  src={imgs[activeImg]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex gap-3">
                {imgs.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors
                      ${activeImg === i ? 'border-brand-500' : 'border-transparent'}`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="bg-brand-500 text-white text-xs px-2 py-1 uppercase tracking-widest">
                {product.category}
              </span>
              <h1 className="font-display text-5xl text-white mt-4 leading-tight">{product.name}</h1>
              <p className="text-4xl font-bold text-brand-500 mt-4">${product.price.toFixed(2)}<span className="text-base text-white/30 font-normal">/piece</span></p>

              <div className="border-t border-white/5 my-6 pt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Minimum Order Qty</span>
                  <span className="text-white font-semibold">{product.MOQ} pieces</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Stock</span>
                  <span className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                    {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                  </span>
                </div>
              </div>

              <p className="text-white/60 text-sm leading-relaxed mb-6">{product.description}</p>

              {customizations.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white/40 text-xs uppercase tracking-widest mb-3">Customization Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {customizations.map((c) => (
                      <span key={c} className="flex items-center gap-1 bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs px-3 py-1.5">
                        <FiCheck size={12} /> {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">Order Quantity</label>
                <input
                  type="number"
                  min={product.MOQ}
                  step={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="input-field w-36"
                />
                <span className="text-white/30 text-xs ml-3">Min: {product.MOQ} pcs</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/923256261008?text=${encodeURIComponent(waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center justify-center gap-2 flex-1"
                >
                  <FaWhatsapp size={18} /> Request Quote on WhatsApp
                </a>
                <button
                  onClick={() => { dispatch(addToCart({ ...product, quantity })); toast.success('Added to cart'); }}
                  className="btn-outline flex-1"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
