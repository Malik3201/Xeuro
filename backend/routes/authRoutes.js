// routes/authRoutes.js
import express from 'express';
import { loginAdmin, seedAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/seed', seedAdmin); // Disable after first use in production

export default router;
