'use client';

import { motion } from 'framer-motion';
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
  const keywordClass = keywordColor === 'green' ? 'text-[#16A34A]' : 'text-[#F97316]';

  return (
    <section className="relative pt-32 pb-0 lg:pt-40 lg:pb-0 bg-[#F8FAF7] overflow-hidden">
      {/* Background Patterns */}
      <div 
        className="absolute top-0 left-0 w-96 h-96 opacity-[0.15] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#16A34A 2.5px, transparent 2.5px)', backgroundSize: '30px 30px' }}
      ></div>
      {/* Soft leaf wave graphic (approximated with CSS gradients) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#DFF0E6] to-transparent rounded-bl-full opacity-70 pointer-events-none blur-3xl"></div>

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-0.5 bg-[#16A34A]"></div>
              <span className="text-[#16A34A] font-bold text-sm tracking-[0.15em] uppercase">
                {badgeText}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-4 tracking-tight leading-tight font-poppins"
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
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="text-[#64748B] text-lg font-medium leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
              className="w-full lg:w-auto mt-6 lg:mt-0"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
