# Design Document: Homepage Redesign

## Overview

Redesign the RJ Power Solutions homepage to replace generic, AI-generated aesthetics with a unique, human, and premium visual identity. The redesign covers: SVG icon replacement (Lucide React), authentic data-driven copy, premium stats counter with gradient numbers and counting animation, stacked/layered testimonial cards, and varied section layouts with distinct Framer Motion animations.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Framer Motion, Lucide React (no new dependencies).

## Architecture

The homepage redesign restructures the existing `src/app/page.tsx` into a composition of focused, client-side section components. Each section is isolated in its own file under `src/components/home/`, enabling independent development, distinct Framer Motion animation variants per section, and clean separation of concerns.

The page continues to use the existing `PageWrapper` layout shell (Navbar, Footer, floating UI). No new dependencies are introduced — the implementation uses Next.js 16, React 19, Tailwind CSS v4, Framer Motion, and Lucide React exclusively.

### Component Tree

```
src/app/page.tsx (server component, composes sections)
├── src/components/home/HeroSection.tsx (client)
├── src/components/home/StatsCounter.tsx (client)
├── src/components/home/WhyChooseSection.tsx (client)
├── src/components/home/BenefitsSection.tsx (client)
├── src/components/home/ServicesSection.tsx (client)
├── src/components/home/CalculatorPreview.tsx (client)
├── src/components/home/ProjectsGallery.tsx (client)
├── src/components/home/TestimonialsSection.tsx (client)
├── src/components/home/FaqSection.tsx (client)
└── src/components/home/CtaSection.tsx (client)
```

---

## Components and Interfaces

### 1. HeroSection

**Purpose:** Above-the-fold hero with background image, data-driven headline, CTAs, and trust badges.

**Key changes from current:**
- Replace generic "Power Your Future with Smart Solar Solutions" with a factual, numbers-led headline (e.g., "500+ Solar Systems Installed Across Indore").
- Replace `✅` Unicode checkmarks in trust badges with `<CheckCircle />` Lucide icons.
- Replace emoji sun in badge with `<Sun />` Lucide icon.
- Add Framer Motion `fadeUp` variant on content container.
- CTA labels rewritten to be outcome-specific ("Get a Free Quote", "Calculate Your Savings").

**Props:** None (reads from constants).

**Animation variant:** `fadeUp` (opacity 0 → 1, translateY 30px → 0).

---

### 2. StatsCounter

**Purpose:** Full-width stats bar with large gradient numbers, counting animation on viewport entry.

**Key changes from current:**
- Remove circular icon containers (`w-12 h-12 rounded-full` wrapper).
- Apply `gradient-text-orange` class to stat numbers for gradient fill.
- Numbers remain large and bold (`text-4xl md:text-5xl font-extrabold`).
- Labels changed to concise lowercase descriptors: "installations", "years experience", "quality components", "on-time delivery".
- Counting animation triggered via Intersection Observer (existing `useCounter` hook).

**Props:** None (uses `SITE.stats` from constants, remapped to numeric targets).

**Layout:** `grid-cols-2 md:grid-cols-4` (2×2 on mobile, single row on desktop).

**Animation variant:** `fadeIn` (opacity 0 → 1, 0.8s).

**Hook interface:**
```typescript
function useCounter(target: number, duration?: number, startCounting?: boolean): number
```

---

### 3. WhyChooseSection

**Purpose:** Six advantage cards with Lucide icons explaining why customers choose RJ Power Solutions.

**Key changes from current:**
- Section opener uses left-aligned heading (breaking the centered badge + heading pattern).
- Heading rewritten: "Why 500+ Indore Homes Trust Us" — factual, not decorative.
- Cards remain in 3-column grid but with asymmetric padding (first row has slightly larger cards).
- Icons already use Lucide — no changes needed there.

**Animation variant:** `slideInLeft` (translateX -40px → 0, opacity 0 → 1, staggered children).

---

### 4. BenefitsSection

**Purpose:** Solar benefits displayed as icon cards on a dark blue gradient background.

**Key changes from current:**
- Replace ALL emoji characters (`💰`, `🌿`, `🏠`, `🔧`, `🏛️`, `📈`) with Lucide icons (`IndianRupee`, `Leaf`, `Home`, `Wrench`, `Landmark`, `TrendingUp`).
- Section heading rewritten: "What Solar Delivers" — no "Smartest Investment" hyperbole.

