/**
 * PrintPro Solutions — script.js
 * Fully rebuilt: all functionality fixed, validated, and DOMContentLoaded-wrapped.
 */

document.addEventListener("DOMContentLoaded", function () {

  /* ════════════════════════════════════════════════
     CONFIG — change phone number here only
  ════════════════════════════════════════════════ */
  const WA_NUMBER = "919999999999"; // Replace with real number
  const WA_BASE   = `https://wa.me/${WA_NUMBER}`;

  /* ════════════════════════════════════════════════
     DATA
  ════════════════════════════════════════════════ */
  const printerData = [
    {
      id: "riso1", brand: "RISO", tag: "Best Seller", badgeType: "",
      image: "assets/printer.png", model: "RISO RZ 570",
      features: ["130 copies/min – ultra fast", "A3/A4 duplex printing", "Very low cost per copy"],
      bestFor: "Schools & Bulk Printing",
      benefits: ["Prints 130 pages per minute", "Drum-based – very low ink cost", "Ideal for 5,000+ prints/day", "Easy A3/A4 switching"],
      useCase: "Best for schools, coaching centres, government offices, and any business printing 3,000+ copies daily."
    },
    {
      id: "riso2", brand: "RISO", tag: "Popular", badgeType: "popular",
      image: "assets/printer.png", model: "RISO ComColor FW5230",
      features: ["Inkjet full-colour printing", "120 ppm colour output", "Low running cost vs laser"],
      bestFor: "Large Offices & Corporates",
      benefits: ["120 pages/min colour printing", "Cost-effective full colour", "Network-ready out of box", "Auto-stapling option"],
      useCase: "Perfect for corporate offices, marketing teams, and institutions needing regular colour output."
    },
    {
      id: "kyocera1", brand: "Kyocera", tag: "Best Value", badgeType: "",
      image: "assets/printer.png", model: "Kyocera ECOSYS M2040dn",
      features: ["40 ppm laser MFP", "Print, Copy, Scan, Fax", "Long-life drum technology"],
      bestFor: "Small & Medium Offices",
      benefits: ["All-in-one functionality", "Long-life drum – saves cost", "Energy Star certified", "Compact footprint"],
      useCase: "Ideal for small offices, accounting firms, and businesses needing a reliable everyday MFP."
    },
    {
      id: "kyocera2", brand: "Kyocera", tag: "", badgeType: "",
      image: "assets/printer.png", model: "Kyocera TASKalfa 2553ci",
      features: ["25 ppm A3 colour MFP", "Touch-screen operation", "Cloud & mobile print ready"],
      bestFor: "Mid-Large Offices",
      benefits: ["Vivid A3 colour output", "Intuitive 7\" touchscreen", "Cloud storage integration", "Heavy-duty 100k page/month"],
      useCase: "Great for design studios, law firms, hospitals, and businesses needing A3 colour document production."
    },
    {
      id: "sharp1", brand: "Sharp", tag: "", badgeType: "",
      image: "assets/printer.png", model: "Sharp MX-3051",
      features: ["30 ppm A3 colour copier", "Advanced security features", "6,300-sheet max capacity"],
      bestFor: "Enterprise & Government",
      benefits: ["High-volume A3 colour", "Built-in data security", "Large paper capacity", "Intuitive touchscreen"],
      useCase: "Perfect for enterprise, government offices, and high-security environments needing robust document control."
    },
    {
      id: "sharp2", brand: "Sharp", tag: "", badgeType: "",
      image: "assets/printer.png", model: "Sharp BP-70C65",
      features: ["65 ppm high-speed colour", "AI-powered scanning", "OCR & auto-classify docs"],
      bestFor: "Large Enterprises",
      benefits: ["65 pages/min colour printing", "AI document classification", "OCR text searchable output", "Seamless SharePoint/DMS integration"],
      useCase: "Designed for large enterprises, legal departments, and businesses with complex document workflows."
    }
  ];

  const brochureData = [
    { image: "assets/printer.png", name: "Sharp MX-3051 Brochure",   file: "#" },
    { image: "assets/printer.png", name: "Sharp BP-70C65 Brochure",   file: "#" },
    { image: "assets/printer.png", name: "Sharp MX-6070N Brochure",   file: "#" },
    { image: "assets/printer.png", name: "Sharp AR Series Brochure",   file: "#" }
  ];

  /* In-memory lead store */
  const leads = [];

  /* ════════════════════════════════════════════════
     UTILITY — smooth scroll to any section by id
  ════════════════════════════════════════════════ */
  function scrollToSection(id) {
    const target = document.getElementById(id) || document.querySelector(id);
    if (!target) return;
    const navH = document.getElementById("navbar") ? document.getElementById("navbar").offsetHeight : 68;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;
    window.scrollTo({ top, behavior: "smooth" });
  }

  /* ════════════════════════════════════════════════
     NAVBAR — mobile toggle + scroll shadow + active link
  ════════════════════════════════════════════════ */
  const navbar   = document.getElementById("navbar");
  const navLinks = document.getElementById("navlinks");
  const hamburger = document.getElementById("ham");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", isOpen);
      // animate hamburger to X
      const spans = hamburger.querySelectorAll("span");
      if (isOpen) {
        spans[0].style.transform = "rotate(45deg) translate(5px,5px)";
        spans[1].style.opacity   = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
      } else {
        spans[0].style.transform = "";
        spans[1].style.opacity   = "";
        spans[2].style.transform = "";
      }
    });
  }

  // Close mobile nav when a link is clicked
  if (navLinks) {
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        if (hamburger) {
          hamburger.querySelectorAll("span").forEach(function (s) {
            s.style.transform = "";
            s.style.opacity   = "";
          });
        }
      });
    });
  }

  // All nav anchor links — smooth scroll override
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        scrollToSection(href);
      }
    });
  });

  // Active nav link on scroll (IntersectionObserver)
  const sections = document.querySelectorAll("section[id], div[id]");
  const navAnchors = document.querySelectorAll(".nav-links a");

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navAnchors.forEach(function (a) {
          a.classList.toggle(
            "nav-active",
            a.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, { threshold: 0.3, rootMargin: "-68px 0px 0px 0px" });

  sections.forEach(function (sec) { sectionObserver.observe(sec); });

  // Scroll shadow on navbar
  window.addEventListener("scroll", function () {
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  /* ════════════════════════════════════════════════
     TOAST
  ════════════════════════════════════════════════ */
  function showToast(msg, type) {
    const t    = document.getElementById("toast");
    const msgEl = document.getElementById("toast-msg");
    if (!t || !msgEl) return;
    msgEl.textContent = msg || "Thank you! We'll be in touch shortly.";
    t.style.background = (type === "error") ? "#EF4444" : "#10B981";
    t.style.opacity    = "1";
    t.style.transform  = "translateX(-50%) translateY(0)";
    clearTimeout(t._timer);
    t._timer = setTimeout(function () {
      t.style.opacity   = "0";
      t.style.transform = "translateX(-50%) translateY(20px)";
    }, 4000);
  }

  /* ════════════════════════════════════════════════
     VALIDATION HELPERS
  ════════════════════════════════════════════════ */
  function validateName(val) {
    return val.trim().length >= 2;
  }
  function validatePhone(val) {
    return /^[6-9]\d{9}$/.test(val.replace(/\s+/g, ""));
  }

  function showFieldError(input, msg) {
    clearFieldError(input);
    input.style.borderColor = "#EF4444";
    const err = document.createElement("span");
    err.className = "field-error";
    err.style.cssText = "color:#EF4444;font-size:0.78rem;display:block;margin-top:4px;";
    err.textContent = msg;
    input.parentNode.appendChild(err);
  }
  function clearFieldError(input) {
    input.style.borderColor = "";
    const existing = input.parentNode.querySelector(".field-error");
    if (existing) existing.remove();
  }
  function clearAllErrors(form) {
    form.querySelectorAll(".field-error").forEach(function (e) { e.remove(); });
    form.querySelectorAll("input,select").forEach(function (i) { i.style.borderColor = ""; });
  }

  function setButtonLoading(btn, loading, originalText) {
    if (loading) {
      btn.disabled = true;
      btn.dataset.originalText = btn.textContent;
      btn.textContent = "Sending…";
      btn.style.opacity = "0.75";
    } else {
      btn.disabled = false;
      btn.textContent = originalText || btn.dataset.originalText || "Submit";
      btn.style.opacity = "";
    }
  }

  /* ════════════════════════════════════════════════
     MODAL — enquiry quick form
  ════════════════════════════════════════════════ */
  const modalOverlay = document.getElementById("modal");

  function openModal(req) {
    if (!modalOverlay) return;
    const title   = document.getElementById("modal-title");
    const reqField = document.getElementById("modal-req-field");
    if (title)    title.textContent = req ? "Enquiry: " + req : "Quick Enquiry";
    if (reqField) reqField.value = req || "";
    const form = modalOverlay.querySelector("form");
    if (form) clearAllErrors(form);
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    // Focus first input
    const firstInput = modalOverlay.querySelector("input");
    if (firstInput) setTimeout(function () { firstInput.focus(); }, 100);
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Expose globally (needed by dynamically-rendered HTML buttons)
  window.openModal = openModal;
  window.closeModal = closeModal;

  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });

    const closeBtn = modalOverlay.querySelector(".modal-close");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    const form = modalOverlay.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearAllErrors(form);
        const nameInput  = form.querySelector('input[type="text"]');
        const phoneInput = form.querySelector('input[type="tel"]');
        let valid = true;

        if (nameInput && !validateName(nameInput.value)) {
          showFieldError(nameInput, "Please enter your name (min 2 characters).");
          valid = false;
        }
        if (phoneInput && !validatePhone(phoneInput.value)) {
          showFieldError(phoneInput, "Enter a valid 10-digit Indian mobile number.");
          valid = false;
        }
        if (!valid) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        setButtonLoading(submitBtn, true);

        const reqField = document.getElementById("modal-req-field");
        const lead = {
          name:        nameInput  ? nameInput.value.trim()  : "",
          phone:       phoneInput ? phoneInput.value.trim() : "",
          requirement: reqField   ? reqField.value          : "",
          source:      "modal",
          time:        new Date().toISOString()
        };
        leads.push(lead);
        console.log("[PrintPro Lead]", lead);

        setTimeout(function () {
          setButtonLoading(submitBtn, false, "Send Enquiry →");
          closeModal();
          showToast("Enquiry sent! We'll call you in 10 minutes.");
          form.reset();
        }, 900);
      });
    }
  }

  /* ════════════════════════════════════════════════
     SCROLL POPUP
  ════════════════════════════════════════════════ */
  const scrollPopup = document.getElementById("scroll-popup");
  let popupShown    = false;
  let popupTimeout  = null;

  function closeScrollPopup() {
    if (!scrollPopup) return;
    scrollPopup.classList.remove("open");
    document.body.style.overflow = "";
  }
  window.closeScrollPopup = closeScrollPopup;

  window.addEventListener("scroll", function () {
    if (popupShown || !scrollPopup) return;
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (pct > 0.55) {
      popupShown = true;
      clearTimeout(popupTimeout);
      popupTimeout = setTimeout(function () {
        scrollPopup.classList.add("open");
        document.body.style.overflow = "hidden";
      }, 800);
    }
  }, { passive: true });

  if (scrollPopup) {
    scrollPopup.addEventListener("click", function (e) {
      if (e.target === scrollPopup) closeScrollPopup();
    });

    const closeBtn = scrollPopup.querySelector(".modal-close");
    if (closeBtn) closeBtn.addEventListener("click", closeScrollPopup);

    const form = scrollPopup.querySelector("form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput && !validatePhone(phoneInput.value)) {
          showFieldError(phoneInput, "Enter a valid 10-digit mobile number.");
          return;
        }
        const submitBtn = form.querySelector('button[type="submit"]');
        setButtonLoading(submitBtn, true);

        const lead = {
          phone:       phoneInput ? phoneInput.value.trim() : "",
          requirement: form.querySelector("select") ? form.querySelector("select").value : "",
          source:      "scroll-popup",
          time:        new Date().toISOString()
        };
        leads.push(lead);
        console.log("[PrintPro Lead]", lead);

        setTimeout(function () {
          setButtonLoading(submitBtn, false, "Get Free Quote →");
          closeScrollPopup();
          showToast("We'll call you back shortly!");
          form.reset();
        }, 900);
      });
    }
  }

  /* ════════════════════════════════════════════════
     MAIN LEAD FORM (#contact section)
  ════════════════════════════════════════════════ */
  const leadForm = document.getElementById("lead-form");
  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearAllErrors(leadForm);

      const nameInput  = document.getElementById("lead-name");
      const phoneInput = document.getElementById("lead-phone");
      const reqSelect  = document.getElementById("lead-req");
      let valid = true;

      if (!validateName(nameInput ? nameInput.value : "")) {
        showFieldError(nameInput, "Please enter your full name.");
        valid = false;
      }
      if (!validatePhone(phoneInput ? phoneInput.value : "")) {
        showFieldError(phoneInput, "Enter a valid 10-digit mobile number.");
        valid = false;
      }
      if (!valid) return;

      const submitBtn = leadForm.querySelector('button[type="submit"]');
      setButtonLoading(submitBtn, true);

      const lead = {
        name:        nameInput  ? nameInput.value.trim()  : "",
        phone:       phoneInput ? phoneInput.value.trim() : "",
        requirement: reqSelect  ? reqSelect.value         : "",
        source:      "main-form",
        time:        new Date().toISOString()
      };
      leads.push(lead);
      console.log("[PrintPro Lead]", lead);

      setTimeout(function () {
        setButtonLoading(submitBtn, false, "Send My Request →");
        showToast("Request received! Expect a call within 10 minutes.");
        leadForm.reset();
      }, 1000);
    });
  }

  /* ════════════════════════════════════════════════
     PRODUCT DETAIL PANEL
  ════════════════════════════════════════════════ */
  const prodDetailOverlay = document.getElementById("prod-detail");
  const prodDetailInner   = document.getElementById("prod-detail-inner");

  function openProdDetail(id) {
    const p = printerData.find(function (x) { return x.id === id; });
    if (!p || !prodDetailInner) return;

    const waText = encodeURIComponent("Hi, I'm interested in the " + p.model + ". Please send me the price.");

    prodDetailInner.innerHTML = `
      <div class="prod-detail-hero">
        <div class="prod-detail-img"><img src="${p.image}" alt="${p.model}"></div>
        <div>
          <div class="prod-brand" style="margin-bottom:6px">${p.brand}</div>
          <h2>${p.model}</h2>
          <p>${p.useCase}</p>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
            <button class="btn-primary js-detail-quote" data-model="${escapeAttr(p.model)}" style="font-size:0.9rem;padding:11px 20px">📋 Get Price Now</button>
            <a href="${WA_BASE}?text=${waText}" target="_blank" rel="noopener" class="btn-wa" style="font-size:0.85rem;padding:11px 18px">💬 WhatsApp</a>
          </div>
        </div>
      </div>
      <div class="prod-detail-body">
        <h3 style="color:var(--blue);margin-bottom:16px">Key Benefits</h3>
        <div class="benefit-grid">
          ${p.benefits.map(function (b) {
            return '<div class="benefit-item"><span>✦</span><p>' + b + '</p></div>';
          }).join("")}
        </div>
        <h3 style="color:var(--blue);margin:20px 0 12px">Best Use Cases</h3>
        <p style="font-size:0.9rem;background:var(--accent);padding:16px;border-radius:10px;color:var(--text)">${p.useCase}</p>
      </div>
    `;

    // Bind the "Get Price Now" button inside the injected HTML
    const quoteBtn = prodDetailInner.querySelector(".js-detail-quote");
    if (quoteBtn) {
      quoteBtn.addEventListener("click", function () {
        closeProdDetail();
        openModal(this.dataset.model);
      });
    }

    if (prodDetailOverlay) {
      prodDetailOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeProdDetail() {
    if (!prodDetailOverlay) return;
    prodDetailOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  window.openProdDetail  = openProdDetail;
  window.closeProdDetail = closeProdDetail;

  if (prodDetailOverlay) {
    prodDetailOverlay.addEventListener("click", function (e) {
      if (e.target === prodDetailOverlay) closeProdDetail();
    });
  }

  const detailCloseBtn = document.querySelector(".detail-close");
  if (detailCloseBtn) {
    detailCloseBtn.addEventListener("click", closeProdDetail);
  }

  /* ════════════════════════════════════════════════
     ESC KEY — close any open overlay
  ════════════════════════════════════════════════ */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (prodDetailOverlay  && prodDetailOverlay.classList.contains("open"))  closeProdDetail();
    if (modalOverlay       && modalOverlay.classList.contains("open"))       closeModal();
    if (scrollPopup        && scrollPopup.classList.contains("open"))        closeScrollPopup();
  });

  /* ════════════════════════════════════════════════
     RENDER PRODUCTS GRID
  ════════════════════════════════════════════════ */
  function renderProducts(filter) {
    filter = filter || "all";
    const grid = document.getElementById("products-grid");
    if (!grid) return;

    const filtered = (filter === "all")
      ? printerData
      : printerData.filter(function (p) { return p.brand.toLowerCase() === filter; });

    grid.innerHTML = filtered.map(function (p) {
      const badge = p.tag
        ? '<div class="prod-badge ' + p.badgeType + '">' + p.tag + "</div>"
        : "";
      const features = p.features.map(function (f) {
        return "<li>" + f + "</li>";
      }).join("");

      return `
        <div class="prod-card" data-brand="${p.brand.toLowerCase()}" data-id="${p.id}">
          <div class="prod-card-img">
            ${badge}
            <img src="${p.image}" alt="${p.model}">
          </div>
          <div class="prod-card-body">
            <div class="prod-brand">${p.brand}</div>
            <h3>${p.model}</h3>
            <ul class="prod-features">${features}</ul>
            <div class="prod-bestfor">Best for: <span>${p.bestFor}</span></div>
            <div class="prod-card-footer">
              <button class="btn-card-primary js-view-details" data-id="${p.id}">View Details</button>
              <button class="btn-card-ghost js-get-price" data-model="${escapeAttr(p.model)}">Get Price</button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Bind buttons after render (event delegation on grid)
    observeFadeUps(grid);
  }

  // Event delegation on products grid
  const productsGrid = document.getElementById("products-grid");
  if (productsGrid) {
    productsGrid.addEventListener("click", function (e) {
      const viewBtn  = e.target.closest(".js-view-details");
      const priceBtn = e.target.closest(".js-get-price");
      if (viewBtn)  openProdDetail(viewBtn.dataset.id);
      if (priceBtn) openModal(priceBtn.dataset.model);
    });
  }

  /* ════════════════════════════════════════════════
     FILTER TABS
  ════════════════════════════════════════════════ */
  document.querySelectorAll(".filter-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".filter-tab").forEach(function (t) {
        t.classList.remove("active");
      });
      this.classList.add("active");
      const brand = this.dataset.filter || "all";
      renderProducts(brand);
    });
  });

  /* ════════════════════════════════════════════════
     RENDER BROCHURES
  ════════════════════════════════════════════════ */
  function renderBrochures() {
    const grid = document.getElementById("brochure-grid");
    if (!grid) return;

    grid.innerHTML = brochureData.map(function (b) {
      return `
        <div class="brochure-card">
          <div class="brochure-thumb"><img src="${b.image}" alt="${b.name}"></div>
          <div class="brochure-card-body">
            <h4>${b.name}</h4>
            <button class="btn-dl js-brochure-dl" data-name="${escapeAttr(b.name)}" data-file="${b.file}"><svg class="contact-svg" style="width:0.9rem;height:0.9rem;vertical-align:middle;margin-right:4px;" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg> Download Brochure</button>
            <button class="btn-enq js-brochure-enq" data-name="${escapeAttr(b.name)}">Enquire Now</button>
          </div>
        </div>
      `;
    }).join("");

    // Delegation
    grid.addEventListener("click", function (e) {
      const dlBtn  = e.target.closest(".js-brochure-dl");
      const enqBtn = e.target.closest(".js-brochure-enq");
      if (dlBtn) {
        const file = dlBtn.dataset.file;
        if (file && file !== "#") {
          window.open(file, "_blank");
        } else {
          showToast("Brochure link will be sent to your WhatsApp!");
          openModal(dlBtn.dataset.name + " – Brochure Request");
        }
      }
      if (enqBtn) {
        openModal(enqBtn.dataset.name);
      }
    });
  }

  /* ════════════════════════════════════════════════
     SERVICE CARDS — "Talk to Expert" / service links
  ════════════════════════════════════════════════ */
  document.querySelectorAll(".serv-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      // If it's just "#contact", open modal instead for faster conversion
      if (href === "#contact") {
        e.preventDefault();
        const serviceTitle = this.closest(".serv-card").querySelector("h3");
        openModal(serviceTitle ? serviceTitle.textContent : "Service Enquiry");
      }
    });
  });

  /* ════════════════════════════════════════════════
     PC CARD BUTTONS — event delegation
  ════════════════════════════════════════════════ */
  document.querySelectorAll(".pc-card").forEach(function (card) {
    card.querySelectorAll("button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const headingEl = card.querySelector("h3");
        const label     = headingEl ? headingEl.textContent : "PC / Laptop";
        openModal(label);
      });
    });
  });

  /* ════════════════════════════════════════════════
     WHATSAPP LINKS — ensure all use correct number
  ════════════════════════════════════════════════ */
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    const url    = new URL(a.href);
    const text   = url.searchParams.get("text") || "Hi, I'm interested in your products.";
    a.href = WA_BASE + "?text=" + encodeURIComponent(text);
    a.setAttribute("rel", "noopener noreferrer");
  });

  /* ════════════════════════════════════════════════
     HERO CTA — "Explore Products" scrolls to products
  ════════════════════════════════════════════════ */
  document.querySelectorAll('a[href="#products"]').forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToSection("products");
    });
  });

  /* ════════════════════════════════════════════════
     FADE-UP INTERSECTION OBSERVER
  ════════════════════════════════════════════════ */
  function observeFadeUps(root) {
    root = root || document;
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // fire once
        }
      });
    }, { threshold: 0.10 });

    root.querySelectorAll(".fade-up:not(.visible)").forEach(function (el) {
      obs.observe(el);
    });
  }

  /* ════════════════════════════════════════════════
     FLOATING CTA BUTTONS
  ════════════════════════════════════════════════ */
  const floatQuote = document.querySelector(".float-quote");
  if (floatQuote) {
    floatQuote.addEventListener("click", function (e) {
      e.preventDefault();
      openModal("General Enquiry");
    });
  }

  /* ════════════════════════════════════════════════
     NAV "Get Quote" button
  ════════════════════════════════════════════════ */
  const navCtaBtn = document.querySelector(".nav-cta");
  if (navCtaBtn) {
    navCtaBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal("General Enquiry");
    });
  }

  /* ════════════════════════════════════════════════
     ACTIVE NAV STYLE (CSS class)
  ════════════════════════════════════════════════ */
  const styleTag = document.createElement("style");
  styleTag.textContent = ".nav-links a.nav-active{background:rgba(255,255,255,0.18);color:#fff!important;}";
  document.head.appendChild(styleTag);

  /* ════════════════════════════════════════════════
     HELPER — escape attribute values
  ════════════════════════════════════════════════ */
  function escapeAttr(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* ════════════════════════════════════════════════
     CLIENT FILTERING
  ════════════════════════════════════════════════ */
  window.filterClients = function (category) {
    const cards = document.querySelectorAll(".client-card");
    const buttons = document.querySelectorAll(".category-btn");

    // Update active button state
    buttons.forEach(function (btn) {
      const isMatch = btn.getAttribute("onclick").includes("'" + category + "'");
      btn.classList.toggle("active", isMatch);
    });

    // Apply filtering with a small delay for smoother feel
    cards.forEach(function (card) {
      if (category === "all" || card.dataset.cat === category) {
        card.style.display = "flex";
        setTimeout(() => { card.style.opacity = "1"; card.style.transform = "translateY(0)"; }, 10);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";
        setTimeout(() => { card.style.display = "none"; }, 300);
      }
    });
  };

  /* ════════════════════════════════════════════════
     INIT
  ════════════════════════════════════════════════ */
  renderProducts("all");
  renderBrochures();
  observeFadeUps();

  console.log("[PrintPro] ✅ All JS initialised successfully.");

}); // end DOMContentLoaded
