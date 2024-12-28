import { Router } from 'express';
import { createDiscount, getAllDiscounts, getDiscountById, updateDicount, deleteDiscount } from '../controllers/discountController';

const router:Router = Router()

router.post('/discounts', createDiscount)
router.get('/discounts', getAllDiscounts)
router.get('/discounts/:id', getDiscountById)
router.put('/discounts/id', updateDicount)
router.delete('/discounts/:id', deleteDiscount)

export default router