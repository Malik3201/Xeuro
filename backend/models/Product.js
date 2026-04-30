// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    required: true,
    enum: ['Sportswear', 'Hosiery', 'Sublimation', 'Teamwear', 'Custom'],
  },
  // Store image URLs as plain strings — simple, no casting errors
  images: [String],
  MOQ: { type: Number, default: 50 },
  customizationOptions: {
    sublimation: { type: Boolean, default: false },
    embroidery: { type: Boolean, default: false },
    screenPrint: { type: Boolean, default: false },
    privateLabel: { type: Boolean, default: false },
  },
  stock: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true },
  tags: [String],
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', tags: 'text' });

export default mongoose.model('Product', productSchema);
