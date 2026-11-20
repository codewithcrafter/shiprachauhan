const fs = require('fs');

const html = fs.readFileSync('blogs/ai-overviews-local-search.html', 'utf8');
const formMatch = html.match(/<form class="blog-sidebar-form"[\s\S]*?<\/form>/i);
console.log(formMatch ? formMatch[0] : 'None');

