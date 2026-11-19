const fs = require('fs');

console.log('=== SANJEEV BLOGS.HTML ===');
const sanjeevBlogs = fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/blogs.html', 'utf8');
console.log('Size:', sanjeevBlogs.length);
sanjeevBlogs.split('\n').forEach((l, i) => {
  if (l.includes('<section') || l.includes('blog-grid') || l.includes('blog-card') || l.includes('<aside') || l.includes('sidebar-')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 100)}`);
  }
});

console.log('\n=== SANJEEV CONTACT-US.HTML ===');
const sanjeevContact = fs.readFileSync('c:/Users/user/Downloads/Sanjeev Kumar Malik/contact-us.html', 'utf8');
console.log('Size:', sanjeevContact.length);
sanjeevContact.split('\n').forEach((l, i) => {
  if (l.includes('<section') || l.includes('contact-') || l.includes('grid-') || l.includes('form-') || l.includes('faq')) {
    console.log(`L${i+1}: ${l.trim().substring(0, 100)}`);
  }
});

