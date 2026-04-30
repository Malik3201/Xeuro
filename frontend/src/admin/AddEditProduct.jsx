// admin/AddEditProduct.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const CATEGORIES = ['Sportswear', 'Hosiery', 'Sublimation', 'Teamwear', 'Custom'];

const defaultForm = {
  name: '', description: '', price: '', category: 'Sportswear', MOQ: 50, stock: 0,
  customizationOptions: { sublimation: false, embroidery: false, screenPrint: false, privateLabel: false },
  isAvailable: true,
};

export default function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState(defaultForm);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`).then(({ data }) => setForm({ ...data, price: data.price.toString() }));
    }
  }, [id]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setCustom = (k) => setForm((f) => ({
    ...f,
    customizationOptions: { ...f.customizationOptions, [k]: !f.customizationOptions[k] },
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/products/${id}`, form);
        toast.success('Product updated');
      } else {
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) =>
          fd.append(k, typeof v === 'object' ? JSON.stringify(v) : v)
        );
        images.forEach((img) => fd.append('images', img));
        await api.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Product created');
      }
      navigate('/admin/products');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Save failed';
      toast.error(msg);
      console.error('Product save error:', err?.response?.data || err);
    }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-4xl text-white mb-8">{isEdit ? 'EDIT' : 'ADD'} PRODUCT</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {[['name', 'Product Name', 'text'], ['price', 'Price (USD)', 'number'], ['MOQ', 'Minimum Order Qty', 'number'], ['stock', 'Stock', 'number']].map(([k, label, type]) => (
          <div key={k}>
            <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">{label}</label>
            <input required type={type} className="input-field" value={form[k]}
              onChange={(e) => set(k, e.target.value)} />
          </div>
        ))}

        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Category</label>
          <select className="input-field" value={form.category} onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Description</label>
          <textarea rows={4} className="input-field resize-none" value={form.description}
            onChange={(e) => set('description', e.target.value)} />
        </div>

        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">Customization Options</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(form.customizationOptions).map((k) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer text-sm text-white/60">
                <input type="checkbox" checked={form.customizationOptions[k]} onChange={() => setCustom(k)}
                  className="accent-orange-500" />
                {k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
            ))}
          </div>
        </div>

        {!isEdit && (
          <div>
            <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Product Images</label>
            <input type="file" multiple accept="image/*" onChange={(e) => setImages([...e.target.files])}
              className="input-field file:mr-3 file:bg-brand-500 file:text-white file:border-0 file:px-3 file:py-1 file:text-xs" />
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-outline">Cancel</button>
        </div>
      </form>
    </div>
  );
}
