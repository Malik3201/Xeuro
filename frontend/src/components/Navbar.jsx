// components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';

const links = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cartItems = useSelector(selectCartItems);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled ? 'bg-dark-900/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl font-display text-white tracking-widest">
            XEURO<span className="text-brand-500">SPORTS</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium uppercase tracking-widest transition-colors
                  ${isActive ? 'text-brand-500' : 'text-white/70 hover:text-white'}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-white/70 hover:text-white transition-colors">
            <FiShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-500 text-white text-xs w-5 h-5
                               rounded-full flex items-center justify-center font-bold">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link to="/contact" className="hidden md:block btn-primary text-xs py-2 px-4">
            Get a Quote
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white/70 hover:text-white"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-800 border-t border-white/5"
          >
            <ul className="px-4 py-6 flex flex-col gap-4">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <NavLink to={to} className="text-white/70 hover:text-brand-500 uppercase tracking-widest text-sm">
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link to="/contact" className="btn-primary block text-center">Get a Quote</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
