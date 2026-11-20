const fs = require('fs');
const path = require('path');

// 1. Files to update in root
const rootHtmlFiles = [
  'index.html',
  'about.html',
  'about-shipra-chauhan.html',
  'contact.html',
  'contact-shipra-chauhan.html',
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html',
  'blogs.html'
];

console.log('Fixing root HTML files...');
rootHtmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let html = fs.readFileSync(file, 'utf8');
    
    // Ensure relative style.css and main.js
    html = html.replace(/href="\/css\/style\.css/g, 'href="css/style.css');
    html = html.replace(/src="\/js\/main\.js/g, 'src="js/main.js');
    
    // Ensure relative assets/images
    html = html.replace(/src="\/assets\/images\//g, 'src="assets/images/');
    
    fs.writeFileSync(file, html, 'utf8');
    console.log(`Updated root: ${file}`);
  }
});

// 2. Synchronize subfolder index.html files so both /slug and /slug/ work seamlessly
const subfolders = [
  { dir: 'about', src: 'about.html' },
  { dir: 'about-shipra-chauhan', src: 'about-shipra-chauhan.html' },
  { dir: 'contact', src: 'contact.html' },
  { dir: 'contact-shipra-chauhan', src: 'contact-shipra-chauhan.html' },
  { dir: 'ecommerce-seo', src: 'ecommerce-seo.html' },
  { dir: 'geo-services', src: 'geo-services.html' },
  { dir: 'local-seo', src: 'local-seo.html' },
  { dir: 'off-page-seo', src: 'off-page-seo.html' },
  { dir: 'on-page-seo', src: 'on-page-seo.html' },
  { dir: 'technical-seo', src: 'technical-seo.html' }
];

subfolders.forEach(({ dir, src }) => {
  if (fs.existsSync(src)) {
    let content = fs.readFileSync(src, 'utf8');
    // Adapt paths for 1 level deeper
    content = content.replace(/href="css\/style\.css/g, 'href="../css/style.css');
    content = content.replace(/src="js\/main\.js/g, 'src="../js/main.js');
    content = content.replace(/src="assets\/images\//g, 'src="../assets/images/');
    
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), content, 'utf8');
    console.log(`Synchronized subfolder: ${dir}/index.html`);
  }
});

// 3. Create blogs/index.php to forward to dynamic blogs.php
const blogsIndexPhp = `<?php
/**
 * Route /blogs/ requests to dynamic blogs.php
 */
require_once __DIR__ . '/../blogs.php';
`;
fs.writeFileSync('blogs/index.php', blogsIndexPhp, 'utf8');
console.log('Created blogs/index.php');

// 4. Create blogs/.htaccess to route article slugs to ../blog.php?slug=$1
const blogsHtaccess = `DirectoryIndex index.php index.html

<IfModule mod_rewrite.c>
  RewriteEngine On

  # Route article slugs (e.g. /blogs/ai-overviews-local-search) to root blog.php
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^([^/]+)/?$ ../blog.php?slug=$1 [NC,L,QSA]
</IfModule>
`;
fs.writeFileSync('blogs/.htaccess', blogsHtaccess, 'utf8');
console.log('Created blogs/.htaccess');

console.log('Done fixing HTML files and directory routing.');
