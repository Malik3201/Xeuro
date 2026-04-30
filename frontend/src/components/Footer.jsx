// components/Footer.jsx
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="md:col-span-2">
          <span className="text-4xl font-display text-white tracking-widest">
            XEURO<span className="text-brand-500">SPORTS</span>
          </span>
          <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-sm">
            Premium sportswear &amp; hosiery manufacturer from Sialkot, Pakistan.
            Cut-to-pack solutions, sublimation, embroidery &amp; private labeling.
          </p>
          <div className="flex gap-4 mt-6">
            {[FaInstagram, FaFacebook, FaLinkedin].map((Icon, i) => (
              <a key={i} href="#" className="text-white/40 hover:text-brand-500 transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[['Products', '/products'], ['Services', '/services'], ['About Us', '/about'],
              ['Contact', '/contact'], ['Blog', '/blog']].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-white/50 hover:text-brand-500 transition-colors text-sm">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 text-white/50 text-sm">
              <FiMail size={14} className="text-brand-500" />
              <a href="mailto:xeurosports@gmail.com" className="hover:text-brand-500">
                xeurosports@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2 text-white/50 text-sm">
              <FaWhatsapp size={14} className="text-brand-500" />
              <a href="https://wa.me/923256261008" className="hover:text-brand-500">
                +92 325 6261008
              </a>
            </li>
            <li className="flex items-center gap-2 text-white/50 text-sm">
              <FiPhone size={14} className="text-brand-500" />
              <a href="tel:+923358682575" className="hover:text-brand-500">
                +92 335 8682575
              </a>
            </li>
            <li className="flex items-start gap-2 text-white/50 text-sm">
              <FiMapPin size={14} className="text-brand-500 mt-0.5 shrink-0" />
              <span>Sialkot, Punjab, Pakistan</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-6 text-center text-white/30 text-xs">
        &copy; {new Date().getFullYear()} Xeuro Sports. All rights reserved. | Sialkot, Pakistan
      </div>
    </footer>
  );
}
