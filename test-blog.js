const { getAllPosts } = require('./lib/blog');
const postsEn = getAllPosts('en');
const postsAr = getAllPosts('ar');
const postsTr = getAllPosts('tr');

console.log('EN posts:', postsEn.length);
console.log('AR posts:', postsAr.length);
console.log('TR posts:', postsTr.length);
console.log('Sample AR post:', postsAr[0]);
