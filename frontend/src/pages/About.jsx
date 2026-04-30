// pages/About.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const CAPABILITIES = [
  { label: 'Daily Production Capacity', value: '50,000+ pcs' },
  { label: 'Export Countries', value: '30+' },
  { label: 'Years in Business', value: '15+' },
  { label: 'Machines', value: '200+' },
];

export default function About() {
  return (
    <>
      <SEOHead title="About Us — Xeuro Sports" description="Learn about Xeuro Sports, a premium sportswear manufacturer based in Sialkot, Pakistan." />
      <div className="min-h-screen pt-20">
        <div className="bg-dark-800 border-b border-white/5 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="section-title mb-6">WE BUILD<br /><span className="text-brand-500">BRANDS</span><br />THAT MOVE.</h1>
              <p className="text-white/50 leading-relaxed">
                Based in Sialkot — the world's sporting goods capital — Xeuro Sports has been delivering
                premium garments to global brands for over 15 years. From MOQ-friendly runs to large-scale
                production, we're your complete manufacturing partner.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {CAPABILITIES.map(({ label, value }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="card p-6"
                >
                  <div className="font-display text-4xl text-brand-500">{value}</div>
                  <div className="text-white/40 text-xs mt-1 uppercase tracking-widest">{label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-display text-4xl text-white mb-6">OUR MISSION</h2>
              <p className="text-white/50 leading-relaxed mb-4">
                To make world-class sportswear manufacturing accessible to brands of all sizes.
                Whether you're a startup launching your first product line or an established brand
                scaling production, we provide the same level of quality, communication, and care.
              </p>
              <p className="text-white/50 leading-relaxed">
                Our factory in Sialkot combines traditional craftsmanship with modern automation —
                giving you the best of both worlds: handcrafted quality at industrial scale.
              </p>
            </div>
            <div>
              <h2 className="font-display text-4xl text-white mb-6">WHY SIALKOT?</h2>
              <p className="text-white/50 leading-relaxed mb-4">
                Sialkot has been the world's leading exporter of sporting goods for over 100 years.
                The city supplies to major global brands including Adidas, Nike, Puma, and hundreds
                of independent labels worldwide.
              </p>
              <p className="text-white/50 leading-relaxed">
                This concentration of expertise means we have access to the best materials, skilled
                workers, and established supply chains — all translating to better quality and value for you.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-brand-500 py-16 text-center">
          <h2 className="font-display text-6xl text-white mb-4">READY TO PARTNER?</h2>
          <Link to="/contact" className="bg-dark-900 text-white hover:bg-dark-800 btn-primary inline-block">
            Get a Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}
