/**
 * JSR NetSol Modular Component Renderer & Site-Wide Features
 * Injects Header, Footer, DPDPA Ribbon, Lightbox Modal, and Calendly Triggers dynamically.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderDPDPARibbon();
  renderHeader();
  renderFooter();
  renderLightboxModal();
  renderCalendlyModal();
  initCalendlyTriggers();
  adjustHeaderTopOffset();
});

/**
 * Determine root path prefix for pages in subdirectories (e.g. /solutions/ or /lp/)
 */
function getPathPrefix() {
  const path = window.location.pathname;
  if (path.includes('/solutions/') || path.includes('/lp/')) {
    return '../';
  }
  return '';
}

/**
 * 1. Global DPDPA Compliance Ribbon (Task 1)
 */
function renderDPDPARibbon() {
  // Check if ribbon was closed in session
  if (sessionStorage.getItem('jsr_dpdpa_ribbon_closed') === 'true') {
    return;
  }

  const ribbonEl = document.getElementById('dpdpa-ribbon-container');
  if (!ribbonEl) return;

  const prefix = getPathPrefix();

  ribbonEl.innerHTML = `
    <div class="dpdpa-ribbon" id="dpdpaRibbon">
      <div class="dpdpa-ribbon-content">
        <span class="dpdpa-badge">DPDPA 2023</span>
        <span class="dpdpa-text">Is Your Organization DPDPA-Ready? Get a Compliance Readiness Assessment.</span>
        <a href="${prefix}dpdpa-compliance.html" class="dpdpa-cta-btn">
          Contact Us
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
      <button class="dpdpa-close-btn" id="closeDpdpaRibbon" aria-label="Close notification banner">&times;</button>
    </div>
  `;

  document.body.classList.add('has-dpdpa-ribbon');

  const closeBtn = document.getElementById('closeDpdpaRibbon');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      const ribbon = document.getElementById('dpdpaRibbon');
      if (ribbon) ribbon.style.display = 'none';
      document.body.classList.remove('has-dpdpa-ribbon');
      sessionStorage.setItem('jsr_dpdpa_ribbon_closed', 'true');
      adjustHeaderTopOffset();
    });
  }
}

/**
 * Adjust header top position when ribbon is active
 */
function adjustHeaderTopOffset() {
  const ribbon = document.getElementById('dpdpaRibbon');
  const header = document.querySelector('.site-header');
  if (!header) return;

  if (ribbon && ribbon.offsetWidth > 0 && ribbon.offsetHeight > 0 && getComputedStyle(ribbon).display !== 'none') {
    const ribbonHeight = ribbon.offsetHeight;
    header.style.top = ribbonHeight + 'px';
  } else {
    header.style.top = '0px';
  }
}

window.addEventListener('resize', adjustHeaderTopOffset);

/**
 * 2. Shared Header & Navigation Injection (Tasks 2 & 7)
 */
function renderHeader() {
  const headerEl = document.getElementById('site-header-container');
  if (!headerEl) return;

  const prefix = getPathPrefix();
  const currentPath = window.location.pathname;

  const navItems = [
    { name: 'Home', href: `${prefix}index.html` },
    { name: 'About Us', href: `${prefix}about.html` },
    { name: 'Services', href: `${prefix}services.html` },
    { name: 'DPDPA Compliance', href: `${prefix}dpdpa-compliance.html`, highlight: true },
    { name: 'Solutions', href: `${prefix}solutions.html` },
    { name: 'Customers', href: `${prefix}customers.html` },
    { name: 'Contact', href: `${prefix}contact.html` }
  ];

  const buildNavLinks = (isMobile = false) => {
    return navItems.map(item => {
      let activeClass = '';
      const hrefBase = item.href.replace('../', '');
      if (currentPath.endsWith(hrefBase) || (hrefBase === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('JSR/')))) {
        activeClass = 'active';
      }
      const specialStyle = item.highlight ? 'style="color: #ea580c; font-weight: 700;"' : '';
      return `<li><a href="${item.href}" class="nav-link ${activeClass}" ${specialStyle}>${item.name}</a></li>`;
    }).join('') + `<li><a href="${prefix}contact.html" class="btn btn-orange ${isMobile ? '' : 'btn-sm'}">Get in Touch</a></li>`;
  };

  headerEl.innerHTML = `
    <header class="site-header">
      <div class="container header-container">
        <a href="${prefix}index.html" class="logo" aria-label="JSR NetSol Home">
          <img src="${prefix}assets/logos/jsr.png" alt="JSR NetSol Logo" class="logo-img">
          <span class="logo-text">JSR <span>NetSol</span></span>
        </a>
        
        <nav class="nav-menu" aria-label="Main Navigation">
          <ul class="nav-list">
            ${buildNavLinks(false)}
          </ul>
        </nav>

        <button class="mobile-nav-toggle" aria-label="Toggle navigation menu">
          <span class="hamburger"></span>
        </button>
      </div>
    </header>

    <div class="mobile-menu" aria-label="Mobile Navigation">
      <ul class="nav-list">
        ${buildNavLinks(true)}
      </ul>
    </div>
  `;
}

