const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const scriptToAdd = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const juniorPage = document.getElementById('page-junior-student');
      if (juniorPage) {
        juniorPage.addEventListener('click', (e) => {
          if (!e.target.closest('.modal') && !e.target.closest('.modal-close')) {
            if (typeof openEnrollModal === 'function') {
              openEnrollModal('Junior Student');
            }
          }
        });
      }

      const schoolPage = document.getElementById('page-school-inst');
      if (schoolPage) {
        schoolPage.addEventListener('click', (e) => {
          if (!e.target.closest('.modal') && !e.target.closest('.modal-close')) {
            if (typeof openEnrollModal === 'function') {
              openEnrollModal('School Institution');
            }
          }
        });
      }
    });
  </script>
</body>`;

// Check if it already has the script block to replace, or if we need to just insert it.
if (content.includes('juniorPage.addEventListener(\'click\'')) {
    // Replace the existing block
    const regex = /<script>\s*document\.addEventListener\('DOMContentLoaded', \(\) => {\s*const juniorPage = document\.getElementById\('page-junior-student'\)[\s\S]*?<\/script>\s*<\/body>/;
    if (regex.test(content)) {
        content = content.replace(regex, scriptToAdd);
        fs.writeFileSync('index.html', content);
        console.log('Script updated with school portal support.');
    } else {
        console.log('Regex did not match exactly, manual resolution maybe needed.');
    }
} else {
    // Should not hit based on previous conversation state, but just in case
    content = content.replace('</body>', scriptToAdd);
    fs.writeFileSync('index.html', content);
    console.log('Script injected with school portal support.');
}
