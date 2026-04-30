// admin/ManageProducts.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiToggleLeft, FiToggleRight, FiPlus } from 'react-icons/fi';
import api from '../utils/api';
import toast from 'react-hot-toast';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = () =>
    api.get('/products?limit=100').then(({ data }) => setProducts(data.products)).finally(() => setLoading(false));

  useEffect(() => { loadProducts(); }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"?`)) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((p) => p.filter((x) => x._id !== id));
      toast.success('Product deleted');
    } catch { toast.error('Delete failed'); }
  };

  const handleToggle = async (id) => {
    try {
      const { data } = await api.patch(`/products/${id}/toggle`);
      setProducts((p) => p.map((x) => x._id === id ? { ...x, isAvailable: data.isAvailable } : x));
    } catch { toast.error('Toggle failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl text-white">PRODUCTS</h1>
        <Link to="/admin/products/new" className="btn-primary flex items-center gap-2 text-xs">
          <FiPlus /> Add Product
        </Link>
      </div>

      {loading ? (
        <div className="text-white/30 text-center py-20">Loading...</div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-dark-600 text-white/40 uppercase tracking-widest text-xs">
              <tr>
                {['Product', 'Category', 'Price', 'MOQ', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-dark-600/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]?.url} alt={p.name} className="w-10 h-10 object-cover rounded-sm" />
                      <span className="text-white font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-white/50">{p.category}</td>
                  <td className="px-4 py-3 text-brand-500 font-bold">${p.price}</td>
                  <td className="px-4 py-3 text-white/50">{p.MOQ}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-sm ${p.isAvailable ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {p.isAvailable ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/products/edit/${p._id}`} className="text-white/30 hover:text-brand-500 transition-colors">
                        <FiEdit2 size={14} />
                      </Link>
                      <button onClick={() => handleToggle(p._id)} className="text-white/30 hover:text-yellow-400 transition-colors">
                        {p.isAvailable ? <FiToggleRight size={16} /> : <FiToggleLeft size={16} />}
                      </button>
                      <button onClick={() => handleDelete(p._id, p.name)} className="text-white/30 hover:text-red-400 transition-colors">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
