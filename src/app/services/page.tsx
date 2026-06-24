'use client';

import Image from 'next/image';
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
      <section className="pt-12 lg:pt-16 pb-20 lg:pb-28 bg-[#FAFBFC] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#E8F5EE] to-transparent rounded-full opacity-50 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || Home;
              const imgName = service.slug.replace('-', '_');
              
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/9] md:h-[240px] w-full overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image src={`/services/${imgName}.png`} alt={service.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/50">
                      <Icon size={14} className="text-[#16A34A]" />
                      <span className="text-[#16A34A] text-xs font-bold uppercase tracking-wider">{service.title}</span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-poppins font-bold text-2xl text-[#111827] mb-3 group-hover:text-[#16A34A] transition-colors">{service.title}</h3>
                    <p className="text-[#64748B] text-[15px] font-medium mb-6 leading-relaxed line-clamp-2">{service.desc}</p>
                    
                    <ul className="space-y-3 mb-8 flex-grow">
                      {service.benefits.slice(0, 3).map((b) => (
                        <li key={b} className="flex items-start gap-3 text-[14px] text-[#475569] font-medium">
                          <div className="mt-0.5 w-5 h-5 rounded-full bg-[#E8F5EE] flex items-center justify-center flex-shrink-0">
                            <CheckCircle size={12} className="text-[#16A34A]" />
                          </div>
                          <span className="leading-tight pt-0.5">{b}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col gap-2 md:flex-row mt-auto pt-6 border-t border-gray-100">
                      <Link
                        href={`/services/${service.slug}`}
                        className="bg-white text-[#111827] font-bold py-3 px-4 w-full min-h-[44px] rounded-xl flex items-center justify-center whitespace-nowrap border border-[#E5E7EB] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm text-[14px] group/btn"
                      >
                        Learn More <ArrowRight size={14} className="ml-1.5 md:group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                      <a
                        href={whatsappLink(`Hello! I am interested in ${service.title}. Can you please provide details?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-[#F97316] to-[#E07B2A] text-white font-bold py-3 px-4 w-full min-h-[44px] rounded-xl flex items-center justify-center whitespace-nowrap hover:shadow-lg hover:-translate-y-0.5 transition-all text-[14px]"
                      >
                        Enquire Now
                      </a>
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
