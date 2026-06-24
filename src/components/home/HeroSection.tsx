'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Sun,
  CheckCircle,
  MessageCircle,
  Calculator,
  Phone,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { SITE, whatsappLink } from '@/lib/constants';
import { sectionVariants } from './animations';

const TRUST_BADGES = [
  'Free Site Survey',
  'Gov. Subsidy Help',
  '25-Year Warranty',
  '500+ Happy Customers',
];

const HERO_STATS = [
  { value: '500+', label: 'Installations' },
  { value: '5+', label: 'Years Exp.' },
  { value: '50+', label: 'Cities' },
  { value: '98%', label: 'Satisfaction' },
];

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const heroWhatsApp = whatsappLink(
    'Hello! I want a free solar quote for my property in Indore.'
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-solar.png"
          alt="Solar panels on Indian home"
          fill
          className="object-cover"
          priority
        />
        {/* Multi-layer overlay like Design 1 */}
        <div className="absolute inset-0 bg-solar-blue/70 mix-blend-multiply z-10" />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,77,140,0.7) 0%, rgba(10,77,140,0.5) 50%, rgba(247,147,30,0.3) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        ref={ref}
        className="relative container-custom text-white text-center py-32 pt-40 z-20 w-full flex flex-col items-center"
      >
        <motion.div
          variants={sectionVariants.fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-solar-orange font-semibold text-sm mb-8"
          >
            <Sun size={14} />
            India&apos;s Trusted Solar EPC Company in Indore
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="section-title text-white mb-5"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', lineHeight: 1.15 }}
          >
            Power Your Future with <span className="text-solar-orange">Smart Solar Solutions</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light"
          >
            Reduce electricity bills and switch to clean energy with professional
            solar installation services in Indore, MP.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={heroWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base px-7 py-3.5 group"
            >
              <MessageCircle size={18} />
              Get Free Consultation
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/calculator" className="btn-white text-base px-7 py-3.5">
              <Calculator size={18} />
              Calculate Savings
            </Link>
            <a href={`tel:${SITE.phone}`} className="btn-white text-base px-7 py-3.5">
              <Phone size={18} />
              Call Us Now
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-blue-100"
          >
            {TRUST_BADGES.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5">
                <CheckCircle size={14} className="text-solar-orange" />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Stats Card — Design 1 concept */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="mt-16 w-full max-w-3xl"
        >
          <div
            className="rounded-2xl p-6 md:p-8 flex flex-wrap justify-between items-center gap-6"
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
          >
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="flex-1 min-w-[100px] text-center">
                <div className="text-3xl md:text-4xl font-poppins font-extrabold text-solar-orange mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-blue-100 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
          <ChevronDown size={28} className="text-white/60" />
        </div>
      </div>
    </section>
  );
}
