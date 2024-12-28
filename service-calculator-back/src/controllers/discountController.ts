import { Request, Response } from "express";
import ServiDiscountModel from "../models/Discount";

// create a new Discount
export const createDiscount = async (req: Request, res: Response): Promise<void> => {
    try {
        const {discount_size, available_from} = req.body
        const newDiscount = new ServiDiscountModel({
            discount_size, 
            available_from,
        })
        await newDiscount.save()
        res.status(200).json(newDiscount)
    } catch (error) {
        res.status(400).json({ message: error.message})        
    }
}

// get allDiscount
export const getAllDiscounts = async (req: Request, res: Response):Promise<void> => {
    try {
        const discounts = await ServiDiscountModel.find()
        res.json(discounts)
    } catch (error) {
        res.status(400).json({ message: error.message})        
    }
}