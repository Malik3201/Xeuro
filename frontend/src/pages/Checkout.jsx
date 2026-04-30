// pages/Checkout.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import api from '../utils/api';
import SEOHead from '../components/SEOHead';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({ name: '', email: '', phone: '', company: '', country: '' });

  const set = (k, v) => setDetails((d) => ({ ...d, [k]: v }));

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/orders/checkout', {
        products: items.map((i) => ({ product: i._id, name: i.name, quantity: i.quantity, price: i.price })),
        customerDetails: details,
        totalPrice: total,
      });
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    } catch {
      toast.error('Checkout failed. Try requesting a quote via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Checkout — Xeuro Sports" />
      <div className="min-h-screen pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="section-title mb-10">CHECKOUT</h1>
          <form onSubmit={handleCheckout} className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <h2 className="font-display text-2xl text-white">BILLING DETAILS</h2>
              {[['name', 'Full Name', 'text', true], ['email', 'Email', 'email', true],
                ['phone', 'Phone', 'tel', false], ['company', 'Company', 'text', false],
                ['country', 'Country', 'text', false]].map(([k, label, type, req]) => (
                <div key={k}>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">{label}{req && ' *'}</label>
                  <input required={req} type={type} className="input-field" value={details[k]} onChange={(e) => set(k, e.target.value)} />
                </div>
              ))}
            </div>

            <div className="card p-6 h-fit">
              <h2 className="font-display text-2xl text-white mb-4">ORDER TOTAL</h2>
              <p className="text-5xl font-bold text-brand-500 mb-6">${total.toFixed(2)}</p>
              <p className="text-white/30 text-xs mb-6">
                Secure payment via Stripe. Payment confirms your order. Final shipping costs calculated separately.
              </p>
              <button type="submit" disabled={loading || items.length === 0}
                className="btn-primary w-full disabled:opacity-50">
                {loading ? 'Redirecting...' : 'Pay with Stripe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
