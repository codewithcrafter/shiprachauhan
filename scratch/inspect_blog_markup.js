const fs = require('fs');

const f = 'blogs/ai-overviews-local-search.html';
const content = fs.readFileSync(f, 'utf8');

console.log('--- Search around H1 ---');
const h1Idx = content.indexOf('<h1');
console.log(content.slice(Math.max(0, h1Idx - 500), h1Idx + 500));

console.log('--- Search for tags in file ---');
const tagsMatch = content.match(/tags/gi);
console.log('Occurrences of "tags":', tagsMatch ? tagsMatch.length : 0);

const tagBlocks = content.match(/<div[^>]*class="[^"]*tag[^"]*"[\s\S]*?<\/div>/gi) || [];
console.log('Tag blocks count:', tagBlocks.length);
tagBlocks.forEach(t => console.log('Tag block snippet:', t.slice(0, 200)));

