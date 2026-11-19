const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Helper to update links in an HTML string
function cleanLinks(html) {
  return html
    .replace(/href="index\.html"/g, 'href="/"')
    .replace(/href="index\.html#services"/g, 'href="/#services"')
    .replace(/href="about\.html"/g, 'href="/about"')
    .replace(/href="blogs\.html"/g, 'href="/blogs"')
    .replace(/href="contact\.html"/g, 'href="/contact"')
    .replace(/href="ecommerce-seo\.html"/g, 'href="/ecommerce-seo"')
    .replace(/href="geo-services\.html"/g, 'href="/geo-services"')
    .replace(/href="local-seo\.html"/g, 'href="/local-seo"')
    .replace(/href="off-page-seo\.html"/g, 'href="/off-page-seo"')
    .replace(/href="on-page-seo\.html"/g, 'href="/on-page-seo"')
    .replace(/href="technical-seo\.html"/g, 'href="/technical-seo"')
    // Handle any relative links without leading slash in subpages
    .replace(/href="https:\/\/shiprachauhan\.in\/([^"]*?)\/"/g, 'href="https://shiprachauhan.in/$1"');
}

// 1. Process root HTML files
const rootHtmlFiles = [
  'index.html',
  'about.html',
  'blogs.html',
  'contact.html',
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

rootHtmlFiles.forEach(f => {
  const p = path.join(rootDir, f);
  if (!fs.existsSync(p)) return;
  let content = fs.readFileSync(p, 'utf8');
  content = cleanLinks(content);
  fs.writeFileSync(p, content, 'utf8');
  console.log(`Cleaned links in ${f}`);
});

// 2. Setup directory routing
const routes = [
  { slug: 'about', src: 'about.html' },
  { slug: 'about-shipra-chauhan', src: 'about.html' },
  { slug: 'contact', src: 'contact.html' },
  { slug: 'contact-shipra-chauhan', src: 'contact.html' },
  { slug: 'blogs', src: 'blogs.html' },
  { slug: 'ecommerce-seo', src: 'ecommerce-seo.html' },
  { slug: 'geo-services', src: 'geo-services.html' },
  { slug: 'local-seo', src: 'local-seo.html' },
  { slug: 'off-page-seo', src: 'off-page-seo.html' },
  { slug: 'on-page-seo', src: 'on-page-seo.html' },
  { slug: 'technical-seo', src: 'technical-seo.html' },
  // Under services/
  { slug: 'services/ecommerce-seo', src: 'ecommerce-seo.html' },
  { slug: 'services/geo-services', src: 'geo-services.html' },
  { slug: 'services/local-seo', src: 'local-seo.html' },
  { slug: 'services/off-page-seo', src: 'off-page-seo.html' },
  { slug: 'services/on-page-seo', src: 'on-page-seo.html' },
  { slug: 'services/technical-seo', src: 'technical-seo.html' }
];

routes.forEach(r => {
  const dir = path.join(rootDir, r.slug);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const srcPath = path.join(rootDir, r.src);
  if (fs.existsSync(srcPath)) {
    let content = fs.readFileSync(srcPath, 'utf8');
    content = cleanLinks(content);
    fs.writeFileSync(path.join(dir, 'index.html'), content, 'utf8');
    console.log(`Created route directory: ${r.slug}/index.html`);
  }
});

// 3. Process all blog HTML files
const blogsDir = path.join(rootDir, 'blogs');
if (fs.existsSync(blogsDir)) {
  const blogEntries = fs.readdirSync(blogsDir);
  blogEntries.forEach(item => {
    const itemPath = path.join(blogsDir, item);
    if (item.endsWith('.html')) {
      let content = fs.readFileSync(itemPath, 'utf8');
      content = cleanLinks(content);
      fs.writeFileSync(itemPath, content, 'utf8');
    } else if (fs.statSync(itemPath).isDirectory()) {
      const idxPath = path.join(itemPath, 'index.html');
      if (fs.existsSync(idxPath)) {
        let content = fs.readFileSync(idxPath, 'utf8');
        content = cleanLinks(content);
        fs.writeFileSync(idxPath, content, 'utf8');
      }
    }
  });
  console.log('Cleaned links across all blog files.');
}

// 4. Create .htaccess (Strict clean URLs, no .html, no trailing slash)
const htaccess = `# ==============================================================================
# SHIPRA CHAUHAN - APACHE / LITESPEED / CPANEL CLEAN URL CONFIGURATION
# STRICTLY NO .HTML AND NO TRAILING SLASHES
# ==============================================================================

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # 1. Redirect /index.html directly to root domain /
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,}\\s/index\\.html [NC]
  RewriteRule ^index\\.html$ / [R=301,L]

  # 2. Redirect /subfolder/index.html to /subfolder (NO trailing slash)
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,}\\s/(.*)/index\\.html [NC]
  RewriteRule ^(.*)/index\\.html$ /$1 [R=301,L]

  # 3. Permanent 301 Redirect from any request ending in .html to Clean URL
  RewriteCond %{THE_REQUEST} ^[A-Z]{3,}\\s([^.]+)\\.html [NC]
  RewriteRule ^ %1 [R=301,L]

  # 4. Remove trailing slash from all non-root URLs (e.g. /about/ -> /about)
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_URI} ^(.+)/$
  RewriteRule ^(.+)/$ $1 [R=301,L]

  # 5. Internally route Clean URLs to the corresponding .html file
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{DOCUMENT_ROOT}/$1.html -f
  RewriteRule ^(.*)$ $1.html [NC,L]

  # 6. Fallback internal route to directory index.html
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^(.*)$ $1/index.html [NC,L]
</IfModule>

# Browser Caching & Performance
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
`;
fs.writeFileSync(path.join(rootDir, '.htaccess'), htaccess, 'utf8');
console.log('Created .htaccess');

// 5. Create vercel.json
const vercelJson = {
  cleanUrls: true,
  trailingSlash: false,
  headers: [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
      ]
    }
  ]
};
fs.writeFileSync(path.join(rootDir, 'vercel.json'), JSON.stringify(vercelJson, null, 2), 'utf8');
console.log('Created vercel.json');

// 6. Create _redirects and netlify.toml
const redirects = `# Netlify & Cloudflare Pages Clean URLs Redirection Rules
# Strictly NO .html and NO trailing slashes
/index.html                     /                               301!
/about-shipra-chauhan/          /about-shipra-chauhan           301!
/about/                         /about                          301!
/blogs/                         /blogs                          301!
/contact/                       /contact                        301!
/services/*                     /services/:splat                301!
/blogs/*                        /blogs/:splat                   301!
`;
fs.writeFileSync(path.join(rootDir, '_redirects'), redirects, 'utf8');
console.log('Created _redirects');

const netlifyToml = `[build]
  publish = "."

[[redirects]]
  from = "/index.html"
  to = "/"
  status = 301
  force = true

[[redirects]]
  from = "/:slug/"
  to = "/:slug"
  status = 301
  force = true

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
`;
fs.writeFileSync(path.join(rootDir, 'netlify.toml'), netlifyToml, 'utf8');
console.log('Created netlify.toml');

