const fs = require('fs');

console.log('=== .htaccess ===');
if (fs.existsSync('.htaccess')) console.log(fs.readFileSync('.htaccess', 'utf8').substring(0, 500));

console.log('\n=== vercel.json ===');
if (fs.existsSync('vercel.json')) console.log(fs.readFileSync('vercel.json', 'utf8'));

console.log('\n=== netlify.toml ===');
if (fs.existsSync('netlify.toml')) console.log(fs.readFileSync('netlify.toml', 'utf8'));

