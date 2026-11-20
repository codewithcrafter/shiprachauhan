const fs = require('fs');

const files = [
  'index.html',
  'about.html',
  'contact.html',
  'ecommerce-seo.html',
  'geo-services.html',
  'local-seo.html',
  'off-page-seo.html',
  'on-page-seo.html',
  'technical-seo.html'
];

files.forEach(f => {
  const html = fs.readFileSync(f, 'utf8');
  // Match FAQ section
  const faqMatch = html.match(/<section[^>]*id="faqs?"[^>]*>[\s\S]*?<\/section>/i) ||
                   html.match(/<section[^>]*class="[^"]*section-faq[^"]*"[^>]*>[\s\S]*?<\/section>/i) ||
                   html.match(/<section[^>]*>([\s\S]*?(?:Frequently Asked Questions|Technical SEO Audit FAQs|FAQs - GEO)[\s\S]*?)<\/section>/i);
  
  const footerIdx = html.indexOf('<footer');
  if (faqMatch) {
    const faqIdx = html.indexOf(faqMatch[0]);
    const afterFaq = html.slice(faqIdx + faqMatch[0].length, footerIdx).trim();
    console.log(`\n=== ${f} ===`);
    console.log('FAQ section length:', faqMatch[0].length);
    console.log('Content between FAQ and footer length:', afterFaq.length);
    if (afterFaq.length > 0) {
      const heading = afterFaq.match(/<h[1-4][^>]*>([\s\S]*?)<\/h[1-4]>/i);
      console.log('Section between FAQ and footer heading:', heading ? heading[1].replace(/<[^>]+>/g, '').trim() : 'no heading');
    } else {
      console.log('FAQ IS ALREADY AT THE VERY BOTTOM (DIRECTLY ABOVE FOOTER)');
    }
  } else {
    console.log(`\n=== ${f} NO FAQ MATCHED ===`);
  }
});

