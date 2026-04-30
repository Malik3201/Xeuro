// routes/orderRoutes.js
import express from 'express';
import {
  createOrder, getOrders, updateOrderStatus,
  createCheckoutSession, stripeWebhook, submitInquiry,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createOrder);
router.post('/inquiry', submitInquiry);
router.post('/checkout', createCheckoutSession);
router.post('/webhook', express.raw({ type: 'application/json' }), stripeWebhook);
router.get('/', protect, getOrders);
router.patch('/:id/status', protect, updateOrderStatus);

export default router;
