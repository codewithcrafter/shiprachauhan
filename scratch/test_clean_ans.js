const fs = require('fs');

const testContact = fs.readFileSync('contact.html', 'utf8');

function cleanAnswerText(raw) {
  // Strip all div, span, button, svg, class attributes, etc.
  let text = raw
    .replace(/<div[\s\S]*?<\/div>/gi, '') // remove any stray divs
    .replace(/<span[\s\S]*?<\/span>/gi, '')
    .replace(/<button[\s\S]*?<\/button>/gi, '')
    .replace(/<[^>]+>/g, '') // remove all tags
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

const lines = testContact.split('\n');
console.log('Testing cleaning...');

