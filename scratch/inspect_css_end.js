const fs = require('fs');

const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');

console.log('Total lines:', lines.length);

// Find all section comments after line 4000
for (let i = 4000; i < lines.length; i++) {
  if (lines[i].includes('/* =') || lines[i].includes('/* ---')) {
    console.log(`Line ${i+1}: ${lines[i]}`);
  }
}

