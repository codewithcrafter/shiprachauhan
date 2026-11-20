const fs = require('fs');

const dirs = [
  'admin',
  'admin/uploads',
  'admin/assets',
  'admin/assets/css',
  'admin/assets/js',
  'config'
];

dirs.forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

console.log('Admin directories ready.');

