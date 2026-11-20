const fs = require('fs');

const js = fs.readFileSync('js/main.js', 'utf8');
const popupMatch = js.match(/(?:function\s+initTimedModal|initTimedPopupModal|timed-popup-modal)[\s\S]*?(?:}\s*\n\s*function|\n\s*\/\/ ---|\Z)/i);
if (popupMatch) {
  console.log('Found popup function:');
  console.log(popupMatch[0]);
} else {
  // search for popup or modal
  const matches = [...js.matchAll(/modal|popup/gi)];
  console.log('Matches for modal/popup:', matches.length);
  const lines = js.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('modal') || l.includes('popup') || l.includes('setTimeout')) {
      console.log(`Line ${idx + 1}: ${l}`);
    }
  });
}

