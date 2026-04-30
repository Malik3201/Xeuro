import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Cloud name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'SET' : 'MISSING');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING');

try {
  const result = await cloudinary.api.ping();
  console.log('\n✅ Cloudinary connected:', result.status);
} catch (e) {
  console.error('\n❌ Cloudinary error:', e.message, e.http_code);
}
