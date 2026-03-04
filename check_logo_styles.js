const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
lines.forEach((l, i) => {
    if (l.includes('<img') && l.includes('alt="MSEED"')) {
        const match = l.match(/style=\"([^\"]*)\"/);
        if (match) {
            console.log((i + 1) + ': ' + match[1]);
        }
    }
});
