const fs = require('fs');

const origContact = fs.readFileSync('scratch/original/contact.html', 'utf8');
const currContact = fs.readFileSync('contact.html', 'utf8');

console.log('Orig contact length:', origContact.length);
console.log('Curr contact length:', currContact.length);

const origBlogs = fs.readFileSync('scratch/original/blogs.html', 'utf8');
const currBlogs = fs.readFileSync('blogs.html', 'utf8');

console.log('Orig blogs length:', origBlogs.length);
console.log('Curr blogs length:', currBlogs.length);

