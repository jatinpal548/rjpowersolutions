import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Sun, Award, CheckCircle2, Factory } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';

const PRODUCTS = [
  {
    title: 'Solar Panels',
    brands: ['Waaree', 'LONGi', 'Jinko Solar', 'Adani Solar'],
    desc: 'High-efficiency Tier-1 solar panels designed for maximum power generation and long-term reliability.',
    img: '/products/panel.png',
  },
  {
    title: 'Solar Inverters',
    brands: ['Growatt', 'Sungrow', 'Solis'],
    desc: 'Advanced inverter technology for optimal energy conversion and system performance.',
    img: '/products/inverter.png',
  },
  {
    title: 'Mounting Structures',
    brands: ['Tata Steel', 'Waaree'],
    desc: 'Corrosion-resistant mounting systems engineered for durability and structural stability.',
    img: '/products/mounting.png',
  },
  {
    title: 'DC & AC Cables',
    brands: ['Polycab', 'KEI'],
    desc: 'High-quality solar cables for safe and efficient power transmission.',
    img: '/products/cables.png',
  },
  {
    title: 'Protection Devices',
    brands: ['Siemens', 'Schneider Electric', 'ABB'],
    desc: 'Premium safety and protection systems for long-term operational security.',
    img: '/products/protection.png',
  },
  {
    title: 'Monitoring Systems',
    brands: ['Smart Tracking', 'Remote Access'],
    desc: 'Smart monitoring and remote performance tracking for complete solar visibility.',
    img: '/products/monitoring.png',
  }
];

const TRUST_ITEMS = [
  'MNRE Approved Components',
  'Tier-1 Solar Panels',
  'BIS Certified Equipment',
  '25+ Years Warranty',
  'High-Efficiency Systems',
  'Commercial & Industrial Grade Products'
];

const BRANDS = [
  'Waaree', 'LONGi', 'Jinko Solar', 'Adani Solar', 'Growatt', 
  'Sungrow', 'Polycab', 'KEI', 'Siemens', 'Schneider Electric', 'ABB'
];

export default function PremiumComponents() {
  return (
    <section className="py-24 bg-[#F8FAF7] relative overflow-hidden">
      <div className="container-custom">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">
              <SectionLabel text="Our Products" />
            </div>
            <h2 className="font-poppins font-extrabold text-4xl md:text-5xl text-[#111827] mb-6">
              Premium Components.<br />
              <span className="text-[#16A34A]">Proven Performance.</span>
            </h2>
            <p className="text-[#64748B] text-lg leading-relaxed">
              We use industry-leading solar products and certified components to ensure maximum efficiency, durability, safety, and long-term performance.
            </p>
          </motion.div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 flex flex-col group border border-[#E5E7EB]"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image 
                  src={product.img}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {product.brands.map(brand => (
                    <span key={brand} className="text-xs font-bold bg-white/90 backdrop-blur-sm text-[#111827] px-2.5 py-1 rounded-md">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-poppins font-bold text-xl text-[#111827] mb-3 group-hover:text-[#16A34A] transition-colors">{product.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed">{product.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-lg rounded-[24px] p-8 border border-[#E5E7EB] shadow-sm mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {TRUST_ITEMS.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8F5EE] text-[#16A34A] flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <span className="font-bold text-sm text-[#111827] font-poppins leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Brands Showcase */}
        <div className="text-center pt-8 border-t border-gray-200 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F8FAF7] px-4 text-sm font-bold text-[#64748B] uppercase tracking-wider">
            Trusted Brands We Work With
          </div>
          
          <div className="mt-8 relative flex overflow-hidden mask-image-gradient">
            <div className="flex animate-marquee whitespace-nowrap py-4 items-center gap-12 sm:gap-24">
              {/* Double array for seamless loop */}
              {[...BRANDS, ...BRANDS].map((brand, i) => (
                <div key={i} className="text-2xl sm:text-3xl font-extrabold text-[#111827]/20 font-poppins tracking-tight grayscale hover:grayscale-0 hover:text-[#16A34A] transition-all duration-300">
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
