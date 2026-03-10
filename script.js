// ============================================================
//  MSEED — script.js  (Firebase v10 Modular SDK — FIXED)
//  ➤  Delete the old script.js and replace with this file.
//  ➤  In index.html change:
//       <script src="script.js" defer></script>
//     to:
//       <script type="module" src="script.js" defer></script>
// ============================================================

// ── FIREBASE v10 IMPORTS ─────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ── FIREBASE CONFIG  ← paste YOUR values from Firebase Console ─
const firebaseConfig = {
  apiKey: "AIzaSyCWugNDmUVftJRSEJFKcUCUHkDBqY0bjOw",
  authDomain: "mseed-2c18c.firebaseapp.com",
  projectId: "mseed-2c18c",
  storageBucket: "mseed-2c18c.firebasestorage.app",
  messagingSenderId: "992641282727",
  appId: "1:992641282727:web:364ba74e46b3e83dc8e182",
};

// ── INIT ─────────────────────────────────────────────────────
console.log("[Firebase] 🔄 Initialising app…");
let app, db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  console.log("[Firebase] ✅ App + Firestore ready.");
} catch (err) {
  console.error("[Firebase] ❌ Init failed:", err);
}

// ── HELPER — expose functions needed by inline onclick attrs ──
function expose(name, fn) {
  window[name] = fn;
}

// ============================================================
//  LOGO LOADER
// ============================================================
var LOGO_SRC = "https://res.cloudinary.com/drlg1t6pk/image/upload/v1771854440/1_1_p0yx8f.png";

function setLogos() {
  document.querySelectorAll('img[alt="MSEED"]').forEach(function (img) {
    img.src = LOGO_SRC;
    img.style.display = 'block';
  });

  var navLogo = document.querySelector('.navbar-logo');
  if (navLogo) {
    var navImg = navLogo.querySelector('img');
    if (!navImg) {
      navLogo.innerHTML = '<img src="' + LOGO_SRC + '" alt="MSEED" style="height:44px;width:auto;object-fit:contain;">';
    } else {
      navImg.src = LOGO_SRC;
      navImg.style.height = '44px';
      navImg.style.width = 'auto';
      navImg.style.objectFit = 'contain';
    }
  }

  var splashLogo = document.querySelector('.splash-logo');
  if (splashLogo) {
    var splashImg = splashLogo.querySelector('img');
    if (!splashImg) {
      var newImg = document.createElement('img');
      newImg.src = LOGO_SRC;
      newImg.alt = 'MSEED';
      newImg.style.cssText = 'width:280px;height:auto;object-fit:contain;';
      splashLogo.insertBefore(newImg, splashLogo.firstChild);
    } else {
      splashImg.src = LOGO_SRC;
    }
  }

  var footerBrand = document.querySelector('.footer-brand');
  if (footerBrand) {
    var footerImg = footerBrand.querySelector('img');
    if (!footerImg) {
      var fImg = document.createElement('img');
      fImg.src = LOGO_SRC;
      fImg.alt = 'MSEED';
      fImg.style.cssText = 'height:48px;width:auto;object-fit:contain;margin-bottom:16px;';
      footerBrand.insertBefore(fImg, footerBrand.firstChild);
    } else {
      footerImg.src = LOGO_SRC;
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setLogos);
} else {
  setLogos();
}

window.addEventListener('DOMContentLoaded', function () {
  setTimeout(setLogos, 100);
  const urlParams = new URLSearchParams(window.location.search);
  const portalQuery = urlParams.get('portal');
  if (portalQuery) {
    if (typeof navigate === 'function') navigate(portalQuery);
  }
});

// ============================================================
//  NAVIGATION
// ============================================================
const pages = ['portal', 'mseed', 'college-student', 'institution', 'inst-partners', 'inst-ev', 'junior', 'junior-student', 'school-inst'];

function navigate(page) {
  pages.forEach(p => {
    const el = document.getElementById('page-' + p);
    if (el) el.classList.remove('active');
  });
  ['mseed-portal-select', 'junior-portal-select'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });

  if (page === 'portal') {
    document.getElementById('page-portal').classList.add('active');
  } else if (page === 'mseed') {
    document.getElementById('page-mseed').classList.add('active');
    document.getElementById('mseed-portal-select').style.display = 'block';
  } else if (page === 'college-student') {
    document.getElementById('page-college-student').classList.add('active');
    showTab('home');
  } else if (page === 'institution') {
    document.getElementById('page-institution').classList.add('active');
    setTimeout(initInstitutionPortal, 100);
  } else if (page === 'inst-partners') {
    const el = document.getElementById('page-inst-partners');
    if (el) { el.classList.add('active'); setTimeout(() => { initPartnersSection(); }, 150); }
  } else if (page === 'inst-ev') {
    const el = document.getElementById('page-inst-ev');
    if (el) el.classList.add('active');
  } else if (page === 'junior') {
    document.getElementById('page-junior').classList.add('active');
    document.getElementById('junior-portal-select').style.display = 'block';
  } else if (page === 'junior-student') {
    document.getElementById('page-junior-student').classList.add('active');
    showJrTab('jrhome');
  } else if (page === 'school-inst') {
    document.getElementById('page-school-inst').classList.add('active');
    showSchTab('schservices');
  }
  window.scrollTo(0, 0);
}
expose('navigate', navigate);

function openPartnershipsPage() { navigate('inst-partners'); }
expose('openPartnershipsPage', openPartnershipsPage);

// ============================================================
//  TAB SYSTEM
// ============================================================
let autoEnrollTimer = null;
let autoEnrollShown = false;

function triggerAutoEnroll() {
  if (autoEnrollShown) return;
  autoEnrollShown = true;
  const form = document.getElementById('auto-enroll-step-form');
  const success = document.getElementById('auto-enroll-step-success');
  if (form) form.classList.remove('hidden');
  if (success) success.classList.add('hidden');
  openModal('modal-auto-enroll');
}
expose('triggerAutoEnroll', triggerAutoEnroll);

function showTab(tab) {
  if (tab !== 'home' && autoEnrollTimer) clearTimeout(autoEnrollTimer);

  document.querySelectorAll('#page-college-student .tab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('#page-college-student .nav-link').forEach(l => l.classList.remove('active'));

  const target = document.getElementById('tab-' + tab);
  if (target) target.classList.remove('hidden');

  document.querySelectorAll('#page-college-student .nav-link').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + tab + "'")) l.classList.add('active');
  });

  if (tab === 'about') renderAboutSection();
  if (tab === 'home') {
    if (!autoEnrollShown) {
      if (autoEnrollTimer) clearTimeout(autoEnrollTimer);
      autoEnrollTimer = setTimeout(triggerAutoEnroll, 60000);
    }
    renderHomeCourses();
    renderPlacementSection();
    setTimeout(initHeroCarousel, 80);
    animateStats();
  }
  if (tab === 'courses') { currentCourseFilter = 'all'; renderCourses(); }
  if (tab === 'resources') renderResources();
  if (tab === 'games') renderGames();
  if (tab === 'precourses') { currentPreCourseFilter = 'all'; renderPreCourses(); }
  window.scrollTo(0, 0);
}
expose('showTab', showTab);

function showInstTab(tab) {
  document.querySelectorAll('#page-institution .inst-tab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('#page-institution .inst-nav-link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById(tab);
  if (target) target.classList.remove('hidden');
  document.querySelectorAll('#page-institution .inst-nav-link').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + tab + "'")) l.classList.add('active');
  });
  if (tab === 'inst-tab-about') renderAboutSection();
  window.scrollTo(0, 0);
}
expose('showInstTab', showInstTab);

function showJrTab(tab) {
  document.querySelectorAll('#page-junior-student .jrtab-content').forEach(t => {
    t.classList.add('hidden');
    t.style.display = 'none';
  });
  const mainSections = ['#courses', '#practice', '#zen', '#roadmaps', '#trends', '#scholarships', '#mentors', '#govt', '#career-quiz'];
  if (tab === 'jrabout') {
    mainSections.forEach(sel => {
      const el = document.querySelector('#page-junior-student ' + sel);
      if (el) el.style.display = 'none';
    });
    const target = document.getElementById('jrtab-' + tab);
    if (target) {
      target.classList.remove('hidden');
      target.setAttribute('style', 'display:block !important; padding:48px 24px; max-width:1400px; margin:0 auto;');
    }
    renderAboutSection();
  } else {
    mainSections.forEach(sel => {
      const el = document.querySelector('#page-junior-student ' + sel);
      if (el) el.style.display = '';
    });
    const target = document.getElementById('jrtab-' + tab);
    if (target) { target.classList.remove('hidden'); target.style.display = 'block'; }
  }
  document.querySelectorAll('#page-junior-student .nav-link').forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + tab + "'")) l.classList.add('active');
  });
  window.scrollTo(0, 0);
}
expose('showJrTab', showJrTab);

// ============================================================
//  MOBILE MENUS
// ============================================================
function toggleMobileMenu() { const m = document.getElementById('mobile-menu'); if (m) m.classList.toggle('hidden'); }
function closeMobileMenu() { const m = document.getElementById('mobile-menu'); if (m) m.classList.add('hidden'); }
function toggleInstMobileMenu() { const m = document.getElementById('inst-mobile-menu'); if (m) m.classList.toggle('hidden'); }
function closeInstMobileMenu() { const m = document.getElementById('inst-mobile-menu'); if (m) m.classList.add('hidden'); }
function toggleJrMobileMenu() { const m = document.getElementById('jr-mobile-menu'); if (m) m.classList.toggle('hidden'); }
function closeJrMobileMenu() { const m = document.getElementById('jr-mobile-menu'); if (m) m.classList.add('hidden'); }
expose('toggleMobileMenu', toggleMobileMenu);
expose('closeMobileMenu', closeMobileMenu);
expose('toggleInstMobileMenu', toggleInstMobileMenu);
expose('closeInstMobileMenu', closeInstMobileMenu);
expose('toggleJrMobileMenu', toggleJrMobileMenu);
expose('closeJrMobileMenu', closeJrMobileMenu);

