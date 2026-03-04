const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

const newCode = `// ===== PRE-RECORDED COURSES =====
const preCoursesData = [...freeCourses, ...mainCourses]; // Same exact data

let currentPreCourseFilter = 'all';

function filterPreCourses(dept, btn) {
  currentPreCourseFilter = dept;
  document.querySelectorAll('#precourse-dept-filter .dept-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderPreCourses();
}

function renderPreCourses() {
  const el = document.getElementById('all-precourses');
  if (!el) return;

  let filtered = preCoursesData;
  if (currentPreCourseFilter === 'free') {
    filtered = preCoursesData.filter(c => c.isFree);
  } else if (currentPreCourseFilter !== 'all') {
    filtered = preCoursesData.filter(c => c.depts && c.depts.includes(currentPreCourseFilter));
  }

  el.innerHTML = filtered.map(c => {
    const badge = c.isFree ? '<span class="free-badge">🆓 FREE</span>' : '';
    const safeTitle = c.title ? c.title.replace(/'/g, "\\\\'") : '';

    return \`
      <div class="course-card">
        <div class="course-card-video" style="position:relative; width:100%; height:180px; background:#000; border-radius: var(--radius) var(--radius) 0 0; overflow:hidden;">
          <video controls preload="none" 
            style="width: 100%; height: 100%; object-fit: cover; outline: none;"
            onended="openEnrollModal('\${safeTitle}')"
            controlsList="nodownload">
            <source src="CLOUDINARY_VIDEO_LINK" type="video/mp4">
            Your browser does not support the video tag.
          </video>
          \${c.isFree ? '<div style="position:absolute; top:12px; right:12px; z-index:2; pointer-events:none;">' + badge + '</div>' : ''}
          <div style="position:absolute; top:12px; left:12px; z-index:2; font-size:24px; pointer-events:none;">\${c.emoji || ''}</div>
        </div>
        <div class="course-card-body">
          <h3>\${c.title}</h3>
          <p>\${c.desc}</p>
          <div class="course-meta">
            <span class="duration">⏱ \${c.duration}</span>
            <span class="course-level level-\${(c.level || 'beginner').toLowerCase()}">\${c.level}</span>
          </div>
        </div>
      </div>\`;
  }).join('');
}`;

// Use regex to locate the exact old code block
const regex = /\/\/ ===== PRE-RECORDED COURSES =====[\s\S]*?function renderPreCourses\(\) \{[\s\S]*?\}\n/g;
js = js.replace(regex, newCode + '\n');
fs.writeFileSync('script.js', js, 'utf8');

console.log('Replaced pre-recorded courses logic successfully.');
