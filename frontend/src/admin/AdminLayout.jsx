// admin/AdminLayout.jsx
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { FiGrid, FiPackage, FiShoppingBag, FiLogOut } from 'react-icons/fi';

const isAdmin = () => !!localStorage.getItem('adminToken');

export default function AdminLayout() {
  if (!isAdmin()) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen flex bg-dark-900">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <span className="font-display text-2xl text-white">XEURO<span className="text-brand-500">ADMIN</span></span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { to: '/admin', icon: FiGrid, label: 'Dashboard' },
            { to: '/admin/products', icon: FiPackage, label: 'Products' },
            { to: '/admin/orders', icon: FiShoppingBag, label: 'Orders' },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 px-4 py-3 rounded-sm text-white/50 hover:text-white hover:bg-white/5 transition-all text-sm"
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-white/30 hover:text-red-400 text-sm w-full">
            <FiLogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
