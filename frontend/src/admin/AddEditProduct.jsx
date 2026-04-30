// admin/AddEditProduct.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from 'react-hot-toast';

const CATEGORIES = ['Sportswear', 'Hosiery', 'Sublimation', 'Teamwear', 'Custom'];

const defaultForm = {
  name: '',
  description: '',
  price: '',
  category: 'Sportswear',
  MOQ: 50,
  stock: 0,
  customizationOptions: { sublimation: false, embroidery: false, screenPrint: false, privateLabel: false },
  isAvailable: true,
};

export default function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState(defaultForm);
  const [imageUrls, setImageUrls] = useState(['']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      api.get(`/products/${id}`).then(({ data }) => {
        setForm({ ...data, price: data.price.toString() });
        // Pre-fill image URLs — images is now [String]
        const urls = data.images?.filter(Boolean);
        setImageUrls(urls?.length ? urls : ['']);
      });
    }
  }, [id]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const setCustom = (k) => setForm((f) => ({
    ...f,
    customizationOptions: { ...f.customizationOptions, [k]: !f.customizationOptions[k] },
  }));

  // Image URL helpers
  const setUrl = (index, value) =>
    setImageUrls((prev) => prev.map((u, i) => (i === index ? value : u)));
  const addUrl = () => setImageUrls((prev) => [...prev, '']);
  const removeUrl = (index) =>
    setImageUrls((prev) => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const validUrls = imageUrls.filter((u) => u.trim());
      const payload = {
        ...form,
        price: Number(form.price),
        MOQ: Number(form.MOQ),
        stock: Number(form.stock),
        images: validUrls,
      };

      if (isEdit) {
        await api.put(`/products/${id}`, payload);
        toast.success('Product updated');
      } else {
        await api.post('/products', payload);
        toast.success('Product created');
      }
      navigate('/admin/products');
    } catch (err) {
      const msg = err.response?.data?.message || 'Save failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-4xl text-white mb-8">{isEdit ? 'EDIT' : 'ADD'} PRODUCT</h1>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Text / number fields */}
        {[
          ['name', 'Product Name', 'text'],
          ['price', 'Price (USD)', 'number'],
          ['MOQ', 'Minimum Order Qty', 'number'],
          ['stock', 'Stock', 'number'],
        ].map(([k, label, type]) => (
          <div key={k}>
            <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">{label}</label>
            <input
              required
              type={type}
              className="input-field"
              value={form[k]}
              onChange={(e) => set(k, e.target.value)}
            />
          </div>
        ))}

        {/* Category */}
        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Category</label>
          <select className="input-field" value={form.category} onChange={(e) => set('category', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest mb-1 block">Description</label>
          <textarea
            rows={4}
            className="input-field resize-none"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
          />
        </div>

        {/* Customization Options */}
        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">Customization Options</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.keys(form.customizationOptions).map((k) => (
              <label key={k} className="flex items-center gap-2 cursor-pointer text-sm text-white/60">
                <input
                  type="checkbox"
                  checked={form.customizationOptions[k]}
                  onChange={() => setCustom(k)}
                  className="accent-orange-500"
                />
                {k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
            ))}
          </div>
        </div>

        {/* Image URLs */}
        <div>
          <label className="text-white/40 text-xs uppercase tracking-widest mb-2 block">
            Product Image URLs
          </label>
          <div className="space-y-2">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="url"
                  className="input-field flex-1"
                  placeholder="https://example.com/image.jpg"
                  value={url}
                  onChange={(e) => setUrl(index, e.target.value)}
                />
                {/* Preview thumbnail */}
                {url.trim() && (
                  <img
                    src={url}
                    alt="preview"
                    className="w-10 h-10 object-cover rounded border border-white/10"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUrl(index)}
                    className="text-red-400 hover:text-red-300 text-lg leading-none px-1"
                    title="Remove"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addUrl}
            className="mt-2 text-xs text-brand-500 hover:text-brand-400 transition-colors"
          >
            + Add another image URL
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
            {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
          </button>
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-outline">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