// ============================================================
//  GSAP SPLASH INTRO
// ============================================================
(function () {
  const overlay = document.getElementById('splash');
  const logoEl = document.getElementById('intro-logo');
  if (!overlay || !logoEl) return;

  function spawnParticles() {
    for (let i = 0; i < 28; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const angle = Math.random() * 360;
      const radius = Math.random() * 200 + 80;
      const cx = window.innerWidth / 2 + Math.cos(angle * Math.PI / 180) * radius;
      const cy = window.innerHeight / 2 + Math.sin(angle * Math.PI / 180) * radius;
      p.style.cssText = `position:absolute;border-radius:50%;pointer-events:none;width:${size}px;height:${size}px;left:${cx}px;top:${cy}px;background:${Math.random() > 0.5 ? '#00b17b' : 'rgba(0,177,123,0.4)'};box-shadow:0 0 ${size * 3}px rgba(0,177,123,0.5);opacity:0;`;
      overlay.appendChild(p);
      gsap.to(p, { opacity: Math.random() * 0.7 + 0.3, duration: Math.random() * 0.6 + 0.3, delay: Math.random() * 0.4 + 0.5, yoyo: true, repeat: 1, ease: 'sine.inOut', onComplete: () => p.remove() });
    }
  }

  function runIntro() {
    overlay.style.backgroundImage = 'linear-gradient(rgba(0,177,123,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,177,123,0.04) 1px,transparent 1px)';
    overlay.style.backgroundSize = '60px 60px';
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl
      .to('#intro-glow', { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }, 0)
      .to('.corner-tl', { opacity: 1, duration: 0.5 }, 0.10)
      .to('.corner-tr', { opacity: 1, duration: 0.5 }, 0.15)
      .to('.corner-bl', { opacity: 1, duration: 0.5 }, 0.20)
      .to('.corner-br', { opacity: 1, duration: 0.5 }, 0.25)
      .to('#orbit-3', { opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }, 0.30)
      .to('#orbit-2', { opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }, 0.45)
      .to('#orbit-1', { opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }, 0.60)
      .to('#orbit-1 .orbit-dot', { opacity: 1, duration: 0.3 }, 0.70)
      .to('#orbit-2 .orbit-dot', { opacity: 1, duration: 0.3 }, 0.80)
      .to('#orbit-3 .orbit-dot', { opacity: 1, duration: 0.3 }, 0.90)
      .to('#intro-progress-wrap', { opacity: 1, duration: 0.4 }, 0.60)
      .to('#intro-logo', { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.8)', onStart: spawnParticles }, 0.75)
      .to('#intro-logo', { filter: 'drop-shadow(0 0 28px rgba(0,177,123,0.7)) drop-shadow(0 0 60px rgba(0,177,123,0.35))', duration: 0.4, ease: 'power2.out' }, 1.30)
      .to('#intro-line', { width: 160, opacity: 1, duration: 0.6, ease: 'power3.inOut' }, 1.50)
      .to('#intro-tagline', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.80)
      .to('#intro-scan', { opacity: 1, x: '220%', duration: 1.2, ease: 'power2.inOut' }, 1.60)
      .to('#intro-progress-fill', {
        width: '100%', duration: 1.8, ease: 'power1.inOut',
        onUpdate: function () {
          const pct = Math.round(this.progress() * 100);
          document.getElementById('intro-pct').textContent = pct + '%';
        }
      }, 1.0);

    gsap.to('#orbit-1', { rotation: 360, duration: 8, repeat: -1, ease: 'none', transformOrigin: 'center center' });
    gsap.to('#orbit-2', { rotation: -360, duration: 14, repeat: -1, ease: 'none', transformOrigin: 'center center' });
    gsap.to('#orbit-3', { rotation: 360, duration: 20, repeat: -1, ease: 'none', transformOrigin: 'center center' });
    gsap.to('#intro-logo', { y: -8, duration: 2.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });

    const exitTl = gsap.timeline({ delay: 3.4 });
    exitTl
      .to('#intro-logo', { scale: 1.15, filter: 'drop-shadow(0 0 60px rgba(0,177,123,1)) drop-shadow(0 0 120px rgba(0,177,123,0.6)) brightness(1.3)', duration: 0.35, ease: 'power2.in' })
      .to(['#intro-tagline', '#intro-line', '#intro-progress-wrap', '.orbit-ring', '.corner'], { opacity: 0, duration: 0.3, stagger: 0.03 }, '<')
      .to('#intro-logo', { y: -80, scale: 0.3, opacity: 0, duration: 0.55, ease: 'power3.in' }, '+=0.05')
      .to('#intro-glow', { scale: 3, opacity: 0, duration: 0.5, ease: 'power2.in' }, '<')
      .to('#splash', { opacity: 0, duration: 0.45, ease: 'power2.inOut', onComplete() { overlay.style.display = 'none'; navigate('portal'); } }, '-=0.2');
  }

  if (logoEl.complete) { runIntro(); }
  else { logoEl.addEventListener('load', runIntro); logoEl.addEventListener('error', runIntro); }
})();

// ============================================================
//  STATS ANIMATION
// ============================================================
let statsAnimated = false;
function animateStats() {
  if (statsAnimated) return;
  statsAnimated = true;
  const targets = [
    { id: 'stat1', end: 50000, suffix: '+' },
    { id: 'stat2', end: 85, suffix: '%' },
    { id: 'stat3', end: 200, suffix: '+' },
    { id: 'stat4', end: 80, suffix: '+' },
    { id: 'stat5', end: 500, suffix: '+' },
  ];
  targets.forEach(({ id, end, suffix }) => {
    const el = document.getElementById(id);
    if (!el) return;
    let start = 0;
    const duration = 1800;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, end);
      el.textContent = (start >= 1000 ? Math.round(start / 1000) + 'K' : Math.round(start)) + suffix;
      if (start >= end) clearInterval(timer);
    }, 16);
  });
}
expose('animateStats', animateStats);

// ============================================================
//  COURSES DATA
// ============================================================
const freeCourses = [
  { title: 'Web Dev Foundations', emoji: '🌐', desc: 'HTML, CSS & basic JavaScript — build your first webpage. Zero to deployed in 2 weeks.', duration: '2 Weeks', level: 'Beginner', depts: ['free', 'cse', 'it'], isFree: true },
  { title: 'Python Basics', emoji: '🐍', desc: 'Learn Python syntax, loops, functions, and basic projects. The best first programming language.', duration: '2 Weeks', level: 'Beginner', depts: ['free', 'cse', 'it'], isFree: true },
  { title: 'Resume Writing 101', emoji: '📄', desc: "Craft an ATS-ready resume from scratch. Understand keywords, formatting, and the do's and don'ts.", duration: '1 Week', level: 'Beginner', depts: ['free', 'cse', 'it', 'ece', 'eee', 'mech'], isFree: true },
  { title: 'Excel for Beginners', emoji: '📊', desc: 'Master Excel basics — formulas, charts, pivot tables. Essential for any career path.', duration: '1 Week', level: 'Beginner', depts: ['free', 'cse', 'it', 'mech', 'eee'], isFree: true },
];

const mainCourses = [
  { title: 'Web Development', depts: ['cse', 'it'], emoji: '🌐', desc: 'Full-stack mastery using modern frameworks.', duration: '12 Weeks', level: 'Intermediate' },
  { title: 'Cyber Security', depts: ['cse', 'it'], emoji: '🛡️', desc: 'Ethical hacking and network defense strategies.', duration: '10 Weeks', level: 'Advanced' },
  { title: 'UI & UX', depts: ['cse', 'it'], emoji: '🎨', desc: 'User-centric design and prototyping with Figma.', duration: '8 Weeks', level: 'Beginner' },
  { title: 'Networking & CCNA', depts: ['cse', 'it', 'ece'], emoji: '🔌', desc: 'Cisco certified network associate training.', duration: '10 Weeks', level: 'Intermediate' },
  { title: 'IoT', depts: ['cse', 'it'], emoji: '📡', desc: 'Connecting the physical world with smart devices.', duration: '12 Weeks', level: 'Intermediate' },
  { title: 'Deep Learning & Gen AI', depts: ['cse', 'it'], emoji: '🤖', desc: 'Neural networks and Large Language Models.', duration: '14 Weeks', level: 'Advanced' },
  { title: 'Data Analytics & Science', depts: ['cse', 'it'], emoji: '📊', desc: 'Statistical modeling and big data insights.', duration: '16 Weeks', level: 'Advanced' },
  { title: 'Cloud Computing', depts: ['cse', 'it'], emoji: '☁️', desc: 'AWS/Azure infrastructure and deployment.', duration: '10 Weeks', level: 'Intermediate' },
  { title: 'AI & ML', depts: ['cse', 'it'], emoji: '🧠', desc: 'Foundational machine learning algorithms.', duration: '12 Weeks', level: 'Intermediate' },
  { title: 'Antenna Design', depts: ['ece'], emoji: '📡', desc: 'RF engineering and electromagnetic simulation.', duration: '10 Weeks', level: 'Advanced' },
  { title: 'Embedded Systems', depts: ['ece'], emoji: '📟', desc: 'Microcontroller programming and architecture.', duration: '12 Weeks', level: 'Intermediate' },
  { title: 'PCB Design & Fab', depts: ['ece'], emoji: '📐', desc: 'Hardware design and manufacturing processes.', duration: '8 Weeks', level: 'Beginner' },
  { title: 'Robotics', depts: ['ece', 'mech'], emoji: '🤖', desc: 'Mechatronics and automated system design.', duration: '14 Weeks', level: 'Intermediate' },
  { title: 'IoT & Energy Monitoring', depts: ['eee'], emoji: '🔋', desc: 'Smart metering and grid power management.', duration: '10 Weeks', level: 'Intermediate' },
  { title: 'BMS', depts: ['eee'], emoji: '🏢', desc: 'Building Management Systems & Automation.', duration: '8 Weeks', level: 'Beginner' },
  { title: 'Electrical Safety', depts: ['eee'], emoji: '⚠️', desc: 'Compliance and safety standards for industry.', duration: '6 Weeks', level: 'Beginner' },
  { title: 'EV Technology', depts: ['eee', 'mech'], emoji: '⚡', desc: 'Electric vehicle powertrain and battery tech.', duration: '12 Weeks', level: 'Advanced' },
  { title: 'Industrial Automation', depts: ['eee', 'mech'], emoji: '🏭', desc: 'PLC, SCADA, and manufacturing workflows.', duration: '10 Weeks', level: 'Advanced' },
  { title: 'Power Electronics', depts: ['eee'], emoji: '⚡', desc: 'Power conversion and semiconductor devices.', duration: '12 Weeks', level: 'Advanced' },
  { title: 'Smart Grid Tech', depts: ['eee'], emoji: '🌐', desc: 'Modern power distribution and networking.', duration: '10 Weeks', level: 'Intermediate' },
  { title: '3D Printing', depts: ['mech'], emoji: '🖨️', desc: 'Additive manufacturing and rapid prototyping.', duration: '8 Weeks', level: 'Beginner' },
  { title: 'CAD, CAM, CAE', depts: ['mech'], emoji: '📐', desc: 'Computer-aided design and engineering analysis.', duration: '16 Weeks', level: 'Intermediate' },
  { title: 'CNC Programming', depts: ['mech'], emoji: '⚙️', desc: 'Precision manufacturing and toolpathing.', duration: '10 Weeks', level: 'Intermediate' },
  { title: 'EV Design & Dynamics', depts: ['mech'], emoji: '🏎️', desc: 'Vehicle dynamics and structural chassis design.', duration: '14 Weeks', level: 'Advanced' },
];

const bundleCourses = [
  { title: 'Full Stack Developer Bundle', emoji: '🚀', courses: ['Web Development', 'Cloud Computing', 'UI & UX', 'Cyber Security'], desc: 'End-to-end web development — from design to deployment.', duration: '40 Weeks', level: 'Intermediate', originalPrice: '₹24,000', bundlePrice: '₹14,999', depts: ['bundle', 'cse', 'it'], isBundle: true },
  { title: 'Data Analyst Pro Bundle', emoji: '📊', courses: ['Data Analytics & Science', 'AI & ML', 'Deep Learning & Gen AI'], desc: 'Complete data career path from analytics to AI.', duration: '32 Weeks', level: 'Advanced', originalPrice: '₹18,000', bundlePrice: '₹10,999', depts: ['bundle', 'cse', 'it'], isBundle: true },
  { title: 'EV & Automation Bundle', emoji: '⚡', courses: ['EV Technology', 'Industrial Automation', 'CAD, CAM, CAE'], desc: 'Future-ready mechanical & EEE bundle.', duration: '32 Weeks', level: 'Advanced', originalPrice: '₹16,000', bundlePrice: '₹9,999', depts: ['bundle', 'mech', 'eee'], isBundle: true },
  { title: 'Cyber & Network Security Bundle', emoji: '🛡️', courses: ['Cyber Security', 'Networking & CCNA', 'Cloud Computing', 'IoT'], desc: 'Comprehensive security and infrastructure bundle.', duration: '38 Weeks', level: 'Advanced', originalPrice: '₹20,000', bundlePrice: '₹12,999', depts: ['bundle', 'cse', 'it', 'ece'], isBundle: true },
  { title: 'Embedded & Hardware Bundle', emoji: '📟', courses: ['Embedded Systems', 'PCB Design & Fab', 'IoT', 'Robotics'], desc: 'Complete hardware stack for ECE students.', duration: '44 Weeks', level: 'Intermediate', originalPrice: '₹22,000', bundlePrice: '₹13,999', depts: ['bundle', 'ece'], isBundle: true },
  { title: 'Smart Power Systems Bundle', emoji: '🔋', courses: ['Power Electronics', 'Smart Grid Tech', 'IoT & Energy Monitoring', 'EV Technology'], desc: 'Future-ready EEE bundle targeting smart grid and power electronics.', duration: '40 Weeks', level: 'Advanced', originalPrice: '₹20,000', bundlePrice: '₹12,499', depts: ['bundle', 'eee'], isBundle: true },
];

const courses = [...freeCourses, ...mainCourses, ...bundleCourses];

// ============================================================
//  COURSE FILTER & RENDER
// ============================================================
let currentCourseFilter = 'all';

