const fs = require('fs');
let content = fs.readFileSync('js/app.js', 'utf-8');

content = content.replace(
    '        match: (latex) => {\n            const expMatches = (latex.match(/\\^/g) || []).length;\n            return expMatches >= 2 || (latex.includes(\'^\') && (latex.includes(\'\\\\cdot\') || latex.includes(\'*\') || latex.includes(\')(\')));\n        },',
    '        match: (latex) => {\n            return (latex.includes(\'^\') && (latex.includes(\'\\\\cdot\') || latex.includes(\'*\'))) || latex.includes(\')^\');\n        },'
);

fs.writeFileSync('js/app.js', content, 'utf-8');
console.log('Exponent rule patched.');
