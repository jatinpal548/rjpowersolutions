'use client';

import Image from 'next/image';
import { Target, Eye, Users, CheckCircle, Shield, Star } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PageWrapper from '@/components/layout/PageWrapper';
import PageHero from '@/components/ui/PageHero';
import SectionLabel from '@/components/ui/SectionLabel';
import ProposalCTA from '@/components/ui/ProposalCTA';
import { SITE } from '@/lib/constants';

const TRUST_PILLARS = [
  { icon: Users, title: 'Skilled Team', desc: 'Our certified technicians and engineers bring years of hands-on solar experience to every project.' },
  { icon: Shield, title: 'Quality Products', desc: 'We source only Tier-1 panels and inverters from globally certified manufacturers.' },
  { icon: Star, title: 'Transparent Pricing', desc: 'No hidden costs — detailed quotes with all-inclusive pricing before we start any work.' },
  { icon: CheckCircle, title: 'Customer Satisfaction', desc: '98% of our customers would recommend us. After-sales support that genuinely cares.' },
];

function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }: { children: React.ReactNode, className?: string, delay?: number, direction?: 'up' | 'left' | 'right' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const initial = direction === 'left' ? { opacity: 0, x: -50 } : direction === 'right' ? { opacity: 0, x: 50 } : { opacity: 0, y: 30 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <PageHero
        badgeText="About RJ Power Solutions"
        titlePart1="Powering Indore with"
        titleKeyword="Clean, Affordable Energy"
        subtitle="Since 2019, we've been on a mission to make solar energy accessible, affordable, and hassle-free for every home and business in Central India."
        keywordColor="orange"
      />

      {/* Story Section */}
      <section className="pt-12 lg:pt-16 pb-20 lg:pb-28 bg-brand-bg">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <AnimatedSection direction="left">
            <div className="mb-5">
              <SectionLabel text="Our Story" />
            </div>
            <h2 className="section-title mb-5 text-[#1A1A1A]">Started with a Vision,<br /><span className="text-brand-orange">Driven by Results</span></h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              RJ Power Solutions was founded in Indore in 2019 with a simple but powerful belief — clean solar energy should be accessible to every Indian household and business. We started small, with a passionate team of solar engineers who wanted to make a real difference.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Over the years, we&apos;ve grown into one of Central India&apos;s most trusted solar EPC companies, completing 500+ successful installations across Indore and surrounding districts. From 1 kW rooftop systems for homes to 200+ kW industrial plants, we&apos;ve handled it all.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our end-to-end approach — survey, design, procurement, installation, net metering, and maintenance — means our customers get a seamless experience from inquiry to years of solar savings.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {SITE.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100"
                >
                  <div className="font-poppins font-extrabold text-2xl md:text-3xl text-brand-green">{stat.value}</div>
                  <div className="text-gray-500 text-xs md:text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-orange rounded-[2rem] rotate-3 transform origin-bottom-right opacity-10" />
              <Image
                src="/about-team.png"
                alt="RJ Power Solutions Team"
                width={600}
                height={450}
                className="rounded-2xl shadow-md w-full object-cover relative z-10"
              />
              <div className="absolute -bottom-5 -left-5 bg-white border border-gray-100 rounded-2xl p-5 shadow-lg z-20">
                <div className="font-poppins font-extrabold text-3xl text-brand-green">500+</div>
                <div className="text-sm text-gray-500 font-medium">Happy Customers</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-brand-green border-y border-r border-gray-100"
          >
            <div className="w-14 h-14 rounded-xl bg-brand-green-light flex items-center justify-center mb-5">
              <Target size={28} className="text-brand-green" />
            </div>
            <h2 className="font-poppins font-bold text-2xl text-[#1A1A1A] mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide affordable, reliable, and sustainable solar energy solutions that empower every Indian home and business to achieve energy independence, reduce costs, and contribute to a greener planet.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-brand-green border-y border-r border-gray-100"
          >
            <div className="w-14 h-14 rounded-xl bg-brand-green-light flex items-center justify-center mb-5">
              <Eye size={28} className="text-brand-green" />
            </div>
            <h2 className="font-poppins font-bold text-2xl text-[#1A1A1A] mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become Central India&apos;s most trusted solar solutions provider — a company that homeowners, businesses, and institutions turn to first when they think about clean energy, quality installation, and lifetime support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-20 lg:py-28 bg-brand-bg">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <div className="mb-4">
              <SectionLabel text="Why Trust Us" />
            </div>
            <h2 className="section-title text-[#1A1A1A]">Built on <span className="text-brand-orange">Trust &amp; Excellence</span></h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {TRUST_PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow text-center group border border-gray-100"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-green-light mx-auto mb-5 flex items-center justify-center transition-colors duration-300">
                  <Icon size={24} className="text-brand-green" />
                </div>
                <h3 className="font-poppins font-bold text-[#1A1A1A] mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProposalCTA customMessage="Hello! I saw your about page and want to learn more about solar for my property." />
    </PageWrapper>
  );
}
