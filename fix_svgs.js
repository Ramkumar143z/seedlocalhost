const fs = require('fs');
['index.html', 'ev-project.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix SVGs
    content = content.replace(/<svg\b(?![^>]*aria-hidden=["']true["'])(?![^>]*role=["']img["'])(?![^>]*aria-label)/gi, '<svg aria-hidden="true" ');

    fs.writeFileSync(file, content);
});
console.log('SVGs fixed');
