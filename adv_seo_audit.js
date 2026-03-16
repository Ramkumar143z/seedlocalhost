const fs = require('fs');
const files = ['index.html', 'ev-project.html'];
let out = '';

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let issues = [];
    out += `\n--- Advanced Auditing ${file} ---\n`;

    // 1. Semantic Tags
    if (!/<main[^>]*>/i.test(content)) issues.push("Missing <main> tag");
    if (!/<header[^>]*>/i.test(content)) issues.push("Missing <header> tag");
    if (!/<footer[^>]*>/i.test(content)) issues.push("Missing <footer> tag");

    // 2. Buttons missing accessible names (aria-label or text)
    let btnMatches = content.match(/<button[^>]*>([\s\S]*?)<\/button>/gi) || [];
    let emptyBtns = btnMatches.filter(b => {
        let text = b.replace(/<[^>]*>/g, '').trim();
        let aria = /aria-label=["'].*?["']/i.test(b);
        return text.length === 0 && !aria;
    });
    if (emptyBtns.length > 0) issues.push(`${emptyBtns.length} buttons missing text or aria-label`);

    // 3. SVG missing aria-hidden or role if used as icons without text
    let svgMatches = content.match(/<svg[^>]*>([\s\S]*?)<\/svg>/gi) || [];
    let inaccessibleSvgs = svgMatches.filter(svg => {
        return !/aria-hidden=["']true["']/i.test(svg) && !/role=["']img["']/i.test(svg) && !/aria-label=/i.test(svg);
    });
    if (inaccessibleSvgs.length > 0) issues.push(`${inaccessibleSvgs.length} SVGs might need aria-hidden="true" or role="img"`);
    
    // 4. Links pointing to # without aria-label (often used as buttons)
    let hashLinks = content.match(/<a[^>]*href=["']#["'][^>]*>([\s\S]*?)<\/a>/gi) || [];
    let badHashLinks = hashLinks.filter(a => {
        let text = a.replace(/<[^>]*>/g, '').trim();
        let aria = /aria-label=["'].*?["']/i.test(a);
        return text.length === 0 && !aria;
    });
    if (badHashLinks.length > 0) issues.push(`${badHashLinks.length} empty links pointing to #`);

    if (issues.length === 0) out += "No advanced issues found.\n";
    else issues.forEach(issue => out += ("- " + issue + "\n"));
});

fs.writeFileSync('adv_audit_results.txt', out);
console.log("Advanced audit completed");