**Data structure update:**
```typescript
const BENEFITS = [
  { icon: IndianRupee, title: 'Save up to 90%', desc: '...' },
  { icon: Leaf, title: 'Zero Emissions', desc: '...' },
  // ...
];
```

**Animation variant:** `scaleIn` (scale 0.9 → 1, opacity 0 → 1, staggered).

---

### 5. ServicesSection

**Purpose:** Service cards linking to individual service pages.

**Key changes from current:**
- Section heading: "Our Services" — plain, states what it is.
- Sub-heading removed (was "Complete Solar Solutions for Every Property Type").
- Cards keep existing Lucide icon mapping — no emoji present here.

**Animation variant:** `fadeUp` with staggered children (each card delays 0.1s).

---

### 6. CalculatorPreview

**Purpose:** Inline savings calculator with estimate output.

**Key changes from current:**
- Replace `💡` emoji in "Did You Know?" sidebar with `<Lightbulb />` Lucide icon.
- Replace `⚡` emoji in results header with `<Zap />` Lucide icon.
- Heading rewritten: "Estimate Your Solar Savings" — direct, no "Find Out How Much You Can Save".

**Animation variant:** `slideInRight` (translateX 40px → 0, opacity 0 → 1).

---

### 7. ProjectsGallery

**Purpose:** Grid of completed project cards with category badges and metadata.

**Key changes from current:**
- Replace `⚡`, `📍`, `💰` emoji metadata labels with `<Zap />`, `<MapPin />`, `<IndianRupee />` Lucide icons.
- Heading: "Completed Projects" — factual.
- Alternating card sizes (first card spans 2 columns on lg) for layout variation.

**Animation variant:** `fadeIn` with staggered children.

---

### 8. TestimonialsSection — Stacked Cards

**Purpose:** Premium testimonials displayed as overlapping, layered cards with depth and shadow.

**Architecture:**

```typescript
interface StackedCardProps {
  testimonial: Testimonial;
  index: number;       // position in stack (0, 1, 2)
  zIndex: number;      // e.g., 30, 20, 10
  rotation: number;    // e.g., -2deg, 0deg, 2deg
  offsetX: number;     // horizontal offset in px
  offsetY: number;     // vertical offset in px
}
```

**Layout:**
- Desktop (≥768px): 3 cards visible simultaneously, overlapping with CSS transforms:
  - Card 0: `z-30, rotate(-2deg), translate(-10px, 0)`
  - Card 1: `z-40, rotate(0deg), translate(0, -5px)` (center, elevated)
  - Card 2: `z-20, rotate(2deg), translate(10px, 5px)`
- Mobile (<768px): Cards stack vertically, no transforms, full width.

**Hover behavior:**
- On hover, card receives: `translateY(-8px)`, `shadow-card-hover`, `z-50`.
- Transition: `transition-all duration-300 ease-out`.

**Card content:** Reviewer name, location, star rating (Lucide `<Star />`), testimonial text.

**Animation variant:** `fadeIn` with scale (0.95 → 1).

---

### 9. FaqSection

**Purpose:** Accordion FAQ with expand/collapse.

**Key changes from current:**
- No emoji usage here currently — section is clean.
- Heading: "Common Questions" — simple, direct.

**Animation variant:** `slideInUp` (translateY 20px → 0).

---

### 10. CtaSection

**Purpose:** Final call-to-action banner.

**Key changes from current:**
- Replace `☀️` emoji with `<Sun />` Lucide icon (size 48, rendered as SVG).
- Replace `✓` Unicode checkmarks with `<Check />` Lucide icons.
- Heading rewritten: "Start Saving on Electricity" — outcome-focused, no question.
- Sub-text rewritten with data: "Join 500+ homes in Indore saving ₹2,000–₹40,000/month."

**Animation variant:** `fadeUp`.

---

## Data Models

### Updated BENEFITS constant (replaces emoji with Lucide components)

```typescript
import { IndianRupee, Leaf, Home, Wrench, Landmark, TrendingUp } from 'lucide-react';

export const BENEFITS = [
  { icon: IndianRupee, title: 'Save up to 90%', desc: 'Drastically cut your electricity bills' },
  { icon: Leaf, title: 'Zero Emissions', desc: 'Clean energy, zero carbon footprint' },
  { icon: Home, title: 'Property Value', desc: 'Solar increases home value by 4–6%' },
  { icon: Wrench, title: 'Low Maintenance', desc: 'Panels last 25+ years with minimal upkeep' },
  { icon: Landmark, title: 'Govt. Incentives', desc: 'Subsidies and tax benefits available now' },
  { icon: TrendingUp, title: 'Long-term ROI', desc: '20+ years of free power after payback' },
];
```

