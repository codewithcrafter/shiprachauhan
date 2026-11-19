const fs = require('fs');

function extractFaqsClean(content) {
  // Extract all (question, answer) pairs cleanly
  const items = [];
  
  // Method: Match each block of FAQ
  // Look for buttons and their corresponding content inner
  const regex = /<button[^>]*class="[^"]*(?:faq-trigger|faq-question-btn|accordion-trigger)[^"]*"[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div class="(?:faq-content-inner|faq-answer|accordion-inner)"[^>]*>([\s\S]*?)<\/div>/g;
  
  let m;
  while ((m = regex.exec(content)) !== null) {
    let q = m[1]
      .replace(/<svg[\s\S]*?<\/svg>/g, '')
      .replace(/<span class="(?:faq-num|faq-icon-toggle|accordion-icon|faq-chevron)"[^>]*>[\s\S]*?<\/span>/g, '')
      .replace(/<div class="(?:accordion-icon)"[^>]*>[\s\S]*?<\/div>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    q = q.replace(/^\d+\s*[\.\/]\s*/, '').trim();

    let ans = m[2].trim();
    // remove any residual faq-item comments
    ans = ans.replace(/<!--[\s\S]*?-->/g, '').trim();

    items.push({ question: q, answer: ans });
  }

  return items;
}

const testContact = fs.readFileSync('contact.html', 'utf8');
const faqs = extractFaqsClean(testContact);
console.log('Clean contact faqs count:', faqs.length);
faqs.forEach((f, i) => console.log(i + 1, f.question));

