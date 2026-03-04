const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace desktop nav link
html = html.replace(
    /<span class="nav-link" onclick="showTab\('pdfs'\)">Content PDFs<\/span>/g,
    '<span class="nav-link" onclick="showTab(\'precourses\')">Courses</span>'
);

// 2. Replace mobile nav link
html = html.replace(
    /<span class="nav-link" onclick="showTab\('pdfs'\);closeMobileMenu\(\)">Content PDFs<\/span>/g,
    '<span class="nav-link" onclick="showTab(\'precourses\');closeMobileMenu()">Courses</span>'
);

// 3. Replace in hc-service-grid
html = html.replace(
    /<button class="hc-service-btn" onclick="showTab\('pdfs'\)"><span class="hc-sb-icon">📄<\/span><span class="hc-sb-label">Content PDFs<small>50\+ Free Guides<\/small><\/span><\/button>/g,
    '<button class="hc-service-btn" onclick="showTab(\'precourses\')"><span class="hc-sb-icon">🎥</span><span class="hc-sb-label">Pre-Recorded Courses<small>Learn anytime</small></span></button>'
);

// 4. Replace footer link
html = html.replace(
    /<span class="footer-link">Content PDFs<\/span>/g,
    '<span class="footer-link">Pre-Recorded Courses</span>'
);

// 5. Replace PDF tab with Pre-Courses tab
html = html.replace(
    /<!-- TAB: PDFS -->[\s\S]*?<!-- ===== GAMES ===== -->/g,
    `<!-- TAB: PRE-RECORDED COURSES -->
  <div id="tab-precourses" class="tab-content hidden">
    <div class="container" style="padding-top:60px;padding-bottom:80px">
      <div class="section-title" style="text-align:left;margin-bottom:32px">
        <div class="tag">Pre-Recorded Video Courses</div>
        <h2 style="font-family:'Playfair Display',serif;font-size:38px;margin-top:12px">Learn at Your Own Pace</h2>
        <p style="color:var(--grey-mid);margin-top:8px">High-quality pre-recorded sessions designed by industry experts. Click a video to preview.</p>
      </div>
      <div class="dept-filter" id="precourse-dept-filter">
        <button class="dept-btn active" onclick="filterPreCourses('all',this)">All Departments</button>
        <button class="dept-btn" onclick="filterPreCourses('free',this)">🆓 Free Courses</button>
        <button class="dept-btn" onclick="filterPreCourses('cse',this)">💻 CSE</button>
        <button class="dept-btn" onclick="filterPreCourses('it',this)">💻 IT</button>
        <button class="dept-btn" onclick="filterPreCourses('ece',this)">📡 ECE</button>
        <button class="dept-btn" onclick="filterPreCourses('eee',this)">⚡ EEE</button>
        <button class="dept-btn" onclick="filterPreCourses('mech',this)">⚙️ Mechanical</button>
      </div>
      <div class="grid-3" id="all-precourses"></div>
    </div>
  </div>

  <!-- ===== GAMES ===== -->`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Update index.html completed.');
