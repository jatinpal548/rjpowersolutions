'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, CalendarDays, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '@/components/layout/PageWrapper';
import ProposalCTA from '@/components/ui/ProposalCTA';
import { PROJECTS } from '@/lib/constants';

const CATEGORIES = ['all', 'residential', 'commercial', 'industrial'] as const;
type Category = typeof CATEGORIES[number];

export default function ProjectsPage() {
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <PageWrapper>
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[#F8FAF7] min-h-screen overflow-hidden">
        
        {/* Background Patterns */}
        <div 
          className="absolute top-0 left-0 w-96 h-96 opacity-[0.15] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#16A34A 2.5px, transparent 2.5px)', backgroundSize: '30px 30px' }}
        ></div>
        {/* Soft leaf wave graphic (approximated with CSS gradients) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#DFF0E6] to-transparent rounded-bl-full opacity-70 pointer-events-none blur-3xl"></div>

        <div className="container-custom relative z-10">
          
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-[#16A34A]"></div>
                <span className="text-[#16A34A] font-bold text-sm tracking-[0.15em] uppercase">Our Projects</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#111827] mb-4 tracking-tight leading-tight font-poppins">
                Powering Every Possibility
              </h1>
              <p className="text-[#64748B] text-lg font-medium">
                Explore our successfully completed solar installations across residential, commercial and industrial sectors.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all capitalize whitespace-nowrap shadow-sm ${
                    active === cat
                      ? 'bg-[#16A34A] text-white border border-[#16A34A]'
                      : 'bg-white text-[#111827] border border-gray-200 hover:border-[#16A34A] hover:text-[#16A34A]'
                  }`}
                >
                  {cat === 'all' ? 'All Projects' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(22,163,74,0.1)] transition-all group border border-gray-100 border-b-4 border-b-[#16A34A] flex flex-col"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={project.id <= 3}
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#16A34A] text-white text-[11px] font-bold uppercase tracking-wider py-1.5 px-3.5 rounded-full shadow-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-poppins font-bold text-[#111827] text-xl mb-5 group-hover:text-[#16A34A] transition-colors">{project.title}</h3>
                  
                  {/* Info Boxes */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-[#F8FAF7] rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center">
                      <div className="flex items-center gap-1.5 text-[#16A34A] font-bold font-poppins text-base mb-1">
                        <Zap size={16} fill="currentColor" /> {project.capacity}
                      </div>
                      <div className="text-[11px] text-[#64748B] font-medium uppercase tracking-wide">System Size</div>
                    </div>
                    <div className="bg-[#F8FAF7] rounded-xl p-3 border border-gray-100 flex flex-col items-center justify-center text-center">
                      <div className="flex items-center gap-1 text-[#16A34A] font-bold font-poppins text-base mb-1">
                        <span className="text-[18px]">💰</span> {project.savings}
                      </div>
                      <div className="text-[11px] text-[#64748B] font-medium uppercase tracking-wide">Monthly Savings</div>
                    </div>
                  </div>
                  
                  <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between text-sm text-[#64748B] font-medium">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-[#16A34A]" /> {project.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CalendarDays size={16} className="text-[#16A34A]" /> {project.time}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 mt-8 shadow-sm">
              <div className="text-6xl mb-4 opacity-50">🔍</div>
              <h3 className="font-poppins font-bold text-xl text-[#111827] mb-2">No projects found</h3>
              <p className="text-[#64748B] font-medium">Please select a different category to view our installations.</p>
            </div>
          )}
        </div>
      </section>
      
      <ProposalCTA customMessage="Hello! I want to start a solar project. Please guide me." />
    </PageWrapper>
  );
}
