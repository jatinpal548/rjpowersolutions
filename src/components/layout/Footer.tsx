'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Clock, ChevronRight, 
  Link2, Grid, PhoneCall, ShieldCheck, Award, Landmark, Users, CheckCircle2 
} from 'lucide-react';
import { SITE, NAV_LINKS, SERVICES } from '@/lib/constants';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const footerServices = SERVICES.slice(0, 6);

export default function Footer() {
  return (
    <footer className="bg-[#111827] pt-20 pb-8 border-t border-gray-800">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* Column 1: Brand & Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <Image
                  src="/Logo 2.png"
                  alt="RJ Power Solutions"
                  width={140}
                  height={70}
                  className="h-12 w-auto object-contain brightness-0 invert"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                Central India&apos;s trusted solar EPC partner. Transforming homes and businesses with clean, affordable solar energy since 2019.
              </p>
              
              {/* Trust Badges 2x2 Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                  <ShieldCheck size={16} className="text-brand-green flex-shrink-0" />
                  <span className="text-xs font-semibold text-white">MNRE Approved</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                  <Award size={16} className="text-brand-green flex-shrink-0" />
                  <span className="text-xs font-semibold text-white">25+ Yr Warranty</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                  <Landmark size={16} className="text-brand-green flex-shrink-0" />
                  <span className="text-xs font-semibold text-white">Govt. Subsidy</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                  <Users size={16} className="text-brand-green flex-shrink-0" />
                  <span className="text-xs font-semibold text-white">500+ Customers</span>
                </div>
              </div>

              {/* Follow Us */}
              <div className="pt-2">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wide mb-4">Follow Us</h4>
                <div className="flex items-center gap-3">
                  <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-green text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                    <FacebookIcon />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-green text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                    <InstagramIcon />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-green text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                    <YoutubeIcon />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-green text-gray-400 hover:text-white flex items-center justify-center transition-colors">
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-8">
                <Link2 size={20} className="text-brand-green" strokeWidth={2.5} />
                <h4 className="font-poppins font-semibold text-white uppercase tracking-wide text-sm">Quick Links</h4>
              </div>
              <ul className="space-y-0">
                {NAV_LINKS.map((link) => (
                  <li key={link.href} className="border-b border-gray-800 last:border-0">
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-3.5 text-[13px] font-semibold text-gray-400 hover:text-white transition-colors group"
                    >
                      {link.label}
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-brand-green transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Services */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-8">
                <Grid size={20} className="text-brand-green" strokeWidth={2.5} />
                <h4 className="font-poppins font-semibold text-white uppercase tracking-wide text-sm">Our Services</h4>
              </div>
              <ul className="space-y-0">
                {footerServices.map((service) => (
                  <li key={service.slug} className="border-b border-gray-800 last:border-0">
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex items-center justify-between py-3.5 text-[13px] font-semibold text-gray-400 hover:text-white transition-colors group"
                    >
                      {service.title}
                      <ChevronRight size={14} className="text-gray-600 group-hover:text-brand-green transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-8">
                <PhoneCall size={20} className="text-brand-green" strokeWidth={2.5} />
                <h4 className="font-poppins font-semibold text-white uppercase tracking-wide text-sm">Contact Us</h4>
              </div>
              <ul className="space-y-6">
                <li>
                  <a href={`tel:${SITE.phone}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green transition-colors">
                      <Phone size={18} className="text-brand-green group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-gray-500 mb-0.5 uppercase tracking-wide">Phone / WhatsApp</div>
                      <div className="text-[13px] font-bold text-gray-300">{SITE.phone}</div>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green transition-colors">
                      <Mail size={18} className="text-brand-green group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-gray-500 mb-0.5 uppercase tracking-wide">Email</div>
                      <div className="text-[13px] font-bold text-gray-300">{SITE.email}</div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} className="text-brand-green" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-gray-500 mb-0.5 uppercase tracking-wide">Address</div>
                      <div className="text-[13px] font-bold text-gray-300 leading-tight max-w-[180px]">{SITE.address}</div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-brand-green" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-gray-500 mb-0.5 uppercase tracking-wide">Office Hours</div>
                      <div className="text-[13px] font-bold text-gray-300 leading-tight">Mon-Sat: 9 AM - 6 PM</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            
          </div>
          
          {/* Dark Green Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-md bg-brand-green/20 flex items-center justify-center">
                <CheckCircle2 size={14} className="text-brand-green" strokeWidth={3} />
              </div>
              <p className="text-[13px] text-gray-400 font-medium">© {new Date().getFullYear()} RJ Power Solutions. All rights reserved.</p>
            </div>
            
            <div className="flex items-center gap-6 text-[13px] font-medium text-gray-400">
              <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
              <span className="text-gray-700">•</span>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
            
            <div className="text-[12px] text-gray-500 font-medium pt-4 md:pt-0">
              Crafted and managed by{' '}
              <a 
                href="https://instagram.com/the3rdfloor.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white font-semibold transition-colors"
              >
                The3rdFloor Co.
              </a>
            </div>
          </div>
          
        </div>
    </footer>
  );
}
