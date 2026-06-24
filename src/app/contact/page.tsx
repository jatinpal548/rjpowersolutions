'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle, Send,
  Zap, Shield, IndianRupee, User, Lock, Calendar, Users, Globe 
} from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { SITE, whatsappLink } from '@/lib/constants';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', location: '', bill: '', propertyType: 'Residential', message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello RJ Power Solutions! 🌞\n\n📋 New Contact Form Inquiry:\n\n👤 Name: ${form.name}\n📱 Phone: ${form.phone}\n📧 Email: ${form.email || 'Not provided'}\n📍 Location: ${form.location || 'Not provided'}\n🏠 Property Type: ${form.propertyType}\n💡 Monthly Bill: ${form.bill ? '₹' + form.bill : 'Not provided'}\n\n💬 Message:\n${form.message || 'No additional message'}\n\nPlease get back to me at your earliest convenience. Thank you!`;
    window.open(whatsappLink(msg), '_blank');
  };

  return (
    <PageWrapper>
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-br from-[#FFF9F5] to-white overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography */}
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-[#16A34A]/20 mb-6"
              >
                <CheckCircle size={14} className="text-[#16A34A]" />
                <span className="text-[#16A34A] font-bold text-sm tracking-wide">We&apos;re Here to Help</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl font-extrabold text-[#111827] mb-6 tracking-tight leading-[1.1] font-poppins"
              >
                Let&apos;s Power a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#E66E00]">Sustainable</span> Future Together
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-[#64748B] text-lg font-medium mb-10 leading-relaxed max-w-lg"
              >
                Have questions or ready to go solar? Our team in Indore is here to help. Reach out to us and we&apos;ll get back within 30 minutes on WhatsApp.
              </motion.p>
            </div>

            {/* Right Column: Hero Image & Features */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl"
              >
                <Image src="/contact-hero.png" alt="Solar Panels" fill className="object-cover" />
              </motion.div>

              {/* Floating Feature Highlights */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[110%] max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hidden md:grid grid-cols-4 gap-4 divide-x divide-gray-100"
              >
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-10 h-10 rounded-full bg-[#E8F5EE] flex items-center justify-center mb-3 shrink-0">
                    <Zap size={18} className="text-[#16A34A]" />
                  </div>
                  <div className="font-bold text-[#111827] text-sm">Expert Guidance</div>
                  <div className="text-xs text-[#64748B] mt-1">From solar experts</div>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFF2E8] flex items-center justify-center mb-3 shrink-0">
                    <Clock size={18} className="text-[#F97316]" />
                  </div>
                  <div className="font-bold text-[#111827] text-sm">Quick Response</div>
                  <div className="text-xs text-[#64748B] mt-1">Within 30 minutes</div>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-10 h-10 rounded-full bg-[#E8F5EE] flex items-center justify-center mb-3 shrink-0">
                    <Shield size={18} className="text-[#16A34A]" />
                  </div>
                  <div className="font-bold text-[#111827] text-sm">Trusted Service</div>
                  <div className="text-xs text-[#64748B] mt-1">Reliable & transparent</div>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-10 h-10 rounded-full bg-[#FFF2E8] flex items-center justify-center mb-3 shrink-0">
                    <IndianRupee size={18} className="text-[#F97316]" />
                  </div>
                  <div className="font-bold text-[#111827] text-sm">End-to-End Support</div>
                  <div className="text-xs text-[#64748B] mt-1">From query to installation</div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT LAYOUT (Two Column) */}
      <section className="py-20 lg:pt-32 lg:pb-24 bg-[#FAFBFC] relative z-20">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* 3. CONTACT FORM (Left Card) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white rounded-[24px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E7EB]"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
                <Send size={20} className="text-[#16A34A] -ml-1" />
              </div>
              <div>
                <h2 className="font-poppins font-extrabold text-3xl text-[#111827]">Send Us a Message</h2>
              </div>
            </div>
            <p className="text-[#64748B] text-base mb-10 pl-16">Fill in the form and we&apos;ll send your message directly via WhatsApp.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2 font-poppins">Full Name *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Rajesh Sharma" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] outline-none transition-all text-sm bg-gray-50/50 focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2 font-poppins">Phone Number *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] outline-none transition-all text-sm bg-gray-50/50 focus:bg-white" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2 font-poppins">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail size={18} className="text-gray-400" />
                    </div>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="e.g. rajesh@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] outline-none transition-all text-sm bg-gray-50/50 focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2 font-poppins">Your Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MapPin size={18} className="text-gray-400" />
                    </div>
                    <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Vijay Nagar, Indore" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] outline-none transition-all text-sm bg-gray-50/50 focus:bg-white" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2 font-poppins">Monthly Electricity Bill (₹)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IndianRupee size={18} className="text-gray-400" />
                    </div>
                    <input type="number" name="bill" value={form.bill} onChange={handleChange} placeholder="e.g. 3000" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] outline-none transition-all text-sm bg-gray-50/50 focus:bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#111827] mb-2 font-poppins">Property Type</label>
                  <select name="propertyType" value={form.propertyType} onChange={handleChange} className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] outline-none transition-all text-sm bg-gray-50/50 focus:bg-white">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>School / Hospital</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2 font-poppins">Message / Requirements</label>
                <div className="relative">
                  <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                    <MessageCircle size={18} className="text-gray-400" />
                  </div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your requirements, any questions, or how we can help you..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] outline-none transition-all text-sm resize-none bg-gray-50/50 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full bg-[#F97316] hover:bg-[#E66E00] text-white font-bold rounded-xl flex items-center justify-center gap-2 py-4 transition-colors shadow-sm">
                  <MessageCircle size={20} /> Send via WhatsApp
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-4 text-xs font-medium text-gray-500 text-center px-4">
                  <Lock size={12} className="shrink-0" />
                  <span>Clicking &apos;Send via WhatsApp&apos; will open WhatsApp with your message pre-filled.</span>
                </div>
              </div>
            </form>
          </motion.div>

          {/* 4. RIGHT COLUMN CARDS (Top to Bottom) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Card 1 (WhatsApp CTA) */}
            <div className="bg-[#1A7A3C] rounded-[24px] p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full pointer-events-none blur-xl"></div>
              
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-6">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <h3 className="font-poppins font-extrabold text-2xl text-white mb-2">Prefer WhatsApp?</h3>
                  <p className="text-green-50 text-sm mb-8 font-medium">Chat directly with our solar expert and get answers in minutes.</p>
                </div>
                
                <a
                  href={whatsappLink('Hello! I want to inquire about solar installation.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#1A7A3C] font-poppins font-bold px-6 py-4 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shadow-sm relative z-10"
                >
                  <MessageCircle size={18} /> Start WhatsApp Chat
                </a>
              </div>

              {/* Phone Illustration */}
              <div className="absolute -bottom-8 -right-8 w-40 h-40 opacity-40 pointer-events-none">
                <Image src="/chat-illustration.png" alt="Chat" fill className="object-contain" />
              </div>
            </div>

            {/* Card 2 (Office Hours) */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E7EB]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#FFF2E8] flex items-center justify-center shrink-0">
                  <Clock size={20} className="text-[#F97316]" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-[#111827]">Office Hours</h3>
              </div>
              <div className="space-y-4 text-[15px]">
                {[
                  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
                  { day: 'Saturday', time: '9:00 AM – 2:00 PM' },
                  { day: 'Sunday', time: 'Closed', highlight: true },
                ].map(({ day, time, highlight }) => (
                  <div key={day} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <span className="text-[#64748B] font-medium">{day}</span>
                    <span className={`font-bold font-poppins ${highlight ? 'text-gray-400' : 'text-[#111827]'}`}>{time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-[#F8FAF7] rounded-xl p-4 flex items-start gap-3 border border-[#E8F5EE]">
                <Calendar size={18} className="text-[#16A34A] shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-[#111827] leading-relaxed">WhatsApp is available 24/7 for urgent queries</span>
              </div>
            </div>

            {/* Card 3 (Why Reach Out?) */}
            <div className="bg-white rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#E5E7EB]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
                  <Users size={20} className="text-[#16A34A]" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-[#111827]">Why Reach Out?</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Free site survey & consultation',
                  'Instant WhatsApp quotes',
                  'Subsidy application help',
                  'EMI and financing guidance',
                  'Maintenance & AMC support',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-[#64748B] font-medium">
                    <CheckCircle size={18} className="text-[#16A34A] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 5. BOTTOM INFO STRIP (Full Width) */}
      <section className="bg-[#FFF5ED] border-t border-[#F97316]/10 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 lg:divide-x lg:divide-[#F97316]/20">
            
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-4">
              <div className="w-12 h-12 rounded-full bg-white text-[#F97316] flex items-center justify-center mb-4 shadow-sm border border-[#F97316]/20">
                <Phone size={20} />
              </div>
              <div className="font-bold font-poppins text-[#111827] text-lg mb-1">Call / WhatsApp</div>
              <a href={`tel:${SITE.phone}`} className="font-bold text-[#F97316] text-xl mb-2 hover:underline">{SITE.phone}</a>
              <div className="text-sm text-[#64748B] font-medium">Mon–Sat, 9 AM – 6 PM</div>
            </div>

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-4">
              <div className="w-12 h-12 rounded-full bg-white text-[#F97316] flex items-center justify-center mb-4 shadow-sm border border-[#F97316]/20">
                <Mail size={20} />
              </div>
              <div className="font-bold font-poppins text-[#111827] text-lg mb-1">Email Address</div>
              <a href={`mailto:${SITE.email}`} className="font-bold text-[#F97316] text-lg mb-2 hover:underline break-all">{SITE.email}</a>
              <div className="text-sm text-[#64748B] font-medium">We reply within 24 hrs</div>
            </div>

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-4">
              <div className="w-12 h-12 rounded-full bg-white text-[#F97316] flex items-center justify-center mb-4 shadow-sm border border-[#F97316]/20">
                <MapPin size={20} />
              </div>
              <div className="font-bold font-poppins text-[#111827] text-lg mb-1">Office Address</div>
              <div className="text-sm text-[#111827] font-bold mb-2">123, Solar Street, Vijay Nagar, Indore, MP 452010</div>
              <div className="text-sm text-[#64748B] font-medium">Visit us for consultation</div>
            </div>

            <div className="flex flex-col items-center lg:items-start text-center lg:text-left px-4">
              <div className="w-12 h-12 rounded-full bg-white text-[#F97316] flex items-center justify-center mb-4 shadow-sm border border-[#F97316]/20">
                <Globe size={20} />
              </div>
              <div className="font-bold font-poppins text-[#111827] text-lg mb-1">Service Area</div>
              <div className="text-sm text-[#111827] font-bold mb-2">Indore & nearby areas</div>
              <div className="text-sm text-[#64748B] font-medium">On-site visits available</div>
            </div>

          </div>
        </div>
      </section>

    </PageWrapper>
  );
}
