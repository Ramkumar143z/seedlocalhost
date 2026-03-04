const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The student portal logo was "height:38px", we already changed it to 58px. Let's make sure it's 58px.
content = content.replace(/height:38px;object-fit:contain;display:block/g, 'height:58px;object-fit:contain;display:block');

// The junior portal logo might be 40px height.
content = content.replace(/height:40px;width:auto;object-fit:contain;/g, 'height:58px;width:auto;object-fit:contain;');

// Let's also do a general replace for any img inside navbar-logo
content = content.replace(/(<div[^>]*class="[^"]*navbar-logo[^"]*"[^>]*>[\s\S]*?<img[^>]*?style="[^"]*?height:)\s*\d+px/g, '$158px');

fs.writeFileSync('index.html', content);
console.log('Done replacing');
