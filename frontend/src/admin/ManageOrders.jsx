// admin/ManageOrders.jsx
import { useEffect, useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const STATUS_COLORS = {
  new: 'bg-blue-500/10 text-blue-400',
  confirmed: 'bg-green-500/10 text-green-400',
  'in-production': 'bg-yellow-500/10 text-yellow-400',
  shipped: 'bg-purple-500/10 text-purple-400',
  delivered: 'bg-green-500/20 text-green-300',
  cancelled: 'bg-red-500/10 text-red-400',
};

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders').then(({ data }) => setOrders(data)).finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      setOrders((o) => o.map((x) => x._id === id ? { ...x, orderStatus: status } : x));
      toast.success('Status updated');
    } catch { toast.error('Update failed'); }
  };

  return (
    <div>
      <h1 className="font-display text-4xl text-white mb-8">ORDERS</h1>

      {loading ? (
        <div className="text-white/30 text-center py-20">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="text-white/30 text-center py-20 font-display text-4xl">NO ORDERS YET</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-white font-semibold">{order.customerDetails.name}</p>
                  <p className="text-white/40 text-xs">{order.customerDetails.email}</p>
                  <p className="text-white/40 text-xs">{order.customerDetails.company}</p>
                  {order.isInquiry && (
                    <span className="mt-1 inline-block bg-brand-500/10 text-brand-400 text-xs px-2 py-0.5">INQUIRY</span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-brand-500 font-bold text-xl">${order.totalPrice.toFixed(2)}</p>
                  <p className="text-white/40 text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-white/5">
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-sm ${STATUS_COLORS[order.orderStatus] || 'bg-white/5 text-white/40'}`}>
                    {order.orderStatus}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-sm ${order.paymentStatus === 'paid' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <select
                  value={order.orderStatus}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="bg-dark-600 border border-white/10 text-white text-xs px-3 py-2 rounded-sm focus:outline-none focus:border-brand-500"
                >
                  {['new', 'confirmed', 'in-production', 'shipped', 'delivered', 'cancelled'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {order.notes && (
                <p className="mt-3 text-white/40 text-xs bg-dark-600 p-3 rounded-sm">{order.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
