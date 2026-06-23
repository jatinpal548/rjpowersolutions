import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Home, Building2, Factory, Wrench, Sparkles, Zap, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
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
  const isBlue = service.color === 'blue';
  const faqs = SERVICE_FAQS[slug] || FAQS.slice(0, 5);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className={`pt-32 pb-20 text-white ${isBlue ? 'bg-gradient-blue' : 'bg-gradient-cta'}`}>
        <div className="container-custom">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-6">
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <span>/</span>
            <span className="text-white">{service.title}</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                <Icon size={32} className="text-white" />
              </div>
              <h1 className="section-title text-white mb-4">{service.title}</h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8">{service.desc}</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={whatsappLink(`Hello! I am interested in ${service.title}. Please share details and pricing.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-solar-orange font-poppins font-bold px-7 py-3.5 rounded-xl hover:bg-orange-50 transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle size={18} /> Get Quote on WhatsApp
                </a>
                <Link href="/contact" className="btn-white">
                  Contact Us <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-7 border border-white/20">
                <h3 className="font-poppins font-bold text-white text-lg mb-5">Key Benefits</h3>
                <ul className="space-y-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-white/80">
                      <CheckCircle size={16} className="text-green-400 flex-shrink-0 mt-0.5" />
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
      <section className="lg:hidden py-10 bg-solar-grey">
        <div className="container-custom">
          <h2 className="font-poppins font-bold text-xl text-solar-dark mb-5">Key Benefits</h2>
          <ul className="space-y-3">
            {service.benefits.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-gray-600">
                <CheckCircle size={16} className="text-solar-orange flex-shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="badge mb-4">Our Process</div>
            <h2 className="section-title">How We Deliver<br /><span className="gradient-text-orange">Your {service.title}</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {service.process.map((p, i) => (
              <div key={p.step} className="bg-solar-grey rounded-2xl p-7 relative overflow-hidden group card-hover">
                <div className="absolute top-5 right-5 font-poppins font-extrabold text-5xl text-gray-100 group-hover:text-solar-orange/10 transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="w-10 h-10 rounded-full bg-solar-orange text-white font-poppins font-bold text-lg flex items-center justify-center mb-4">
                  {i + 1}
                </div>
                <h3 className="font-poppins font-bold text-solar-dark mb-2">{p.step}</h3>
                <p className="text-gray-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-solar-grey">
        <div className="container-custom max-w-3xl">
          <div className="text-center mb-10">
            <div className="badge mb-4">FAQ</div>
            <h2 className="section-title">Common Questions about<br /><span className="gradient-text-blue">{service.title}</span></h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-2xl overflow-hidden group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-poppins font-semibold text-solar-dark hover:text-solar-orange transition-colors list-none">
                  {faq.q}
                  <ArrowRight size={16} className="flex-shrink-0 ml-4 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container-custom text-center">
          <h2 className="font-poppins font-bold text-3xl text-solar-dark mb-4">Ready to Get Started?</h2>
          <p className="text-gray-500 mb-8 text-lg">Get a free site visit and detailed quote for your {service.title.toLowerCase()} project.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink(`Hello! I want a free site visit and quote for ${service.title}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={18} /> Get Free Quote
            </a>
            <Link href="/calculator" className="btn-secondary">
              Calculate Savings <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
