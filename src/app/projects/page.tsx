'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import PageWrapper from '@/components/layout/PageWrapper';
import { PROJECTS, whatsappLink } from '@/lib/constants';

const CATEGORIES = ['all', 'residential', 'commercial', 'industrial'] as const;
type Category = typeof CATEGORIES[number];

export default function ProjectsPage() {
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-blue text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-solar-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="container-custom text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="badge bg-white/10 text-white border-white/20 mb-6">Our Projects</div>
            <h1 className="section-title text-white mb-4">500+ Successful<br /><span className="text-solar-orange">Solar Installations</span></h1>
            <p className="text-blue-100 max-w-xl mx-auto text-lg">
              Real projects, real savings. Browse our portfolio of residential, commercial, and industrial solar installations across Indore.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-solar-grey">
        <div className="container-custom">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-6 py-2.5 rounded-full font-poppins font-semibold text-sm transition-all capitalize ${
                  active === cat
                    ? 'bg-solar-orange text-white shadow-solar'
                    : 'bg-white text-solar-dark hover:text-solar-orange border border-gray-200'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-card card-hover group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={project.id <= 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="badge text-xs py-1 px-2.5 capitalize">{project.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-poppins font-bold text-solar-dark text-lg mb-3">{project.title}</h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-solar-grey rounded-lg p-3 text-center">
                      <div className="text-solar-orange font-bold font-poppins text-base">⚡ {project.capacity}</div>
                      <div className="text-xs text-gray-500 mt-0.5">System Size</div>
                    </div>
                    <div className="bg-solar-grey rounded-lg p-3 text-center">
                      <div className="text-green-600 font-bold font-poppins text-base">💰 {project.savings}</div>
                      <div className="text-xs text-gray-500 mt-0.5">Monthly Savings</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>📍 {project.location}</span>
                    <span>⏱ {project.time}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-poppins font-semibold text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container-custom text-center">
          <h2 className="font-poppins font-bold text-3xl text-solar-dark mb-4">Want Your Project Here?</h2>
          <p className="text-gray-500 mb-8 text-lg">Join our growing family of satisfied solar customers in Indore.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={whatsappLink('Hello! I want to start a solar project. Please guide me.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <MessageCircle size={18} /> Start Your Project
            </a>
            <Link href="/calculator" className="btn-secondary">
              Estimate Savings <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
