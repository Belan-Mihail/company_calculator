import express, { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import ServiceProductModel from "../models/Product";
import  {products}  from '../data/sampleProducts'; 



const seedRouter = express.Router()

seedRouter.get('/seed', asyncHandler(async (req: Request, res: Response) => {
    try {
        await ServiceProductModel.deleteMany({})
        const createdProducts = await ServiceProductModel.insertMany(products)

        

        
        res.json({createdProducts})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}))

export default seedRouter