// pages/Services.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const SERVICES = [
  {
    icon: '✂️',
    title: 'Cut to Pack',
    desc: 'Complete end-to-end manufacturing from fabric cutting to final retail-ready packaging. We handle every step of the production pipeline.',
    points: ['Fabric sourcing', 'Pattern cutting', 'Quality control', 'Retail packaging'],
  },
  {
    icon: '🎨',
    title: 'Sublimation Printing',
    desc: 'All-over, vibrant sublimation printing on polyester garments. Your designs reproduced with pixel-perfect accuracy and wash-resistant durability.',
    points: ['Full-color all-over print', 'Photographic quality', 'Fade-resistant inks', 'Fast turnaround'],
  },
  {
    icon: '🖨️',
    title: 'Screen Printing',
    desc: 'Cost-effective screen printing for bulk orders. Ideal for logos, numbers, and multi-color graphics on cotton and poly-blend garments.',
    points: ['Bulk pricing', 'Pantone matching', 'Spot colors', 'Cotton & polyester'],
  },
  {
    icon: '🪡',
    title: 'Embroidery',
    desc: 'Precision machine embroidery for logos, crests, and text. 3D puff, flat, and appliqué options available for a premium finish.',
    points: ['3D puff embroidery', 'Flat embroidery', 'Appliqué', 'Up to 15 colors'],
  },
  {
    icon: '🏷️',
    title: 'Private Labeling',
    desc: 'Build your brand with our private label service. Custom woven labels, hangtags, and packaging to your exact brand specifications.',
    points: ['Custom woven labels', 'Hangtags', 'Polybag branding', 'Brand consultancy'],
  },
];

export default function Services() {
  return (
    <>
      <SEOHead title="Services — Xeuro Sports" description="Cut-to-pack, sublimation, embroidery, screen printing, and private labeling services from Sialkot." />
      <div className="min-h-screen pt-20">
        <div className="bg-dark-800 border-b border-white/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="section-title">OUR <span className="text-brand-500">SERVICES</span></h1>
            <p className="text-white/40 mt-4 max-w-lg">
              From concept to finished garment — complete manufacturing solutions under one roof.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-6">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card p-8 md:p-12 grid md:grid-cols-3 gap-8"
            >
              <div>
                <span className="text-6xl">{svc.icon}</span>
                <h2 className="font-display text-4xl text-white mt-4">{svc.title}</h2>
              </div>
              <div className="md:col-span-2">
                <p className="text-white/60 leading-relaxed mb-6">{svc.desc}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {svc.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-white/50">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />{p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-dark-800 border-t border-white/5 py-16 text-center">
          <h2 className="font-display text-5xl text-white mb-4">READY TO START?</h2>
          <p className="text-white/40 mb-8">Get a free quote within 24 hours</p>
          <Link to="/contact" className="btn-primary">Request a Free Quote</Link>
        </div>
      </div>
    </>
  );
}
