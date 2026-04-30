// pages/Contact.jsx
import { useState } from 'react';
import { FiMail, FiPhone, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../utils/api';
import SEOHead from '../components/SEOHead';

export default function Contact() {
  const [form, setForm] = useState({
    customerDetails: { name: '', email: '', phone: '', company: '', country: '' },
    notes: '',
    totalPrice: 0,
    products: [],
  });
  const [loading, setLoading] = useState(false);

  const set = (field, val) =>
    setForm((f) => ({ ...f, customerDetails: { ...f.customerDetails, [field]: val } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/orders/inquiry', form);
      toast.success('Inquiry sent! We will contact you within 24 hours.');
      setForm({ customerDetails: { name: '', email: '', phone: '', company: '', country: '' }, notes: '', totalPrice: 0, products: [] });
    } catch {
      toast.error('Failed to send inquiry. Please try WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead title="Contact — Xeuro Sports" description="Contact Xeuro Sports for bulk order inquiries and quotes." />
      <div className="min-h-screen pt-20">
        <div className="bg-dark-800 border-b border-white/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="section-title">GET IN <span className="text-brand-500">TOUCH</span></h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-16">
          {/* Form */}
          <div>
            <h2 className="font-display text-3xl text-white mb-8">BULK ORDER INQUIRY</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Full Name *</label>
                  <input required className="input-field" value={form.customerDetails.name}
                    onChange={(e) => set('name', e.target.value)} placeholder="John Smith" />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Email *</label>
                  <input required type="email" className="input-field" value={form.customerDetails.email}
                    onChange={(e) => set('email', e.target.value)} placeholder="john@company.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Phone / WhatsApp</label>
                  <input className="input-field" value={form.customerDetails.phone}
                    onChange={(e) => set('phone', e.target.value)} placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Company</label>
                  <input className="input-field" value={form.customerDetails.company}
                    onChange={(e) => set('company', e.target.value)} placeholder="Your Brand / Company" />
                </div>
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Country</label>
                <input className="input-field" value={form.customerDetails.country}
                  onChange={(e) => set('country', e.target.value)} placeholder="United Kingdom" />
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Message / Requirements</label>
                <textarea rows={5} className="input-field resize-none" value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Describe your product requirements, quantities, customization needs..." />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? 'Sending...' : <><FiSend /> Send Inquiry</>}
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <h2 className="font-display text-3xl text-white mb-8">CONTACT INFO</h2>
            <div className="space-y-6">
              {[
                { icon: FaWhatsapp, label: 'WhatsApp', val: '+92 325 6261008', href: 'https://wa.me/923256261008' },
                { icon: FiPhone, label: 'Phone', val: '+92 335 8682575', href: 'tel:+923358682575' },
                { icon: FiMail, label: 'Email', val: 'xeurosports@gmail.com', href: 'mailto:xeurosports@gmail.com' },
              ].map(({ icon: Icon, label, val, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-brand-500/10 border border-brand-500/20 rounded-sm flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                    <Icon size={20} className="text-brand-500 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-widest">{label}</div>
                    <div className="text-white font-medium group-hover:text-brand-500 transition-colors">{val}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Map embed */}
            <div className="mt-10 rounded-sm overflow-hidden border border-white/5">
              <iframe
                title="Sialkot Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110043.05835395658!2d74.4580!3d32.4945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391ee400000000000%3A0x65af254d6a834f79!2sSialkot%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="240"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