function filterCourses(dept, btn) {
  currentCourseFilter = dept;
  document.querySelectorAll('.dept-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderCourses();
}
expose('filterCourses', filterCourses);

function renderCourses() {
  const el = document.getElementById('all-courses');
  if (!el) return;
  let filtered = courses;
  if (currentCourseFilter === 'bundle') {
    filtered = courses.filter(c => c.depts && c.depts.includes('bundle'));
  } else if (currentCourseFilter === 'free') {
    filtered = courses.filter(c => c.isFree);
  } else if (currentCourseFilter !== 'all') {
    filtered = courses.filter(c => c.depts && c.depts.includes(currentCourseFilter) && !c.isFree && !c.isBundle);
  }
  el.innerHTML = filtered.map(c => {
    const bgStyle = c.isFree ? 'background:linear-gradient(135deg,#1a2420,var(--green))' : c.isBundle ? 'background:linear-gradient(135deg,#0a1628,#004d36)' : 'background:linear-gradient(135deg,var(--green),#00c98c)';
    const badge = c.isFree ? '<span class="free-badge">🆓 FREE</span>' : c.isBundle ? '<span class="dept-tag">📦 Bundle</span>' : '';
    const priceRow = c.isBundle ? `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="font-size:13px;text-decoration:line-through;color:var(--grey-light)">${c.originalPrice}</span><span style="font-size:16px;font-weight:900;color:var(--green)">${c.bundlePrice}</span></div><div style="font-size:11px;color:var(--grey-mid);margin-bottom:6px">Includes: ${c.courses ? c.courses.join(' · ') : ''}</div>` : '';
    const btnLabel = c.isFree ? '🎓 Enroll Free →' : c.isBundle ? '📦 Get Bundle →' : 'Enroll Now →';
    const btnClass = c.isFree ? 'btn btn-outline' : 'btn btn-primary';
    return `
      <div class="course-card">
        <div class="course-card-img" style="${bgStyle}">
          <img src="https://res.cloudinary.com/dn6ljz4uo/image/upload/v1773125245/cloud_computing_dunn5i.jpg" alt="Course Icon" class="course-icon-img">
          ${badge}
        </div>
        <div class="course-card-body">
          <h3>${c.title}</h3>${priceRow}<p>${c.desc}</p>
          <div class="course-meta"><span class="duration">⏱ ${c.duration}</span><span class="course-level level-${(c.level || 'beginner').toLowerCase()}">${c.level}</span></div>
          <div style="display:flex;gap:8px;margin-top:16px;">
            <button class="btn btn-outline" style="flex:1;justify-content:center;font-size:13px;padding:10px 0;" onclick="openSyllabusModal('${c.title.replace(/'/g, "\\'")}',${!!c.isFree})">Syllabus</button>
            <button class="${btnClass}" style="flex:1;justify-content:center;font-size:13px;padding:10px 0;" onclick="openEnrollModal('${c.title.replace(/'/g, "\\'")}')"> ${btnLabel}</button>
          </div>
        </div>
      </div>`;
  }).join('');
}
expose('renderCourses', renderCourses);

function renderHomeCourses() {
  const home = document.getElementById('home-courses');
  if (!home || home.children.length > 0) return;
  const featured = [...courses.filter(c => c.isFree).slice(0, 1), ...courses.filter(c => !c.isFree && !c.isBundle).slice(0, 2)];
  home.innerHTML = featured.map(c => `
    <div class="course-card">
      <div class="course-card-img" style="${c.isFree ? 'background:linear-gradient(135deg,#1a2420,var(--green))' : 'background:linear-gradient(135deg,var(--green),#00c98c)'}">
        <img src="" alt="Course Icon" class="course-icon-img">
        ${c.isFree ? '<span class="free-badge">🆓 FREE</span>' : ''}
      </div>
      <div class="course-card-body">
        <h3>${c.title}</h3><p>${c.desc}</p>
        <div class="course-meta"><span class="duration">⏱ ${c.duration}</span><span class="course-level level-${(c.level || 'beginner').toLowerCase()}">${c.level}</span></div>
        <div style="display:flex;gap:8px;margin-top:16px;">
          <button class="btn btn-outline" style="flex:1;justify-content:center;font-size:13px;padding:10px 0;" onclick="openSyllabusModal('${c.title.replace(/'/g, "\\'")}',${!!c.isFree})">Syllabus</button>
          <button class="${c.isFree ? 'btn btn-outline' : 'btn btn-primary'}" style="flex:1;justify-content:center;font-size:13px;padding:10px 0;" onclick="openEnrollModal('${c.title.replace(/'/g, "\\'")}')"> ${c.isFree ? '🎓 Enroll Free →' : 'Enroll Now →'}</button>
        </div>
      </div>
    </div>`).join('');
}
expose('renderHomeCourses', renderHomeCourses);

// ============================================================
//  SYLLABUS MODAL
// ============================================================
let currentSyllabusCourse = '';
let currentSyllabusIsFree = false;

function openSyllabusModal(courseName, isFree) {
  currentSyllabusCourse = courseName;
  currentSyllabusIsFree = isFree;
  const modal = document.getElementById('modal-syllabus');
  const title = document.getElementById('syllabus-title');
  const content = document.getElementById('syllabus-roadmap-inject');
  if (title) title.textContent = courseName;
  let roadmapHTML = '<div class="program-timeline">';
  for (let i = 1; i <= 6; i++) {
    roadmapHTML += `<div class="timeline-item"><div class="timeline-dot"></div><h4>Module ${i}: ${['Fundamentals', 'Core Concepts', 'Advanced Techniques', 'Real-world Application', 'Project Work', 'Final Assessment'][i - 1]}</h4><p style="color:var(--grey-mid);font-size:14px;margin-top:6px;line-height:1.6;">Detailed breakdown of everything covered in this section. Includes hands-on exercises, quizzes, and practical assignments.</p></div>`;
  }
  roadmapHTML += '</div><div style="height:120px;display:flex;align-items:center;justify-content:center;color:var(--grey-light);font-size:12px;">End of Syllabus</div>';
  if (content) content.innerHTML = roadmapHTML;
  const scrollArea = document.getElementById('syllabus-content');
  if (scrollArea) { scrollArea.scrollTop = 0; scrollArea.dataset.autoTriggered = ''; }
  if (modal) modal.classList.remove('hidden');
}
expose('openSyllabusModal', openSyllabusModal);

function checkSyllabusScroll(el) {
  if (!el) return;
  const pct = el.scrollTop / (el.scrollHeight - el.clientHeight);
  if (pct > 0.5 && !el.dataset.autoTriggered) {
    el.dataset.autoTriggered = 'true';
    setTimeout(() => triggerSyllabusEnroll(), 400);
  }
}
expose('checkSyllabusScroll', checkSyllabusScroll);

function triggerSyllabusEnroll() {
  closeModal('modal-syllabus');
  openEnrollModal(currentSyllabusCourse);
}
expose('triggerSyllabusEnroll', triggerSyllabusEnroll);

// ============================================================
//  RESOURCES
// ============================================================
const resources = [
  { icon: '📄', title: 'Ultimate Resume Templates Pack', desc: '12 ATS-optimized resume templates for different industries', type: 'PDF', size: '2.4 MB' },
  { icon: '💡', title: 'Interview Questions Bank – 2024', desc: '500+ interview questions with model answers', type: 'PDF', size: '4.1 MB' },
  { icon: '🔢', title: 'Aptitude Mastery Workbook', desc: 'Quantitative, logical reasoning and verbal ability practice', type: 'PDF', size: '3.8 MB' },
  { icon: '💼', title: 'LinkedIn Profile Optimization', desc: 'Step-by-step guide to create a recruiter-magnetic LinkedIn', type: 'PDF', size: '1.2 MB' },
  { icon: '🗣️', title: 'GD Topics with Analysis – 2024', desc: '100 current affairs GD topics with structuring framework', type: 'PDF', size: '2.1 MB' },
  { icon: '📊', title: 'Excel for Working Professionals', desc: '100 formulas, pivot tables, dashboards with practice files', type: 'PDF', size: '5.3 MB' },
  { icon: '🤖', title: 'AI Tools for Career Growth', desc: 'ChatGPT, Canva AI, Copilot and more for job search', type: 'PDF', size: '1.8 MB' },
  { icon: '📧', title: 'Professional Email Templates', desc: '50 ready-to-use email templates for job applications', type: 'PDF', size: '0.8 MB' },
];

function renderResources() {
  const el = document.getElementById('resources-list');
  if (!el || el.children.length > 0) return;
  el.innerHTML = resources.map(r => `
    <div class="resource-card">
      <div class="resource-icon">${r.icon}</div>
      <div class="resource-info"><h4>${r.title}</h4><p>${r.desc}</p></div>
      <div class="resource-meta">
        <span class="pdf-badge">${r.type} · ${r.size}</span>
        <button class="btn btn-outline" style="padding:8px 16px;font-size:13px" onclick="showToast('📥 Downloading: ${r.title.split(' ').slice(0, 3).join(' ')}...','success')">Download</button>
      </div>
    </div>`).join('');
}
expose('renderResources', renderResources);

// ============================================================
//  PRE-RECORDED COURSES
// ============================================================
const preCoursesData = [...freeCourses, ...mainCourses];
let currentPreCourseFilter = 'all';

function filterPreCourses(dept, btn) {
  currentPreCourseFilter = dept;
  document.querySelectorAll('#precourse-dept-filter .dept-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderPreCourses();
}
expose('filterPreCourses', filterPreCourses);

function renderPreCourses() {
  const el = document.getElementById('all-precourses');
  if (!el) return;
  let filtered = preCoursesData;
  if (currentPreCourseFilter === 'free') filtered = preCoursesData.filter(c => c.isFree);
  else if (currentPreCourseFilter !== 'all') filtered = preCoursesData.filter(c => c.depts && c.depts.includes(currentPreCourseFilter));
  el.innerHTML = filtered.map(c => {
    const safeTitle = c.title ? c.title.replace(/'/g, "\\'") : '';
    return `
      <div class="course-card">
        <div class="course-card-video" style="position:relative;width:100%;height:180px;background:#000;border-radius:var(--radius) var(--radius) 0 0;overflow:hidden;">
          <video controls preload="none" style="width:100%;height:100%;object-fit:cover;" onended="openEnrollModal('${safeTitle}')" controlsList="nodownload">
            <source src="CLOUDINARY_VIDEO_LINK" type="video/mp4">
          </video>
          ${c.isFree ? '<div style="position:absolute;top:12px;right:12px;z-index:2;pointer-events:none;"><span class="free-badge">🆓 FREE</span></div>' : ''}
          <div style="position:absolute;top:12px;left:12px;z-index:2;font-size:24px;pointer-events:none;display:flex;align-items:center;justify-content:center;width:40px;height:40px;">
            <img src="" alt="Course Icon" class="precourse-icon-img" style="position:absolute;width:100%;height:100%;object-fit:contain;z-index:3;">
          </div>
        </div>
        <div class="course-card-body">
          <h3>${c.title}</h3><p>${c.desc}</p>
          <div class="course-meta"><span class="duration">⏱ ${c.duration}</span><span class="course-level level-${(c.level || 'beginner').toLowerCase()}">${c.level}</span></div>
        </div>
      </div>`;
  }).join('');
}
expose('renderPreCourses', renderPreCourses);

// ============================================================
//  GAMES
// ============================================================
const games = [
  { icon: '🎯', title: 'Career Quiz Blitz', hook: 'Play to Get OFF Price', desc: 'Test your knowledge of career terms, industries and workplace scenarios.', badge: 'Knowledge', action: "openModal('modal-quiz')" },
  { icon: '🏆', title: 'Mock Interview', hook: '', desc: 'Kick Out the Fear. Practice answering tough interview questions.', badge: 'Practice', action: "openModal('modal-interview')" },
  { icon: '⚡', title: 'Aptitude Speed Challenge', hook: '', desc: 'Solve quantitative reasoning problems against the clock.', badge: 'Math & Logic', action: "openModal('modal-aptitude')" },
];

function renderGames() {
  const el = document.getElementById('games-list');
  if (!el || el.children.length > 0) return;
  el.innerHTML = games.map(g => `
    <div class="game-card">
      <div class="game-card-img" style="background:linear-gradient(135deg,rgba(0,177,123,0.12),var(--milk-dark))">${g.icon}</div>
      <div class="game-card-body">
        <div class="game-badge">🎮 ${g.badge}</div>
        <h3 style="margin-bottom:${g.hook ? '4px' : '8px'}">${g.title}</h3>
        ${g.hook ? `<div style="font-size:12px;font-weight:700;color:var(--green);margin-bottom:8px;animation:pulse 2s infinite;">🔥 ${g.hook}</div>` : ''}
        <p>${g.desc}</p>
        <button class="btn btn-primary" style="width:100%;justify-content:center;font-size:13px" onclick="${g.action}">Play Now →</button>
      </div>
    </div>`).join('');
}
expose('renderGames', renderGames);

// ============================================================
//  PLACEMENT SECTION
// ============================================================
const placementStudents = [
  { name: 'Priya Ramesh', initials: 'PR', dept: 'B.Tech CSE, 2024', linkedin: 'https://linkedin.com/in/priyaramesh', before: 'Struggling to get interview calls with a generic resume.', after: 'Placed at TCS as Software Developer with ₹7.5 LPA.', company: 'TCS', salary: '7.5 LPA' },
  { name: 'Arjun Suresh', initials: 'AS', dept: 'B.E. ECE, 2024', linkedin: 'https://linkedin.com/in/arjunsuresh', before: 'No internship. Weak in aptitude. Failed 3 placement drives.', after: 'Joined Infosys as Systems Engineer – ₹6.5 LPA.', company: 'Infosys', salary: '6.5 LPA' },
  { name: 'Sneha Krishnan', initials: 'SK', dept: 'MBA Finance, 2024', linkedin: 'https://linkedin.com/in/snehakrishnan', before: 'No LinkedIn. Resume had zero keywords. Rejected in HR.', after: 'Now at HDFC Bank as Relationship Manager – ₹8 LPA.', company: 'HDFC Bank', salary: '8 LPA' },
  { name: 'Karthik Selvam', initials: 'KS', dept: 'B.Tech Mech, 2023', linkedin: 'https://linkedin.com/in/karthikselvam', before: 'Only knew core subjects. No industry tools.', after: 'Placed at Ola Electric as Design Engineer – ₹9.2 LPA.', company: 'Ola Electric', salary: '9.2 LPA' },
  { name: 'Divya Nair', initials: 'DN', dept: 'B.Sc CS, 2024', linkedin: 'https://linkedin.com/in/divyanair', before: 'From arts background. No technical skills.', after: 'Now at Freshworks as Associate Developer – ₹7 LPA.', company: 'Freshworks', salary: '7 LPA' },
  { name: 'Rahul Murugan', initials: 'RM', dept: 'B.E. EEE, 2024', linkedin: 'https://linkedin.com/in/rahulmurugan', before: 'Low CGPA (6.1). No certifications.', after: 'Placed at Zoho Corp – ₹10.5 LPA.', company: 'Zoho', salary: '10.5 LPA' },
];

function renderPlacementSection() {
  const el = document.getElementById('placement-grid');
  if (!el || el.children.length > 0) return;
  el.innerHTML = placementStudents.map(s => `
    <div class="placement-card">
      <div class="pc-header">
        <div class="pc-avatar">${s.photo ? `<img src="${s.photo}" alt="${s.name}">` : (s.initials || '')}</div>
        <div class="pc-info">
          <div class="pc-name">${s.name}<a href="${s.linkedin}" target="_blank" rel="noopener" class="pc-linkedin">in</a></div>
          <div class="pc-dept">${s.dept}</div>
        </div>
      </div>
      <div class="pc-story">
        <div class="pc-before"><span class="pc-label">Before</span><span>${s.before}</span></div>
        <div class="pc-arrow-row">↓</div>
        <div class="pc-after"><span class="pc-label">After</span><span>${s.after}</span></div>
      </div>
      <div class="pc-footer">
        <div class="pc-logos"><span class="pc-mseed-badge">MSEED</span><span class="pc-company-logo">${s.company}</span></div>
        <div><div class="pc-salary-num">${s.salary}</div><div class="pc-salary-label">Package</div></div>
      </div>
    </div>`).join('');
}
expose('renderPlacementSection', renderPlacementSection);

// ============================================================
//  HERO CAROUSEL
// ============================================================
let hcCurrent = 0;
const HC_TOTAL = 3;
const HC_INTERVAL = 5000;
let hcTimer = null;
let hcProgressInterval = null;
let hcProgress = 0;

function hcGoTo(index) {
  hcCurrent = ((index % HC_TOTAL) + HC_TOTAL) % HC_TOTAL;
  const track = document.getElementById('hc-track');
  if (track) track.style.transform = `translateX(-${hcCurrent * 100}%)`;
  resetHcProgress();
}
function hcNext() { hcGoTo(hcCurrent + 1); }
expose('hcGoTo', hcGoTo);
expose('hcNext', hcNext);

function resetHcProgress() {
  clearInterval(hcProgressInterval);
  hcProgress = 0;
  const fill = document.getElementById('hc-progress');
  if (fill) fill.style.width = '0%';
  hcProgressInterval = setInterval(() => {
    hcProgress += 100 / (HC_INTERVAL / 100);
    if (fill) fill.style.width = Math.min(hcProgress, 100) + '%';
    if (hcProgress >= 100) clearInterval(hcProgressInterval);
  }, 100);
}

function startHcAuto() { clearInterval(hcTimer); hcTimer = setInterval(hcNext, HC_INTERVAL); }

function initHeroCarousel() {
  clearInterval(hcTimer);
  clearInterval(hcProgressInterval);
  hcCurrent = 0;
  const track = document.getElementById('hc-track');
  if (!track) return;
  track.style.transform = 'translateX(0%)';
  resetHcProgress();
  startHcAuto();
  const wrap = document.querySelector('.hero-carousel-wrap');
  if (wrap && !wrap.dataset.swipeReady) {
    wrap.dataset.swipeReady = '1';
    let touchStartX = 0;
    wrap.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    wrap.addEventListener('touchend', e => { if (Math.abs(touchStartX - e.changedTouches[0].clientX) > 50) hcNext(); });
  }
}
expose('initHeroCarousel', initHeroCarousel);

// ============================================================
//  ATS CHECKER
// ============================================================
function setATSMode(mode) {
  const checker = document.getElementById('ats-checker');
  const builder = document.getElementById('ats-builder');
  const tabChecker = document.getElementById('ats-tab-checker');
  const tabBuilder = document.getElementById('ats-tab-builder');
  if (checker) checker.style.display = mode === 'checker' ? 'block' : 'none';
  if (builder) builder.style.display = mode === 'builder' ? 'block' : 'none';
  if (tabChecker) tabChecker.className = mode === 'checker' ? 'btn btn-primary' : 'btn btn-outline';
  if (tabBuilder) tabBuilder.className = mode === 'builder' ? 'btn btn-primary' : 'btn btn-outline';
}
expose('setATSMode', setATSMode);

function simulateUpload() {
  const uploadSection = document.getElementById('ats-upload-section');
  const loading = document.getElementById('ats-loading');
  const results = document.getElementById('ats-results');
  if (uploadSection) uploadSection.classList.add('hidden');
  if (loading) loading.classList.remove('hidden');
  if (results) results.classList.add('hidden');
  setTimeout(() => {
    if (loading) loading.classList.add('hidden');
    if (results) results.classList.remove('hidden');
    const insights = [
      { type: 'good', icon: '✅', title: 'Strong Action Verbs Detected', text: 'Your resume uses 8+ quantified achievement statements.' },
      { type: 'good', icon: '✅', title: 'Clean, Parseable Format', text: 'Single-column layout ensures smooth ATS parsing.' },
      { type: 'warn', icon: '⚠️', title: 'Missing Key Skill Keywords', text: 'Add skills like "Agile","Scrum","REST API" based on target JD.' },
      { type: 'warn', icon: '⚠️', title: 'Summary Section Too Generic', text: 'Tailor your summary to include role-specific keywords.' },
      { type: 'bad', icon: '❌', title: 'No LinkedIn Profile URL', text: 'Include your LinkedIn URL — increases recruiter engagement by 40%.' },
    ];
    const insightsList = document.getElementById('ats-insights-list');
    if (insightsList) insightsList.innerHTML = insights.map(i => `<div class="insight-item"><div class="insight-icon ${i.type}">${i.icon}</div><div class="insight-text"><h4>${i.title}</h4><p>${i.text}</p></div></div>`).join('');
    const keywords = [
      { name: 'Technical Skills', score: 78 }, { name: 'Soft Skills', score: 65 },
      { name: 'Industry Keywords', score: 54 }, { name: 'Role-Specific Terms', score: 82 },
      { name: 'Quantified Achievements', score: 91 },
    ];
    const keywordBars = document.getElementById('keyword-bars');
    if (keywordBars) keywordBars.innerHTML = keywords.map(k => `
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
          <span>${k.name}</span>
          <span style="font-weight:700;color:${k.score >= 70 ? 'var(--green)' : k.score >= 50 ? '#F57F17' : '#c62828'}">${k.score}%</span>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${k.score}%;background:${k.score >= 70 ? 'linear-gradient(90deg,var(--green),#00c98c)' : k.score >= 50 ? 'linear-gradient(90deg,#F57F17,#FFB74D)' : 'linear-gradient(90deg,#e53935,#ef5350)'}"></div></div>
      </div>`).join('');
  }, 3500);
}
expose('simulateUpload', simulateUpload);

// ============================================================
//  RESUME BUILDER
// ============================================================
let currentStep = 2;
function goBuilderStep(step) {
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById('builder-step-' + i);
    if (el) el.classList.add('hidden');
  }
  const target = document.getElementById('builder-step-' + step);
  if (target) target.classList.remove('hidden');
  currentStep = step;
  document.querySelectorAll('.builder-step').forEach((s, i) => {
    s.className = 'builder-step';
    if (i + 1 < step) s.classList.add('done');
    else if (i + 1 === step) s.classList.add('active');
  });
}
expose('goBuilderStep', goBuilderStep);

function updatePreview() {
  const val = id => document.getElementById(id)?.value || '';
  const el = id => document.getElementById(id);
  const fname = val('rb-fname'), lname = val('rb-lname');
  if (el('prev-name')) el('prev-name').textContent = (fname || lname) ? `${fname} ${lname}`.trim() : 'Your Name';
  if (el('prev-contact')) el('prev-contact').textContent = [val('rb-email'), val('rb-phone'), val('rb-linkedin')].filter(Boolean).join(' | ') || 'email | phone | linkedin';
  if (el('prev-summary')) el('prev-summary').textContent = val('rb-summary') || 'Your professional summary will appear here...';
  if (el('prev-edu')) el('prev-edu').innerHTML = `<strong>${val('rb-college') || 'Your University'}</strong> – ${val('rb-degree') || 'Your Degree'}`;
  if (el('prev-cgpa')) el('prev-cgpa').textContent = val('rb-cgpa') || 'CGPA';
  if (el('prev-year')) el('prev-year').textContent = val('rb-year') || 'Year';
  if (el('prev-exp')) el('prev-exp').innerHTML = `<strong>${val('rb-company') || 'Company'}</strong> – ${val('rb-role') || 'Role'}`;
  if (el('prev-dates')) el('prev-dates').textContent = (val('rb-from') || val('rb-to')) ? `${val('rb-from')} – ${val('rb-to')}` : 'Dates';
  if (el('prev-achievements')) el('prev-achievements').textContent = val('rb-achievements');
  if (el('prev-skills')) el('prev-skills').textContent = val('rb-skills') || 'Technical & soft skills appear here';
  if (el('prev-certs')) el('prev-certs').textContent = val('rb-certs');
}
expose('updatePreview', updatePreview);

// ============================================================
//  QUIZ GAME
// ============================================================
const deptQuestions = {
  cse: [
    { q: "What does API stand for?", opts: ["Application Programming Interface", "Advanced Program Integration", "Applied Process Integration", "Automated Programming Interface"], ans: 0 },
    { q: "Which data structure uses LIFO?", opts: ["Queue", "Stack", "Tree", "Graph"], ans: 1 },
    { q: "Time complexity of binary search?", opts: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], ans: 2 },
  ],
  it: [
    { q: "What is a primary key?", opts: ["A unique identifier for a record", "A key used for encryption", "A foreign key reference", "A table index"], ans: 0 },
    { q: "Protocol for secure web traffic?", opts: ["HTTP", "FTP", "HTTPS", "SMTP"], ans: 2 },
    { q: "What does DNS do?", opts: ["Resolves IP to names", "Resolves domain names to IPs", "Secures traffic", "Encrypts databases"], ans: 1 },
  ],
  ece: [
    { q: "What is an operational amplifier?", opts: ["A logic gate", "A voltage amplifier", "A digital counter", "A memory cell"], ans: 1 },
    { q: "VLSI stands for?", opts: ["Very Low Scale Integration", "Very Large Scale Integration", "Voltage Logic Signal Interface", "Variable Length Signal Input"], ans: 1 },
    { q: "Which is a microcontroller?", opts: ["Pentium 4", "Intel Core i7", "8051", "ARM Cortex-A78"], ans: 2 },
  ],
  eee: [
    { q: "Unit of electrical resistance?", opts: ["Volts", "Amperes", "Ohms", "Watts"], ans: 2 },
    { q: "What does a transformer do?", opts: ["Converts AC to DC", "Converts DC to AC", "Steps up or steps down AC voltage", "Stores electrical energy"], ans: 2 },
    { q: "Ohm's law: V = ?", opts: ["I/R", "R/I", "IR", "I^2R"], ans: 2 },
  ],
  mech: [
    { q: "Study of fluids in motion?", opts: ["Thermodynamics", "Fluid Dynamics", "Statics", "Kinematics"], ans: 1 },
    { q: "Thermodynamic cycle for steam engine?", opts: ["Otto cycle", "Diesel cycle", "Rankine cycle", "Brayton cycle"], ans: 2 },
    { q: "What is stress?", opts: ["Force per unit Area", "Mass per unit Volume", "Change in length per unit length", "Work per unit time"], ans: 0 },
  ],
};

let quizState = { currentQ: 0, score: 0, dept: null, questions: [], timer: null, timeLeft: 10 };

function startQuizForDept(dept) {
  quizState.dept = dept;
  quizState.questions = deptQuestions[dept] || deptQuestions['cse'];
  quizState.currentQ = 0;
  quizState.score = 0;
  document.getElementById('quiz-step-dept').classList.add('hidden');
  document.getElementById('quiz-step-questions').classList.remove('hidden');
  loadNextQuizQuestion();
}
expose('startQuizForDept', startQuizForDept);

function loadNextQuizQuestion() {
  if (quizState.currentQ >= quizState.questions.length) return finishQuiz();
  quizState.timeLeft = 10;
  document.getElementById('quiz-timer').textContent = quizState.timeLeft;
  document.getElementById('q-current').textContent = quizState.currentQ + 1;
  document.getElementById('q-total').textContent = quizState.questions.length;
  document.getElementById('quiz-progress-bar').style.width = `${(quizState.currentQ / quizState.questions.length) * 100}%`;
  const qObj = quizState.questions[quizState.currentQ];
  document.getElementById('quiz-question').textContent = qObj.q;
  const optsContainer = document.getElementById('quiz-options');
  optsContainer.innerHTML = '';
  qObj.opts.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-outline';
    btn.style.cssText = 'width:100%;justify-content:flex-start;text-align:left;border-color:var(--grey-pale);color:var(--dark);font-weight:500;padding:12px 16px;';
    btn.textContent = opt;
    btn.onclick = () => checkQuizAnswer(idx, btn);
    optsContainer.appendChild(btn);
  });
  clearInterval(quizState.timer);
  quizState.timer = setInterval(() => {
    quizState.timeLeft--;
    document.getElementById('quiz-timer').textContent = quizState.timeLeft;
    if (quizState.timeLeft <= 0) { clearInterval(quizState.timer); checkQuizAnswer(-1, null); }
  }, 1000);
}

