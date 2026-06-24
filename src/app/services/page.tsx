'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Building2, Factory, Wrench, Sparkles, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import PageHero from '@/components/ui/PageHero';
import SectionLabel from '@/components/ui/SectionLabel';
import ProposalCTA from '@/components/ui/ProposalCTA';
import PremiumComponents from '@/components/services/PremiumComponents';
import { SERVICES, whatsappLink } from '@/lib/constants';



const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home, Building2, Factory, Wrench, Sparkles, Zap,
};

export default function ServicesPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <PageHero
        badgeText="Our Services"
        titlePart1="Complete Solar Solutions"
        titleKeyword="Under One Roof"
        subtitle="From residential rooftops to industrial plants — we handle everything end-to-end with certified expertise."
        keywordColor="orange"
      />

      {/* Services Grid */}
      <section className="py-20 lg:py-28 bg-brand-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || Home;
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 flex flex-col group border border-[#E5E7EB]"
                >
                  <div className="p-8 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="flex items-center gap-5 mb-6">
                      <div className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-[#E8F5EE] to-[#DCFCE7] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-[#16A34A]/10">
                        <Icon size={30} className="text-[#16A34A]" />
                      </div>
                      <h2 className="font-poppins font-bold text-[#111827] text-2xl group-hover:text-[#16A34A] transition-colors">{service.title}</h2>
                    </div>
                    {/* Body */}
                    <div className="flex flex-col flex-grow">
                      <p className="text-[#64748B] text-[15px] mb-8 leading-relaxed font-medium">{service.desc}</p>
                      <ul className="space-y-4 mb-10 flex-grow">
                        {service.benefits.slice(0, 4).map((b) => (
                          <li key={b} className="flex items-start gap-3 text-[15px] text-[#475569] font-medium">
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-[#E8F5EE] flex items-center justify-center flex-shrink-0">
                              <CheckCircle size={14} className="text-[#16A34A]" />
                            </div>
                            <span className="leading-tight pt-0.5">{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex gap-3 mt-auto">
                        <Link
                          href={`/services/${service.slug}`}
                          className="bg-white text-[#111827] font-bold py-3.5 px-4 flex-1 rounded-xl flex items-center justify-center whitespace-nowrap border border-[#E5E7EB] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm text-[15px]"
                        >
                          Learn More
                        </Link>
                        <a
                          href={whatsappLink(`Hello! I am interested in ${service.title}. Can you please provide details?`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-[#F97316] to-[#E07B2A] text-white font-bold py-3.5 px-4 flex-1 rounded-xl flex items-center justify-center whitespace-nowrap hover:shadow-lg hover:-translate-y-0.5 transition-all text-[15px]"
                        >
                          Enquire
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium Components Section */}
      <PremiumComponents />

      {/* Process */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="mb-4">
              <SectionLabel text="Our Process" />
            </div>
            <h2 className="section-title text-[#1A1A1A]">How We Work —<br /><span className="text-brand-green">Simple, Fast, Professional</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 relative">
            {['Free Site Survey', 'Custom Design', 'Subsidy Help', 'Installation', 'Net Metering', 'Ongoing Support'].map((step, i) => (
              <div key={step} className="text-center relative z-10">
                <div className="w-14 h-14 rounded-full bg-brand-green text-white font-poppins font-bold text-lg flex items-center justify-center mx-auto mb-4 shadow-sm border-[4px] border-white">
                  {i + 1}
                </div>
                <p className="text-sm font-semibold font-poppins text-gray-800">{step}</p>
              </div>
            ))}
            {/* Horizontal Line connecting steps */}
            <div className="hidden lg:block absolute top-7 left-[8%] right-[8%] h-0.5 bg-gray-200 z-0" />
          </div>
        </div>
      </section>

      <ProposalCTA customMessage="Hello! I need help choosing the right solar service for my property." />
    </PageWrapper>
  );
}
