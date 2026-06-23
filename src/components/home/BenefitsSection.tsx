'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IndianRupee, Leaf, Home as HomeIcon, Wrench, Landmark, TrendingUp } from 'lucide-react';
import { sectionVariants, staggerContainer } from './animations';

const BENEFITS = [
  { icon: IndianRupee, title: 'Save up to 90%', desc: 'Drastically cut your electricity bills' },
  { icon: Leaf, title: 'Zero Emissions', desc: 'Clean energy, zero carbon footprint' },
  { icon: HomeIcon, title: 'Property Value', desc: 'Solar increases home value by 4–6%' },
  { icon: Wrench, title: 'Low Maintenance', desc: 'Panels last 25+ years with minimal upkeep' },
  { icon: Landmark, title: 'Govt. Incentives', desc: 'Subsidies and tax benefits available now' },
  { icon: TrendingUp, title: 'Long-term ROI', desc: '20+ years of free power after payback' },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="section-padding"
      style={{ background: 'linear-gradient(135deg, #0A2540 0%, #061626 100%)' }}
    >
      <div className="container-custom">
        <div className="text-center mb-14">
          <h2 className="section-title text-white">
            What Solar <span className="text-solar-orange">Delivers</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {BENEFITS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={sectionVariants.scaleIn}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/20 transition-all group"
            >
              <Icon size={32} className="text-solar-orange mb-4" />
              <h3 className="font-poppins font-bold text-white text-base mb-1.5">{title}</h3>
              <p className="text-blue-200 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