function checkQuizAnswer(selectedIdx, btnElement) {
  clearInterval(quizState.timer);
  const qObj = quizState.questions[quizState.currentQ];
  const buttons = document.getElementById('quiz-options').querySelectorAll('button');
  buttons.forEach(b => b.disabled = true);
  if (selectedIdx === qObj.ans) {
    quizState.score++;
    if (btnElement) { btnElement.style.background = 'rgba(0,177,123,0.1)'; btnElement.style.borderColor = 'var(--green)'; btnElement.style.color = 'var(--green)'; }
  } else {
    if (btnElement) { btnElement.style.background = 'rgba(255,59,48,0.1)'; btnElement.style.borderColor = '#FF3B30'; btnElement.style.color = '#FF3B30'; }
    buttons[qObj.ans].style.borderColor = 'var(--green)'; buttons[qObj.ans].style.color = 'var(--green)';
  }
  setTimeout(() => { quizState.currentQ++; loadNextQuizQuestion(); }, 1000);
}
expose('checkQuizAnswer', checkQuizAnswer);

function finishQuiz() {
  document.getElementById('quiz-step-questions').classList.add('hidden');
  document.getElementById('quiz-step-result').classList.remove('hidden');
  document.getElementById('quiz-final-score').textContent = Math.round((quizState.score / quizState.questions.length) * 25);
}

