const fs = require('fs');

const { processPage } = require('./build_authentic_md_files.js');
console.log('Testing blog conversion:');
const blogMd = processPage('blogs/ai-overviews-local-search.html');
console.log('Length:', blogMd.length);
console.log('Preview:');
console.log(blogMd.slice(0, 1000));

