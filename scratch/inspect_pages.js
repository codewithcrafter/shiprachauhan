const fs = require('fs');
const path = require('path');

const rootFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

console.log('=== ROOT HTML FILES ===');
rootFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const faqItems = (content.match(/class="[^"]*faq-item[^"]*"/g) || []).length;
  const accordions = (content.match(/accordion/gi) || []).length;
  const hasFaqWord = /faq/i.test(content);
  console.log(`${f}: faq-items=${faqItems}, accordionMentions=${accordions}, hasFaqWord=${hasFaqWord}`);
});

