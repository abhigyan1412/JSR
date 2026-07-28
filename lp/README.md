# Standing Landing Page Architecture (/lp/)

This directory stores standalone campaign landing pages for JSR NetSol marketing initiatives e.g., `jsrnetsol.com/lp/dpdpa-assessment/` or `jsrnetsol.com/lp/cybersecurity-audit/`.

## Folder Convention
Each new campaign landing page must follow this isolated structure:
```text
/lp/
├── README.md
├── campaign-name/
│   ├── index.html
│   ├── css/ (optional custom styles extending main tokens)
│   └── assets/ (campaign banners/graphics)
```

## Guidelines
1. **Isolated Navigation**: Standalone landing pages MUST NOT use main site navigation links to keep the visitor focused on conversion CTAs.
2. **Global Components**: Standard components (Calendly Modal, DPDPA Ribbon, Footer Legal Links) can be imported using `<script src="../../js/components.js"></script>`.
3. **No Sitemaps / Noindex**: Landing pages designed specifically for paid ads or private email campaigns should include `<meta name="robots" content="noindex, nofollow">` until public release.
