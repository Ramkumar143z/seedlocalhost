const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const styleToInject = `
<style>
  .coming-soon-banner {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    margin: 0;
    padding: 0;
    transition: all 0.4s ease;
    background: linear-gradient(135deg, rgba(0,177,123,0.15), rgba(0,177,123,0.05));
    border: 1px dashed transparent;
    border-radius: var(--radius-sm);
    color: var(--green);
    font-size: 13px;
    font-weight: 700;
    text-align: center;
    animation: pulse 2s infinite;
  }
  .portal-card:hover .coming-soon-banner {
    max-height: 100px;
    opacity: 1;
    margin: 15px 0 10px;
    padding: 12px;
    border-color: var(--green);
  }
</style>
</head>`;

if (!content.includes('.coming-soon-banner {')) {
    content = content.replace('</head>', styleToInject);
}

// Replace the inline style on the div with the new class
const targetDivRegex = /<div style="margin: 15px 0 10px; padding: 12px; background: linear-gradient[^>]*pulse 2s infinite;">/g;
content = content.replace(targetDivRegex, '<div class="coming-soon-banner">');

fs.writeFileSync('index.html', content);
console.log('Successfully added hover effect.');
