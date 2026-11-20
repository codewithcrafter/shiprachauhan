const fs = require('fs');

if (fs.existsSync('scratch/pure_qa_dictionary.json')) {
  const dict = JSON.parse(fs.readFileSync('scratch/pure_qa_dictionary.json', 'utf8'));
  console.log('Pages in dictionary:', Object.keys(dict));
  Object.keys(dict).forEach(k => console.log(k, '=>', dict[k].length, 'Q&As'));
} else {
  console.log('pure_qa_dictionary.json does not exist');
}

