import express, { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import ServiceProductModel from "../models/Product";
import  {products}  from '../data/sampleProducts'; 
import ServiceDiscountModel from '../models/Discount';
import { discounts } from '../data/sampleDiscount';



const seedRouter = express.Router()

seedRouter.get('/seed', asyncHandler(async (req: Request, res: Response) => {
    try {
        await ServiceProductModel.deleteMany({})
        const createdProducts = await ServiceProductModel.insertMany(products)

        await ServiceDiscountModel.deleteMany({})
        const createdDiscount = await ServiceDiscountModel.insertMany(discounts)

        
        res.json({createdProducts, createdDiscount })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}))

export default seedRouter