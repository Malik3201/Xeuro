// admin/AdminLayout.jsx
import { useState } from 'react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';
import { FiGrid, FiPackage, FiShoppingBag, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const isAdmin = () => !!localStorage.getItem('adminToken');

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (!isAdmin()) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const navItems = [
    { to: '/admin', icon: FiGrid, label: 'Dashboard' },
    { to: '/admin/products', icon: FiPackage, label: 'Products' },
    { to: '/admin/orders', icon: FiShoppingBag, label: 'Orders' },
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Mobile Header */}
      <header className="lg:hidden h-16 bg-dark-800 border-b border-white/5 px-4 flex items-center justify-between sticky top-0 z-40">
        <span className="font-display text-xl text-white">XEURO<span className="text-brand-500">ADMIN</span></span>
        <button onClick={() => setSidebarOpen(true)} className="p-2 text-white/70">
          <FiMenu size={24} />
        </button>
      </header>

      <div className="flex">
        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-64 bg-dark-800 z-50 flex flex-col lg:hidden"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <span className="font-display text-xl">XEURO<span className="text-brand-500">ADMIN</span></span>
                  <button onClick={() => setSidebarOpen(false)}><FiX size={20} /></button>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                  {navItems.map(({ to, icon: Icon, label }) => (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-sm
                        ${location.pathname === to ? 'bg-brand-500 text-white' : 'text-white/50 hover:bg-white/5'}`}
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
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 bg-dark-800 border-r border-white/5 flex-col sticky top-0 h-screen">
          <div className="p-6 border-b border-white/5">
            <span className="font-display text-2xl text-white">XEURO<span className="text-brand-500">ADMIN</span></span>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-all text-sm
                  ${location.pathname === to ? 'bg-brand-500 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
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
        <main className="flex-1 min-w-0 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
