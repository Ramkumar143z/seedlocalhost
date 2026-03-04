const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let fixed = html.replace(/<!--\s*TAB:\s*PDFS\s*-->[\s\S]*?<!--\s*=====\s*GAMES\s*=====\s*-->/gi, `<!-- TAB: PRE-RECORDED COURSES -->
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

  <!-- ===== GAMES ===== -->`);
fs.writeFileSync('index.html', fixed, 'utf8');
console.log('Replaced tab.');