/**
 * 3. Shared Footer Injection (Tasks 11 & 12)
 */
function renderFooter() {
  const footerEl = document.getElementById('site-footer-container');
  if (!footerEl) return;

  const prefix = getPathPrefix();

  footerEl.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-col stack">
          <a href="${prefix}index.html" class="logo">
            <img src="${prefix}assets/logos/jsr.png" alt="JSR NetSol Logo" class="logo-img">
            <span class="logo-text" style="color: var(--color-text-dark-primary);">JSR <span style="color: var(--color-secondary);">NetSol</span></span>
          </a>
          <p class="mt-4">
            Enterprise IT Infrastructure Partner, Security Engineering & Multi-OEM Integration. Pan-India SLA Delivery Since 2016.
          </p>
          <!-- Social Media Handles (Task 12) -->
          <div class="footer-social-links">
            <a href="#" class="social-icon-btn" aria-label="LinkedIn" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" class="social-icon-btn" aria-label="X (Twitter)" title="X / Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" class="social-icon-btn" aria-label="Facebook" title="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" class="social-icon-btn" aria-label="Instagram" title="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" class="social-icon-btn" aria-label="YouTube" title="YouTube">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col stack">
          <h3>Quick Links</h3>
          <ul class="footer-links">
            <li><a href="${prefix}index.html" class="footer-link">Home</a></li>
            <li><a href="${prefix}about.html" class="footer-link">About Us</a></li>
            <li><a href="${prefix}services.html" class="footer-link">Services</a></li>
            <li><a href="${prefix}dpdpa-compliance.html" class="footer-link" style="color: #ea580c;">DPDPA Compliance</a></li>
            <li><a href="${prefix}solutions.html" class="footer-link">Solutions Catalog</a></li>
            <li><a href="${prefix}customers.html" class="footer-link">Customers</a></li>
            <li><a href="${prefix}contact.html" class="footer-link">Contact</a></li>
          </ul>
        </div>

        <div class="footer-col stack">
          <h3>Key Solutions</h3>
          <ul class="footer-links">
            <li><a href="${prefix}solutions.html?cat=networking" class="footer-link">Enterprise Networking</a></li>
            <li><a href="${prefix}solutions.html?cat=server-storage" class="footer-link">Server, Storage & Virtualisation</a></li>
            <li><a href="${prefix}solutions.html?cat=cloud" class="footer-link">Cloud Solutions</a></li>
            <li><a href="${prefix}solutions.html?cat=cybersecurity" class="footer-link">Cybersecurity Defense</a></li>
            <li><a href="${prefix}dpdpa-compliance.html" class="footer-link">DPDPA Readiness</a></li>
          </ul>
        </div>

        <div class="footer-col stack">
          <h3>Contact Info</h3>
          <ul class="footer-contact-list">
            <li class="footer-contact-item">
              <svg class="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              <span>+91-9810078410</span>
            </li>
            <li class="footer-contact-item">
              <svg class="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <span>sales@jsrnetsol.com</span>
            </li>
            <li class="footer-contact-item">
              <svg class="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span>Nehru Place, New Delhi, India</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Legal Row (Task 11) -->
      <div class="container footer-legal-row">
        <div class="footer-legal-links">
          <a href="${prefix}privacy-policy.html">Privacy Policy</a>
          <span class="divider">•</span>
          <a href="${prefix}terms-and-conditions.html">Terms & Conditions</a>
          <span class="divider">•</span>
          <a href="${prefix}grievance-policy.html">Grievance Officer Policy</a>
        </div>
      </div>

      <div class="container footer-bottom">
        <p class="footer-copy">&copy; 2026 JSR NetSol Private Limited. All Rights Reserved. ISO 9001:2015, ISO 14001:2015 & ISO 27001:2022 Certified. CMMI Level 5. Udyam MSME Registered & GeM Vendor.</p>
      </div>
    </footer>
  `;
}

/**
 * 4. Calendly Booking Modal Component (Task 4)
 */
function renderCalendlyModal() {
  if (document.getElementById('calendlyModal')) return;

  const modal = document.createElement('div');
  modal.id = 'calendlyModal';
  modal.className = 'custom-modal';
  modal.innerHTML = `
    <div class="custom-modal-overlay" id="closeCalendlyOverlay"></div>
    <div class="custom-modal-content calendly-modal-content">
      <button class="custom-modal-close" id="closeCalendlyBtn">&times;</button>
      <div class="modal-header">
        <h3>Schedule an Enterprise Consultation</h3>
        <p>Select a convenient date and time to speak directly with our senior infrastructure architects.</p>
      </div>
      <div class="calendly-embed-container" id="calendlyEmbedContainer">
        <!-- Inline widget loaded dynamically -->
        <iframe src="${window.JSR_CONFIG ? window.JSR_CONFIG.calendlyUrl : 'https://calendly.com/jsrnetsol/consultation'}" width="100%" height="550" frameborder="0"></iframe>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtns = [document.getElementById('closeCalendlyBtn'), document.getElementById('closeCalendlyOverlay')];
  closeBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        modal.classList.remove('open');
      });
    }
  });
}

