import express, { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel';  // 
import { sampleProducts } from '../data/sampleProducts'; 

const seedRouter = express.Router()

seedRouter.get('products/seed', asyncHandler(async (req: Request, res: Response) => {
    try {
        await Product.deleteMany({})

        const createdProducts = await Product.insertMany(sampleProducts)

        res.json({createdProducts})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}))

export default seedRouter