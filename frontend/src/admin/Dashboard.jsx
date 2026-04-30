// admin/Dashboard.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPackage, FiShoppingBag, FiTrendingUp, FiPlus } from 'react-icons/fi';
import api from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, pending: 0 });

  useEffect(() => {
    Promise.all([api.get('/products?limit=1'), api.get('/orders')])
      .then(([pRes, oRes]) => {
        const orders = oRes.data;
        setStats({
          products: pRes.data.total,
          orders: orders.length,
          revenue: orders.filter(o => o.paymentStatus === 'paid').reduce((a, o) => a + o.totalPrice, 0),
          pending: orders.filter(o => o.orderStatus === 'new').length,
        });
      })
      .catch(() => {});
  }, []);

  const cards = [
    { icon: FiPackage, label: 'Total Products', value: stats.products },
    { icon: FiShoppingBag, label: 'Total Orders', value: stats.orders },
    { icon: FiTrendingUp, label: 'Revenue (USD)', value: `$${stats.revenue.toFixed(0)}` },
    { icon: FiShoppingBag, label: 'Pending Orders', value: stats.pending },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-4xl text-white">DASHBOARD</h1>
        <Link to="/admin/products/new" className="btn-primary flex items-center gap-2 text-xs">
          <FiPlus /> Add Product
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ icon: Icon, label, value }) => (
          <div key={label} className="card p-6">
            <Icon size={20} className="text-brand-500 mb-3" />
            <div className="text-3xl font-bold text-white">{value}</div>
            <div className="text-white/40 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <div className="space-y-2">
            {[['Add New Product', '/admin/products/new'], ['Manage Orders', '/admin/orders'], ['View Products', '/admin/products']].map(([label, to]) => (
              <Link key={to} to={to} className="flex items-center justify-between p-3 bg-dark-600 hover:bg-dark-500 rounded-sm text-sm text-white/70 hover:text-white transition-colors">
                {label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
