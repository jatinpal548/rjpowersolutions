'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Sun, Home, Building2, Factory, Wrench, Sparkles, Zap,
  CheckCircle, Star, ChevronDown, ArrowRight, ArrowLeft, Phone, MessageCircle,
  TrendingUp, Shield, Clock, Award, HeadphonesIcon, Users,
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
  { icon: Award, title: 'Expert Installation', desc: 'Certified technicians with 5+ years experience.' },
  { icon: Shield, title: 'Premium Components', desc: 'Tier-1 solar panels & inverters for lasting performance.' },
  { icon: TrendingUp, title: 'Maximum Savings', desc: 'Cut electricity bills by up to 90% with perfectly sized systems.' },
  { icon: CheckCircle, title: 'Subsidy Support', desc: 'Complete assistance with PM Surya Ghar subsidy up to ₹78,000.' },
  { icon: Sun, title: 'End-to-End Service', desc: 'Survey, Design, Installation, Net Metering & Maintenance.' },
  { icon: HeadphonesIcon, title: 'Dedicated Support', desc: 'Fast, responsive after-sales support & AMC plans.' },
];

const FEATURED_SERVICES = [
  {
    id: 'residential',
    title: 'Residential Solar',
    desc: 'Perfect solar solutions for homes and villas.',
    image: '/services/residential.png',
    icon: Home,
    badgeText: 'Homes & Villas',
    highlightIcon: Zap,
    highlightTitle: 'Save up to 90%',
    highlightSubtitle: 'ON ELECTRICITY BILLS',
    tagIcon: CheckCircle,
    tagText: '5kW - 20kW Range',
    link: '/services/residential',
    highlightBg: 'bg-[#FEF2ED]',
    highlightIconColor: 'text-[#F97316]',
  },
  {
    id: 'commercial',
    title: 'Commercial Solar',
    desc: 'Cut operational costs for offices, malls & shops.',
    image: '/services/commercial.png',
    icon: Building2,
    badgeText: 'Offices & Buildings',
    highlightIcon: TrendingUp,
    highlightTitle: 'Reduce Costs',
    highlightSubtitle: 'BY UP TO 60%',
    tagIcon: CheckCircle,
    tagText: '20kW - 500kW Range',
    link: '/services/commercial',
    highlightBg: 'bg-[#EFF6FF]',
    highlightIconColor: 'text-[#3B82F6]',
  },
  {
    id: 'industrial',
    title: 'Industrial Solar',
    desc: 'Massive savings for factories and warehouses.',
    image: '/services/industrial.png',
    icon: Factory,
    badgeText: 'Factories & Warehouses',
    highlightIcon: Award,
    highlightTitle: 'High Savings',
    highlightSubtitle: 'MAXIMUM ROI',
    tagIcon: CheckCircle,
    tagText: '500kW+ Range',
    link: '/services/industrial',
    highlightBg: 'bg-[#FEFCE8]',
    highlightIconColor: 'text-[#EAB308]',
  },
  {
    id: 'maintenance',
    title: 'Solar Maintenance',
    desc: 'Keep your system performing at peak efficiency with expert checks.',
    image: '/services/maintenance.png',
    icon: Wrench,
    badgeText: 'Max Performance',
    highlightIcon: Shield,
    highlightTitle: 'Peak Efficiency',
    highlightSubtitle: 'REGULAR CHECKS',
    tagIcon: CheckCircle,
    tagText: 'Expert Service',
    link: '/services/maintenance',
    highlightBg: 'bg-[#EFF6FF]',
    highlightIconColor: 'text-[#3B82F6]',
  },
  {
    id: 'cleaning',
    title: 'Panel Cleaning',
    desc: 'Boost output by 20-30% with professional deep cleaning services.',
    image: '/services/cleaning.png',
    icon: Sparkles,
    badgeText: 'Higher Output',
    highlightIcon: Sparkles,
    highlightTitle: 'Boost Output',
    highlightSubtitle: 'BY 20-30%',
    tagIcon: CheckCircle,
    tagText: 'Deep Cleaning',
    link: '/services/cleaning',
    highlightBg: 'bg-[#FEF2ED]',
    highlightIconColor: 'text-[#F97316]',
  },
  {
    id: 'net-metering',
    title: 'Net Metering',
    desc: 'Sell surplus power back to the grid and earn monetary credit.',
    image: '/services/net_metering.png',
    icon: Zap,
    badgeText: 'Earn from Surplus',
    highlightIcon: Zap,
    highlightTitle: 'Earn Credits',
    highlightSubtitle: 'SELL SURPLUS POWER',
    tagIcon: CheckCircle,
    tagText: 'Grid Connected',
    link: '/services/net-metering',
    highlightBg: 'bg-[#E8F5EE]',
    highlightIconColor: 'text-[#16A34A]',
  }
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
  const [activeService, setActiveService] = useState(1);
  const [activeProject, setActiveProject] = useState(1);
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
      <section className="relative flex flex-col justify-start md:justify-center pt-24 md:pt-32 pb-0 md:pb-32 lg:pb-40 bg-white md:bg-gray-50">
        {/* Desktop Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden hidden md:block">
          <Image
            src="/hero-bg-img.png"
            alt="Solar Installation"
            fill
            className="object-cover object-[70%_center] lg:object-center"
            priority
          />
          {/* Gradient Overlay for text readability on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full md:w-[65%]"></div>
        </div>

        <div className="relative container-custom z-20 w-full mt-2 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">

            {/* Left Column (Content) */}
            <div className="max-w-[800px] relative z-10 w-full md:w-[120%] lg:w-[130%]">
              {/* Top Badge */}
              <div className="flex md:block justify-center w-full md:w-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-[0_2px_10px_rgb(0,0,0,0.05)] border border-[#16A34A]/20 mb-6 md:mb-8"
                >
                  <Zap size={14} className="text-[#16A34A] fill-[#16A34A]" />
                  <span className="text-[#16A34A] font-bold text-[11px] md:text-sm tracking-wide">India's Trusted Solar EPC Company</span>
                </motion.div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className="text-center md:text-left text-4xl sm:text-5xl lg:text-[4rem] font-extrabold text-[#111827] mb-4 md:mb-6 tracking-tight leading-[1.1] font-poppins md:whitespace-nowrap"
              >
                Power Your Future<br />
                with <span className="text-[#F97316]">Solar Energy</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="text-center md:text-left mx-auto md:mx-0 text-[#64748B] text-[15px] sm:text-lg lg:text-xl font-medium mb-8 md:mb-10 leading-relaxed max-w-lg"
              >
                Save up to 90% on electricity bills with<br className="hidden sm:block" />
                high-efficiency solar solutions for<br className="hidden sm:block" />
                homes, businesses and industries.
              </motion.p>

              {/* Desktop Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                className="hidden md:flex flex-col sm:flex-row items-center gap-4 mb-14 w-full sm:w-auto"
              >
                <a
                  href={heroWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#F97316] hover:bg-[#E66E00] text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all w-full sm:w-auto shadow-md text-base group"
                >
                  <MessageCircle size={20} className="font-normal" />
                  Get Free Consultation &rarr;
                </a>
                <Link
                  href="/calculator"
                  className="bg-white text-[#111827] font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 shadow-sm hover:bg-gray-50 transition-all w-full sm:w-auto text-base border border-gray-200"
                >
                  <Calculator size={20} />
                  Calculate Savings
                </Link>
              </motion.div>

              {/* Mobile Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                className="flex md:hidden items-center gap-3 w-full mb-8"
              >
                <a href={heroWhatsApp} className="flex-1 bg-[#F97316] text-white font-bold py-3.5 px-2 rounded-xl flex items-center justify-center gap-1.5 shadow-md text-[13px] leading-tight text-center">
                  <MessageCircle size={14} /> Get Free Quote &rarr;
                </a>
                <Link href="/calculator" className="flex-1 bg-white text-[#111827] font-bold py-3.5 px-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm border border-gray-200 text-[13px] leading-tight text-center">
                  <Calculator size={14} /> Calculate Savings &rarr;
                </Link>
              </motion.div>

              {/* Mobile Stats Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
                className="md:hidden w-full mb-6 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] border border-gray-100 px-2 py-5"
              >
                <div className="grid grid-cols-4 gap-1 divide-x divide-gray-100">
                  {[
                    { value: '500+', label: 'Installations', icon: Sun },
                    { value: '25+', label: 'Years Experience', icon: Users },
                    { value: '100%', label: 'Quality Assurance', icon: Shield },
                    { value: '500+', label: 'Happy Customers', icon: Star },
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center text-center px-1">
                      <div className="w-8 h-8 rounded-full bg-[#E8F5EE] flex items-center justify-center mb-2">
                        <stat.icon size={16} className="text-[#16A34A]" strokeWidth={2} />
                      </div>
                      <div className="text-sm font-poppins font-extrabold text-[#16A34A] leading-tight mb-0.5">{stat.value}</div>
                      <div className="text-[9px] font-bold text-[#64748B] leading-tight mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Mobile Hero Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
                className="relative w-full h-[220px] md:hidden rounded-2xl overflow-hidden mb-8 shadow-sm"
              >
                <Image src="/hero-bg-mobile.png" alt="Solar Installation" fill className="object-cover object-center" priority />
                <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute top-[20%] left-[5%] bg-white/95 backdrop-blur-md rounded-lg px-2 py-1 text-[9px] font-bold text-[#111827] flex items-center gap-1 shadow-sm border border-gray-100">
                  <Home size={10} className="text-[#16A34A]" /> Residential
                </motion.div>
                <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} className="absolute top-[10%] left-[45%] -translate-x-1/2 bg-white/95 backdrop-blur-md rounded-lg px-2 py-1 text-[9px] font-bold text-[#111827] flex items-center gap-1 shadow-sm border border-gray-100">
                  <Building2 size={10} className="text-[#16A34A]" /> Commercial
                </motion.div>
                <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }} className="absolute bottom-[20%] right-[5%] bg-white/95 backdrop-blur-md rounded-lg px-2 py-1 text-[9px] font-bold text-[#111827] flex items-center gap-1 shadow-sm border border-gray-100">
                  <Factory size={10} className="text-[#16A34A]" /> Industrial
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column (Empty to let background show, but has floating cards) */}
            <div className="relative w-full h-[300px] lg:h-[500px] hidden md:block pointer-events-none">
              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute top-10 right-0 bg-white px-5 py-3.5 rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.1)] flex items-center gap-4 z-20 border border-white/50"
              >
                <div className="w-10 h-10 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
                  <IndianRupee className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div>
                  <div className="font-extrabold text-[#111827] font-poppins text-lg">₹35,000/month</div>
                  <div className="text-xs text-[#64748B] font-bold">Saved on Electricity</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="absolute top-44 right-20 bg-white px-5 py-3.5 rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.1)] flex items-center gap-4 z-20 border border-white/50"
              >
                <div className="w-10 h-10 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-5 h-5 text-[#16A34A]" />
                </div>
                <div>
                  <div className="text-xs text-[#64748B] font-bold">ROI in</div>
                  <div className="font-extrabold text-[#111827] font-poppins text-lg">3.8 Years</div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>



        {/* Feature List (Desktop Only) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="absolute bottom-28 lg:bottom-24 left-0 z-30 w-full pointer-events-none hidden md:block"
        >
          <div className="container-custom flex justify-start">
            <div className="bg-white rounded-r-2xl lg:rounded-2xl -ml-4 lg:ml-0 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-6 lg:px-8 py-5 inline-flex flex-wrap lg:flex-nowrap items-center gap-6 lg:gap-10 border border-gray-100 pointer-events-auto">
              {[
                { text: 'Free Site Survey', icon: MapPin },
                { text: 'Gov. Subsidy Assistance', icon: Shield },
                { text: '25-Year Warranty', icon: CheckCircle },
                { text: '500+ Happy Customers', icon: CheckCircle }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-[#111827] text-sm font-bold whitespace-nowrap">
                  <item.icon size={20} className="text-[#16A34A]" strokeWidth={2.5} />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Floating Stats Bar (Desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 right-0 z-30 translate-y-1/2 px-4 w-full hidden md:block"
        >
          <div className="container-custom">
            <div className="bg-white rounded-[2rem] shadow-[0_10px_40px_rgb(0,0,0,0.08)] border border-[#E5E7EB] overflow-hidden">
              <div className="flex p-8 flex-row justify-between items-center gap-4">
                {[
                  { value: '500+', label: 'Installations', sub: 'Successfully Completed', icon: Sun },
                  { value: '5+', label: 'Years Experience', sub: 'In Solar Industry', icon: Award },
                  { value: '50+', label: 'Cities', sub: 'Serving Across MP', icon: Building2 },
                  { value: '98%', label: 'Satisfaction', sub: 'Happy Customers', icon: Star },
                ].map((stat, i) => (
                  <div key={i} className="flex items-start text-left gap-5 group transition-transform hover:-translate-y-1">
                    <div className="w-14 h-14 rounded-[1.2rem] bg-[#E8F5EE] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <stat.icon size={26} className="text-[#16A34A]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[28px] font-poppins font-extrabold text-[#111827] tracking-tight leading-tight mb-0.5">{stat.value}</div>
                      <div className="text-sm font-bold text-[#64748B]">{stat.label}</div>
                      <div className="text-[13px] text-[#64748B] font-medium mt-0.5">{stat.sub}</div>
                    </div>
                  </div>
                ))}
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
          <AnimatedSection className="text-center mb-8 md:mb-16">
            <div className="hidden md:inline-flex items-center gap-2 bg-[#FFF2E8] text-[#E07B2A] font-semibold px-4 py-1.5 rounded-full mb-4 text-sm">
              <Award size={16} />
              <span>Why Choose RJ Power Solutions</span>
            </div>
            
            <div className="flex md:hidden items-center justify-center gap-4 mb-4">
              <div className="h-px bg-[#16A34A]/40 w-6"></div>
              <span className="text-[#16A34A] font-bold text-[13px]">Why Choose RJ Power Solutions</span>
              <div className="h-px bg-[#16A34A]/40 w-6"></div>
            </div>

            <h2 className="hidden md:block font-poppins font-extrabold text-4xl md:text-5xl text-[#111827] leading-tight">
              Your Trusted Solar Partner<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#E66E00]">in Central India</span>
            </h2>
            <p className="hidden md:block text-[#64748B] max-w-2xl mx-auto mt-4 text-lg font-medium">We deliver more than solar panels — we deliver energy independence, savings, and peace of mind.</p>
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {WHY_CHOOSE.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[16px] md:rounded-[24px] p-4 md:p-8 border border-[#E5E7EB] shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#E8F5EE] flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={18} className="text-[#16A34A] md:w-7 md:h-7" strokeWidth={2} />
                </div>
                <h3 className="font-poppins font-bold text-[13px] md:text-xl text-[#111827] mb-1.5 md:mb-3 group-hover:text-[#16A34A] transition-colors leading-tight">{title}</h3>
                <p className="text-[#64748B] text-[10px] md:text-[15px] leading-snug md:leading-relaxed font-medium">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* ─── NEW PREMIUM SERVICES SECTION ─── */}
      <section className="py-24 bg-[#FAFBFC] relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#E8F5EE] to-transparent rounded-full opacity-50 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#FEF2ED] to-transparent rounded-full opacity-50 blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

        <div className="container-custom relative z-10">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 mb-6">
              <span className="text-[#F97316] font-bold text-sm tracking-wide">Our Services</span>
            </div>
            <h2 className="font-poppins font-extrabold text-4xl md:text-5xl text-[#111827] leading-tight mb-6">
              Complete Solar Solutions <br />
              <span className="text-[#F97316]">for Every Property Type</span>
            </h2>
            <p className="text-[#64748B] text-lg font-medium leading-relaxed">
              From homes to industries, we provide end-to-end solar solutions designed to save money and power a sustainable future.
            </p>
          </AnimatedSection>

          {/* Top Row: Featured Services (Desktop Grid) */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {FEATURED_SERVICES.slice(0, 3).map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="relative h-[240px] w-full overflow-hidden bg-gray-50">
                  <Image src={svc.image} alt={svc.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/50">
                    <svc.icon size={14} className="text-[#16A34A]" />
                    <span className="text-[#16A34A] text-xs font-bold uppercase tracking-wider">{svc.badgeText}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-poppins font-bold text-2xl text-[#111827] mb-2">{svc.title}</h3>
                  <p className="text-[#64748B] text-[15px] font-medium mb-6">{svc.desc}</p>

                  <div className="flex items-center gap-4 mb-6">
                    <div className={`flex items-center gap-3 flex-1 ${svc.highlightBg} rounded-xl px-4 py-3`}>
                      <svc.highlightIcon className={`${svc.highlightIconColor} w-6 h-6 shrink-0`} />
                      <div>
                        <div className="text-[#111827] text-sm font-bold">{svc.highlightTitle}</div>
                        <div className="text-[#64748B] text-[10px] font-medium uppercase tracking-wide">{svc.highlightSubtitle}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#16A34A] bg-[#E8F5EE] px-3 py-1.5 rounded-lg text-xs font-bold">
                      <svc.tagIcon size={14} /> {svc.tagText}
                    </div>
                    <Link href={svc.link} className="flex items-center gap-1.5 text-[#F97316] font-bold text-sm group/btn hover:text-[#E66E00] transition-colors">
                      Learn More <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Top Row: Featured Services (Mobile Carousel) */}
          <div className="lg:hidden mb-8 w-full overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-out will-change-transform gap-4"
              style={{ transform: `translateX(calc(-${activeService * 100}% - ${activeService * 16}px))` }}
            >
              {FEATURED_SERVICES.map((svc, i) => (
                <div key={svc.id} className="min-w-full shrink-0 flex">
                  <div className="group w-full bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden flex flex-col h-full transform transition-transform duration-300">
                    <div className="relative h-[240px] w-full overflow-hidden bg-gray-50">
                      <Image src={svc.image} alt={svc.title} fill className="object-cover" />
                      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-md flex items-center gap-1.5 shadow-sm border border-white/50">
                        <svc.icon size={12} className="text-[#16A34A]" />
                        <span className="text-[#16A34A] text-[10px] font-extrabold uppercase tracking-widest">{svc.badgeText}</span>
                      </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="font-poppins font-bold text-[22px] text-[#111827] mb-2">{svc.title}</h3>
                      <p className="text-[#64748B] text-[15px] font-medium mb-5">{svc.desc}</p>

                      <div className="flex items-center gap-3 mb-5">
                        <div className={`flex items-center gap-3 flex-1 ${svc.highlightBg} rounded-xl px-4 py-3`}>
                          <svc.highlightIcon className={`${svc.highlightIconColor} w-5 h-5 shrink-0`} />
                          <div>
                            <div className="text-[#111827] text-[13px] font-extrabold">{svc.highlightTitle}</div>
                            <div className="text-[#64748B] text-[9px] font-bold uppercase tracking-wider mt-0.5">{svc.highlightSubtitle}</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[#16A34A] bg-[#E8F5EE] px-2.5 py-1 rounded-md text-[11px] font-bold">
                          <svc.tagIcon size={12} /> {svc.tagText}
                        </div>
                        <Link href={svc.link} className="flex items-center gap-1 text-[#F97316] font-bold text-sm">
                          Learn More <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button 
                onClick={() => setActiveService(activeService === 0 ? FEATURED_SERVICES.length - 1 : activeService - 1)} 
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 active:scale-95 shadow-sm transition-all duration-300"
                aria-label="Previous service"
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
              </button>
              <div className="flex gap-2.5">
                {FEATURED_SERVICES.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveService(i)} 
                    className={`h-2 rounded-full transition-all duration-300 ${activeService === i ? 'w-6 bg-[#16A34A]' : 'w-2 bg-gray-300'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setActiveService((activeService + 1) % FEATURED_SERVICES.length)} 
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 active:scale-95 shadow-sm transition-all duration-300"
                aria-label="Next service"
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Bottom Row: Support Services */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* 4. Maintenance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row overflow-hidden hover:-translate-y-1"
            >
              <div className="relative w-full xl:w-2/5 h-48 xl:h-auto overflow-hidden">
                <Image src="/services/maintenance.png" alt="Solar Maintenance" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                  <CheckCircle size={12} className="text-[#16A34A]" />
                  <span className="text-[#111827] text-[10px] font-bold uppercase tracking-wider">Max Performance</span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0">
                      <Wrench className="text-[#3B82F6] w-4 h-4" />
                    </div>
                    <h4 className="font-poppins font-bold text-lg text-[#111827]">Solar Maintenance</h4>
                  </div>
                  <p className="text-[#64748B] text-sm mb-4 line-clamp-2">Keep your system performing at peak efficiency with expert checks.</p>
                </div>
                <Link href="/services/maintenance" className="flex items-center gap-1.5 text-[#F97316] font-bold text-sm group/btn hover:text-[#E66E00] transition-colors mt-auto">
                  Learn More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* 5. Panel Cleaning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row overflow-hidden hover:-translate-y-1"
            >
              <div className="relative w-full xl:w-2/5 h-48 xl:h-auto overflow-hidden">
                <Image src="/services/cleaning.png" alt="Panel Cleaning" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                  <CheckCircle size={12} className="text-[#16A34A]" />
                  <span className="text-[#111827] text-[10px] font-bold uppercase tracking-wider">Higher Output</span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#FEF2ED] flex items-center justify-center shrink-0">
                      <Sparkles className="text-[#F97316] w-4 h-4" />
                    </div>
                    <h4 className="font-poppins font-bold text-lg text-[#111827]">Panel Cleaning</h4>
                  </div>
                  <p className="text-[#64748B] text-sm mb-4 line-clamp-2">Boost output by 20-30% with professional deep cleaning services.</p>
                </div>
                <Link href="/services/cleaning" className="flex items-center gap-1.5 text-[#F97316] font-bold text-sm group/btn hover:text-[#E66E00] transition-colors mt-auto">
                  Learn More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* 6. Net Metering */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row overflow-hidden hover:-translate-y-1"
            >
              <div className="relative w-full xl:w-2/5 h-48 xl:h-auto overflow-hidden">
                <Image src="/services/net_metering.png" alt="Net Metering" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
                  <CheckCircle size={12} className="text-[#16A34A]" />
                  <span className="text-[#111827] text-[10px] font-bold uppercase tracking-wider">Earn from Surplus</span>
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-[#E8F5EE] flex items-center justify-center shrink-0">
                      <Zap className="text-[#16A34A] w-4 h-4" />
                    </div>
                    <h4 className="font-poppins font-bold text-lg text-[#111827]">Net Metering</h4>
                  </div>
                  <p className="text-[#64748B] text-sm mb-4 line-clamp-2">Sell surplus power back to the grid and earn monetary credit.</p>
                </div>
                <Link href="/services/net-metering" className="flex items-center gap-1.5 text-[#F97316] font-bold text-sm group/btn hover:text-[#E66E00] transition-colors mt-auto">
                  Learn More <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>

          </div>

          <AnimatedSection className="text-center mt-12" delay={0.4}>
            <Link href="/services" className="inline-flex items-center justify-center gap-2 bg-white text-[#111827] font-bold py-3.5 px-8 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
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


      {/* ─── PROJECTS SHOWCASE — Design 1 hover reveal ─── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-14 gap-6">
            <AnimatedSection className="text-center md:text-left w-full md:w-auto">
              <div className="badge mb-4 mx-auto md:mx-0">Our Work</div>
              <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">Real Projects, <br className="hidden md:block" /><span className="gradient-text-orange">Real Results</span></h2>
              <p className="text-gray-500 text-sm md:text-lg mt-3 max-w-md mx-auto md:mx-0">A glimpse of our engineering excellence across Madhya Pradesh.</p>
            </AnimatedSection>
            <Link href="/projects" className="btn-secondary flex-shrink-0 w-full md:w-auto justify-center text-sm md:text-base py-3.5">
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>

          {/* Projects Desktop Grid */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-solar-dark/90 via-solar-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="badge text-xs py-1 px-2.5">
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </span>
                    <span className="bg-solar-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-poppins">
                      {project.capacity}
                    </span>
                  </div>
                </div>

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

          {/* Projects Mobile Carousel */}
          <div className="lg:hidden w-full overflow-hidden relative">
            <div 
              className="flex transition-transform duration-500 ease-out will-change-transform gap-4"
              style={{ transform: `translateX(calc(-${activeProject * 100}% - ${activeProject * 16}px))` }}
            >
              {PROJECTS.map((project, i) => (
                <div key={project.id} className="min-w-full shrink-0 flex">
                  <div className="group relative w-full rounded-2xl overflow-hidden shadow-card cursor-pointer">
                    <div className="relative aspect-[4/3] w-full">
                      <Image src={project.image} alt={project.title} fill className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/30 to-transparent"></div>
                      
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="badge text-xs py-1 px-2.5 bg-white/20 backdrop-blur-md text-white border-white/20">
                          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </span>
                        <span className="bg-solar-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider font-poppins">
                          {project.capacity}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 p-5 w-full">
                        <h3 className="font-poppins font-bold text-lg text-white mb-2">{project.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-white/90 text-xs">
                          <span className="flex items-center gap-1"><MapPin size={12} className="text-solar-orange" /> {project.location}</span>
                          <span className="flex items-center gap-1"><Zap size={12} className="text-solar-orange" /> {project.savings}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button 
                onClick={() => setActiveProject(activeProject === 0 ? PROJECTS.length - 1 : activeProject - 1)} 
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 active:scale-95 shadow-sm transition-all duration-300"
                aria-label="Previous project"
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
              </button>
              <div className="flex gap-2.5">
                {PROJECTS.map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveProject(i)} 
                    className={`h-2 rounded-full transition-all duration-300 ${activeProject === i ? 'w-6 bg-[#F97316]' : 'w-2 bg-gray-300'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setActiveProject((activeProject + 1) % PROJECTS.length)} 
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 active:scale-95 shadow-sm transition-all duration-300"
                aria-label="Next project"
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
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
