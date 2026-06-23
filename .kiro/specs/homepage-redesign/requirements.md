# Requirements Document

## Introduction

Redesign the RJ Power Solutions homepage to eliminate a generic, AI-generated feel and replace it with a unique, human, and premium visual identity. The redesign covers five areas: authentic website copy, SVG icon replacement, a premium stats counter, a premium testimonials section, and overall visual distinctiveness. The tech stack is Next.js 16, React 19, Tailwind CSS v4, Framer Motion, and Lucide React.

## Glossary

- **Homepage**: The root page component rendered at the `/` route of the RJ Power Solutions website.
- **Copy**: All user-facing text content (headings, paragraphs, badges, labels, CTAs) displayed on the Homepage.
- **Stats_Counter**: The section of the Homepage that displays numerical business metrics (installations, experience, quality, delivery rate) with animated counting.
- **Reviews_Section**: The section of the Homepage that displays customer testimonials as cards.
- **SVG_Icon**: A vector icon rendered as an inline SVG element or via the Lucide React icon library, using a slightly organic/rounded style with softer edges and rounded corners.
- **Micro_Animation**: A subtle Framer Motion animation applied to a UI element (e.g., counting up numbers, fade-in, scale) that adds visual interest without distracting from content.
- **Stacked_Card**: A testimonial card component that overlaps or layers with adjacent cards using CSS transforms, shadows, and z-index to create visual depth.
- **Gradient_Fill**: A CSS linear or radial gradient applied to text or background elements to add visual weight and a premium feel.

## Requirements

### Requirement 1: Replace Emoji Icons with SVG Icons

**User Story:** As a site visitor, I want to see professionally designed SVG icons instead of emoji characters, so that the site feels polished and intentionally crafted.

#### Acceptance Criteria

1. THE Homepage SHALL render all iconographic elements as SVG icons from the Lucide React library or custom inline SVGs instead of emoji characters.
2. THE SVG_Icon components SHALL use a slightly organic/rounded visual style with softer edges and rounded corners to convey an approachable but professional personality.
3. WHEN the Homepage renders the Solar Benefits section, THE Homepage SHALL display an SVG_Icon for each benefit item instead of the current emoji character.
4. WHEN the Homepage renders trust badges, project metadata, or CTA labels, THE Homepage SHALL use SVG_Icon elements instead of emoji characters or Unicode checkmarks.

### Requirement 2: Rewrite Copy for Authentic Tone

**User Story:** As a site visitor, I want to read copy that feels natural, factual, and data-driven, so that the brand comes across as trustworthy rather than generic.

#### Acceptance Criteria

1. THE Homepage copy SHALL use a data-driven and minimal tone that leads with numbers and tangible outcomes.
2. THE Homepage copy SHALL avoid marketing buzzwords, filler phrases, and hyperbolic language (e.g., "transform", "revolutionary", "unlock", "power your future").
3. THE Homepage hero heading and subheading SHALL communicate the core value proposition using specific, factual claims relevant to RJ Power Solutions' track record.
4. THE Homepage section headings SHALL use straightforward language that states what the section contains without decorative phrasing.
5. THE Homepage CTA button labels SHALL use clear, action-oriented text that specifies the outcome (e.g., "Get a Quote" rather than "Smart Solar Solutions").

### Requirement 3: Premium Stats Counter Design

**User Story:** As a site visitor, I want to see the company stats presented with visual weight and subtle animation, so that key metrics feel impactful and premium.

#### Acceptance Criteria

1. THE Stats_Counter SHALL display each metric as a large bold number with a Gradient_Fill applied to the text.
2. WHEN the Stats_Counter section enters the viewport, THE Stats_Counter SHALL animate each number from zero to its target value using a Micro_Animation counting effect.
3. THE Stats_Counter SHALL render each metric without a circular icon container, relying on the large gradient number itself to carry visual weight.
4. THE Stats_Counter layout SHALL present metrics in a single horizontal row on desktop with adequate spacing and in a 2×2 grid on mobile.
5. THE Stats_Counter labels SHALL use concise, lowercase descriptors beneath each number (e.g., "installations", "years experience").

### Requirement 4: Premium Stacked Testimonials Section

**User Story:** As a site visitor, I want to see customer reviews displayed as layered, overlapping cards with depth and shadow, so that the section feels premium and modern.

#### Acceptance Criteria

1. THE Reviews_Section SHALL render testimonial cards as Stacked_Cards that visually overlap or layer with adjacent cards using CSS transforms and box shadows.
2. THE Reviews_Section SHALL apply varying z-index values and subtle rotation or offset transforms to individual Stacked_Cards to create a sense of depth.
3. WHEN a user hovers over a Stacked_Card on desktop, THE Stacked_Card SHALL elevate visually (increased shadow and slight upward translate) to indicate interactivity.
4. THE Reviews_Section SHALL display a maximum of 3 visible Stacked_Cards at one time on desktop viewports.
5. THE Reviews_Section Stacked_Cards SHALL include the reviewer name, location, star rating, and testimonial text.
6. WHILE the viewport width is less than 768px, THE Reviews_Section SHALL stack cards vertically without overlap to maintain readability on mobile devices.

### Requirement 5: Unique and Human Visual Identity

**User Story:** As a site visitor, I want the homepage to feel distinctly crafted and non-generic, so that I perceive the brand as trustworthy and differentiated from template sites.

#### Acceptance Criteria

1. THE Homepage SHALL avoid common template patterns including: centered badge + heading + subtitle section openers repeated identically across all sections, uniform card grids with identical padding, and generic gradient CTA banners.
2. THE Homepage sections SHALL vary their layout patterns (e.g., alternating alignment, asymmetric spacing, mixed content widths) to break visual monotony.
3. THE Homepage SHALL use Framer Motion to apply subtle entrance animations (fade, slide, or scale) to sections as the user scrolls, with each section using a distinct animation variant.
4. THE Homepage color palette SHALL remain consistent with the existing brand colors (solar orange #F7931E, solar blue #0A4D8C, dark #1a1a2e) while introducing subtle gradients and depth through shadows.
5. THE Homepage typography hierarchy SHALL use the existing Poppins (headings) and Inter (body) font pairing with varied font weights and sizes across sections to create visual rhythm.
