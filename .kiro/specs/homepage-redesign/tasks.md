# Implementation Plan: Homepage Redesign

## Overview

Refactor the RJ Power Solutions homepage from a single monolithic `page.tsx` into composed section components under `src/components/home/`. Replace all emoji usage with Lucide SVG icons, rewrite copy for authentic tone, build a premium stats counter with gradient numbers, implement stacked testimonial cards, and apply distinct Framer Motion animation variants per section.

## Tasks

- [x] 1. Create shared animation utilities and component foundation
  - [x] 1.1 Create animation variants file at `src/components/home/animations.ts`
    - Export the `sectionVariants` map containing `fadeUp`, `fadeIn`, `slideInLeft`, `slideInRight`, `scaleIn`, `slideInUp` variants
    - Export a `staggerContainer` variant for staggered children animations
    - _Requirements: 5.3_

  - [x] 1.2 Create `src/components/home/` directory with an index barrel file
    - Create `src/components/home/index.ts` that re-exports all section components
    - _Requirements: 5.1, 5.2_

- [ ] 2. Build HeroSection component
  - [-] 2.1 Create `src/components/home/HeroSection.tsx`
    - Implement hero with background image, Framer Motion `fadeUp` animation on content
    - Replace `✅` Unicode checkmarks in trust badges with `<CheckCircle />` Lucide icons
    - Replace emoji sun in badge with `<Sun />` Lucide icon
    - Rewrite headline to data-driven: "500+ Solar Systems Installed Across Indore"
    - Rewrite CTA labels: "Get a Free Quote", "Calculate Your Savings"
    - Use `useInView` hook to trigger animation on scroll
    - _Requirements: 1.4, 2.1, 2.3, 2.5, 5.3_

  - [-] 2.2 Write property test: no emoji in HeroSection rendered output
    - **Property 1: No emoji characters in rendered output**
    - **Validates: Requirements 1.1, 1.3, 1.4**

  - [-] 2.3 Write property test: copy avoids banned buzzwords in HeroSection
    - **Property 2: Copy avoids banned buzzwords**
    - **Validates: Requirements 2.2**

- [ ] 3. Build StatsCounter component
  - [-] 3.1 Create `src/components/home/StatsCounter.tsx`
    - Render stats as large gradient-filled numbers (`gradient-text-orange` class) without circular icon containers
    - Use existing `useCounter` hook for counting animation on viewport entry via IntersectionObserver
    - Layout: `grid-cols-2 md:grid-cols-4` (2×2 mobile, single row desktop)
    - Labels as concise lowercase descriptors: "installations", "years experience", "quality components", "on-time delivery"
    - Apply `fadeIn` animation variant
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [-] 3.2 Write property test: counter hook converges to target
    - **Property 3: Counter hook converges to target value**
    - **Validates: Requirements 3.2**

  - [-] 3.3 Write property test: stat labels are lowercase descriptors
    - **Property 4: Stat labels are lowercase descriptors**
    - **Validates: Requirements 3.5**

- [ ] 4. Build BenefitsSection with SVG icon replacement
  - [-] 4.1 Create `src/components/home/BenefitsSection.tsx`
    - Replace ALL emoji characters (`💰`, `🌿`, `🏠`, `🔧`, `🏛️`, `📈`) with Lucide icons (`IndianRupee`, `Leaf`, `Home`, `Wrench`, `Landmark`, `TrendingUp`)
    - Update data array to use component references instead of emoji strings
    - Rewrite section heading: "What Solar Delivers" — no hyperbole
    - Apply `scaleIn` animation variant with staggered children
    - _Requirements: 1.1, 1.3, 2.2, 2.4, 5.3_

  - [-] 4.2 Write unit test verifying no emoji characters in BenefitsSection
    - Test that rendered output contains SVG elements, not emoji Unicode
    - _Requirements: 1.1, 1.3_

- [~] 5. Checkpoint - Verify core sections build correctly
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Build WhyChooseSection component
  - [~] 6.1 Create `src/components/home/WhyChooseSection.tsx`
    - Left-aligned heading: "Why 500+ Indore Homes Trust Us" — breaking centered pattern
    - Six advantage cards in 3-column grid
    - Apply `slideInLeft` animation variant with staggered children
    - _Requirements: 2.1, 2.4, 5.1, 5.2, 5.3_

- [ ] 7. Build ServicesSection component
  - [~] 7.1 Create `src/components/home/ServicesSection.tsx`
    - Plain heading: "Our Services" — no decorative sub-heading
    - Service cards with existing Lucide icon mapping
    - Apply `fadeUp` animation variant with staggered cards (0.1s delay each)
    - _Requirements: 2.4, 5.3_

