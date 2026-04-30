// routes/productRoutes.js
import express from 'express';
import {
  getProducts, getProductById, createProduct,
  updateProduct, deleteProduct, toggleAvailability,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, upload.array('images', 10), createProduct);
router.put('/:id', protect, updateProduct);
router.patch('/:id/toggle', protect, toggleAvailability);
router.delete('/:id', protect, deleteProduct);

export default router;
