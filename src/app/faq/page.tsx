'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircle, Search } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import PageHero from '@/components/ui/PageHero';
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
      <PageHero
        badgeText="FAQ"
        titlePart1="Frequently Asked"
        titleKeyword="Questions"
        subtitle="Everything you need to know about solar installation, costs, subsidies, and more."
        keywordColor="orange"
      >
        {/* Search */}
        <div className="max-w-lg mx-auto relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveIdx(null); }}
            placeholder="Search questions..."
            className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 text-[#1A1A1A] text-sm outline-none focus:border-brand-green focus:ring-1 focus:ring-brand-green transition-all shadow-sm"
          />
        </div>
      </PageHero>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-brand-bg">
        <div className="container-custom max-w-4xl">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => { setActiveCat(cat.value); setActiveIdx(null); }}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold font-poppins transition-all ${
                  activeCat === cat.value ? 'bg-brand-green text-white shadow-sm' : 'bg-white text-gray-600 hover:text-brand-green border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filtered.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 ${
                  activeIdx === i ? 'border-brand-green' : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => setActiveIdx(activeIdx === i ? null : i)}
                  className="w-full flex items-start justify-between p-6 text-left"
                >
                  <span className="font-poppins font-semibold text-[#1A1A1A] text-sm sm:text-base pr-4 leading-snug">{faq.q}</span>
                  <ChevronDown
                    size={20}
                    className={`flex-shrink-0 mt-0.5 transition-transform duration-300 text-brand-orange ${activeIdx === i ? 'rotate-180' : ''}`}
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
                      <div className="px-6 pb-6 pt-2 text-gray-600 text-sm leading-relaxed font-medium">
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
          <div className="mt-16 bg-gradient-to-r from-[#1A7A3C] to-[#2E9E52] rounded-3xl p-10 text-center text-white shadow-sm">
            <h3 className="font-poppins font-bold text-3xl mb-4 text-white">Didn&apos;t Find Your Answer?</h3>
            <p className="text-green-50 mb-8 text-lg">Ask our solar experts directly on WhatsApp. We respond within 30 minutes!</p>
            <a
              href={whatsappLink('Hello! I have a question about solar installation that I couldn\'t find in the FAQ.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-white font-poppins font-semibold px-8 py-4 rounded-full hover:bg-[#C96A1E] transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <MessageCircle size={18} /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
