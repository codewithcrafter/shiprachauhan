const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf8');
const matches = [...css.matchAll(/\.service-hero-showcase[^{]*\{[^}]*\}/gi)];
matches.forEach(m => console.log(m[0]));

