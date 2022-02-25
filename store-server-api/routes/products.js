import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.js';



const router = express.Router();

router.get('/products', getProducts);
router.post('/products', createProduct);
router.get('/products/:id', getProduct);
router.delete('/products/:id', deleteProduct);
router.patch('/products/:id', updateProduct);

export default router;