'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { NAV_LINKS, SITE, whatsappLink } from '@/lib/constants';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
          : 'bg-white shadow-sm border-b border-gray-100 py-4 lg:py-5'
      }`}
    >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <Image
              src="/Logo 2.png"
              alt="RJ Power Solutions"
              width={120}
              height={60}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-brand-green font-semibold'
                    : 'text-gray-700 font-medium hover:text-brand-green'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 text-sm font-medium transition-colors text-gray-500 hover:text-brand-green"
            >
              <Phone size={15} />
              {SITE.phone}
            </a>
            <a
              href={whatsappLink('Hello! I want a free solar consultation.')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-orange hover:bg-[#C96A1E] text-white text-sm font-semibold py-2 px-5 rounded-full transition-colors"
            >
              Get Free Quote
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2.5">
            <a href={`tel:${SITE.phone}`} className="w-10 h-10 rounded-xl bg-[#E8F5EE] flex items-center justify-center text-[#16A34A] shadow-sm border border-green-50 transition-transform active:scale-95">
              <Phone size={18} />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-gray-100 shadow-sm transition-colors text-gray-700 bg-white hover:bg-gray-50 active:scale-95"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay — with framer-motion slide from Design 1 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-white pt-20 overflow-y-auto"
          >
            <div className="container-custom py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between py-3.5 px-4 rounded-xl text-base font-semibold font-poppins transition-all ${
                      pathname === link.href
                        ? 'bg-brand-green/10 text-brand-green'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-brand-green'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3 text-gray-600 font-medium rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <Phone size={18} />
                  Call Now
                </a>
                <a
                  href={whatsappLink('Hello! I want a free solar consultation.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-brand-orange text-white font-semibold rounded-full hover:bg-[#C96A1E] transition-colors"
                >
                  Get Free Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
