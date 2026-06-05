const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const images = [
  'cloud & infrastructure.jpeg',
  'Chatbot & Conversational AI.jpg',
  'E-commerce.jpg',
  'Real Estate.png',
  'Logistics.png',
  'Restaurants-mobile.png',
  'ai automation.png'
];

const srcDir = '/Users/shahm/Desktop/CloudTopia V2/public/images/homepage';

async function compress() {
  for (const img of images) {
    const srcPath = path.join(srcDir, img);
    const ext = path.extname(img);
    const base = path.basename(img, ext);
    const destPath = path.join(srcDir, `${base}.webp`);

    console.log(`Compressing ${img}...`);
    try {
      await sharp(srcPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(destPath);
      
      const srcStats = fs.statSync(srcPath);
      const destStats = fs.statSync(destPath);
      console.log(`Done! ${img}: ${(srcStats.size / 1024 / 1024).toFixed(2)} MB -> ${(destStats.size / 1024).toFixed(2)} KB`);
    } catch (err) {
      console.error(`Error compressing ${img}:`, err);
    }
  }
}

compress();
