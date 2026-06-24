'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { whatsappLink } from '@/lib/constants';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show button after 1.5s
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed bottom-4 right-4 md:bottom-6 md:right-5 z-50 flex flex-col items-end gap-2 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Tooltip */}
      {showTooltip && (
        <div className="bg-white rounded-xl shadow-card-hover p-3 max-w-xs mr-1 relative animate-fade-up">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <X size={12} />
          </button>
          <p className="text-xs font-semibold text-solar-dark mb-1 font-poppins">💬 Chat with us!</p>
          <p className="text-xs text-gray-500">Get a free solar consultation on WhatsApp.</p>
        </div>
      )}

      {/* Button */}
      <div className="relative">
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40" />
        <a
          href={whatsappLink('Hello! I am interested in solar installation. Can you please provide details?')}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setShowTooltip(false)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Chat on WhatsApp"
          className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-solar-lg transition-transform hover:scale-110"
          style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
        >
          <MessageCircle size={24} className="md:w-6 md:h-6" color="white" fill="white" />
        </a>
      </div>
    </div>
  );
}