function redirectQuizToCourses() {
  closeModal('modal-quiz');
  showTab('courses');
  const filterBtn = document.querySelector(`.dept-btn[onclick*="'${quizState.dept}'"]`);
  if (filterBtn) filterBtn.click();
}
expose('redirectQuizToCourses', redirectQuizToCourses);

// ============================================================
//  MODAL HELPERS
// ============================================================
function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('hidden');
  if (id === 'modal-quiz') {
    document.getElementById('quiz-step-dept').classList.remove('hidden');
    document.getElementById('quiz-step-questions').classList.add('hidden');
    document.getElementById('quiz-step-result').classList.add('hidden');
  }
  if (id === 'modal-interview') {
    document.getElementById('interview-step-dept').classList.remove('hidden');
    document.getElementById('interview-step-chat').classList.add('hidden');
    document.getElementById('interview-step-result').classList.add('hidden');
    clearInterviewTimer();
  }
  if (id === 'modal-aptitude') {
    document.getElementById('aptitude-step-intro').classList.remove('hidden');
    document.getElementById('aptitude-step-challenge').classList.add('hidden');
    document.getElementById('aptitude-footer').classList.add('hidden');
    clearAptitudeTimer();
  }
}
expose('openModal', openModal);

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('hidden');
  if (id === 'modal-quiz') clearInterval(quizState.timer);
  if (id === 'modal-interview') clearInterviewTimer();
  if (id === 'modal-aptitude') clearAptitudeTimer();
}
expose('closeModal', closeModal);

// ============================================================
//  MOCK INTERVIEW
// ============================================================
const interviewData = {
  cse: ["Tell me about a time you debugged a complex issue.", "Explain the difference between REST and GraphQL.", "How do you handle state in a React application?"],
  it: ["What is your process for troubleshooting a network issue?", "How do you ensure data security in a web application?", "Describe a time you worked with a cloud platform."],
  ece: ["Explain how a multiplexer works.", "What challenges have you faced in PCB design?", "How would you optimize power consumption in a circuit?"],
  eee: ["Describe the function of a relay.", "How do you analyze a power distribution system?", "Explain the principle of electromagnetic induction."],
  mech: ["What are the key considerations in material selection?", "How do you approach a thermal analysis problem?", "Describe a CAD project you worked on recently."],
};
let intState = { dept: null, qIndex: 0, timer: null, timeLeft: 300, messages: [] };

function startInterviewForDept(dept) {
  intState.dept = dept;
  intState.qIndex = 0;
  intState.timeLeft = 300;
  intState.messages = [];
  document.getElementById('interview-step-dept').classList.add('hidden');
  document.getElementById('interview-step-chat').classList.remove('hidden');
  document.getElementById('interview-chat-area').innerHTML = '';
  startInterviewTimer();
  appendInterviewMessage('bot', `Hi! I'm your mock interviewer for ${dept.toUpperCase()}. Let's get started. ${interviewData[dept][0]}`);
}
expose('startInterviewForDept', startInterviewForDept);

