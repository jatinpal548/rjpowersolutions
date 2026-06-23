'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { whatsappLink } from '@/lib/constants';

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [type, setType] = useState('Residential');

  const show = useCallback(() => {
    if (!dismissed) setIsOpen(true);
  }, [dismissed]);

  const dismiss = useCallback(() => {
    setIsOpen(false);
    setDismissed(true);
    localStorage.setItem('lead_popup_dismissed', '1');
  }, []);

  useEffect(() => {
    if (localStorage.getItem('lead_popup_dismissed')) {
      const t = setTimeout(() => setDismissed(true), 0);
      return () => clearTimeout(t);
    }
    // 30-second trigger
    const timer = setTimeout(show, 30000);
    // Exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) show();
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [show]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello RJ Power Solutions! 🌞\n\nQuick Inquiry:\nName: ${name}\nPhone: ${phone}\nProperty Type: ${type}\n\nI am interested in a free solar consultation. Please get in touch!`;
    window.open(whatsappLink(msg), '_blank');
    dismiss();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Modal — slide up from bottom like Design 1 */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative bg-white rounded-2xl shadow-card-hover w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-blue p-5 text-white relative">
              <button
                onClick={dismiss}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X size={14} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1 shadow-sm">
                  <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-lg leading-tight">Get Free Solar Quote</h3>
                  <p className="text-blue-200 text-xs">Response within 30 minutes!</p>
                </div>
              </div>
              <div className="flex gap-4 mt-3 text-xs">
                <span className="flex items-center gap-1">✅ Free Site Visit</span>
                <span className="flex items-center gap-1">✅ No Obligation</span>
                <span className="flex items-center gap-1">✅ Subsidy Help</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 font-poppins">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rajesh Sharma"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 font-poppins">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 font-poppins">Property Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="input-field"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                </select>
              </div>

              <button type="submit" className="btn-primary w-full justify-center mt-1 group">
                <MessageCircle size={16} />
                Send on WhatsApp
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-gray-400">
                By submitting, you&apos;ll be redirected to WhatsApp to send your inquiry.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
