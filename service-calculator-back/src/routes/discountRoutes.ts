import { Router } from 'express';
import { createDiscount, getAllDiscounts, getDiscountById, updateDicount, deleteDiscount } from '../controllers/discountController';
import { authenticAdmin } from '../middleware/utils'; 

const router:Router = Router()

router.post('/discounts', authenticAdmin, createDiscount)
router.get('/discounts', getAllDiscounts)
router.get('/discounts/:id', authenticAdmin, getDiscountById)
router.put('/discounts/id', authenticAdmin, updateDicount)
router.delete('/discounts/:id', authenticAdmin, deleteDiscount)

export default router