- [ ] 8. Build CalculatorPreview component
  - [~] 8.1 Create `src/components/home/CalculatorPreview.tsx`
    - Replace `💡` emoji with `<Lightbulb />` Lucide icon in "Did You Know?" sidebar
    - Replace `⚡` emoji with `<Zap />` Lucide icon in results header
    - Rewrite heading: "Estimate Your Solar Savings" — direct
    - Calculator logic (state, validation, result calculation) stays intact
    - Apply `slideInRight` animation variant
    - _Requirements: 1.4, 2.4, 5.3_

- [ ] 9. Build TestimonialsSection with stacked cards
  - [~] 9.1 Create `src/components/home/TestimonialsSection.tsx`
    - Implement stacked/layered card layout with CSS transforms:
      - Card 0: `z-30, rotate(-2deg), translate(-10px, 0)`
      - Card 1: `z-40, rotate(0deg), translate(0, -5px)` (center, elevated)
      - Card 2: `z-20, rotate(2deg), translate(10px, 5px)`
    - Hover: `translateY(-8px)`, `shadow-card-hover`, `z-50`
    - Mobile (<768px): vertical stack, no transforms
    - Each card shows: reviewer name, location, star rating (Lucide `<Star />`), testimonial text
    - Apply `fadeIn` with scale (0.95 → 1) animation variant
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [~] 9.2 Write property test: stacked cards have unique depth configurations
    - **Property 5: Stacked cards have unique depth configurations**
    - **Validates: Requirements 4.2**

  - [~] 9.3 Write property test: testimonial cards contain all required fields
    - **Property 6: Testimonial cards contain all required fields**
    - **Validates: Requirements 4.5**

- [ ] 10. Build remaining sections
  - [~] 10.1 Create `src/components/home/ProjectsGallery.tsx`
    - Replace `⚡`, `📍`, `💰` emoji metadata with `<Zap />`, `<MapPin />`, `<IndianRupee />` Lucide icons
    - Heading: "Completed Projects" — factual
    - Alternating card sizes (first card spans 2 cols on lg) for layout variation
    - Apply `fadeIn` animation variant with staggered children
    - _Requirements: 1.4, 2.4, 5.1, 5.2, 5.3_

  - [~] 10.2 Create `src/components/home/FaqSection.tsx`
    - Heading: "Common Questions" — simple, direct
    - Accordion expand/collapse with existing logic
    - Apply `slideInUp` animation variant
    - _Requirements: 2.4, 5.3_

  - [~] 10.3 Create `src/components/home/CtaSection.tsx`
    - Replace `☀️` emoji with `<Sun />` Lucide icon (size 48)
    - Replace `✓` Unicode checkmarks with `<Check />` Lucide icons
    - Heading: "Start Saving on Electricity" — outcome-focused
    - Sub-text: "Join 500+ homes in Indore saving ₹2,000–₹40,000/month."
    - Apply `fadeUp` animation variant
    - _Requirements: 1.4, 2.1, 2.4, 2.5, 5.3_

- [~] 11. Checkpoint - All section components built
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Refactor page.tsx to compose section components
  - [~] 12.1 Rewrite `src/app/page.tsx` as a server component that imports and composes all section components
    - Import all sections from `src/components/home/index.ts`
    - Remove all inline section JSX, state, and hooks from page.tsx
    - Page becomes a simple composition: `<PageWrapper><HeroSection /><StatsCounter />...`
    - Ensure each section uses a distinct animation variant (no two consecutive sections share the same)
    - _Requirements: 5.1, 5.2, 5.3_

  - [~] 12.2 Write property test: consecutive sections use distinct animation variants
    - **Property 7: Sections have distinct animation variants**
    - **Validates: Requirements 5.3**

- [~] 13. Final checkpoint - Full integration verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The implementation language is TypeScript (Next.js/React) — matching the existing codebase
- No new dependencies are introduced; Framer Motion and Lucide React are already available

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1", "3.1", "4.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "3.2", "3.3", "4.2", "6.1", "7.1", "8.1"] },
    { "id": 3, "tasks": ["9.1", "10.1", "10.2", "10.3"] },
    { "id": 4, "tasks": ["9.2", "9.3"] },
    { "id": 5, "tasks": ["12.1"] },
    { "id": 6, "tasks": ["12.2"] }
  ]
}
```
