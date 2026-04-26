/* ============================================
   FLOWMETRICS — MAIN JS
   ============================================ */

// NAVBAR SCROLL EFFECT
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// MOBILE MENU
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// ANIMATED COUNTERS
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const isFloat = el.dataset.float === 'true';
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current).toLocaleString('fr-FR')) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// INTERSECTION OBSERVER FOR ANIMATIONS
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .step, .testimonial-card, .pricing-card, .kpi-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: none !important; }';
document.head.appendChild(style);

// STAGGER ANIMATIONS
document.querySelectorAll('.features-grid .feature-card, .pricing-cards .pricing-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 80}ms`;
});

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// DASHBOARD CHART ANIMATION
const bars = document.querySelectorAll('.chart-bars .bar');
if (bars.length) {
  const chartObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      bars.forEach((bar, i) => {
        const finalHeight = bar.style.height;
        bar.style.height = '0%';
        setTimeout(() => {
          bar.style.transition = 'height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
          bar.style.height = finalHeight;
        }, i * 60 + 300);
      });
      chartObserver.disconnect();
    }
  }, { threshold: 0.5 });
  const chartEl = document.querySelector('.chart-bars');
  if (chartEl) chartObserver.observe(chartEl);
}

// TOAST NOTIFICATION (for forms)
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    padding: 14px 24px; border-radius: 10px;
    font-size: 14px; font-weight: 500;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white; box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// EXPORT for other pages
window.FlowMetrics = { showToast };
