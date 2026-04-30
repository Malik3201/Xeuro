// pages/Cart.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { removeFromCart, updateQuantity, selectCartItems, selectCartTotal } from '../store/cartSlice';
import SEOHead from '../components/SEOHead';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-6">
      <p className="font-display text-5xl text-white">YOUR CART IS EMPTY</p>
      <Link to="/products" className="btn-primary">Browse Products</Link>
    </div>
  );

  return (
    <>
      <SEOHead title="Cart — Xeuro Sports" />
      <div className="min-h-screen pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-10">YOUR <span className="text-brand-500">CART</span></h1>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item._id} className="card p-4 flex gap-4">
                  <img
                    src={item.images?.[0] || 'https://via.placeholder.com/80'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-sm"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-brand-500 font-bold">${item.price.toFixed(2)}/pc</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: Math.max(item.MOQ || 1, item.quantity - 10) }))}
                        className="w-7 h-7 border border-white/10 text-white/60 hover:border-brand-500 flex items-center justify-center rounded-sm"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="text-white text-sm w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, quantity: item.quantity + 10 }))}
                        className="w-7 h-7 border border-white/10 text-white/60 hover:border-brand-500 flex items-center justify-center rounded-sm"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 size={16} />
                    </button>
                    <span className="text-white font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card p-6 h-fit">
              <h3 className="font-display text-2xl text-white mb-6">ORDER SUMMARY</h3>
              <div className="space-y-3 text-sm mb-6">
                {items.map((i) => (
                  <div key={i._id} className="flex justify-between text-white/60">
                    <span>{i.name} × {i.quantity}</span>
                    <span>${(i.price * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-white">
                  <span>Total</span>
                  <span className="text-brand-500">${total.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary block text-center">Proceed to Checkout</Link>
              <p className="text-white/30 text-xs text-center mt-3">B2B pricing — final quote via invoice</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
