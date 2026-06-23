'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, CheckCircle, Sun, Shield, Star, Users, Target, Eye } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { SITE, whatsappLink } from '@/lib/constants';

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
      <section className="pt-32 pb-20 bg-gradient-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="badge bg-white/10 text-white border-white/20 mb-6">About RJ Power Solutions</div>
            <h1 className="section-title text-white mb-5">Powering Indore with<br /><span className="text-solar-orange">Clean, Affordable Energy</span></h1>
            <p className="text-blue-100 max-w-2xl mx-auto text-lg">
              Since 2019, we&apos;ve been on a mission to make solar energy accessible, affordable, and hassle-free for every home and business in Central India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <AnimatedSection direction="left">
            <div className="badge mb-5">Our Story</div>
            <h2 className="section-title mb-5">Started with a Vision,<br /><span className="gradient-text-orange">Driven by Results</span></h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              RJ Power Solutions was founded in Indore in 2019 with a simple but powerful belief — clean solar energy should be accessible to every Indian household and business. We started small, with a passionate team of solar engineers who wanted to make a real difference.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Over the years, we&apos;ve grown into one of Central India&apos;s most trusted solar EPC companies, completing 500+ successful installations across Indore and surrounding districts. From 1 kW rooftop systems for homes to 200+ kW industrial plants, we&apos;ve handled it all.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our end-to-end approach — survey, design, procurement, installation, net metering, and maintenance — means our customers get a seamless experience from inquiry to years of solar savings.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {SITE.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-solar-grey rounded-xl p-5 text-center"
                >
                  <div className="font-poppins font-extrabold text-3xl text-solar-orange">{stat.value}</div>
                  <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <div className="relative">
              {/* Gold tilt background like Design 1 */}
              <div className="absolute inset-0 bg-solar-orange rounded-[2.5rem] rotate-3 transform origin-bottom-right opacity-10" />
              <Image
                src="/about-team.png"
                alt="RJ Power Solutions Team"
                width={600}
                height={450}
                className="rounded-[2.5rem] shadow-card-hover w-full object-cover relative z-10"
              />
              <div className="absolute -bottom-5 -left-5 bg-solar-orange text-white rounded-2xl p-5 shadow-solar-lg z-20">
                <div className="font-poppins font-extrabold text-3xl">500+</div>
                <div className="text-sm text-orange-100">Happy Customers</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-solar-grey">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-card"
          >
            <div className="w-14 h-14 rounded-xl bg-solar-orange-tint flex items-center justify-center mb-5">
              <Target size={28} className="text-solar-orange" />
            </div>
            <h2 className="font-poppins font-bold text-2xl text-solar-dark mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide affordable, reliable, and sustainable solar energy solutions that empower every Indian home and business to achieve energy independence, reduce costs, and contribute to a greener planet.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-solar-blue rounded-2xl p-8 text-white shadow-blue-lg"
          >
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-5">
              <Eye size={28} className="text-white" />
            </div>
            <h2 className="font-poppins font-bold text-2xl mb-4">Our Vision</h2>
            <p className="text-blue-100 leading-relaxed">
              To become Central India&apos;s most trusted solar solutions provider — a company that homeowners, businesses, and institutions turn to first when they think about clean energy, quality installation, and lifetime support.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-12">
            <div className="badge mb-4">Why Trust Us</div>
            <h2 className="section-title">Built on <span className="gradient-text-orange">Trust &amp; Excellence</span></h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-solar-grey rounded-2xl p-7 card-hover text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-solar-orange-tint mx-auto mb-5 flex items-center justify-center group-hover:bg-solar-orange transition-colors duration-300">
                  <Icon size={24} className="text-solar-orange group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-poppins font-bold text-solar-dark mb-3">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-solar-orange-tint">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-poppins font-bold text-3xl text-solar-dark mb-4">Ready to Join Our Solar Family?</h2>
            <p className="text-gray-500 mb-8 text-lg">Get a free consultation and site visit from our expert team.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={whatsappLink('Hello! I saw your about page and want to learn more about solar for my property.')} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <Sun size={18} /> Get Free Consultation
              </a>
              <Link href="/services" className="btn-secondary">
                Our Services <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageWrapper>
  );
}
