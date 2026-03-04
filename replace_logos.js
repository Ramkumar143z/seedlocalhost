const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const newLogoBaseUrl = 'https://res.cloudinary.com/dn6ljz4uo/image/upload/v1772561971/WhatsApp_Image_2026-03-03_at_11.47.25_PM-removebg-preview_cwt05o.png';

// 1. College Student Portal
// Locate <div id="page-college-student"...
// Inside it, find <nav... and replace img src and height
content = content.replace(/(<div id="page-college-student"[\s\S]*?<nav[\s\S]*?<img[^>]*?src=")([^"]*)("[\s\S]*?logo[^>]*style="[^"]*?height:)\d+(px)/, `$1${newLogoBaseUrl}$3 100$4`);

// Wait, the college portal logo uses <img src="data:image/gif;base64,...">
// Let's do a more robust replacement for College Student portal:
content = content.replace(/(<div id="page-college-student"[\s\S]*?<div class="navbar-logo">[\s\S]*?<img [^>]*src=")[^"]*("[^>]*style="[^"]*?height:)\s*\d+px/i, `$1${newLogoBaseUrl}$2 100px`);

// 2. Institution Portal
// Locate <div id="page-institution"... ? Wait, let's use the nav classes
// College student: .navbar-logo img
// Institution: .inst-logo-img
content = content.replace(/(<img[^>]*class="[^"]*inst-logo-img[^"]*"[^>]*src=")[^"]*"/i, `$1${newLogoBaseUrl}"`);

// Junior Student:
// <div id="page-junior-student"... <div class="logo"> <img src="..." 
content = content.replace(/(<div id="page-junior-student"[\s\S]*?<div class="logo">[\s\S]*?<img[^>]*src=")[^"]*"/i, `$1${newLogoBaseUrl}"`);

fs.writeFileSync('index.html', content);
console.log('Replaced logos in index.html.');
