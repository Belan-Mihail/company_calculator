import { Request, Response } from 'express';
import ServiceProductModel from '../models/Product';

// Create a new product
export const createProduct = async (req: Request, res: Response):Promise<void> => {
    try {
        const {product_name, product_price, product_quantity, product_quantityInStock} = req.body;
        const newProduct = new ServiceProductModel({
            product_name,
            product_price,
            product_quantity,
            product_quantityInStock,
        });
        await newProduct.save();
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).json({ message: error.message})
    }

}