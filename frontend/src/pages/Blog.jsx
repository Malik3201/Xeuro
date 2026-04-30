// pages/Blog.jsx
import SEOHead from '../components/SEOHead';

const POSTS = [
  {
    title: 'How to Start Your Own Sportswear Brand in 2025',
    date: 'June 15, 2025',
    category: 'Business',
    excerpt: "Starting a sportswear brand has never been more accessible. Here's your complete guide to going from idea to shelves.",
  },
  {
    title: 'Sublimation vs Screen Printing: Which is Right for Your Order?',
    date: 'May 28, 2025',
    category: 'Manufacturing',
    excerpt: 'Choosing between sublimation and screen printing depends on your design, fabric, and quantity. We break it down.',
  },
  {
    title: "Why Sialkot is the World's Sportswear Capital",
    date: 'April 10, 2025',
    category: 'Industry',
    excerpt: 'Sialkot supplies sportswear to 100+ countries. We explore what makes this city the beating heart of global sporting goods.',
  },
];

export default function Blog() {
  return (
    <>
      <SEOHead title="Blog — Xeuro Sports" description="Manufacturing insights, brand tips, and industry news from Xeuro Sports." />
      <div className="min-h-screen pt-20">
        <div className="bg-dark-800 border-b border-white/5 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="section-title">BLOG &amp;<br /><span className="text-brand-500">UPDATES</span></h1>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <div key={post.title} className="card p-6 cursor-pointer group">
              <span className="text-brand-500 text-xs uppercase tracking-widest">{post.category}</span>
              <h3 className="font-display text-2xl text-white mt-3 group-hover:text-brand-400 transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-white/40 text-sm mt-3 leading-relaxed">{post.excerpt}</p>
              <p className="text-white/20 text-xs mt-4">{post.date}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
