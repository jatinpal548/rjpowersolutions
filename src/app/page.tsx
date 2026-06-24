'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Sun, Home, Building2, Factory, Wrench, Sparkles, Zap,
  CheckCircle, Star, ChevronDown, ArrowRight, Phone, MessageCircle,
  TrendingUp, Shield, Clock, Award, HeadphonesIcon,
  Calculator, ChevronRight, Quote, Landmark, IndianRupee, Percent,
  MapPin, Mail
} from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import InfiniteTestimonialSlider from '@/components/ui/InfiniteTestimonialSlider';
import ContactSection from '@/components/home/ContactSection';
import { SITE, SERVICES, TESTIMONIALS, PROJECTS, FAQS, whatsappLink } from '@/lib/constants';
import { sectionVariants, staggerContainer, staggerItem } from '@/components/home/animations';

// Animated counter hook
function useCounter(target: number, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Home, Building2, Factory, Wrench, Sparkles, Zap,
};

const WHY_CHOOSE = [
  { icon: Award, title: 'Expert Installation', desc: 'Certified and experienced solar technicians with 5+ years of hands-on experience.' },
  { icon: Shield, title: 'Premium Components', desc: 'Tier-1 solar panels and inverters from globally trusted brands for lasting performance.' },
  { icon: TrendingUp, title: 'Maximum Savings', desc: 'Cut electricity bills by up to 90% with perfectly sized solar systems.' },
  { icon: CheckCircle, title: 'Subsidy Support', desc: 'Complete assistance with PM Surya Ghar subsidy — up to ₹78,000 benefit.' },
  { icon: Sun, title: 'End-to-End Service', desc: 'Survey → Design → Installation → Net Metering → Maintenance, all under one roof.' },
  { icon: HeadphonesIcon, title: 'Dedicated Support', desc: 'Fast, responsive after-sales support and AMC plans to protect your investment.' },
];



const BrandLogos = [
  <div key="1" className="flex items-center gap-1 font-poppins"><span className="text-blue-600 font-medium text-xl">adani</span><span className="text-pink-600 font-light text-sm uppercase mt-1">SOLAR</span></div>,
  <div key="2" className="text-green-600 font-bold italic tracking-wider text-xl font-poppins">WAAREE</div>,
  <div key="3" className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold italic font-poppins">Fronius</div>,
  <div key="4" className="text-red-600 font-black text-2xl tracking-tighter font-poppins">ABB</div>,
  <div key="5" className="text-red-600 font-bold tracking-tight text-xl flex items-center gap-1.5 font-poppins"><div className="w-3.5 h-3.5 bg-red-600 rounded-full relative"><div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-white"></div></div> HAVELLS</div>,
  <div key="6" className="flex flex-col items-center leading-none font-poppins"><span className="text-gray-800 font-black text-lg">MNRE</span><span className="text-[8px] text-gray-500 uppercase tracking-widest mt-0.5">Govt of India</span></div>,
  <div key="7" className="text-blue-800 font-bold text-xl font-poppins">Luminous</div>,
  <div key="8" className="text-[#8CC63F] font-semibold text-2xl font-poppins tracking-tight">Growatt</div>,
  <div key="9" className="text-[#003B7A] font-bold text-xl uppercase tracking-wider font-poppins">TATA <span className="font-light">SOLAR</span></div>,
];

