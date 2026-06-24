import React from 'react';
import { motion } from 'framer-motion';
import { HeadphonesIcon, MapPin, Phone, Mail, User, Send, ThumbsUp, CheckCircle2, MessageCircle } from 'lucide-react';
import { SITE, whatsappLink } from '@/lib/constants';

export default function ContactSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" id="contact">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      
      <div className="container-custom max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FFF2E8] text-[#E07B2A] font-semibold px-4 py-1.5 rounded-full mb-4">
            <HeadphonesIcon size={16} />
            <span>Contact Us</span>
          </div>
          <h2 className="font-poppins font-extrabold text-4xl md:text-5xl text-[#1A1A1A]">
            Get in Touch with <span className="text-[#E07B2A]">Our Experts</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Have questions or ready to go solar? We&apos;re here to help you at every step of your solar journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-[#F4F7F5] rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden"
          >
            <h3 className="font-poppins font-bold text-2xl text-[#1A1A1A] mb-8 z-10">Contact Information</h3>
            
            <div className="space-y-6 z-10 flex-grow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E8F2EC] flex items-center justify-center flex-shrink-0 text-[#1A7A3C]">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-[#1A1A1A]">Office Address</h4>
                  <p className="text-gray-600 text-sm mt-1">{SITE.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E8F2EC] flex items-center justify-center flex-shrink-0 text-[#1A7A3C]">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-[#1A1A1A]">Phone Number</h4>
                  <p className="text-gray-600 text-sm mt-1">{SITE.phone}</p>
                  <p className="text-gray-500 text-xs mt-0.5">Mon - Sat, 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#E8F2EC] flex items-center justify-center flex-shrink-0 text-[#1A7A3C]">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-poppins font-bold text-[#1A1A1A]">Email Address</h4>
                  <p className="text-gray-600 text-sm mt-1">{SITE.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 z-10">
              <h4 className="font-poppins font-bold text-[#1A1A1A] mb-2 text-sm">Connect on WhatsApp</h4>
              <p className="text-gray-500 text-sm mb-4">Chat with our experts for quick assistance</p>
              <a
                href={whatsappLink('Hello! I want to inquire about solar.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#16A34A] text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-[#15803d] transition-colors shadow-sm"
              >
                <MessageCircle size={20} />
                Chat with Us on WhatsApp
              </a>
            </div>

            {/* Decorative Vector */}
            <div className="absolute bottom-0 right-0 w-48 h-48 opacity-20 translate-x-8 translate-y-8 pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
                <path d="M50 10L10 40H20V90H80V40H90L50 10Z" className="text-[#1A7A3C]" />
                <rect x="35" y="45" width="10" height="15" fill="#1A1A1A" />
                <rect x="55" y="45" width="10" height="15" fill="#1A1A1A" />
                <rect x="40" y="70" width="20" height="20" fill="#1A1A1A" />
              </svg>
            </div>
          </motion.div>

          {/* Right Column: Send Message Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 relative"
          >
            <div className="absolute top-8 right-8 text-[#E07B2A] opacity-80">
               <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-45">
                 <line x1="22" y1="2" x2="11" y2="13"></line>
                 <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
               </svg>
            </div>
            
            <h3 className="font-poppins font-bold text-2xl text-[#1A1A1A] mb-8">Send a Message</h3>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2 font-poppins">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1A7A3C] focus:border-transparent outline-none transition-all text-[#1A1A1A] placeholder:text-gray-400 font-medium" 
                      required 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2 font-poppins">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                      <Phone size={18} />
                    </div>
                    <input 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1A7A3C] focus:border-transparent outline-none transition-all text-[#1A1A1A] placeholder:text-gray-400 font-medium" 
                      required 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2 font-poppins">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1A7A3C] focus:border-transparent outline-none transition-all text-[#1A1A1A] placeholder:text-gray-400 font-medium" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2 font-poppins">Your Message</label>
                <textarea 
                  rows={4} 
                  placeholder="How can we help you?" 
                  className="w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1A7A3C] focus:border-transparent outline-none transition-all resize-none text-[#1A1A1A] placeholder:text-gray-400 font-medium" 
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#E07B2A] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#c66922] transition-colors shadow-sm mt-2"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F2EC] flex items-center justify-center shrink-0 text-[#1A7A3C]">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-[#1A1A1A] text-sm font-poppins">Quick Response</h5>
                  <p className="text-gray-500 text-xs">We reply within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F2EC] flex items-center justify-center shrink-0 text-[#1A7A3C]">
                  <User size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-[#1A1A1A] text-sm font-poppins">Expert Guidance</h5>
                  <p className="text-gray-500 text-xs">Advice from solar specialists</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8F2EC] flex items-center justify-center shrink-0 text-[#1A7A3C]">
                  <ThumbsUp size={16} />
                </div>
                <div>
                  <h5 className="font-bold text-[#1A1A1A] text-sm font-poppins">100% Privacy</h5>
                  <p className="text-gray-500 text-xs">Your information is safe</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