### Stacked Card configuration

```typescript
const CARD_TRANSFORMS = [
  { zIndex: 30, rotation: -2, offsetX: -10, offsetY: 0 },
  { zIndex: 40, rotation: 0, offsetX: 0, offsetY: -5 },
  { zIndex: 20, rotation: 2, offsetX: 10, offsetY: 5 },
] as const;
```

### Animation variants map

```typescript
import { Variants } from 'framer-motion';

export const sectionVariants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  },
  slideInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
};
```

---

## Interfaces

### Section Component Pattern

Each section component follows this interface pattern:

```typescript
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SectionName() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants.variantName}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* section content */}
    </motion.section>
  );
}
```

### useCounter hook (unchanged logic, same interface)

```typescript
function useCounter(target: number, duration?: number, startCounting?: boolean): number
```

---

## Error Handling

- **Image loading failures:** Next.js `<Image>` component handles fallback gracefully. No custom error boundary needed for images.
- **Intersection Observer fallback:** If `IntersectionObserver` is unavailable (SSR or very old browsers), stats default to showing final values immediately (`startCounting` defaults to `true` after mount).
- **Empty testimonials data:** If `TESTIMONIALS` array has fewer than 3 items, render available cards without transform offsets (graceful degradation).
- **Calculator invalid input:** Existing validation (`bill < 100`) remains; no result rendered for invalid state.

---

## Testing Strategy

**Unit tests** cover specific examples and edge cases:
- Hero section renders without emoji characters
- Stats counter displays gradient classes on numbers
- Stacked cards render exactly 3 visible cards on desktop
- Mobile layout removes transforms from testimonial cards
- Calculator rejects bill amounts below ₹100

**Property-based tests** verify universal invariants (min 100 iterations each):
- No emoji Unicode in any rendered text node
- Banned buzzwords absent from all copy strings
- Counter hook convergence for random positive targets
- Stacked card configurations are pairwise distinct
- Testimonial card renders contain all required fields

**Visual/manual review** (not automatable):
- Icon style is organic/rounded
- Copy tone feels authentic and data-driven
- Layout variation breaks template patterns
- Color palette stays within brand guidelines

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: No emoji characters in rendered output

*For any* rendered homepage section component, the text content output should contain zero emoji Unicode characters (ranges U+1F600–U+1F64F, U+1F300–U+1F5FF, U+2600–U+26FF, U+2700–U+27BF) and should instead contain SVG elements or Lucide icon component references.

**Validates: Requirements 1.1, 1.3, 1.4**

### Property 2: Copy avoids banned buzzwords

*For any* user-facing text string rendered on the homepage (headings, paragraphs, badges, button labels), the text should not contain any word from the banned buzzwords list: "transform", "revolutionary", "unlock", "power your future", "smart solar solutions", "game-changing", "cutting-edge", "next-generation", "unleash".

**Validates: Requirements 2.2**

### Property 3: Counter hook converges to target value

*For any* positive integer target value and any positive duration, the `useCounter` hook should eventually produce exactly the target value when `startCounting` is set to `true`.

**Validates: Requirements 3.2**

### Property 4: Stat labels are lowercase descriptors

*For any* stat item rendered in the Stats Counter section, the label text should begin with a lowercase letter and contain no title-cased or all-caps words (excluding units like "kW").

**Validates: Requirements 3.5**

### Property 5: Stacked cards have unique depth configurations

*For any* pair of simultaneously visible testimonial stacked cards, their z-index values, rotation angles, and offset transforms should all be pairwise distinct (no two visible cards share identical positioning).

**Validates: Requirements 4.2**

### Property 6: Testimonial cards contain all required fields

*For any* testimonial object passed to a StackedCard component, the rendered output should contain the reviewer name, location, star rating (rendered as Star icons), and testimonial text.

**Validates: Requirements 4.5**

### Property 7: Sections have distinct animation variants

*For any* pair of consecutive homepage sections, their assigned Framer Motion animation variant keys should be different, ensuring visual variety during scroll.

**Validates: Requirements 5.3**