// Section wrapper with whileInView
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [billAmount, setBillAmount] = useState('');
  const [propertyType, setPropertyType] = useState('Residential');
  const [calcResult, setCalcResult] = useState<null | { size: string; savings: string; payback: string }>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const c500 = useCounter(500, 2000, statsVisible);
  const c5 = useCounter(5, 1500, statsVisible);
  const c100 = useCounter(100, 2000, statsVisible);
  const c98 = useCounter(98, 1800, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCalc = () => {
    const bill = parseInt(billAmount);
    if (!bill || bill < 100) return;
    const size = Math.max(1, Math.round(bill / 1000));
    const annual = Math.round(bill * 0.8 * 12);
    const cost = size * 65000;
    const payback = Math.round(cost / annual * 10) / 10;
    setCalcResult({
      size: `${size}–${size + 1} kW`,
      savings: `₹${annual.toLocaleString('en-IN')}/year`,
      payback: `${payback} years`,
    });
  };

  const heroWhatsApp = whatsappLink('Hello! I want a free solar consultation for my property in Indore.');

  return (
    <PageWrapper>
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-20 lg:pt-32 lg:pb-28 bg-[#F8FAF7] overflow-hidden">
        {/* Soft Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8F5EE] rounded-bl-full opacity-60 pointer-events-none blur-3xl"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FEF2ED] rounded-full opacity-50 pointer-events-none blur-3xl"></div>

        <div className="relative container-custom z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left Column (Content) */}
            <div className="max-w-3xl">
              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-6"
              >
                <Zap size={16} className="text-[#16A34A]" />
                <span className="text-[#16A34A] font-bold text-sm tracking-wide">India's Trusted Solar EPC Company</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="text-4xl lg:text-[3.8rem] font-extrabold text-[#111827] mb-6 tracking-tight leading-[1.1] font-poppins drop-shadow-sm"
              >
                <span className="block whitespace-nowrap">Power Your Future</span>
                <span className="block mt-1">
                  with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#E66E00]">Smart Solar Energy</span>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="text-[#64748B] text-lg md:text-xl font-medium mb-10 leading-relaxed max-w-2xl"
              >
                Save up to 90% on electricity bills with high-efficiency solar solutions for homes, businesses and industries.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto"
              >
                <a 
                  href={heroWhatsApp} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-gradient-to-r from-[#F97316] to-[#E07B2A] text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all w-full sm:w-auto shadow-sm text-base group"
                >
                  <MessageCircle size={18} />
                  Get Free Consultation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <Link 
                  href="/calculator" 
                  className="bg-white text-[#111827] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 border border-[#E5E7EB] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm w-full sm:w-auto text-base"
                >
                  <Calculator size={18} />
                  Calculate Savings
                </Link>
              </motion.div>

              {/* Trust badges - Single Line exactly as requested */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full"
              >
                {[
                  'Free Site Survey',
                  'Gov. Subsidy Assistance',
                  '25-Year Warranty',
                  '500+ Happy Customers'
                ].map(text => (
                  <div key={text} className="flex items-center gap-2 bg-white px-3 py-2 md:px-4 md:py-2.5 rounded-full shadow-sm border border-gray-100 text-[#111827] text-xs md:text-sm font-semibold whitespace-nowrap">
                    <CheckCircle size={14} className="text-[#16A34A] shrink-0" strokeWidth={3} />
                    {text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Column (3D House Illustration) */}
            <div className="relative w-full h-[350px] md:h-[400px] lg:h-[700px] flex items-center justify-center mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full max-w-[750px] lg:scale-110 aspect-square"
              >
                {/* Subtle Sun Glow */}
                <div className="absolute top-[10%] right-[10%] w-32 h-32 bg-gradient-to-br from-[#FDE047] to-[#F97316] rounded-full blur-xl opacity-60 shadow-[0_0_50px_rgba(249,115,22,0.3)]"></div>

                {/* Floating Building */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="relative w-full h-full z-10"
                >
                  <Image
                    src="/hero-3d-commercial.png"
                    alt="Premium 3D Solar Home"
                    fill
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                    priority
                  />
                  {/* Decorative tiny floating elements */}
                  <motion.div animate={{ y: [-5, 5, -5] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }} className="absolute top-[25%] left-[5%]">
                    <Sun className="text-[#F97316] w-5 h-5 opacity-70" />
                  </motion.div>
                  <motion.div animate={{ y: [-8, 8, -8] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[35%] right-[0%]">
                    <Zap className="text-[#16A34A] w-5 h-5 opacity-70" />
                  </motion.div>
                </motion.div>

                {/* Floating Glassmorphism Cards */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }} 
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute top-2 right-0 md:top-20 bg-white/90 backdrop-blur-md px-3 py-2 md:px-5 md:py-4 rounded-xl md:rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 md:gap-4 z-20"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
                    <IndianRupee className="w-4 h-4 md:w-5 md:h-5 text-[#16A34A]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#111827] font-poppins leading-tight text-sm md:text-base">₹35,000/month</div>
                    <div className="text-[10px] md:text-xs text-[#64748B] font-medium mt-0.5">Saved on Electricity</div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }} 
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-20 right-0 md:bottom-40 md:right-10 bg-white/90 backdrop-blur-md px-3 py-2 md:px-5 md:py-4 rounded-xl md:rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 md:gap-4 z-20"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[#16A34A]" />
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs text-[#64748B] font-medium mb-0.5">ROI In</div>
                    <div className="font-bold text-[#111827] font-poppins leading-tight text-sm md:text-base">3.8 Years</div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [-10, 10, -10] }} 
                  transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 2 }}
                  className="absolute bottom-6 left-0 md:bottom-28 md:left-10 bg-white/90 backdrop-blur-md px-3 py-2 md:px-5 md:py-4 rounded-xl md:rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 md:gap-4 z-20"
                >
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
                    <Factory className="w-4 h-4 md:w-5 md:h-5 text-[#16A34A]" />
                  </div>
                  <div>
                    <div className="text-[10px] md:text-xs text-[#64748B] font-medium mb-0.5">CO₂ Reduced</div>
                    <div className="font-bold text-[#111827] font-poppins leading-tight text-sm md:text-base">18 Tons/Year</div>
                  </div>
                </motion.div>

                {/* Soft Shadow Platform */}
                <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-black/[0.08] rounded-[100%] blur-xl z-0"></div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Floating Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="relative lg:absolute bottom-0 left-0 right-0 z-30 lg:translate-y-0 px-4 mt-8 lg:mt-0 w-full"
        >
          <div className="container-custom">
            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E7EB] overflow-hidden">

              {/* Desktop View: Static Row */}
              <div className="hidden lg:flex p-10 flex-row justify-between items-center gap-4 divide-x divide-gray-100/50">
                {[
                  { value: '500+', label: 'Installations', sub: 'Successfully Completed', icon: Sun },
                  { value: '5+', label: 'Years Experience', sub: 'In Solar Industry', icon: Award },
                  { value: '50+', label: 'Cities', sub: 'Serving Across MP', icon: Building2 },
                  { value: '98%', label: 'Satisfaction', sub: 'Happy Customers', icon: Star },
                ].map((stat, i) => (
                  <div key={i} className="flex items-start text-left gap-5 pl-8 first:pl-0 w-auto group transition-transform hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-[16px] bg-[#E8F5EE] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <stat.icon size={26} className="text-[#16A34A]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[28px] font-poppins font-extrabold text-[#111827] tracking-tight leading-tight">{stat.value}</div>
                      <div className="text-sm font-bold text-[#64748B]">{stat.label}</div>
                      <div className="text-xs text-gray-400 font-medium">{stat.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile View: Looping Marquee */}
              <div className="flex lg:hidden overflow-hidden py-6 relative">
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white/80 to-transparent z-10 pointer-events-none"></div>

                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ repeat: Infinity, ease: 'linear', duration: 15 }}
                  className="flex items-center gap-10 px-4 whitespace-nowrap w-max"
                >
                  {[
                    { value: '500+', label: 'Installations', sub: 'Successfully Completed', icon: Sun },
                    { value: '5+', label: 'Years Exp.', sub: 'In Solar Industry', icon: Award },
                    { value: '50+', label: 'Cities', sub: 'Serving Across MP', icon: Building2 },
                    { value: '98%', label: 'Satisfaction', sub: 'Happy Customers', icon: Star },
                    { value: '500+', label: 'Installations', sub: 'Successfully Completed', icon: Sun },
                    { value: '5+', label: 'Years Exp.', sub: 'In Solar Industry', icon: Award },
                    { value: '50+', label: 'Cities', sub: 'Serving Across MP', icon: Building2 },
                    { value: '98%', label: 'Satisfaction', sub: 'Happy Customers', icon: Star },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <stat.icon size={20} className="text-green-500" strokeWidth={1.5} />
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-poppins font-extrabold text-[#0A1A3A] tracking-tight leading-tight">{stat.value}</div>
                        <div className="text-xs font-bold text-gray-800">{stat.label}</div>
                        <div className="text-[10px] text-gray-400 font-medium">{stat.sub}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── TRUSTED BRANDS & STATS ─── */}
      <section ref={statsRef} className="pt-24 lg:pt-40 pb-20 bg-[#FAFBFC] border-b border-gray-100 overflow-hidden relative">
        {/* Subtle background dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="container-custom relative z-10">
          {/* Brands Section */}
          <div className="text-center mb-16">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#5A6A85] mb-4">
              Trusted Brands We Install
            </h3>
            <div className="w-8 h-0.5 bg-solar-orange mx-auto mb-12"></div>

            <div className="flex relative overflow-hidden group">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
                className="flex items-center gap-12 md:gap-16 whitespace-nowrap"
              >
                {[...BrandLogos, ...BrandLogos, ...BrandLogos].map((logo, i) => (
                  <div key={i} className="flex items-center gap-12 md:gap-16">
                    <div className="transition-transform duration-300 select-none cursor-default hover:scale-110">
                      {logo}
                    </div>
                    {/* Separator Line */}
                    <div className="w-px h-8 bg-gray-200"></div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="section-padding bg-white border-b border-gray-100">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#FFF2E8] text-[#E07B2A] font-semibold px-4 py-1.5 rounded-full mb-4 text-sm">
              <Award size={16} />
              <span>Why Choose RJ Power Solutions</span>
            </div>
            <h2 className="font-poppins font-extrabold text-4xl md:text-5xl text-[#111827] leading-tight">
              Your Trusted Solar Partner<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#E66E00]">in Central India</span>
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto mt-4 text-lg font-medium">We deliver more than solar panels — we deliver energy independence, savings, and peace of mind.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[24px] p-8 border border-[#E5E7EB] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-[16px] bg-[#FEF2ED] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-[#E07B2A]" strokeWidth={2} />
                </div>
                <h3 className="font-poppins font-bold text-xl text-[#111827] mb-3 group-hover:text-[#E07B2A] transition-colors">{title}</h3>
                <p className="text-[#64748B] text-[15px] leading-relaxed font-medium">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* ─── SERVICES ─── */}
      <section className="section-padding bg-white relative">
        {/* Dark top half like Design 1 Services */}
        <div className="absolute top-0 left-0 w-full h-[320px] bg-solar-dark" />
        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center mb-14">
            <div className="badge bg-white/10 text-white border-white/20 mb-4">Our Services</div>
            <h2 className="section-title text-white">Complete Solar Solutions<br /><span className="text-solar-orange">for Every Property Type</span></h2>
          </AnimatedSection>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => {
              const Icon = ICON_MAP[service.icon] || Sun;
              const isBlue = service.color === 'blue';
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block bg-white rounded-2xl p-7 card-hover border-2 border-transparent hover:border-solar-orange shadow-card h-full flex flex-col"
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 ${isBlue ? 'bg-solar-sky group-hover:bg-solar-blue' : 'bg-solar-orange-tint group-hover:bg-solar-orange'}`}>
                      <Icon size={26} className={`transition-colors duration-300 ${isBlue ? 'text-solar-blue group-hover:text-white' : 'text-solar-orange group-hover:text-white'}`} />
                    </div>
                    <h3 className="font-poppins font-bold text-lg text-solar-dark mb-2 group-hover:text-solar-orange transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-500 text-sm mb-4 flex-grow">{service.shortDesc}</p>
                    <span className="flex items-center gap-1.5 text-solar-orange text-sm font-semibold font-poppins group/link">
                      Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-10" delay={0.2}>
            <Link href="/services" className="btn-secondary">
              View All Services <ArrowRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── SAVINGS CALCULATOR ─── */}
      <section className="section-padding bg-solar-dark relative overflow-hidden">
        {/* Background glows like Design 1 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-solar-blue/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="badge bg-solar-orange-tint text-solar-orange border-solar-orange/30 mb-4">Solar Savings Calculator</div>
              <h2 className="section-title text-white mb-4">How Much Will You <span className="text-solar-orange">Save?</span></h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Discover the financial benefits of switching to solar. Enter your monthly electricity bill for an instant estimate.
              </p>
              <div className="flex gap-4 items-center text-sm text-gray-500 mb-8">
                <div className="w-12 h-[1px] bg-gray-700" />
                <span>Based on standard Central India tariffs</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-poppins">Monthly Electricity Bill (₹)</label>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={e => setBillAmount(e.target.value)}
                    placeholder="e.g. 3000"
                    className="input-field text-lg"
                    min="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2 font-poppins">Property Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Residential', 'Commercial', 'Industrial'].map(type => (
                      <button
                        key={type}
                        onClick={() => setPropertyType(type)}
                        className={`py-3 rounded-xl font-semibold font-poppins text-sm transition-all duration-300 ${propertyType === type
                          ? 'bg-solar-orange text-white shadow-solar'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={handleCalc} className="btn-primary w-full justify-center text-base py-3.5">
                  <Calculator size={18} /> Calculate My Savings
                </button>
              </div>

              {calcResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 bg-white rounded-2xl p-6 shadow-card border border-solar-orange/20"
                >
                  <h4 className="font-poppins font-bold text-solar-dark mb-4 text-base">⚡ Results for {propertyType}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="py-2 sm:py-0">
                      <div className="text-solar-orange font-bold text-xl font-poppins">{calcResult.size}</div>
                      <div className="text-xs text-gray-500 mt-1">System Size</div>
                    </div>
                    <div>
                      <div className="text-solar-blue font-bold text-xl font-poppins">{calcResult.savings}</div>
                      <div className="text-xs text-gray-500 mt-1">Annual Savings</div>
                    </div>
                    <div>
                      <div className="text-green-600 font-bold text-xl font-poppins">{calcResult.payback}</div>
                      <div className="text-xs text-gray-500 mt-1">Payback Period</div>
                    </div>
                  </div>
                  <Link href="/calculator" className="btn-primary w-full justify-center mt-4 text-sm py-2.5">
                    Get Detailed Report <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white rounded-2xl p-8 shadow-card-hover">
                <h3 className="font-poppins font-bold text-solar-dark text-xl mb-6">💡 Did You Know?</h3>
                <div className="space-y-5">
                  {[
                    { label: 'Indore avg. sunshine', value: '5.5 hrs/day', bar: 80 },
                    { label: 'Panel efficiency (Tier-1)', value: '20–22%', bar: 85 },
                    { label: 'Typical bill reduction', value: '70–90%', bar: 90 },
                    { label: 'Subsidy (up to 3 kW)', value: '₹78,000', bar: 60 },
                    { label: 'System lifespan', value: '25+ years', bar: 95 },
                  ].map(({ label, value, bar }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-600 font-inter">{label}</span>
                        <span className="font-bold font-poppins text-solar-dark">{value}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${bar}%`, background: 'linear-gradient(90deg, #F05A28, #C4461B)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SUBSIDY & FINANCING — from Design 1 ─── */}
      <section className="section-padding bg-solar-grey">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-14">
            <div className="badge mb-4">Subsidy &amp; Financing</div>
            <h2 className="section-title">Making Solar <span className="gradient-text-orange">Affordable</span></h2>
            <p className="text-gray-500 max-w-2xl mx-auto mt-3 text-lg">Government subsidies and easy EMI options to make clean energy accessible to everyone.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* PM Surya Ghar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 border-2 border-solar-orange/20 relative overflow-hidden shadow-card"
            >
              <div className="absolute top-0 right-0 bg-solar-orange text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wide font-poppins">
                Govt. Scheme
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-solar-orange-tint p-4 rounded-2xl">
                  <Landmark size={28} className="text-solar-orange" />
                </div>
                <h3 className="font-poppins font-bold text-2xl text-solar-dark">PM Surya Ghar</h3>
              </div>
              <p className="text-gray-500 mb-6">
                Avail massive direct-to-bank subsidies under PM Surya Ghar Muft Bijli Yojana for residential installations.
              </p>
              <div className="bg-solar-grey rounded-2xl p-5 mb-6">
                <div className="text-sm font-semibold text-gray-400 uppercase mb-2 tracking-wide">Maximum Subsidy</div>
                <div className="text-3xl font-poppins font-bold text-solar-dark flex items-center">
                  <IndianRupee size={26} className="text-solar-orange mr-1" /> 78,000
                </div>
              </div>
              <ul className="space-y-3">
                {['Up to 3kW capacity covered', 'Direct Bank Transfer (DBT)', 'We handle all documentation'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Easy Financing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-solar-blue text-white rounded-3xl p-8 relative overflow-hidden shadow-blue-lg"
            >
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/10 p-4 rounded-2xl">
                  <Percent size={28} className="text-solar-orange" />
                </div>
                <h3 className="font-poppins font-bold text-2xl">Easy Financing</h3>
              </div>
              <p className="text-blue-200 mb-6">
                Partnered with leading nationalized and private banks to offer seamless solar loans at attractive interest rates.
              </p>
              <div className="bg-white/10 rounded-2xl p-5 mb-6 border border-white/10">
                <div className="text-sm font-semibold text-blue-300 uppercase mb-2 tracking-wide">Starting Interest Rate</div>
                <div className="text-3xl font-poppins font-bold text-solar-orange">7% p.a.</div>
              </div>
              <ul className="space-y-3">
                {['Zero processing fee options', 'Up to 5-year tenure', 'Minimal documentation needed'].map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-blue-100">
                    <CheckCircle size={18} className="text-solar-orange flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS SHOWCASE — Design 1 hover reveal ─── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
            <AnimatedSection>
              <div className="badge mb-4">Our Work</div>
              <h2 className="section-title">Real Projects,<br /><span className="gradient-text-orange">Real Results</span></h2>
              <p className="text-gray-500 text-lg mt-3">A glimpse of our engineering excellence across Madhya Pradesh.</p>
            </AnimatedSection>
            <Link href="/projects" className="btn-secondary flex-shrink-0">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative rounded-2xl overflow-hidden shadow-card card-hover cursor-pointer"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-solar-dark/90 via-solar-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="badge text-xs py-1 px-2.5">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                    <span className="bg-solar-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-poppins">
                      {project.capacity}
                    </span>
                  </div>
                </div>

                {/* Content hover reveal */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-poppins font-bold text-base transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    <span>📍 {project.location}</span>
                    <span>💰 {project.savings}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS — Horizontal Scroll Style ─── */}
      <section className="section-padding bg-solar-dark relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 w-full">
            <div className="max-w-2xl w-full">
              <h2 className="text-white font-poppins font-bold text-4xl md:text-5xl leading-tight">
                Don&apos;t just take our word for it. We&apos;ve powered 500+ properties.
              </h2>
            </div>
            <div className="text-gray-400 text-base lg:text-right">
              <div className="text-white font-semibold mb-1 text-lg">Rated 4.8/5 based on 127+ reviews.</div>
              Showing our 5-star reviews from verified customers.
            </div>
          </div>

          <InfiniteTestimonialSlider testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <div className="badge mb-4">FAQ</div>
            <h2 className="section-title">Frequently Asked<br /><span className="gradient-text-orange">Questions</span></h2>
            <p className="text-gray-500 mt-3 text-lg">Everything you need to know about switching to solar with us.</p>
          </AnimatedSection>

          <div className="space-y-3">
            {FAQS.slice(0, 5).map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`bg-solar-grey rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeFaq === i ? 'border-solar-orange shadow-solar' : 'border-transparent hover:border-solar-orange/40'
                  }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-poppins font-semibold text-solar-dark hover:text-solar-orange transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 ml-4 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-solar-orange' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-200 pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <AnimatedSection className="text-center mt-8" delay={0.1}>
            <Link href="/faq" className="btn-secondary">
              View All FAQs <ChevronRight size={16} />
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <ContactSection />
    </PageWrapper>
  );
}
