const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');
const newLogoUrl = 'https://res.cloudinary.com/dn6ljz4uo/image/upload/v1772561971/WhatsApp_Image_2026-03-03_at_11.47.25_PM-removebg-preview_cwt05o.png';

// The previous logo was:
// https://res.cloudinary.com/drlg1t6pk/image/upload/v1771854440/1_1_p0yx8f.png
// or student portal logo was "data:image/gif;base64,... "

content = content.replace(/https:\/\/res\.cloudinary\.com\/drlg1t6pk\/image\/upload\/v1771854440\/1_1_p0yx8f\.png/g, newLogoUrl);
content = content.replace(/data:image\/gif;base64,R0lGODlhAQABAIAAAAAAAP\/\/\/yH5BAEAAAAALAAAAAABAAEAAAIBRAA7/g, newLogoUrl);

fs.writeFileSync('index.html', content);
console.log('Replaced all old URLs with the new one.');
