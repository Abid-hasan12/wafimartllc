import express from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// রুটস ম্যাপিং
router.route('/').get(getProducts).post(protect, createProduct);
router.route('/:id').get(getProductById);

export default router;