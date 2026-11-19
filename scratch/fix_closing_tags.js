const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('</div>\n    </div> -->\n  </section>') || content.includes('</div>\n    </div> -->')) {
    console.log(`Found commented closing tags in ${f}! Fixing...`);
    content = content.replace(/<\/div>\s*<\/div>\s*-->\s*<\/section>/, '-->\n      </div>\n    </div>\n  </section>');
    fs.writeFileSync(f, content, 'utf8');
  }
});

