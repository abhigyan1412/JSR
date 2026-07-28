/**
 * JSR NetSol Central Configuration
 * Shared configuration variables for Calendly, Lightbox campaigns, and global settings.
 */

window.JSR_CONFIG = {
  // Calendly Booking URL (Task 4)
  calendlyUrl: "https://calendly.com/jsrnetsol/consultation",

  // Site-wide Lightbox Campaign Modal (Task 9)
  // Set enabled to true to activate a promotional campaign site-wide.
  lightboxConfig: {
    enabled: false, // Set to true to enable the promotional campaign popup
    title: "DPDPA 2023 Readiness Assessment",
    description: "Get a 30-minute consultation with our certified data protection specialists to review your enterprise compliance posture.",
    image: "assets/logos/jsr.png",
    ctaText: "Book Assessment",
    ctaLink: "dpdpa-compliance.html",
    frequency: "session", // 'session' = once per browser session; 'always' = every page load
    delayMs: 2000 // Delay before modal pops up (in milliseconds)
  }
};
