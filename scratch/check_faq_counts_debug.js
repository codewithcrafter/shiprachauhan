const fs = require('fs');

const contact = fs.readFileSync('contact.html', 'utf8');
const contactFaqs = (contact.match(/class="[^"]*faq-item[^"]*"/g) || []).length;
console.log('contact.html faq-item count:', contactFaqs);

const ecom = fs.readFileSync('ecommerce-seo.html', 'utf8');
const ecomFaqs = (ecom.match(/class="[^"]*faq-item[^"]*"/g) || []).length;
console.log('ecommerce-seo.html faq-item count:', ecomFaqs);

