'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { sectionVariants } from './animations';

// Animated counter hook
function useCounter(target: number, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startCounting) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, startCounting]);
  return count;
}

const STATS = [
  { target: 500, suffix: '+', label: 'installations' },
  { target: 5, suffix: '+', label: 'years experience' },
  { target: 100, suffix: '%', label: 'quality components' },
  { target: 98, suffix: '%', label: 'on-time delivery' },
] as const;

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const c500 = useCounter(500, 2000, isInView);
  const c5 = useCounter(5, 1500, isInView);
  const c100 = useCounter(100, 2000, isInView);
  const c98 = useCounter(98, 1800, isInView);

  const counters = [c500, c5, c100, c98];

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants.fadeIn}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="py-12 bg-white shadow-md relative z-10"
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold gradient-text-orange font-poppins">
                {counters[index]}{stat.suffix}
              </div>
              <div className="text-solar-grey-mid text-sm mt-2 font-inter">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
