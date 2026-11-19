const fs = require('fs');

console.log('=== Sanjeev vercel.json ===');
if (fs.existsSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/vercel.json')) {
  console.log(fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/vercel.json', 'utf8'));
}

console.log('\n=== Sanjeev netlify.toml ===');
if (fs.existsSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/netlify.toml')) {
  console.log(fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/netlify.toml', 'utf8'));
}

console.log('\n=== Sanjeev .htaccess ===');
if (fs.existsSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/.htaccess')) {
  console.log(fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/.htaccess', 'utf8').substring(0, 800));
}

