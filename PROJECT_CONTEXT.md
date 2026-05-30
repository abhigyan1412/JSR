# Project Context — JSR NetSol Website

## Overview
This repository contains the marketing website for **JSR NetSol Pvt. Ltd.**, an enterprise IT infrastructure and cybersecurity system integrator. The site is primarily a **static, multi-page HTML** website intended to communicate capability, credibility, and drive inbound leads (consultation/quote requests).

## Business Profile
JSR NetSol delivers end-to-end infrastructure design, supply, implementation, and support across:
- Servers / Compute
- Storage / Data Management
- Virtualization / HCI
- Backup & Disaster Recovery (BCDR)
- Cybersecurity
- Networking
- Cloud Solutions
- Managed Services (AMC/support, operations)

## Target Audience
Primary:
- CIOs, CTOs
- IT Managers / Infrastructure Heads
- Enterprise customers and mid-market businesses

What they care about:
- Trust signals (track record, certifications, OEM partnerships)
- Technical clarity without buzzword overload
- Risk reduction (security, resilience, compliance)
- Proven delivery (case studies, metrics, references)
- Professionalism and responsiveness (fast site, accessible, modern UI)

## Website Goals (Product Requirements)
- **Premium enterprise appearance**: strong typography, large whitespace, calm layout, minimal “marketing noise”.
- **Trust and credibility**: measurable metrics, OEM logos/partnerships, delivery methodology, certifications, testimonials.
- **Lead generation**: clear CTA placement, frictionless contact flow, multiple conversion points.
- **Responsive design**: mobile-first layout; excellent readability and tap targets.
- **Maintainable architecture**: consistent page structure, shared components, minimal duplication.
- **Reusable CSS**: design tokens + layout primitives + component classes.
- **Clean frontend structure**: semantic HTML, predictable naming, consistent spacing system.

## Design Direction
Visual tone:
- Modern enterprise / cybersecurity SaaS feel
- Dark premium sections used strategically (hero/testimonial/footer)
- Minimalistic, high-contrast, strong typographic hierarchy
- Large whitespace; restrained borders and shadows
- Animations: minimal, subtle, professional

Brand and UI principles:
- Prefer clarity over decoration
- Avoid gimmicks and excessive gradients
- Use consistent radius, spacing, and typography scale
- Keep CTAs and conversion pathways obvious but not aggressive

## Current Codebase Reality (Observed)
- Static HTML pages (`index.html`, `about.html`, `services.html`, `solutions.html`, `customers.html`, `contact.html`).
- `index.html` currently contains:
  - A large embedded `<style>` block
  - A few inline `style=""` attributes in markup

**Project direction going forward**: move styling to external CSS files and eliminate inline styles (except rare, justified exceptions such as a tiny one-off critical fix—should be avoided for this site).

## Content & UX Conventions
Voice:
- Confident, technical, specific, and measurable
- Avoid vague claims (“best”, “world-class”) unless supported
- Prefer structured proof: metrics, references, certifications, OEMs, SLAs

Page patterns to keep consistent:
- Sticky navigation with clear IA
- Section header pattern: label → title → short supporting paragraph
- Reusable “cards” for solutions/services
- CTA blocks near mid-page and end-of-page
- Footer with contact info + quick links + trust badges

Lead-generation essentials:
- Primary CTA: “Request a Consultation” / “Schedule a Consultation”
- Secondary CTA: “Explore Solutions”, “Request a Quote”
- Contact page should capture: name, company, role, email, phone, city, interest area(s), optional message

## Technical Principles
### HTML
- Semantic elements (`header`, `nav`, `main`, `section`, `article`, `footer`).
- Headings strictly hierarchical (`h1` once per page; then `h2`, `h3`…).
- Accessible forms, labels, focus states, keyboard navigation.
- Images must have accurate `alt`.

### CSS
- External CSS only (no embedded `<style>`, no inline `style`).
- Reuse before adding new rules; avoid duplicated declarations.
- Prefer a small set of layout primitives:
  - `.container`, `.section`, `.grid`, `.stack`, `.cluster`
- Use a consistent spacing scale (e.g., 4/8/12/16/24/32/48/64/80).
- Use design tokens via `:root` CSS variables for:
  - colors, typography, spacing, radius, shadows, z-index, breakpoints.

### JS
- Keep JavaScript minimal and progressive-enhancement only (e.g., mobile nav, form validation, analytics).
- No heavy frameworks unless explicitly introduced later.

### Performance & SEO
- Optimize images; avoid layout shifts (define dimensions).
- Use meta tags: description, Open Graph, canonical if applicable.
- Keep Lighthouse-friendly defaults (contrast, tap targets, headings).

## “Definition of Done” for Frontend Changes
- No inline styles; no embedded `<style>` blocks.
- Responsive behavior verified (mobile/tablet/desktop).
- Consistent spacing and typography with tokens.
- Components reusable across pages.
- No duplicated CSS for identical UI patterns.
- Accessibility basics met (labels, focus visible, landmarks, contrast).

