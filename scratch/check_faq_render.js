const fs = require('fs');

const indexMd = fs.readFileSync('scratch/build_authentic_md_files.js', 'utf8');
const runScript = require('./scratch/build_authentic_md_files.js');
// Let's inspect the FAQ part of indexMd

