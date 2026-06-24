import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Home, Building2, Factory, Wrench, Sparkles, Zap, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import SectionLabel from '@/components/ui/SectionLabel';
import { SERVICES, FAQS, whatsappLink } from '@/lib/constants';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home, Building2, Factory, Wrench, Sparkles, Zap,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: `${service.desc} Contact RJ Power Solutions in Indore for professional ${service.title.toLowerCase()} services.`,
  };
}

// Service-specific FAQs
const SERVICE_FAQS: Record<string, { q: string; a: string }[]> = {
  residential: [FAQS[0], FAQS[1], FAQS[2], FAQS[3], FAQS[5]],
  commercial: [FAQS[0], FAQS[5], FAQS[6], FAQS[7], FAQS[4]],
  industrial: [FAQS[0], FAQS[5], FAQS[6], FAQS[7], FAQS[2]],
  maintenance: [FAQS[2], FAQS[1], FAQS[5], FAQS[6], FAQS[7]],
  cleaning: [FAQS[2], FAQS[1], FAQS[5], FAQS[6], FAQS[7]],
  'net-metering': [FAQS[4], FAQS[5], FAQS[3], FAQS[0], FAQS[6]],
};

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = ICON_MAP[service.icon] || Home;
  const faqs = SERVICE_FAQS[slug] || FAQS.slice(0, 5);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#FAF8F5] to-[#FDF0E8] relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
            <Link href="/services" className="hover:text-brand-orange transition-colors">Services</Link>
            <span>/</span>
            <span className="text-[#1A1A1A] font-semibold">{service.title}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-6">
                <Icon size={32} className="text-brand-green" />
              </div>
              <h1 className="font-poppins font-extrabold text-[#1A1A1A] mb-6 tracking-tight drop-shadow-sm leading-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
                {service.title}
              </h1>
              <p className="text-gray-500 text-lg md:text-[21px] max-w-2xl leading-relaxed font-medium mb-8">
                {service.desc}
              </p>
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <a
                  href={whatsappLink(`Hello! I am interested in ${service.title}. Please share details and pricing.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-orange text-white font-semibold py-3.5 px-8 w-full md:w-auto min-h-[48px] rounded-full flex items-center justify-center gap-2 hover:bg-[#C96A1E] transition-colors"
                >
                  <MessageCircle size={18} /> Get Quote on WhatsApp
                </a>
                <Link href="/contact" className="border border-gray-200 text-gray-700 hover:border-brand-green hover:text-brand-green font-semibold py-3.5 px-8 w-full md:w-auto min-h-[48px] rounded-full flex items-center justify-center gap-2 transition-colors bg-white">
                  Contact Us <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 rounded-bl-full" />
                 <h3 className="font-poppins font-bold text-[#1A1A1A] text-xl mb-6 relative z-10">Key Benefits</h3>
                 <ul className="space-y-4 relative z-10">
                   {service.benefits.map((b) => (
                     <li key={b} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                       <CheckCircle size={20} className="text-brand-green flex-shrink-0" />
                       {b}
                     </li>
                   ))}
                 </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Benefits */}
      <section className="lg:hidden py-12 bg-white">
        <div className="container-custom">
          <h2 className="font-poppins font-bold text-xl text-[#1A1A1A] mb-6">Key Benefits</h2>
          <ul className="space-y-4">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                <CheckCircle size={20} className="text-brand-green flex-shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28 bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="mb-4">
              <SectionLabel text="Our Process" />
            </div>
            <h2 className="section-title text-[#1A1A1A]">How We Deliver<br /><span className="text-brand-orange">Your {service.title}</span></h2>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {service.process.map((p, i) => (
              <div key={p.step} className="bg-brand-bg rounded-2xl p-6 md:p-8 relative overflow-hidden group border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="absolute top-5 right-5 font-poppins font-extrabold text-5xl text-gray-200/50 group-hover:text-brand-orange/10 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-green text-white font-poppins font-bold text-lg flex items-center justify-center mb-5">
                  {i + 1}
                </div>
                <h3 className="font-poppins font-bold text-[#1A1A1A] text-lg mb-2">{p.step}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-brand-bg">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-12">
            <div className="mb-4">
              <SectionLabel text="FAQ" />
            </div>
            <h2 className="section-title text-[#1A1A1A]">Common Questions about<br /><span className="text-brand-green">{service.title}</span></h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl overflow-hidden group border border-gray-100 shadow-sm">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-poppins font-semibold text-[#1A1A1A] hover:text-brand-orange transition-colors list-none text-sm sm:text-base">
                  {faq.q}
                  <ArrowRight size={18} className="flex-shrink-0 ml-4 group-open:rotate-90 transition-transform text-brand-orange" />
                </summary>
                <div className="px-6 pb-6 pt-2 text-gray-600 text-sm leading-relaxed border-t border-gray-100 font-medium">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#1A7A3C] to-[#2E9E52] text-white">
        <div className="container-custom text-center">
          <h2 className="font-poppins font-bold text-3xl text-white mb-4">Ready to Get Started?</h2>
          <p className="text-green-50 mb-8 text-lg">Get a free site visit and detailed quote for your {service.title.toLowerCase()} project.</p>
          <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 w-full">
            <a
              href={whatsappLink(`Hello! I want a free site visit and quote for ${service.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-white w-full md:w-auto min-h-[48px] font-semibold py-3.5 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-[#C96A1E] transition-colors"
            >
              <MessageCircle size={18} /> Get Free Quote
            </a>
            <Link href="/calculator" className="bg-white text-brand-green w-full md:w-auto min-h-[48px] font-semibold py-3.5 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              Calculate Savings <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
