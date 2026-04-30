// pages/Home.jsx
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import { ProductGridSkeleton } from '../components/LoadingSkeleton';
import SEOHead from '../components/SEOHead';

const CATEGORIES = [
  { name: 'Sportswear', icon: '🏃', desc: 'Performance-grade athletic wear' },
  { name: 'Teamwear', icon: '⚽', desc: 'Custom uniforms for every sport' },
  { name: 'Hosiery', icon: '🧦', desc: 'Compression & everyday socks' },
  { name: 'Sublimation', icon: '🎨', desc: 'All-over print perfection' },
  { name: 'Embroidery', icon: '🪡', desc: 'Precision logo embroidery' },
  { name: 'Private Label', icon: '🏷️', desc: 'Your brand, our manufacturing' },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Design', desc: 'Submit your design or choose from our catalog' },
  { step: '02', title: 'Cutting', desc: 'Precision fabric cutting with automated systems' },
  { step: '03', title: 'Printing', desc: 'Sublimation, screen print & embroidery' },
  { step: '04', title: 'Stitching', desc: 'Expert tailoring to exact specifications' },
  { step: '05', title: 'QC', desc: 'Multi-point quality inspection before packing' },
  { step: '06', title: 'Packing', desc: 'Ready-to-sell cut-to-pack delivery' },
];

const CERTIFICATIONS = ['ISO 9001:2015', 'OEKO-TEX Standard 100', 'BSCI Certified', 'Sedex Member'];

const TESTIMONIALS = [
  { name: 'James Thornton', company: 'UK SportsCo', text: 'Exceptional quality and on-time delivery. Our go-to manufacturer for 3 years.' },
  { name: 'Sarah Mitchell', company: 'ActiveWear AU', text: 'The sublimation work is stunning. Colors are vibrant and wash-resistant.' },
  { name: 'Marcus Okafor', company: 'Team Athletics US', text: 'Best pricing from Sialkot with no compromise on quality. Highly recommend.' },
];

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 8 }));
  }, [dispatch]);

  return (
    <>
      <SEOHead
        title="Xeuro Sports — Premium Sportswear Manufacturer, Sialkot"
        description="B2B sportswear & hosiery manufacturer from Sialkot. Cut-to-pack, sublimation, embroidery, private labeling. MOQ from 50 pcs."
      />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#f9731620_0%,_transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-dark-900 to-transparent" />
          <div className="absolute right-0 top-0 w-1/2 h-full bg-brand-500/5 skew-x-12 origin-top-right" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <span className="inline-block bg-brand-500/10 border border-brand-500/20 text-brand-500
                             text-xs uppercase tracking-[0.3em] px-4 py-2 mb-8">
              Sialkot, Pakistan — Est. Manufacturing Hub
            </span>
          </motion.div>

          <motion.h1
            className="text-7xl sm:text-9xl font-display text-white leading-none mb-4"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            WE MAKE<br />
            <span className="text-brand-500">YOUR BRAND</span><br />
            MOVE.
          </motion.h1>

          <motion.p
            className="text-white/50 text-lg max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Premium sportswear manufacturer offering cut-to-pack solutions, sublimation printing,
            embroidery, and private labeling. MOQ from 50 pieces.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/products" className="btn-primary flex items-center gap-2">
              Browse Products <FiArrowRight />
            </Link>
            <a
              href="https://wa.me/923256261008"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2"
            >
              <FaWhatsapp /> WhatsApp Us
            </a>
          </motion.div>

          <motion.div
            className="mt-20 grid grid-cols-3 gap-6 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[['500+', 'Global Clients'], ['10M+', 'Units Produced'], ['15+', 'Years Experience']].map(
              ([val, label]) => (
                <div key={label}>
                  <div className="text-4xl font-display text-brand-500">{val}</div>
                  <div className="text-white/40 text-xs uppercase tracking-widest mt-1">{label}</div>
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────── */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-12">
              <h2 className="section-title">OUR<br /><span className="text-brand-500">CAPABILITIES</span></h2>
              <Link to="/services" className="btn-outline hidden md:flex items-center gap-2 text-xs">
                All Services <FiArrowRight />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <AnimatedSection key={cat.name}>
                <motion.div
                  whileHover={{ borderColor: '#f97316' }}
                  className="card p-6 cursor-pointer"
                >
                  <span className="text-4xl mb-4 block">{cat.icon}</span>
                  <h3 className="font-display text-2xl text-white">{cat.name}</h3>
                  <p className="text-white/40 text-sm mt-2">{cat.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-12">
              <h2 className="section-title">FEATURED<br /><span className="text-brand-500">PRODUCTS</span></h2>
              <Link to="/products" className="btn-outline hidden md:flex items-center gap-2 text-xs">
                View All <FiArrowRight />
              </Link>
            </div>
          </AnimatedSection>

          {loading ? (
            <ProductGridSkeleton count={8} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────────────── */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <h2 className="section-title mb-4">
              HOW WE<br /><span className="text-brand-500">BUILD IT</span>
            </h2>
            <p className="text-white/40 mb-16 max-w-lg">
              From fabric to finished product — our end-to-end manufacturing process ensures
              consistent quality at every stage.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <AnimatedSection key={step.step}>
                <div className="relative">
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-brand-500/20 z-0" />
                  )}
                  <div className="relative z-10">
                    <span className="text-brand-500 font-display text-4xl">{step.step}</span>
                    <h4 className="text-white font-semibold mt-2 text-sm uppercase tracking-wider">{step.title}</h4>
                    <p className="text-white/40 text-xs mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ───────────────────────────────────── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <span className="text-white/30 text-xs uppercase tracking-widest">Certifications &amp; Standards</span>
              {CERTIFICATIONS.map((cert) => (
                <div key={cert} className="flex items-center gap-2 text-white/60 text-sm">
                  <FiCheckCircle className="text-brand-500" />
                  {cert}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <h2 className="section-title mb-12">
              WHAT CLIENTS<br /><span className="text-brand-500">SAY</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={i}>
                <div className="card p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, s) => (
                      <span key={s} className="text-brand-500">★</span>
                    ))}
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">"{t.text}"</p>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-brand-500 text-xs">{t.company}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ea580c50_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-7xl md:text-9xl text-white leading-none mb-6">
              START YOUR<br />BRAND WITH US
            </h2>
            <p className="text-white/70 mb-10 text-lg">
              MOQ from 50 pcs. Custom designs. Fast turnaround. Worldwide shipping.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="bg-dark-900 text-white hover:bg-dark-800 btn-primary">
                Request a Quote
              </Link>
              <a
                href="https://wa.me/923256261008"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 text-white btn-primary flex items-center gap-2"
              >
                <FaWhatsapp size={18} /> Chat on WhatsApp
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
