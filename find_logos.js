const fs = require('fs');
const lines = fs.readFileSync('style.css', 'utf8').split('\n');
let out = '';
lines.forEach((l, i) => {
    if (l.includes('logo')) {
        out += (i + 1) + ': ' + l.trim() + '\n';
    }
});
fs.writeFileSync('found_logos.txt', out);
