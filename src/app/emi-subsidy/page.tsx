'use client';

import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import PageHero from '@/components/ui/PageHero';
import SectionLabel from '@/components/ui/SectionLabel';
import { whatsappLink } from '@/lib/constants';

const SUBSIDY_DATA = [
  { capacity: 'Up to 1 kW', subsidy: '₹18,000', color: 'bg-brand-orange/10 text-brand-orange border-brand-orange/30' },
  { capacity: '1–2 kW', subsidy: '₹30,000', color: 'bg-brand-green/10 text-brand-green border-brand-green/30' },
  { capacity: '2–3 kW', subsidy: '₹78,000', color: 'bg-brand-green-light text-[#1A7A3C] border-brand-green/20' },
  { capacity: '3+ kW', subsidy: '₹78,000 max', color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

const EMI_PLANS = [
  {
    plan: 'Basic',
    system: '1–2 kW',
    emi: '₹2,500/month',
    tenure: '24 months',
    interest: '0%*',
    popular: false,
  },
  {
    plan: 'Standard',
    system: '2–5 kW',
    emi: '₹4,500/month',
    tenure: '36 months',
    interest: '6.9% p.a.',
    popular: true,
  },
  {
    plan: 'Premium',
    system: '5–10 kW',
    emi: '₹8,000/month',
    tenure: '60 months',
    interest: '7.5% p.a.',
    popular: false,
  },
];

const ELIGIBILITY = [
  'Own a residential, commercial, or industrial property',
  'Property should have a suitable rooftop (min. 10 sq ft per kW)',
  'Must have an active electricity connection',
  'Aadhaar and property documents required',
  'For subsidies: property must be under your name',
  'Net metering application requires discom approval',
];

export default function EmiSubsidyPage() {
  return (
    <PageWrapper>
      {/* Hero */}
      <PageHero
        badgeText="EMI & Subsidy"
        titlePart1="Make Solar Affordable"
        titleKeyword="with Subsidies & Easy EMI"
        subtitle="The government pays up to ₹78,000 towards your solar system. Easy EMI plans make going solar possible for everyone."
        keywordColor="orange"
      />

      {/* Government Subsidy */}
      <section className="py-20 lg:py-28 bg-brand-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div>
              <div className="mb-5">
                <SectionLabel text="Government Subsidy" />
              </div>
              <h2 className="section-title mb-5 text-[#1A1A1A]">PM Surya Ghar<br /><span className="text-brand-orange">Muft Bijli Yojana</span></h2>
              <p className="text-gray-600 mb-5 leading-relaxed">
                The Government of India launched the <strong>PM Surya Ghar Muft Bijli Yojana</strong> in February 2024, providing direct Central Financial Assistance (CFA) subsidies for rooftop solar installations for residential consumers.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Madhya Pradesh residents can avail subsidies directly credited to their bank account after installation through MPESZ (discom). RJ Power Solutions handles the entire application process for you.
              </p>
              <div className="space-y-3">
                {['Free application assistance', 'Direct bank credit within 30 days', 'Approved MNRE empanelled installer', 'Valid for residential consumers only', 'Can combine with bank loan for balance amount'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <CheckCircle size={18} className="text-brand-green flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-poppins font-bold text-xl text-[#1A1A1A] mb-5">Subsidy Amount by Capacity</h3>
              <div className="space-y-4">
                {SUBSIDY_DATA.map(({ capacity, subsidy, color }) => (
                  <div key={capacity} className={`flex items-center justify-between p-5 rounded-2xl border ${color}`}>
                    <div className="font-poppins font-semibold text-base">{capacity} System</div>
                    <div className="font-poppins font-extrabold text-xl">{subsidy}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 bg-white border border-gray-100 rounded-xl p-4 text-sm text-gray-500 font-medium shadow-sm">
                * Subsidy is directly credited to your bank account by the Central Government after installation verification.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solar Financing */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="mb-4">
              <SectionLabel text="Solar Financing" />
            </div>
            <h2 className="section-title text-[#1A1A1A]">Easy EMI Plans<br /><span className="text-brand-green">Starting from ₹2,500/month</span></h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-lg">Our banking partners offer flexible solar loans so you can start saving on day one, while paying off your system over time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EMI_PLANS.map((plan, i) => (
              <motion.div
                key={plan.plan}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 relative transition-all ${plan.popular ? 'ring-2 ring-brand-orange' : ''}`}
              >
                {plan.popular && (
                  <div className="bg-brand-orange text-white text-xs font-poppins font-bold text-center py-2 uppercase tracking-wide">
                    ⭐ Most Popular
                  </div>
                )}
                <div className={`p-7 ${plan.popular ? '' : 'pt-9'}`}>
                  <h3 className="font-poppins font-bold text-2xl text-[#1A1A1A] mb-1">{plan.plan}</h3>
                  <div className="text-gray-500 text-sm mb-6 font-medium">{plan.system} System</div>
                  <div className="mb-6">
                    <div className="font-poppins font-bold text-3xl text-brand-green">{plan.emi}</div>
                    <div className="text-gray-500 text-sm mt-1">for {plan.tenure} · {plan.interest} interest</div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {['Quick loan approval', 'Minimal documentation', 'No prepayment charges', 'Insurance included'].map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-brand-orange flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(`Hello! I am interested in the ${plan.plan} EMI plan (${plan.emi}) for solar installation. Please guide me.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center py-3.5 rounded-full font-poppins font-semibold text-sm transition-all ${plan.popular ? 'bg-brand-orange hover:bg-[#C96A1E] text-white' : 'border border-gray-200 text-gray-700 hover:border-brand-green hover:text-brand-green'}`}
                  >
                    Apply Now
                  </a>
                </div>
              </motion.div>
            ))}

          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            * 0% interest plans subject to eligibility. Final EMI depends on credit profile and loan amount.
          </p>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-20 lg:py-28 bg-brand-bg">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <div className="mb-4">
              <SectionLabel text="Eligibility" />
            </div>
            <h2 className="section-title text-[#1A1A1A]">Who Can Apply?</h2>
          </div>
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {ELIGIBILITY.map((e) => (
                <div key={e} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle size={18} className="text-brand-green flex-shrink-0 mt-0.5" />
                  {e}
                </div>
              ))}
            </div>
            <div className="mt-10 pt-8 border-t border-gray-100">
              <h3 className="font-poppins font-bold text-[#1A1A1A] text-lg mb-5">Documents Required</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600">
                {['Aadhaar Card', 'PAN Card', 'Electricity Bill', 'Property Document', 'Bank Passbook', 'Passport Photo'].map(d => (
                  <div key={d} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="font-poppins font-bold text-2xl text-[#1A1A1A] mb-4">Not Sure About Eligibility?</h3>
            <p className="text-gray-500 mb-8 text-lg">Talk to our solar finance expert — we&apos;ll guide you through the best option for your situation.</p>
            <a
              href={whatsappLink('Hello! I want to check my eligibility for solar subsidy and EMI plans.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange text-white font-semibold py-3 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-[#C96A1E] transition-colors inline-flex"
            >
              <MessageCircle size={18} /> Check Eligibility on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
