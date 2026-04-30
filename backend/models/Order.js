// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    company: String,
    address: String,
    country: String,
  },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    customization: String,
  }],
  totalPrice: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  orderStatus: {
    type: String,
    enum: ['new', 'confirmed', 'in-production', 'shipped', 'delivered', 'cancelled'],
    default: 'new',
  },
  stripeSessionId: String,
  notes: String,
  isInquiry: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
