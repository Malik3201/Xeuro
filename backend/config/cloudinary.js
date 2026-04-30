// config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage — file buffer is passed directly to Cloudinary stream
export const upload = multer({ storage: multer.memoryStorage() });

/**
 * Upload a file buffer to Cloudinary v2.
 * @param {Buffer} buffer - The file buffer from multer.
 * @param {string} folder - Cloudinary folder name.
 * @returns {Promise<object>} Cloudinary upload result.
 */
export const uploadToCloudinary = (buffer, folder = 'xeuro-sports/products') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

export default cloudinary;
