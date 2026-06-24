'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
  property: string;
  avatar: string;
}

export default function InfiniteTestimonialSlider({ testimonials }: { testimonials: readonly Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  const items = useMemo(() => [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials], [testimonials]);
  
  // Initialize with multiple sets to allow infinite scrolling in both directions
  useEffect(() => {
    // Set initial scroll to the middle set to allow scrolling left immediately
    setTimeout(() => {
      if (scrollRef.current) {
        const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
        const gap = 24; // 1.5rem = 24px
        // Jump to the 3rd set (index 2)
        scrollRef.current.scrollLeft = (itemWidth + gap) * testimonials.length * 2;
      }
    }, 100);
  }, [testimonials]);

  // Auto-scroll loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && !isHovered.current) {
        scrollRef.current.scrollLeft += 1;
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, children } = scrollRef.current;
    
    if (children.length === 0) return;
    const itemWidth = children[0].clientWidth;
    const gap = 24;
    const setWidth = (itemWidth + gap) * testimonials.length;

    // If scrolled too far left (into the first set), jump forward by 2 sets
    if (scrollLeft < setWidth) {
      scrollRef.current.scrollLeft += setWidth * 2;
    }
    // If scrolled too far right (into the fifth set), jump back by 2 sets
    else if (scrollLeft > setWidth * 4) {
      scrollRef.current.scrollLeft -= setWidth * 2;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.children[0]?.clientWidth || 0;
    const gap = 24;
    const scrollAmount = itemWidth + gap;
    scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => (isHovered.current = true)}
      onMouseLeave={() => (isHovered.current = false)}
      onTouchStart={() => (isHovered.current = true)}
      onTouchEnd={() => (isHovered.current = false)}
    >
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-6 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {items.map((t, i) => {
          const firstPeriodIdx = t.text.indexOf('.');
          const title = firstPeriodIdx > 0 ? t.text.substring(0, firstPeriodIdx) : t.text.substring(0, 40) + '...';
          
          return (
            <div
              key={`${t.name}-${i}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 flex-shrink-0 w-[320px] md:w-[400px] flex flex-col justify-between hover:bg-white/10 transition-colors duration-300"
            >
              <div>
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, si) => (
                    <Star key={si} size={16} fill="white" className="text-white" />
                  ))}
                </div>
                <h3 className="text-white font-poppins font-semibold text-lg mb-4">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm mb-10 leading-relaxed">
                  {t.text}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-solar-orange flex items-center justify-center text-white font-bold font-poppins text-xs flex-shrink-0 uppercase">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-poppins font-bold text-xs uppercase tracking-wider">{t.name}</div>
                  <div className="text-gray-500 text-[10px] mt-1 uppercase tracking-wider">{t.location}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none px-2 md:px-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex">
        <button 
          onClick={() => scroll('left')}
          className="w-12 h-12 rounded-full bg-solar-dark/90 border border-white/20 text-white flex items-center justify-center pointer-events-auto hover:bg-solar-orange transition-colors backdrop-blur-sm -ml-6 shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-12 h-12 rounded-full bg-solar-dark/90 border border-white/20 text-white flex items-center justify-center pointer-events-auto hover:bg-solar-orange transition-colors backdrop-blur-sm -mr-6 shadow-xl"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Mobile Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-2 md:hidden relative z-20">
        <button 
          onClick={() => scroll('left')}
          className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-solar-orange transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-solar-orange transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
