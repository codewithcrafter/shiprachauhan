const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('curtain-brand-mark')) {
    console.log('Already has brand mark:', f);
    return;
  }

  // Find curtain gold edge line
  const regex = /(<div class="curtain-gold-edge"><\/div>)/;
  if (regex.test(content)) {
    const isCRLF = content.includes('\r\n');
    const newline = isCRLF ? '\r\n' : '\n';
    const brandMarkup = newline +
      '    <div class="curtain-brand-mark">' + newline +
      '      <span class="curtain-monogram">SC</span>' + newline +
      '      <span class="curtain-tagline">Shipra Chauhan · Strategic Advisory</span>' + newline +
      '    </div>';

    content = content.replace(regex, '$1' + brandMarkup);
    fs.writeFileSync(f, content, 'utf8');
    console.log('Successfully injected brand mark into:', f);
  } else {
    console.warn('Could not find curtain-gold-edge in:', f);
  }
});
