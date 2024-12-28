import { Request, Response } from "express";
import ServisDiscountModel from "../models/Discount";

// create a new Discount
export const createDiscount = async (req: Request, res: Response): Promise<void> => {
    try {
        const {discount_size, available_from} = req.body
        const newDiscount = new ServisDiscountModel({
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
        const discounts = await ServisDiscountModel.find()
        res.json(discounts)
    } catch (error) {
        res.status(400).json({ message: error.message})        
    }
}

// get discount by id
export const getDiscountById = async (req: Request, res: Response):Promise<void> => {
    try {
        const discount = await ServisDiscountModel.findById(req.params.id)
        if (!discount) {
            res.status(400).json({message: 'Discount nit found'})
            return
        }
        res.json(discount)
    } catch (error) {
        res.status(400).json({ message: error.message})        
    }
}