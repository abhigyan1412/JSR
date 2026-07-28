# JSR NetSol Pvt. Ltd. — Enterprise Website



This repository contains the marketing website and client-engagement portal for **JSR NetSol Pvt. Ltd.**, an enterprise IT infrastructure system integrator and cybersecurity specialist based in Nehru Place, New Delhi.

The project is structured as a high-performance, responsive, static multi-page website utilizing semantic HTML5, modular CSS3 (using design tokens and layout primitives), and client-side JavaScript.

---

## 📂 Project Architecture & File Structure

```
JSR/
├── index.html                     # Home Page (Value proposition, OEM partners)
├── about.html                     # About Us Page (Company timeline & profile)
├── services.html                  # Services Page (Core service pillars & AMC info)
├── solutions.html                 # Solutions Page (Enterprise storage, networks, security)
├── customers.html                 # Customers Page (Case profiles & reference deployments)
├── contact.html                   # Contact Us Page (Form capture & office coordinates)
├── email campaign.html            # Responsive HTML email outreach template
├── robots.txt                     # Crawler guidelines
├── sitemap.xml                    # Sitemap for Search Engine Optimization
├── JSR_NetSol_Website_Content.md  # Raw marketing content source
├── PROJECT_CONTEXT.md             # Project requirements & compliance scope
├── css/
│   ├── variables.css              # Global design tokens (fonts, colors, spacing)
│   ├── layout.css                 # Layout primitives & base reset styles
│   └── components.css             # Component-specific layout styles
└── js/
    └── main.js                    # Mobile nav, sticky header, Web3Forms integration
```

---

## 🎨 Technical Design System

Styling is strictly separated into three CSS layers:
1. **Design Tokens ([variables.css](css/variables.css))**: Houses variables for colors (slate dark theme, blue/cyan accents), typography (`Outfit` for headings, `Inter` for body), spacing scales (4px base), border radii, and transitions.
2. **Layout Primitives ([layout.css](layout.css))**: Layout utilities such as `.container`, `.section` (and modifiers like `.section-dark`), `.stack`, `.cluster`, and flex/grid responsive templates.
3. **Component Classes ([components.css](css/components.css))**: Specific component styles (buttons, card layout grids, interactive inputs, navigation header, and footer layout).

---

## ⚡ Client-Side Operations & Integration

Interactive features are handled via **[main.js](js/main.js)**:
* **Sticky Header Scroll Hook**: Dynamically toggles class styling for the nav header.
* **Mobile Toggle Panel**: Animates a navigation overlay menu on small viewports and controls body scroll locking.
* **Navigation Highlighting**: Auto-detects the current route path and adds active style hooks to the menu list.
* **Form Verification & Submission**: Validates fields (using email/tel regex blocks) and submits leads directly to the **Web3Forms API** via asynchronous fetch requests, ensuring a smooth, page-reload-free user experience.

---

## 🔍 SEO & Semantic Compliance

* **SEO Meta & Robots**: Fully optimized meta descriptions, sitemap bindings, and crawling directives.
* **Schema Markup**: Integrated JSON-LD schema within [index.html](index.html) including `Organization` and `LocalBusiness` nodes (containing hours of operation, coordinates, service catalogs, and brand partnerships).
* **Accessibility standards**: Fully semantic HTML5 tag groupings (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) with explicit label and viewport controls.

---

## 📝 Developer Guidelines

1. **No Inline Styles**: Do not use embedded `<style>` tags or inline `style=""` attributes. Use class variables defined in `variables.css`.
2. **Mobile First**: All layouts should automatically adjust to mobile screen widths. Test responsively across breakpoints using layout primitives like `.grid`, `.stack`, and `.cluster`.
3. **Maintain Consistency**: Standardize elements across new layout templates using modular cards, matching buttons, and structured lists from `components.css`.
