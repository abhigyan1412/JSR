/* Main Interactions & Enhancements for JSR NetSol Website */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize standard features
  initStickyHeader();
  initMobileNavigation();
  initActiveNavHighlight();
  initContactFormValidation();
});

/**
 * Sticky Header Scroll State
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on load and scroll
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/**
 * Mobile Navigation Toggle Overlay
 */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (!toggleBtn || !mobileMenu) return;

  const toggleMenu = () => {
    const isOpen = toggleBtn.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    
    // Prevent background scrolling when menu is open
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close menu when clicking link in mobile view
  const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('open');
      mobileMenu.classList.remove('open');
      body.style.overflow = '';
    });
  });
}

/**
 * Active Navigation Highlight based on path matching
 */
function initActiveNavHighlight() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Check if the current path matches the link href
    // Works for local testing and web servers
    const isHome = href === 'index.html' || href === './' || href === '/';
    const pathEndsWithHref = currentPath.endsWith(href);
    const pathIsRoot = currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('JSR%20Web%202/') || currentPath.endsWith('JSR Web 2/');

    if ((isHome && pathIsRoot) || (!isHome && href !== '#' && pathEndsWithHref)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Form validation and Success feedback state
 */
function initContactFormValidation() {
  const form = document.getElementById('contactLeadForm');
  const successState = document.getElementById('formSuccessState');
  
  if (!form || !successState) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Reset previous errors
    let isValid = true;
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.classList.remove('error');
      const errorMsg = input.parentNode.querySelector('.error-message');
      if (errorMsg) errorMsg.remove();
    });

    // Validate inputs
    const requiredInputs = form.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
      if (!input.value.trim()) {
        setError(input, 'This field is required.');
        isValid = false;
      } else if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          setError(input, 'Please enter a valid email address.');
          isValid = false;
        }
      } else if (input.type === 'tel') {
        const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
        if (!phoneRegex.test(input.value.trim())) {
          setError(input, 'Please enter a valid phone number (min 10 digits).');
          isValid = false;
        }
      }
    });

    if (isValid) {
      // Mock submit action - Hide form and show success state
      form.style.display = 'none';
      successState.style.display = 'block';
      successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  function setError(input, message) {
    input.classList.add('error');
    const parent = input.parentNode;
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.innerText = message;
    parent.appendChild(errorEl);
  }
}
