'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Building2, Factory, Wrench, Sparkles, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { SERVICES, whatsappLink } from '@/lib/constants';



const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home, Building2, Factory, Wrench, Sparkles, Zap,
};

export default function ServicesPage() {
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
            <div className="badge bg-white/10 text-white border-white/20 mb-6">Our Services</div>
            <h1 className="section-title text-white mb-4">Complete Solar Solutions<br /><span className="text-solar-orange">Under One Roof</span></h1>
            <p className="text-blue-100 max-w-xl mx-auto text-lg">
              From residential rooftops to industrial plants — we handle everything end-to-end with certified expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-solar-grey">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || Home;
              const isBlue = service.color === 'blue';
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-card card-hover group flex flex-col"
                >
                  {/* Header */}
                  <div className={`p-7 ${isBlue ? 'bg-gradient-blue' : 'bg-gradient-cta'}`}>
                    <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                      <Icon size={28} className="text-white" />
                    </div>
                    <h2 className="font-poppins font-bold text-white text-xl">{service.title}</h2>
                  </div>
                  {/* Body */}
                  <div className="p-7 flex flex-col flex-grow">
                    <p className="text-gray-600 text-sm mb-5 leading-relaxed">{service.desc}</p>
                    <ul className="space-y-2.5 mb-6 flex-grow">
                      {service.benefits.slice(0, 4).map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <CheckCircle size={15} className="text-solar-orange flex-shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-3 mt-auto">
                      <Link
                        href={`/services/${service.slug}`}
                        className="btn-primary text-sm py-2.5 px-4 flex-1 justify-center"
                      >
                        Learn More <ArrowRight size={14} />
                      </Link>
                      <a
                        href={whatsappLink(`Hello! I am interested in ${service.title}. Can you please provide details?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm py-2.5 px-4 justify-center"
                      >
                        Enquire
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="badge mb-4">Our Process</div>
            <h2 className="section-title">How We Work —<br /><span className="gradient-text-blue">Simple, Fast, Professional</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {['Free Site Survey', 'Custom Design', 'Subsidy Help', 'Installation', 'Net Metering', 'Ongoing Support'].map((step, i) => (
              <div key={step} className="text-center relative">
                <div className="w-14 h-14 rounded-full bg-solar-orange text-white font-poppins font-bold text-lg flex items-center justify-center mx-auto mb-3 shadow-solar">
                  {i + 1}
                </div>
                <p className="text-sm font-semibold font-poppins text-solar-dark">{step}</p>
                {i < 5 && (
                  <div className="hidden lg:block absolute top-7 left-3/4 w-1/2 h-0.5 bg-solar-orange/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-cta text-white text-center">
        <div className="container-custom">
          <h2 className="font-poppins font-bold text-3xl mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-orange-100 mb-8 text-lg max-w-xl mx-auto">Contact us and our solar experts will guide you to the perfect solution for your property.</p>
          <a
            href={whatsappLink('Hello! I need help choosing the right solar service for my property.')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-solar-orange font-poppins font-bold px-8 py-4 rounded-xl hover:bg-orange-50 transition-all shadow-lg inline-flex items-center gap-2"
          >
            Talk to an Expert <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </PageWrapper>
  );
}
