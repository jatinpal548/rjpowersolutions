'use client';

import { Phone } from 'lucide-react';
import { SITE } from '@/lib/constants';

export default function StickyCallButton() {
  return (
    <a
      href={`tel:${SITE.phone}`}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-solar-blue text-white flex items-center justify-center gap-2.5 py-4 font-poppins font-semibold text-base shadow-blue-lg"
      aria-label="Call us"
      style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center animate-pulse-slow">
        <Phone size={16} fill="white" />
      </div>
      Call Now – {SITE.phone}
    </a>
  );
}