function appendInterviewMessage(sender, text) {
  const chatArea = document.getElementById('interview-chat-area');
  const msgDiv = document.createElement('div');
  msgDiv.style.cssText = `max-width:85%;padding:12px 16px;border-radius:12px;font-size:14px;line-height:1.5;${sender === 'user' ? 'align-self:flex-end;background:var(--green);color:#fff;' : 'align-self:flex-start;background:#fff;color:var(--dark);border:1px solid var(--grey-pale);'}`;
  msgDiv.textContent = text;
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

function handleInterviewKeyPress(e) { if (e.key === 'Enter') sendInterviewMessage(); }
expose('handleInterviewKeyPress', handleInterviewKeyPress);

function sendInterviewMessage() {
  const input = document.getElementById('interview-input');
  const text = input.value.trim();
  if (!text) return;
  appendInterviewMessage('user', text);
  input.value = '';
  intState.qIndex++;
  setTimeout(botInterviewReply, 800);
}
expose('sendInterviewMessage', sendInterviewMessage);

function botInterviewReply() {
  const questions = interviewData[intState.dept] || interviewData['cse'];
  if (intState.qIndex < questions.length) {
    appendInterviewMessage('bot', `Good point. Next question: ${questions[intState.qIndex]}`);
  } else {
    appendInterviewMessage('bot', "Thank you! That concludes our mock interview. Generating feedback...");
    setTimeout(finishInterview, 1500);
  }
}

function startInterviewTimer() {
  clearInterval(intState.timer);
  intState.timer = setInterval(() => {
    intState.timeLeft--;
    const m = Math.floor(intState.timeLeft / 60).toString().padStart(2, '0');
    const s = (intState.timeLeft % 60).toString().padStart(2, '0');
    document.getElementById('interview-timer').textContent = `${m}:${s}`;
    if (intState.timeLeft <= 0) finishInterview();
  }, 1000);
}
function clearInterviewTimer() { clearInterval(intState.timer); }

function finishInterview() {
  clearInterviewTimer();
  document.getElementById('interview-step-chat').classList.add('hidden');
  document.getElementById('interview-step-result').classList.remove('hidden');
  setTimeout(() => {
    if (!document.getElementById('modal-interview').classList.contains('hidden')) redirectInterviewToCourses();
  }, 4000);
}
function redirectInterviewToCourses() { closeModal('modal-interview'); showTab('courses'); }
expose('redirectInterviewToCourses', redirectInterviewToCourses);

// ============================================================
//  APTITUDE CHALLENGE
// ============================================================
const aptitudeQuestions = [
  { q: "If a train 120m long passes a pole in 6 seconds, what is its speed?", ans: "72 km/hr", exp: "Speed = 120/6 = 20 m/s × 18/5 = 72 km/hr." },
  { q: "Next number: 2, 6, 12, 20, 30, ...?", ans: "42", exp: "Differences: 4,6,8,10 → next is 12. 30+12=42." },
  { q: "A does work in 10 days, B in 15 days. Together?", ans: "6 days", exp: "1/10 + 1/15 = 1/6. Total = 6 days." },
  { q: "If 15% of x is 45, what is x?", ans: "300", exp: "0.15×x=45 → x=300." },
  { q: "Average of first 5 multiples of 3?", ans: "9", exp: "3+6+9+12+15=45; 45/5=9." },
];

let aptTimer = null;
let aptTimeLeft = 600;

function startAptitudeChallenge() {
  document.getElementById('aptitude-step-intro').classList.add('hidden');
  document.getElementById('aptitude-step-challenge').classList.remove('hidden');
  const qArea = document.getElementById('aptitude-q-area');
  qArea.innerHTML = '';
  aptitudeQuestions.forEach((item, idx) => {
    const card = document.createElement('div');
    card.style.cssText = 'background:#fff;border:1px solid var(--grey-pale);border-radius:12px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,0.02);';
    card.innerHTML = `
      <div style="font-size:12px;color:var(--grey-mid);font-weight:700;margin-bottom:8px;">Question ${idx + 1}</div>
      <p style="font-size:15px;font-weight:600;margin-bottom:16px;">${item.q}</p>
      <div style="background:rgba(0,177,123,0.05);padding:12px;border-radius:8px;border-left:3px solid var(--green);">
        <div style="font-size:13px;font-weight:700;color:var(--green);margin-bottom:4px;">Answer: ${item.ans}</div>
        <div style="font-size:13px;color:var(--grey-mid);">${item.exp}</div>
      </div>`;
    qArea.appendChild(card);
  });
  document.getElementById('aptitude-footer').classList.remove('hidden');
  aptTimeLeft = 600;
  clearInterval(aptTimer);
  aptTimer = setInterval(() => {
    aptTimeLeft--;
    const m = Math.floor(aptTimeLeft / 60).toString().padStart(2, '0');
    const s = (aptTimeLeft % 60).toString().padStart(2, '0');
    document.getElementById('aptitude-timer').textContent = `${m}:${s}`;
    if (aptTimeLeft <= 0) clearAptitudeTimer();
  }, 1000);
}
expose('startAptitudeChallenge', startAptitudeChallenge);
function clearAptitudeTimer() { clearInterval(aptTimer); }

// ============================================================
//  ENROLL MODAL OPENER
// ============================================================
function openEnrollModal(courseName) {
  const form = document.getElementById('enroll-step-form');
  const success = document.getElementById('enroll-step-success');
  if (form) form.classList.remove('hidden');
  if (success) success.classList.add('hidden');
  const courseInput = document.getElementById('en-course');
  if (courseInput && courseName && courseName !== 'General') courseInput.value = courseName;

  // Trigger one-time video playback exactly from the start when the modal opens
  const enrollVid = document.getElementById('enrollVideo');
  if (enrollVid) {
    enrollVid.currentTime = 0;
    enrollVid.play().catch(e => console.log('Video autoplay blocked or pending:', e));
  }

  openModal('modal-enroll');
}
expose('openEnrollModal', openEnrollModal);

// ============================================================
//  ✅ FORM 1 — AUTO-ENROLL  →  FIREBASE FIRESTORE
// ============================================================
async function submitAutoEnrolment() {
  console.log("[AutoEnrol] 🖱️ Submit clicked.");

  const name = document.getElementById('ae-name')?.value?.trim();
  const dept = document.getElementById('ae-dept')?.value?.trim();
  const course = document.getElementById('ae-course')?.value?.trim();
  const phone = document.getElementById('ae-phone')?.value?.trim();
  const email = document.getElementById('ae-email')?.value?.trim();

  console.log("[AutoEnrol] Fields →", { name, dept, course, phone, email });

  if (!name || !email || !phone) {
    console.warn("[AutoEnrol] ⚠️ Validation failed.");
    showToast('Please fill in Name, Email and Phone!', 'error');
    return;
  }

  if (!db) {
    console.error("[AutoEnrol] ❌ Firestore not ready. Check firebaseConfig.");
    showToast('Database not ready. Please refresh.', 'error');
    return;
  }

  const submitBtn = document.querySelector('#auto-enroll-step-form .btn-primary');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Saving…'; }

  try {
    console.log("[AutoEnrol] 📤 Writing to Firestore…");

    const docRef = await addDoc(collection(db, 'autoEnrolments'), {
      studentName: name,
      department: dept || 'Not specified',
      domainCourse: course || 'Not specified',
      mobileNumber: phone,
      emailId: email,
      submittedAt: serverTimestamp(),
      source: 'career-support-modal',
    });

    console.log("[AutoEnrol] ✅ Saved! Doc ID:", docRef.id);

    const formEl = document.getElementById('auto-enroll-step-form');
    const successEl = document.getElementById('auto-enroll-step-success');
    if (formEl) formEl.classList.add('hidden');
    if (successEl) successEl.classList.remove('hidden');

  } catch (err) {
    console.error("[AutoEnrol] ❌ Firestore error:", err);
    showToast('Something went wrong. Please try again.', 'error');
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Next →'; }
  }
}
expose('submitAutoEnrolment', submitAutoEnrolment);

// ============================================================
//  ✅ FORM 2 — COURSE ENROLMENT  →  FIREBASE FIRESTORE
// ============================================================
async function submitEnrolment() {
  console.log("[Enrolment] 🖱️ Submit clicked.");

  const name = document.getElementById('en-name')?.value?.trim();
  const dept = document.getElementById('en-dept')?.value?.trim();
  const course = document.getElementById('en-course')?.value?.trim();
  const phone = document.getElementById('en-phone')?.value?.trim();
  const email = document.getElementById('en-email')?.value?.trim();

  console.log("[Enrolment] Fields →", { name, dept, course, phone, email });

  if (!name || !phone || !email) {
    console.warn("[Enrolment] ⚠️ Validation failed.");
    showToast('Please fill in Name, Phone and Email!', 'error');
    return;
  }

  if (!db) {
    console.error("[Enrolment] ❌ Firestore not ready. Check firebaseConfig.");
    showToast('Database not ready. Please refresh.', 'error');
    return;
  }

  const submitBtn = document.querySelector('#enroll-step-form .btn-primary');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Saving…'; }

  try {
    console.log("[Enrolment] 📤 Writing to Firestore…");

    const docRef = await addDoc(collection(db, 'enrolments'), {
      studentName: name,
      department: dept || 'Not specified',
      domainCourse: course || 'Not specified',
      mobileNumber: phone,
      emailId: email,
      submittedAt: serverTimestamp(),
      source: 'live-class-modal',
    });

    console.log("[Enrolment] ✅ Saved! Doc ID:", docRef.id);

    const formEl = document.getElementById('enroll-step-form');
    const successEl = document.getElementById('enroll-step-success');
    if (formEl) formEl.classList.add('hidden');
    if (successEl) successEl.classList.remove('hidden');

  } catch (err) {
    console.error("[Enrolment] ❌ Firestore error:", err);
    showToast('Something went wrong. Please try again.', 'error');
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Next →'; }
  }
}
expose('submitEnrolment', submitEnrolment);

// ============================================================
//  JUNIOR COURSES
// ============================================================
const jrCourses = [
  { title: 'Scratch Programming', grade: 'primary', emoji: '🐱', desc: 'Visual block-based coding with Scratch.', duration: '6 weeks' },
  { title: 'Curious Science Lab', grade: 'primary', emoji: '🔬', desc: 'Fun science experiments and STEM activities.', duration: '8 weeks' },
  { title: 'Story Telling & Drama', grade: 'primary', emoji: '🎭', desc: 'Creative writing and dramatic expression.', duration: '4 weeks' },
  { title: 'Python for Teens', grade: 'middle', emoji: '🐍', desc: 'Introduction to Python with fun mini-projects.', duration: '10 weeks' },
  { title: 'Public Speaking & Debate', grade: 'middle', emoji: '🎤', desc: 'Master the art of persuasive communication.', duration: '8 weeks' },
  { title: 'Financial Literacy Jr.', grade: 'middle', emoji: '💰', desc: 'Money, savings, budgeting concepts for teens.', duration: '6 weeks' },
  { title: 'Web Design Basics', grade: 'secondary', emoji: '🌐', desc: 'HTML, CSS and JavaScript to create your first website.', duration: '10 weeks' },
  { title: 'Career Discovery Program', grade: 'secondary', emoji: '🗺️', desc: 'Explore 50+ career paths with aptitude tests.', duration: '8 weeks' },
  { title: 'Leadership & Entrepreneurship', grade: 'secondary', emoji: '🚀', desc: 'Business thinking and mini startup challenge.', duration: '10 weeks' },
  { title: 'Advanced Python & Data', grade: 'senior', emoji: '📊', desc: 'Data analysis, visualization and intro to ML.', duration: '12 weeks' },
  { title: 'Communication for Campus', grade: 'senior', emoji: '🎯', desc: 'Interview prep and GD skills for college readiness.', duration: '8 weeks' },
  { title: 'Digital Marketing Basics', grade: 'senior', emoji: '📱', desc: 'Social media, content creation fundamentals.', duration: '8 weeks' },
];

function renderJrCourses(filter) {
  const el = document.getElementById('jr-courses-list');
  if (!el) return;
  const filtered = filter === 'all' ? jrCourses : jrCourses.filter(c => c.grade === filter);
  el.innerHTML = filtered.map(c => `
    <div class="course-card">
      <div class="course-card-img" style="background:linear-gradient(135deg,var(--green),#00c98c)">
        <span>${c.emoji}</span>
        <span class="dept-tag">${c.grade.charAt(0).toUpperCase() + c.grade.slice(1)}</span>
      </div>
      <div class="course-card-body">
        <h3>${c.title}</h3><p>${c.desc}</p>
        <div class="course-meta"><span class="duration">⏱ ${c.duration}</span><span class="course-level level-beginner">Jr. Program</span></div>
        <div style="display:flex;gap:8px;margin-top:16px;">
          <button class="btn btn-outline" style="flex:1;justify-content:center;font-size:13px;padding:10px 0;" onclick="openSyllabusModal('${c.title.replace(/'/g, "\\'")}',true)">Syllabus</button>
          <button class="btn btn-primary" style="flex:1;justify-content:center;font-size:13px;padding:10px 0;" onclick="showToast('Enrolling in ${c.title.replace(/'/g, '')}! 🌱','success')">Join Program →</button>
        </div>
      </div>
    </div>`).join('');
}
expose('renderJrCourses', renderJrCourses);

function filterGrades(grade, btn) {
  document.querySelectorAll('#grade-filter .dept-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderJrCourses(grade);
}
expose('filterGrades', filterGrades);

// ============================================================
//  TOAST
// ============================================================
function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden', 'hide');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => {
    toast.classList.add('hide');
    setTimeout(() => toast.classList.add('hidden'), 400);
  }, 3500);
}
expose('showToast', showToast);

// ============================================================
//  PROMO STRIP
// ============================================================
const promoTexts = [
  "🎯 Try our Free Trial Tutorial Courses today! →",
  "🎥 Access 50+ Pre-Recorded Video Courses! →",
  "⚡ Master new skills at your own pace! →",
  "⭐ Start your free trial tutorial now! →",
];
let currentPromoIdx = 0;
function initPromoStrip() {
  const content = document.getElementById('promo-strip-content');
  if (!content) return;
  setInterval(() => {
    content.classList.add('fade-out');
    setTimeout(() => {
      currentPromoIdx = (currentPromoIdx + 1) % promoTexts.length;
      content.innerHTML = `<span>${promoTexts[currentPromoIdx]}</span>`;
      content.classList.remove('fade-out');
    }, 400);
  }, 4000);
}

// ============================================================
//  DOMContentLoaded
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  renderHomeCourses();
  initPromoStrip();
  renderAboutSection();
});

// ============================================================
//  YOUTUBE GALLERY
// ============================================================
let ytCurrentVid = '';
let ytCurrentTitle = '';

function openYTModal(videoId, title, tag) {
  ytCurrentVid = videoId;
  ytCurrentTitle = title;
  const iframe = document.getElementById('yt-iframe');
  if (iframe) iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&color=white`;
  const titleEl = document.getElementById('yt-modal-title');
  const tagEl = document.getElementById('yt-modal-tag');
  if (titleEl) titleEl.textContent = title;
  if (tagEl) tagEl.textContent = tag;
  const overlay = document.getElementById('yt-modal');
  if (overlay) { overlay.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  if (window.gsap) gsap.fromTo('.yt-modal-box', { scale: 0.88, opacity: 0, y: 30 }, { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' });
}
expose('openYTModal', openYTModal);

function closeYTModal(event, force) {
  if (!force && event && event.target !== document.getElementById('yt-modal')) return;
  const iframe = document.getElementById('yt-iframe');
  const overlay = document.getElementById('yt-modal');
  if (iframe) iframe.src = '';
  if (overlay) {
    if (window.gsap) {
      gsap.to('.yt-modal-box', { scale: 0.9, opacity: 0, y: 20, duration: 0.25, ease: 'power2.in', onComplete: () => { overlay.classList.add('hidden'); document.body.style.overflow = ''; } });
    } else {
      overlay.classList.add('hidden'); document.body.style.overflow = '';
    }
  }
}
expose('closeYTModal', closeYTModal);

function openYTDirect() {
  if (ytCurrentVid) window.open(`https://youtu.be/${ytCurrentVid}`, '_blank', 'noopener,noreferrer');
}
expose('openYTDirect', openYTDirect);

