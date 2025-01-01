import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authenticAdmin } from '../middleware/utils'; 

const router:Router = Router()

router.post('/products', authenticAdmin, createProduct)
router.get('/products', getAllProducts)
router.get('/products/:id', authenticAdmin, getProductById)
router.put('/products/id', authenticAdmin, updateProduct)
router.delete('/products/:id', authenticAdmin, deleteProduct)

export default router