const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const replacement = `        <p>Foundational skill-building programs, career awareness & digital curriculum for school students</p>
        <div style="margin: 15px 0 10px; padding: 12px; background: linear-gradient(135deg, rgba(0,177,123,0.15), rgba(0,177,123,0.05)); border: 1px dashed var(--green); border-radius: var(--radius-sm); color: var(--green); font-size: 13px; font-weight: 700; text-align: center; animation: pulse 2s infinite;">
          🚀 Our school education services are coming soon—stay tuned!
        </div>
        <button class="btn btn-primary portal-btn">Enter Junior Portal →</button>`;

const regex = /<p>Foundational skill-building programs, career awareness & digital curriculum for school students<\/p>\s*<button class="btn btn-primary portal-btn">Enter Junior Portal →<\/button>/;

content = content.replace(regex, replacement);
fs.writeFileSync('index.html', content);
console.log('Announcement added.');
