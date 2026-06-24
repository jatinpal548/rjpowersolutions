'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import React from 'react';

interface PageHeroProps {
  badgeText: string;
  titlePart1: string;
  titleKeyword: string;
  titlePart2?: string;
  subtitle: string;
  keywordColor?: 'green' | 'orange';
  children?: React.ReactNode;
}

export default function PageHero({
  badgeText,
  titlePart1,
  titleKeyword,
  titlePart2,
  subtitle,
  keywordColor = 'green',
  children,
}: PageHeroProps) {
  const keywordClass = keywordColor === 'green' ? 'text-brand-green' : 'text-brand-orange';

  return (
    <section className="relative w-full flex flex-col items-center justify-center pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF8F5] to-[#FDF0E8]">
      <div className="container-custom relative z-20 text-center max-w-4xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-brand-green/20 px-4 py-2 rounded-full text-brand-green font-semibold text-sm mb-6 shadow-sm"
        >
          <div className="w-5 h-5 bg-brand-green rounded-full flex items-center justify-center">
            <CheckCircle size={12} className="text-white" strokeWidth={3} />
          </div>
          {badgeText}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="font-poppins font-extrabold text-[#1A1A1A] mb-6 tracking-tight drop-shadow-sm leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          {titlePart1}{' '}
          <span className={keywordClass}>{titleKeyword}</span>
          {titlePart2 && (
            <>
              <br />
              {titlePart2}
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-gray-500 text-lg md:text-[21px] max-w-2xl leading-relaxed font-medium mb-8"
        >
          {subtitle}
        </motion.p>
        
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