function initYTGallery() {
  document.querySelectorAll('.yt-card').forEach(card => {
    card.addEventListener('click', function () {
      const vid = this.dataset.vid;
      const title = this.dataset.title;
      const tag = this.querySelector('.yt-tag')?.textContent || 'Video';
      if (!vid || vid.startsWith('VIDEO_ID')) { showToast('🎬 Video coming soon!', ''); return; }
      openYTModal(vid, title, tag);
      if (window.gsap) gsap.timeline().to(this, { scale: 0.93, duration: 0.1, ease: 'power1.in' }).to(this, { scale: 1.0, duration: 0.4, ease: 'back.out(2)' });
    });
    if (window.gsap) {
      card.addEventListener('mouseenter', function () { gsap.to(this, { rotateY: 6, rotateX: -4, scale: 1.05, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }); });
      card.addEventListener('mouseleave', function () { gsap.to(this, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1,0.5)', overwrite: 'auto' }); });
      card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        gsap.to(this, { rotateY: ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10, rotateX: -((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * 10, duration: 0.2, ease: 'power1.out', overwrite: 'auto' });
      });
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeYTModal(null, true); });
}

function animateYTGalleryEntrance() {
  if (!window.gsap) return;
  const cards = document.querySelectorAll('.yt-card');
  if (!cards.length) return;
  gsap.fromTo(cards, { opacity: 0, y: 32, scale: 0.88, rotateZ: -3 }, { opacity: 1, y: 0, scale: 1, rotateZ: 0, duration: 0.65, ease: 'back.out(1.7)', stagger: 0.12, delay: 0.3 });
}

document.addEventListener('DOMContentLoaded', () => { initYTGallery(); });
setTimeout(() => {
  const originalShowTab = window.showTab;
  window.showTab = function (tab) {
    originalShowTab(tab);
    if (tab === 'home') setTimeout(animateYTGalleryEntrance, 200);
  };
}, 0);

// ============================================================
//  INSTITUTION PORTAL
// ============================================================
(function () {
  const navbar = document.getElementById('inst-navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateInstNavActive();
  }, { passive: true });
})();

function instNavScroll(e, id) {
  if (e) e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
expose('instNavScroll', instNavScroll);

function updateInstNavActive() {
  const sections = ['inst-hero', 'inst-about', 'inst-services', 'inst-ev', 'inst-articles', 'inst-partners', 'inst-contact'];
  let current = sections[0];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
  });
  document.querySelectorAll('.inst-nav-link').forEach(link => {
    const href = link.getAttribute('href')?.replace('#', '');
    link.classList.toggle('active', href === current);
  });
}

function animateInstCounters() {
  document.querySelectorAll('#page-institution .inst-stat-num[data-target]').forEach(el => {
    if (el.dataset.animated) return;
    el.dataset.animated = '1';
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = target >= 1000 ? Math.round(current / 1000) + 'K' + suffix.replace('K+', '+') : Math.round(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
    el.closest('.inst-stat-card')?.querySelector('.inst-stat-bar-fill')?.classList.add('animated');
  });
}

function initInstHeroGSAP() {
  if (!window.gsap) return;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  gsap.set(['#ih-eyebrow', '#ih-headline', '#ih-sub', '#ih-chips', '#ih-actions'], { opacity: 0, y: 30 });
  gsap.set('#ih-right', { opacity: 0, x: 40 });
  tl.to('#ih-eyebrow', { opacity: 1, y: 0, duration: 0.7 })
    .to('#ih-headline', { opacity: 1, y: 0, duration: 0.9, stagger: 0.2 }, '-=0.4')
    .to('#ih-sub', { opacity: 1, y: 0, duration: 0.7 }, '-=0.6')
    .to('#ih-chips', { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
    .to('#ih-actions', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('#ih-right', { opacity: 1, x: 0, duration: 0.9, onComplete: animateInstCounters }, '-=0.8');
  if (window.ScrollTrigger) {
    gsap.fromTo('#it-tag', { opacity: 0, y: 20 }, { scrollTrigger: { trigger: '#inst-tieups', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.6 });
    gsap.fromTo('#it-title', { opacity: 0, y: 20 }, { scrollTrigger: { trigger: '#inst-tieups', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
    gsap.fromTo('#it-desc', { opacity: 0, y: 20 }, { scrollTrigger: { trigger: '#inst-tieups', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.6, delay: 0.4 });
    gsap.fromTo('#it-marquee', { opacity: 0 }, { scrollTrigger: { trigger: '#inst-tieups', start: 'top 70%' }, opacity: 1, duration: 1, delay: 0.6 });
    gsap.fromTo('.inst-service-card', { opacity: 0, y: 40 }, { scrollTrigger: { trigger: '#inst-services', start: 'top 75%' }, opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' });
    gsap.fromTo('.ev-left-col', { opacity: 0, x: -50 }, { scrollTrigger: { trigger: '#inst-ev', start: 'top 75%' }, opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' });
    gsap.fromTo('.ev-right-col', { opacity: 0, x: 50 }, { scrollTrigger: { trigger: '#inst-ev', start: 'top 75%' }, opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 });
    gsap.fromTo('.ev-time-item', { opacity: 0, x: -20 }, { scrollTrigger: { trigger: '.ev-timeline', start: 'top 85%' }, opacity: 1, x: 0, duration: 0.6, stagger: 0.2 });
    gsap.fromTo('.inst-article-card', { opacity: 0, y: 40 }, { scrollTrigger: { trigger: '#inst-articles-grid', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
  }
}

function initInstHeroFallback() {
  ['ih-eyebrow', 'ih-headline', 'ih-sub', 'ih-chips', 'ih-actions', 'ih-right'].forEach((id, i) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
    el.style.transform = 'translateY(20px)';
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 100 + i * 150);
  });
  setTimeout(animateInstCounters, 800);
}

function initInstitutionPortal() {
  if (!window.gsap) {
    if (!document.querySelector('script[src*="gsap"]')) {
      const s1 = document.createElement('script');
      s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      s1.onload = () => {
        const s2 = document.createElement('script');
        s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
        s2.onload = () => { gsap.registerPlugin(ScrollTrigger); initInstHeroGSAP(); };
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    } else { initInstHeroFallback(); }
  } else {
    gsap.registerPlugin(ScrollTrigger);
    initInstHeroGSAP();
  }
  setTimeout(initInstFloatingBar, 300);
}
expose('initInstitutionPortal', initInstitutionPortal);

// ============================================================
//  ARTICLE MODAL
// ============================================================
const articleData = {
  article1: { img: 'YOUR_IMAGE_LINK_HERE', meta: 'Research • Dec 12, 2025', title: 'The Future of Edge Computing in Campus Architectures', text: '<p>Integrating edge computing into local campus infrastructure allows students to run heavy machine-learning models locally with sub-millisecond latency.</p>' },
  article2: { img: 'YOUR_IMAGE_LINK_HERE', meta: 'Robotics • Nov 28, 2025', title: 'Autonomous Navigation Systems Using Lightweight LiDar', text: '<p>Our student robotics division engineered a custom SLAM implementation designed specifically to run on lightweight rovers.</p>' },
  article3: { img: 'YOUR_IMAGE_LINK_HERE', meta: 'Methodology • Oct 05, 2025', title: 'Integrating Agile Workflows into Semester Projects', text: '<p>Shifting away from the traditional waterfall approach, beta-testing groups implemented daily stand-ups and two-week sprint cycles.</p>' },
};

function openInstArticleModal(id) {
  const modal = document.getElementById('inst-article-modal');
  if (!modal || !articleData[id]) return;
  const data = articleData[id];
  document.getElementById('ia-modal-img').src = data.img;
  document.getElementById('ia-modal-meta').textContent = data.meta;
  document.getElementById('ia-modal-title').textContent = data.title;
  document.getElementById('ia-modal-text').innerHTML = data.text;
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
expose('openInstArticleModal', openInstArticleModal);

function closeInstArticleModal() {
  const modal = document.getElementById('inst-article-modal');
  if (modal) { modal.classList.add('hidden'); document.body.style.overflow = ''; }
}
expose('closeInstArticleModal', closeInstArticleModal);

// ============================================================
//  PARTNERSHIPS PAGE
// ============================================================
function initPartnersSection() {
  const section = document.getElementById('page-inst-partners');
  if (!section) return;
  if (!window.gsap) {
    if (!document.querySelector('script[src*="gsap"]')) {
      const s1 = document.createElement('script');
      s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      s1.onload = () => {
        const s2 = document.createElement('script');
        s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
        s2.onload = () => { gsap.registerPlugin(ScrollTrigger); _runPartnersGSAP(section); };
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    }
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  _runPartnersGSAP(section);
}
expose('initPartnersSection', initPartnersSection);

function _runPartnersGSAP(section) {
  if (!window.gsap) return;
  section.querySelectorAll('.pstat-num[data-target]').forEach(el => { delete el.dataset.animated; });
  gsap.set(['#p-eyebrow', '#p-headline', '#p-subtext', '#p-stats', '#p-scroll-hint'], { opacity: 0, y: 36, filter: 'blur(4px)' });
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .to('#p-eyebrow', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 }, 0.1)
    .to('#p-headline', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0 }, 0.35)
    .to('#p-subtext', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.75 }, 0.65)
    .to('#p-stats', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 }, 0.85)
    .to('#p-scroll-hint', { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 }, 1.1);
  setTimeout(() => {
    section.querySelectorAll('.pstat-num[data-target]').forEach(el => {
      if (el.dataset.animated) return;
      el.dataset.animated = '1';
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let current = 0;
      const steps = 1800 / 16;
      const inc = target / steps;
      const timer = setInterval(() => {
        current = Math.min(current + inc, target);
        if (suffix === 'K+') el.textContent = Math.round(current / 1000) + 'K+';
        else if (suffix) el.textContent = Math.round(current) + suffix;
        else el.textContent = Math.round(current);
        if (current >= target) clearInterval(timer);
      }, 16);
    });
  }, 900);
  gsap.fromTo('#p-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: '#p-label', start: 'top 88%' } });
  section.querySelectorAll('.partner-card').forEach((card, i) => {
    gsap.fromTo(card, { opacity: 0, y: 30, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out', delay: (i % 3) * 0.08, scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' } });
  });
  section.querySelectorAll('.pdl-orb').forEach((orb, i) => {
    const speed = [0.10, 0.07, 0.13][i] || 0.09;
    gsap.to(orb, { y: () => -(window.innerHeight * speed), ease: 'none', scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 2 } });
  });
  gsap.fromTo('#p-cta', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: '#p-cta', start: 'top 85%' } });
  section.querySelectorAll('.partner-card').forEach(card => {
    const inner = card.querySelector('.partner-card-inner');
    const logo = card.querySelector('.partner-logo-box');
    if (!inner) return;
    card.addEventListener('mouseenter', () => gsap.to(inner, { y: -3, duration: 0.35, ease: 'power2.out', overwrite: 'auto' }));
    card.addEventListener('mouseleave', () => gsap.to(inner, { y: 0, duration: 0.55, ease: 'elastic.out(1,0.65)', overwrite: 'auto' }));
    if (!logo) return;
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      gsap.to(logo, { x: (e.clientX - rect.left - rect.width / 2) / rect.width * 8, y: (e.clientY - rect.top - rect.height / 2) / rect.height * 8, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', () => gsap.to(logo, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)', overwrite: 'auto' }));
  });
}

// ============================================================
//  ABOUT SECTION
// ============================================================
function renderAboutSection() {
  const aboutHTML = `
    <div style="max-width:1100px;margin:0 auto;padding:80px 24px;">
      <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(0,177,123,0.1);color:#00b17b;border:1px solid rgba(0,177,123,0.25);border-radius:100px;padding:6px 16px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:24px;">🌱 About MSEED</div>
      <h1 style="font-family:'Playfair Display',serif;font-size:clamp(36px,5vw,60px);font-weight:900;line-height:1.1;margin-bottom:24px;color:#1a1a1a;">Empowering Every Student<br><span style="color:#00b17b;">To Build a Better Future</span></h1>
      <p style="font-size:17px;line-height:1.8;color:#555;max-width:720px;margin-bottom:64px;">MSEED is India's leading career readiness platform — bridging the gap between academic learning and industry expectations through live classes, ATS-optimized tools, EV research labs, and real placement support.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:24px;margin-bottom:72px;">
        ${[{ num: '50,000+', label: 'Students Trained', icon: '🎓' }, { num: '500+', label: 'Partner Companies', icon: '🤝' }, { num: '85%', label: 'Placement Rate', icon: '🏆' }, { num: '120+', label: 'Colleges Partnered', icon: '🏛️' }, { num: '2018', label: 'Founded', icon: '📅' }].map(s => `<div style="background:#fff;border:1px solid #eee;border-radius:20px;padding:28px 20px;text-align:center;box-shadow:0 4px 20px rgba(0,0,0,0.05);"><div style="font-size:36px;margin-bottom:10px;">${s.icon}</div><div style="font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:#00b17b;margin-bottom:6px;">${s.num}</div><div style="font-size:13px;color:#888;font-weight:500;">${s.label}</div></div>`).join('')}
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:72px;">
        <div style="background:linear-gradient(135deg,#00b17b,#009267);border-radius:24px;padding:40px;color:#fff;"><div style="font-size:40px;margin-bottom:16px;">🎯</div><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;margin-bottom:16px;">Our Mission</h3><p style="font-size:15px;line-height:1.8;opacity:0.9;">To democratize career readiness for every Indian student — regardless of college tier or background — by providing world-class, industry-aligned skill training and ATS-ready tools that actually get them hired.</p></div>
        <div style="background:#1a1a1a;border-radius:24px;padding:40px;color:#fff;"><div style="font-size:40px;margin-bottom:16px;">🔭</div><h3 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;margin-bottom:16px;">Our Vision</h3><p style="font-size:15px;line-height:1.8;opacity:0.75;">To become the #1 career infrastructure platform across South Asia — powering 1 million placements annually by 2030 through technology, mentorship, and direct industry partnerships.</p></div>
      </div>
      <div style="margin-bottom:72px;">
        <h2 style="font-family:'Playfair Display',serif;font-size:36px;font-weight:800;margin-bottom:40px;text-align:center;">What We Offer</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:24px;">
          ${[{ icon: '🎓', title: 'Live Classes', desc: 'Department-wise, expert-led live sessions for engineering, management, arts & science students.' }, { icon: '📄', title: 'ATS Resume Tools', desc: 'AI-powered resume checker and builder that beats Applicant Tracking Systems every time.' }, { icon: '🎮', title: 'Skill Games', desc: 'Gamified career quizzes, mock interviews and aptitude challenges to sharpen your edge.' }, { icon: '⚡', title: 'EV Research Labs', desc: 'Hands-on Electric Vehicle labs for institutions — from chassis design to BMS integration.' }, { icon: '🤝', title: 'Placement Support', desc: 'Dedicated placement cell connecting students directly to 500+ hiring partner companies.' }, { icon: '📚', title: 'Free Resources', desc: '50+ curated PDFs, resume templates and study guides — completely free for all students.' }].map(o => `<div style="background:#fff;border:1px solid #eee;border-radius:20px;padding:28px;box-shadow:0 4px 16px rgba(0,0,0,0.05);transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-6px)';this.style.boxShadow='0 12px 32px rgba(0,177,123,0.15)'" onmouseout="this.style.transform='';this.style.boxShadow='0 4px 16px rgba(0,0,0,0.05)'"><div style="font-size:36px;margin-bottom:14px;">${o.icon}</div><h4 style="font-family:'Playfair Display',serif;font-size:18px;font-weight:700;margin-bottom:10px;">${o.title}</h4><p style="font-size:13px;color:#777;line-height:1.7;">${o.desc}</p></div>`).join('')}
        </div>
      </div>
      <div style="background:linear-gradient(135deg,#f8fffe,#e8fdf5);border:1px solid rgba(0,177,123,0.2);border-radius:24px;padding:48px;margin-bottom:72px;text-align:center;">
        <h2 style="font-family:'Playfair Display',serif;font-size:32px;font-weight:800;margin-bottom:12px;">Our Portals</h2>
        <p style="color:#777;margin-bottom:40px;">Separate learning journeys, one powerful ecosystem</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:700px;margin:0 auto;">
          <div style="background:#fff;border-radius:16px;padding:28px;box-shadow:0 4px 16px rgba(0,0,0,0.06);"><div style="font-size:40px;margin-bottom:12px;">🎓</div><h4 style="font-family:'Playfair Display',serif;font-size:20px;margin-bottom:8px;">MSEED</h4><p style="font-size:13px;color:#888;">Higher Education platform for college students and institutions</p></div>
          <div style="background:#fff;border-radius:16px;padding:28px;box-shadow:0 4px 16px rgba(0,0,0,0.06);"><div style="font-size:40px;margin-bottom:12px;">🌱</div><h4 style="font-family:'Playfair Display',serif;font-size:20px;margin-bottom:8px;">MSEED Junior</h4><p style="font-size:13px;color:#888;">School education platform for students aged 8–18</p></div>
        </div>
      </div>
      <div style="margin-bottom:72px;">
        <h2 style="font-family:'Playfair Display',serif;font-size:36px;font-weight:800;margin-bottom:40px;text-align:center;">Leadership Team</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:24px;">
          ${[{ name: 'Founder & CEO', role: "Visionary behind MSEED's industry-integrated learning model", icon: '👨‍💼' }, { name: 'Chief Academic Officer', role: 'Curriculum architect with 15+ years in higher education', icon: '👩‍🏫' }, { name: 'Head of Placements', role: 'Built the 500+ company hiring partner network from ground up', icon: '🤝' }, { name: 'Tech Lead', role: 'Engineering the ATS tools, portals & EV lab infrastructure', icon: '👨‍💻' }].map(t => `<div style="background:#fff;border:1px solid #eee;border-radius:20px;padding:28px;text-align:center;box-shadow:0 4px 16px rgba(0,0,0,0.05);"><div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#00b17b22,#00b17b44);display:flex;align-items:center;justify-content:center;font-size:32px;margin:0 auto 16px;">${t.icon}</div><div style="font-weight:700;font-size:15px;margin-bottom:6px;">${t.name}</div><div style="font-size:12px;color:#999;line-height:1.5;">${t.role}</div></div>`).join('')}
        </div>
      </div>
      <div style="background:#1a1a1a;border-radius:24px;padding:56px;text-align:center;color:#fff;">
        <h2 style="font-family:'Playfair Display',serif;font-size:36px;font-weight:800;margin-bottom:16px;">Get In Touch</h2>
        <p style="color:rgba(255,255,255,0.6);font-size:16px;margin-bottom:40px;">Whether you're a student, institution, or hiring partner — we'd love to hear from you.</p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:32px;">
          <a href="mailto:info@mseed.in" style="display:inline-flex;align-items:center;gap:8px;background:#00b17b;color:#fff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;">📧 info@mseed.in</a>
          <a href="tel:+91-9361286834

" style="display:inline-flex;align-items:center;gap:8px;background:transparent;color:#fff;padding:14px 28px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;border:1.5px solid rgba(255,255,255,0.25);">📞+91-9361286834

 </a>
        </div>
        <div style="display:flex;gap:16px;justify-content:center;">
          ${['𝕏', 'in', '▶', '📷'].map(s => `<div style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;transition:background 0.2s;" onmouseover="this.style.background='rgba(0,177,123,0.4)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">${s}</div>`).join('')}
        </div>
      </div>
    </div>`;
  document.querySelectorAll('.about-seed-container').forEach(el => { el.innerHTML = aboutHTML; });
}
expose('renderAboutSection', renderAboutSection);

function showSchoolAbout() {
  let aboutSection = document.getElementById('school-about-section');
  if (!aboutSection) {
    aboutSection = document.createElement('div');
    aboutSection.id = 'school-about-section';
    aboutSection.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:9999;overflow-y:auto;display:flex;align-items:flex-start;justify-content:center;padding:40px 16px;';
    const inner = document.createElement('div');
    inner.style.cssText = 'background:#fff;border-radius:24px;width:100%;max-width:1000px;position:relative;';
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = 'position:absolute;top:16px;right:20px;background:none;border:none;font-size:20px;cursor:pointer;color:#555;z-index:10;font-family:var(--font-body);';
    closeBtn.onclick = () => aboutSection.remove();
    const contentDiv = document.createElement('div');
    contentDiv.className = 'about-seed-container';
    inner.appendChild(closeBtn);
    inner.appendChild(contentDiv);
    aboutSection.appendChild(inner);
    aboutSection.addEventListener('click', function (e) { if (e.target === aboutSection) aboutSection.remove(); });
    document.body.appendChild(aboutSection);
  }
  renderAboutSection();
  aboutSection.style.display = 'flex';
}
expose('showSchoolAbout', showSchoolAbout);

function openJrAbout() {
  const existing = document.getElementById('jr-about-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'jr-about-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:99999;overflow-y:auto;display:flex;align-items:flex-start;justify-content:center;padding:40px 16px;';
  const box = document.createElement('div');
  box.style.cssText = 'background:#fff;border-radius:24px;width:100%;max-width:1000px;position:relative;min-height:200px;';
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.style.cssText = 'position:fixed;top:50px;right:calc(50% - 480px);background:#fff;border:1px solid #eee;border-radius:50%;width:40px;height:40px;font-size:16px;cursor:pointer;z-index:100000;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.15);';
  closeBtn.onclick = () => overlay.remove();
  const contentDiv = document.createElement('div');
  contentDiv.className = 'about-seed-container';
  box.appendChild(contentDiv);
  overlay.appendChild(closeBtn);
  overlay.appendChild(box);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
  renderAboutSection();
  window.scrollTo(0, 0);
}
expose('openJrAbout', openJrAbout);

// ============================================================
//  INSTITUTION FLOATING ENROLL BAR
// ============================================================
function initInstFloatingBar() {
  const bar = document.getElementById('inst-floating-enroll-bar');
  const tieups = document.getElementById('inst-tieups');
  const footer = document.getElementById('inst-contact');
  if (!bar || !tieups || !footer) return;
  window.addEventListener('scroll', function () {
    const tieupsTop = tieups.getBoundingClientRect().top;
    const footerBottom = footer.getBoundingClientRect().bottom;
    bar.classList.toggle('show', tieupsTop <= 0 && footerBottom > 0);
  }, { passive: true });
}
expose('initInstFloatingBar', initInstFloatingBar);

// ============================================================
//  FLOATING VIDEO
// ============================================================
function initFloatingVideo() {
  const fvLayer = document.getElementById('fv-layer');
  const fvOverlay = document.getElementById('fv-overlay');
  const fvControls = document.getElementById('fv-controls');
  const fvCloseBtn = document.getElementById('fv-close-btn');
  const fvCameraIcon = document.getElementById('fv-camera-icon');
  if (!fvLayer || !fvOverlay) return;

  let backdrop = document.getElementById('fv-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'fv-backdrop';
    backdrop.className = 'fv-backdrop';
    document.body.appendChild(backdrop);
    backdrop.addEventListener('click', restoreNormal);
  }

  function minimizeVideo() {
    fvLayer.classList.remove('fv-maximized');
    fvLayer.classList.add('fv-minimized');
    backdrop.classList.remove('active');
    if (fvControls) fvControls.style.display = 'none';
    if (fvCameraIcon) fvCameraIcon.classList.remove('hidden');
  }
  function maximizeVideo() {
    fvLayer.classList.remove('fv-minimized');
    fvLayer.classList.add('fv-maximized');
    backdrop.classList.add('active');
    if (fvControls) fvControls.style.display = 'flex';
    if (fvCameraIcon) fvCameraIcon.classList.add('hidden');
  }
  function restoreNormal() {
    fvLayer.classList.remove('fv-maximized', 'fv-minimized');
    backdrop.classList.remove('active');
    if (fvControls) fvControls.style.display = 'none';
    if (fvCameraIcon) fvCameraIcon.classList.add('hidden');
  }

  fvOverlay.addEventListener('click', function (e) { e.preventDefault(); maximizeVideo(); });
  if (fvCloseBtn) fvCloseBtn.addEventListener('click', function (e) { e.stopPropagation(); minimizeVideo(); });
  if (fvCameraIcon) fvCameraIcon.addEventListener('click', function (e) { e.stopPropagation(); restoreNormal(); });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFloatingVideo);
} else {
  initFloatingVideo();
}

// ============================================================
//  showSchTab  (school institution tabs)
// ============================================================
function showSchTab(tab) {
  document.querySelectorAll('#page-school-inst .sch-tab-content').forEach(t => t.classList.add('hidden'));
  document.querySelectorAll('#page-school-inst .sch-nav-link').forEach(l => l.classList.remove('active'));
  const target = document.getElementById('schtab-' + tab);
  if (target) target.classList.remove('hidden');
  document.querySelectorAll('#page-school-inst .sch-nav-link').forEach(l => {
    if (l.getAttribute('onclick') && l.getAttribute('onclick').includes("'" + tab + "'")) l.classList.add('active');
  });
  window.scrollTo(0, 0);
}
expose('showSchTab', showSchTab);