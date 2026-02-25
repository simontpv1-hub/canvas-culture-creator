/* =====================================================
   Canvas Culture — Shopify Theme JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Scroll Reveal (IntersectionObserver)
  // ==========================================
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '-40px' });

  document.querySelectorAll('.reveal, .reveal-scale, .story-paragraph').forEach(el => {
    revealObserver.observe(el);
  });

  // ==========================================
  // 2. Scroll Progress Bar
  // ==========================================
  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && docHeight > 0) {
      progressBar.style.transform = `scaleX(${scrollTop / docHeight})`;
    }
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  // ==========================================
  // 3. Header Shrink on Scroll
  // ==========================================
  const header = document.querySelector('.site-header');
  function updateHeader() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 80);
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ==========================================
  // 4. Scroll to Top Button
  // ==========================================
  const scrollTopBtn = document.getElementById('scroll-top');
  function updateScrollTop() {
    if (scrollTopBtn) {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
    }
  }
  window.addEventListener('scroll', updateScrollTop, { passive: true });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 5. Hero Slideshow
  // ==========================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;

  function showSlide(index) {
    heroSlides.forEach((s, i) => s.classList.toggle('active', i === index));
    heroDots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentSlide = index;
  }

  if (heroSlides.length > 1) {
    setInterval(() => {
      showSlide((currentSlide + 1) % heroSlides.length);
    }, 7000);
  }

  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => showSlide(i));
  });

  // ==========================================
  // 6. Mega-Menu & Dropdown (Desktop)
  // ==========================================
  const navItems = document.querySelectorAll('[data-nav-item]');
  navItems.forEach(item => {
    const menu = item.querySelector('.mega-menu, .dropdown-menu');
    if (!menu) return;

    item.addEventListener('mouseenter', () => {
      // Close all other menus first
      document.querySelectorAll('.mega-menu.open, .dropdown-menu.open').forEach(m => m.classList.remove('open'));

      // Position dropdown menus
      if (menu.classList.contains('dropdown-menu')) {
        const rect = item.getBoundingClientRect();
        let left = rect.left;
        const menuWidth = 220;
        if (left + menuWidth > window.innerWidth) left = window.innerWidth - menuWidth;
        if (left < 10) left = 10;
        menu.style.left = left + 'px';
        menu.style.top = (header ? header.getBoundingClientRect().bottom : 120) + 'px';
      }

      // Position mega menus
      if (menu.classList.contains('mega-menu')) {
        menu.style.top = (header ? header.getBoundingClientRect().bottom : 120) + 'px';
      }

      menu.classList.add('open');
    });

    item.addEventListener('mouseleave', () => {
      menu.classList.remove('open');
    });
  });

  // ==========================================
  // 7. Mobile Navigation
  // ==========================================
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileIcon = document.querySelector('[data-mobile-icon]');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      if (mobileIcon) {
        mobileIcon.innerHTML = isOpen
          ? '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
          : '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>';
      }
    });
  }

  // Mobile accordion sub-navigation
  document.querySelectorAll('[data-mobile-nav-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-mobile-nav-toggle');
      const target = document.getElementById(targetId);
      if (target) {
        target.classList.toggle('open');
        const chevron = btn.querySelector('.chevron');
        if (chevron) chevron.classList.toggle('rotate-180');
      }
    });
  });

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav) mobileNav.classList.remove('open');
    });
  });

  // ==========================================
  // 8. Cart Drawer
  // ==========================================
  function openCart() {
    document.getElementById('cart-backdrop')?.classList.add('open');
    document.getElementById('cart-drawer')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    document.getElementById('cart-backdrop')?.classList.remove('open');
    document.getElementById('cart-drawer')?.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-open-cart]').forEach(el => {
    el.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
  });
  document.querySelectorAll('[data-close-cart]').forEach(el => {
    el.addEventListener('click', closeCart);
  });
  const cartBackdrop = document.getElementById('cart-backdrop');
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  // ==========================================
  // 9. Add to Cart (Shopify AJAX API)
  // ==========================================
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-add-to-cart]');
    if (!btn) return;
    e.preventDefault();

    const variantId = btn.getAttribute('data-variant-id');
    const qty = parseInt(btn.getAttribute('data-quantity') || '1', 10);
    const originalText = btn.textContent;
    btn.textContent = 'Adding...';
    btn.disabled = true;

    try {
      await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(variantId, 10), quantity: qty })
      });
      await refreshCartDrawer();
      openCart();
      btn.textContent = '✓ Added';
      setTimeout(() => { btn.textContent = originalText; }, 2000);
    } catch (err) {
      console.error('Add to cart failed:', err);
      btn.textContent = 'Error';
      setTimeout(() => { btn.textContent = originalText; }, 2000);
    }
    btn.disabled = false;
  });

  // ==========================================
  // 10. Refresh Cart Drawer
  // ==========================================
  async function refreshCartDrawer() {
    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();

      // Update count badge
      document.querySelectorAll('[data-cart-count]').forEach(el => {
        el.textContent = cart.item_count;
        el.style.display = cart.item_count > 0 ? 'flex' : 'none';
      });

      // Re-render cart items via section rendering API
      const sectionRes = await fetch('/?sections=cart-drawer-items');
      const sections = await sectionRes.json();
      const container = document.getElementById('cart-drawer-items');
      if (container && sections['cart-drawer-items']) {
        container.innerHTML = sections['cart-drawer-items'];
      }
    } catch (err) {
      console.error('Cart refresh failed:', err);
    }
  }

  // Cart quantity changes
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-cart-qty]');
    if (!btn) return;

    const line = parseInt(btn.getAttribute('data-line'), 10);
    const qty = parseInt(btn.getAttribute('data-cart-qty'), 10);

    try {
      await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ line, quantity: qty })
      });
      await refreshCartDrawer();
    } catch (err) {
      console.error('Cart update failed:', err);
    }
  });

  // ==========================================
  // 11. Welcome Popup
  // ==========================================
  const popup = document.getElementById('welcome-popup');
  if (popup && !sessionStorage.getItem('popup_dismissed')) {
    setTimeout(() => popup.classList.add('open'), 1500);
  }

  function closePopup() {
    if (popup) popup.classList.remove('open');
    sessionStorage.setItem('popup_dismissed', '1');
  }

  document.querySelectorAll('[data-close-popup]').forEach(el => {
    el.addEventListener('click', closePopup);
  });

  if (popup) {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) closePopup();
    });
  }

  // Popup form submission
  const popupForm = document.getElementById('popup-form');
  if (popupForm) {
    popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const successEl = document.getElementById('popup-success');
      const formEl = document.getElementById('popup-form-content');
      if (successEl) successEl.style.display = 'block';
      if (formEl) formEl.style.display = 'none';
    });
  }

  // ==========================================
  // 12. Count-Up Animation
  // ==========================================
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = el.getAttribute('data-decimal') === 'true';
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()) + suffix;
        }, duration / steps);

        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-count-up]').forEach(el => countObserver.observe(el));

  // ==========================================
  // 13. FAQ Accordion
  // ==========================================
  document.querySelectorAll('[data-faq-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');

      // Close all
      document.querySelectorAll('[data-faq-toggle]').forEach(b => {
        b.classList.remove('open');
        if (b.nextElementSibling) b.nextElementSibling.classList.remove('open');
      });

      if (!isOpen) {
        btn.classList.add('open');
        if (answer) answer.classList.add('open');
      }
    });
  });

  // ==========================================
  // 14. Product Thumbnails
  // ==========================================
  document.querySelectorAll('[data-thumbnail]').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const mainImg = document.querySelector('[data-main-image]');
      if (mainImg) mainImg.src = thumb.getAttribute('data-thumbnail');
      document.querySelectorAll('[data-thumbnail]').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
  });

  // ==========================================
  // 15. Size Selector (Product Page)
  // ==========================================
  document.querySelectorAll('[data-size-option]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-size-option]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const price = btn.getAttribute('data-price');
      const variantId = btn.getAttribute('data-variant-id');
      const priceEl = document.querySelector('[data-current-price]');
      const addBtn = document.querySelector('[data-add-to-cart]');

      if (priceEl && price) priceEl.textContent = '$' + price;
      if (addBtn && variantId) addBtn.setAttribute('data-variant-id', variantId);
    });
  });

  // ==========================================
  // 16. Product Carousel Arrows
  // ==========================================
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');

    if (prevBtn && track) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -300, behavior: 'smooth' });
      });
    }
    if (nextBtn && track) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: 300, behavior: 'smooth' });
      });
    }
  });

  // ==========================================
  // 17. Product Tabs
  // ==========================================
  document.querySelectorAll('[data-tab-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabGroup = btn.closest('[data-tabs]');
      if (!tabGroup) return;
      const tabId = btn.getAttribute('data-tab-btn');

      tabGroup.querySelectorAll('[data-tab-btn]').forEach(b => b.classList.remove('active'));
      tabGroup.querySelectorAll('[data-tab-panel]').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = tabGroup.querySelector(`[data-tab-panel="${tabId}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  // ==========================================
  // 18. Contact Form (Basic)
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // Shopify handles form submission natively if action is set
      // This is just for UX feedback
    });
  }

  // ==========================================
  // 19. Newsletter Form
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = newsletterForm.querySelector('.newsletter-success');
      const fields = newsletterForm.querySelector('.newsletter-fields');
      if (msg) msg.style.display = 'block';
      if (fields) fields.style.display = 'none';
    });
  }
});
