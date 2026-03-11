/**
 * MSEED College Student Portal — Visual Enhancement JS v2
 * Handles: navbar scroll glass, hero element scroll-reveal only
 */
(function () {
  'use strict';

  // ── Intersection Observer — hero static elements ONLY ──────────
  // course-card & stat-item are excluded (JS-rendered, always visible via CSS)
  function initScrollReveal() {
    var selector =
      '#page-college-student .yt-card,' +
      '#page-college-student .hc-bundle-card,' +
      '#page-college-student .hc-svc-float';

    var els = document.querySelectorAll(selector);

    // Stagger delays for hero elements
    els.forEach(function(el, i) {
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
    });

    if (!('IntersectionObserver' in window)) {
      els.forEach(function(el) { el.classList.add('in-view'); });
      return;
    }

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    els.forEach(function(el) { obs.observe(el); });
  }

  // ── Navbar scroll glass effect ──────────────────────────────────
  function initNavbarScroll() {
    var navbar = document.querySelector('#page-college-student .navbar');
    if (!navbar) return;
    var ticking = false;

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(function() {
          navbar.classList.toggle('scrolled', window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── Navbar active link sync on tab switch ───────────────────────
  function initNavActiveSync() {
    var origShowTab = window.showTab;
    if (typeof origShowTab !== 'function') return;

    window.showTab = function(tab) {
      origShowTab.apply(this, arguments);

      // Sync active class on nav links
      var links = document.querySelectorAll('#page-college-student .nav-link');
      links.forEach(function(l) {
        l.classList.remove('active');
        var oc = l.getAttribute('onclick') || '';
        if (oc.indexOf("'" + tab + "'") !== -1) {
          l.classList.add('active');
        }
      });
    };
  }

  // ── INIT ────────────────────────────────────────────────────────
  function init() {
    initNavbarScroll();
    initScrollReveal();

    function hookOnce() {
      initNavActiveSync();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', hookOnce);
    } else {
      hookOnce();
    }

    window.addEventListener('load', initScrollReveal);
  }

  init();
})();