function openCalendlyModal() {
  const modal = document.getElementById('calendlyModal');
  if (modal) {
    modal.classList.add('open');
  }
}

/**
 * Attach click handlers to any button with data-calendly or class .btn-calendly
 */
function initCalendlyTriggers() {
  document.querySelectorAll('[data-calendly], .btn-calendly, a[href="#book-call"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCalendlyModal();
    });
  });
}

/**
 * 5. Lightbox Campaign Modal (Task 9)
 */
function renderLightboxModal() {
  const cfg = window.JSR_CONFIG ? window.JSR_CONFIG.lightboxConfig : null;
  if (!cfg || !cfg.enabled) return;

  if (cfg.frequency === 'session' && sessionStorage.getItem('jsr_lightbox_shown') === 'true') {
    return;
  }

  const prefix = getPathPrefix();

  setTimeout(() => {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightboxCampaignModal';
    lightbox.className = 'custom-modal open';
    lightbox.innerHTML = `
      <div class="custom-modal-overlay" id="closeLightboxOverlay"></div>
      <div class="custom-modal-content lightbox-modal-box stack stack-md">
        <button class="custom-modal-close" id="closeLightboxBtn">&times;</button>
        <div class="lightbox-banner">
          <img src="${prefix}${cfg.image}" alt="Campaign Banner" class="lightbox-img">
        </div>
        <h3 class="lightbox-title">${cfg.title}</h3>
        <p class="lightbox-desc">${cfg.description}</p>
        <a href="${prefix}${cfg.ctaLink}" class="btn btn-secondary btn-full">${cfg.ctaText}</a>
      </div>
    `;
    document.body.appendChild(lightbox);

    sessionStorage.setItem('jsr_lightbox_shown', 'true');

    const closeBtns = [document.getElementById('closeLightboxBtn'), document.getElementById('closeLightboxOverlay')];
    closeBtns.forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          lightbox.classList.remove('open');
          setTimeout(() => lightbox.remove(), 300);
        });
      }
    });
  }, cfg.delayMs || 1500);
}
