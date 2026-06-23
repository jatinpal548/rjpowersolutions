'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Search } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { FAQS, whatsappLink } from '@/lib/constants';

const CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Cost & Pricing', value: 'cost' },
  { label: 'Technology', value: 'tech' },
  { label: 'Subsidy & Finance', value: 'subsidy' },
  { label: 'Maintenance', value: 'maint' },
] as const;

const EXTRA_FAQS = [
  { q: 'What brands of solar panels do you use?', a: 'We use Tier-1 solar panels from brands like Waaree, Adani Solar, Vikram Solar, and internationally certified panels from LONGi and JA Solar. All panels come with 25-year performance warranties and are MNRE approved.', cat: 'tech' },
  { q: 'Do solar panels work on cloudy days?', a: 'Yes! Solar panels generate electricity even on cloudy days, just at reduced efficiency (typically 10–25% of rated capacity). India\'s average sunshine hours are excellent, and Indore receives about 5.5+ peak sun hours per day on average.', cat: 'tech' },
  { q: 'Can I add batteries to my solar system?', a: 'Yes, you can add battery storage to your system for backup power during outages. However, for grid-connected systems with net metering, batteries may not be necessary as the grid acts as your storage. We can advise based on your specific needs.', cat: 'tech' },
  { q: 'What happens to my system during a power outage?', a: 'Grid-tied solar systems automatically shut down during power outages (for safety). If you need power during outages, a hybrid system with battery backup is required. We offer hybrid system solutions.', cat: 'tech' },
  { q: 'Is solar installation eligible for tax benefits?', a: 'Yes! For commercial and industrial consumers, solar systems qualify for accelerated depreciation benefit of up to 40% under the Income Tax Act, significantly reducing your tax liability. Residential consumers benefit from the capital subsidy directly.', cat: 'subsidy' },
  { q: 'How do I apply for net metering in Madhya Pradesh?', a: 'We handle the complete net metering application process with MPESZ (MP Electricity Distribution Company). The process typically takes 30–60 days after installation. We submit all documents and coordinate the site inspection on your behalf.', cat: 'subsidy' },
  { q: 'How often should I clean my solar panels?', a: 'In Indore, we recommend cleaning every 2–3 months due to dust and pollution levels. Monsoon rain provides natural cleaning, but post-monsoon and pre-summer cleaning is especially important. Regular cleaning maintains 95%+ system efficiency.', cat: 'maint' },
  { q: 'What is the warranty on your installation?', a: 'We provide a 5-year workmanship warranty on all installations. Solar panels come with 25-year performance warranty from manufacturers. Inverters typically carry a 5–10 year warranty. Extended AMC plans are also available.', cat: 'maint' },
];

const ALL_FAQS = [
  ...FAQS.map((f, i) => ({ ...f, cat: ['cost', 'tech', 'maint', 'subsidy', 'subsidy', 'cost', 'tech', 'cost'][i] || 'all' })),
  ...EXTRA_FAQS,
];

export default function FaqPage() {
  const [activeCat, setActiveCat] = useState<string>('all');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = ALL_FAQS.filter(f => {
    const matchesCat = activeCat === 'all' || f.cat === activeCat;
    const matchesSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="badge bg-white/10 text-white border-white/20 mb-6">FAQ</div>
            <h1 className="section-title text-white mb-4">Frequently Asked<br /><span className="text-solar-orange">Questions</span></h1>
            <p className="text-blue-100 max-w-xl mx-auto text-lg mb-8">
              Everything you need to know about solar installation, costs, subsidies, and more.
            </p>
            {/* Search */}
            <div className="max-w-lg mx-auto relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setActiveIdx(null); }}
                placeholder="Search questions..."
                className="w-full pl-11 pr-4 py-3.5 rounded-xl text-solar-dark text-sm outline-none focus:ring-2 focus:ring-solar-orange"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-solar-grey">
        <div className="container-custom max-w-4xl">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => { setActiveCat(cat.value); setActiveIdx(null); }}
                className={`px-5 py-2 rounded-full text-sm font-semibold font-poppins transition-all ${
                  activeCat === cat.value ? 'bg-solar-orange text-white shadow-solar' : 'bg-white text-solar-dark hover:text-solar-orange border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-card border-2 transition-all duration-300 ${
                  activeIdx === i ? 'border-solar-orange' : 'border-transparent hover:border-solar-orange/40'
                }`}
              >
                <button
                  onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                  className="w-full flex items-start justify-between p-5 text-left"
                >
                  <span className="font-poppins font-semibold text-solar-dark text-sm sm:text-base pr-4 leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 mt-0.5 transition-transform duration-300 text-solar-orange ${activeIdx === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {activeIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 border-t border-gray-100 pt-4 text-gray-600 text-sm leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-4">🔍</div>
                <p className="font-poppins font-semibold">No results found for &ldquo;{search}&rdquo;</p>
                <p className="text-sm mt-2">Try a different keyword or browse all categories.</p>
              </div>
            )}
          </div>

          {/* Ask Question CTA */}
          <div className="mt-12 bg-gradient-blue rounded-2xl p-8 text-center text-white">
            <h3 className="font-poppins font-bold text-2xl mb-3">Didn&apos;t Find Your Answer?</h3>
            <p className="text-blue-100 mb-6">Ask our solar experts directly on WhatsApp. We respond within 30 minutes!</p>
            <a
              href={whatsappLink('Hello! I have a question about solar installation that I couldn\'t find in the FAQ.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-solar-orange text-white font-poppins font-bold px-8 py-3.5 rounded-xl hover:bg-solar-orange-dark transition-all inline-flex items-center gap-2 shadow-solar"
            >
              <MessageCircle size={18} /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
