const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const scriptToAdd = `
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const juniorPage = document.getElementById('page-junior-student');
      if (juniorPage) {
        juniorPage.addEventListener('click', (e) => {
          // If the click is inside the modal itself or trying to close it, ignore.
          if (!e.target.closest('.modal') && !e.target.closest('.modal-close')) {
            if (typeof openEnrollModal === 'function') {
              openEnrollModal('Junior Student');
            }
          }
        });
      }
    });
  </script>
</body>`;

if (!content.includes('juniorPage.addEventListener(\'click\'')) {
    content = content.replace('</body>', scriptToAdd);
    fs.writeFileSync('index.html', content);
    console.log('Script injected.')
} else {
    console.log('Script already exists.')
}
