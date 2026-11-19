const fs = require('fs');

const html = fs.readFileSync('ecommerce-seo.html', 'utf8');

// Check if metrics strip is present
console.log('ecommerce-seo has metrics strip:', html.includes('service-metrics-strip'));

// Check how many cards and faq items exist
const cardCount = (html.match(/class="[^"]*card[^"]*"/g) || []).length;
const faqCount = (html.match(/class="[^"]*faq-item[^"]*"/g) || []).length;
console.log('cardCount:', cardCount, 'faqCount:', faqCount);

