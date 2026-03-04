const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<!-- ===== INSTITUTION PARTNERSHIP PAGE ===== -->';
const endMarkerStr = 'PART 7: INSTITUTION FOOTER';
const instEndMarker = '</div><!-- /#page-institution -->';

let startIndex = html.indexOf(startMarker);
while (html[startIndex - 1] === ' ') startIndex--;

let endOfPartners = html.indexOf(endMarkerStr);
let endSlice = html.lastIndexOf('<!--', endOfPartners);
while (html[endSlice - 1] === ' ') endSlice--;

if (startIndex === -1 || endOfPartners === -1 || endSlice === -1) {
    console.log('Could not find boundaries');
    process.exit(1);
}

let partnersHtml = html.substring(startIndex, endSlice);
html = html.substring(0, startIndex) + html.substring(endSlice);

let insertPoint = html.indexOf(instEndMarker);
if (insertPoint !== -1) {
    insertPoint += instEndMarker.length;
    html = html.substring(0, insertPoint) + '\n\n' + partnersHtml + html.substring(insertPoint);
    
    // Remove obsolete container
    html = html.replace(/<div id="inst-partnership-container"><\/div>/g, '');
    
    fs.writeFileSync('index.html', html);
    console.log('Moved successfully.');
} else {
    console.log('Could not find insert point.');
}
