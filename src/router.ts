import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';

import { createCategory } from './useCases/categories/createCategory';
import { listCategories } from './useCases/categories/listCategories';
import { listProductsByCategory } from './useCases/categories/listProductsByCategory';
import { cancelOrder } from './useCases/orders/cancelOrder';
import { changeOrderStatus } from './useCases/orders/changeOrderStatus';
import { createOrder } from './useCases/orders/createOrder';
import { listOrders } from './useCases/orders/listOrders';
import { createProduct } from './useCases/products/createProduct';
import { listProducts } from './useCases/products/listProducts';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List Orders
router.get('/orders', listOrders);
// Create order
router.post('/orders', createOrder);
// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/Cancel order
router.delete('/orders/:orderId', cancelOrder);
