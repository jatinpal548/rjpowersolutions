import React from 'react';
import { ArrowRight, PhoneCall, CheckCircle2 } from 'lucide-react';
import { whatsappLink } from '@/lib/constants';

interface ProposalCTAProps {
  customMessage?: string;
}

export default function ProposalCTA({ customMessage }: ProposalCTAProps) {
  const defaultMessage = "Hello! I want a free site assessment and customized engineering quotation tailored to my roof.";
  const message = customMessage || defaultMessage;

  return (
    <section className="py-24 bg-white">
      <div className="container-custom max-w-5xl">
        <div className="bg-gradient-to-br from-[#E8F5EE] to-[#DCFCE7] rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden border border-[#16A34A]/20">
          {/* Background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              <h2 className="font-poppins font-extrabold text-4xl text-[#111827] mb-4">
                Want an Exact <br/><span className="text-[#F97316]">Solar Proposal?</span>
              </h2>
              <p className="text-[#111827]/70 font-medium mb-8 text-lg">
                Get a free site assessment and customized engineering quotation tailored to your roof.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#16A34A] text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-[#15803d] hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  Get Free Consultation <ArrowRight size={18} />
                </a>
                <a
                  href="tel:+919876543210"
                  className="bg-white text-[#111827] font-bold py-4 px-8 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 hover:-translate-y-1 hover:shadow-md transition-all border border-gray-200"
                >
                  <PhoneCall size={18} /> Call Now
                </a>
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-5 justify-center pl-8">
              {[
                'Expert Site Assessment',
                'Custom System Design',
                'Best Price Guarantee',
                'Hassle-Free Installation'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white">
                  <div className="w-8 h-8 rounded-full bg-[#16A34A] flex items-center justify-center text-white shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="font-bold text-[#111827]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
