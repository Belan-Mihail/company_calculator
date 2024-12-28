import { Request, Response } from "express";
import ServiceDiscountModel from "../models/Discount";

// create a new Discount
export const createDiscount = async (req: Request, res: Response): Promise<void> => {
    try {
        const {discount_size, available_from} = req.body
        const newDiscount = new ServiceDiscountModel({
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
        const discounts = await ServiceDiscountModel.find()
        res.json(discounts)
    } catch (error) {
        res.status(400).json({ message: error.message})        
    }
}

// get discount by id
export const getDiscountById = async (req: Request, res: Response):Promise<void> => {
    try {
        const discount = await ServiceDiscountModel.findById(req.params.id)
        if (!discount) {
            res.status(400).json({message: 'Discount nit found'})
            return
        }
        res.json(discount)
    } catch (error) {
        res.status(400).json({ message: error.message})        
    }
}

// update Discount
export const updateDicount = async (req: Request, res: Response):Promise<void> => {
    try {
        const { discount_size, available_from} = req.body
        const discount = await ServiceDiscountModel.findByIdAndUpdate(req.params.id, {discount_size, available_from}, {new: true})
        if (!discount) {
            res.status(400).json({message: 'Discount not found'})
            return
        }
        res.json(discount)
    } catch (error) {
        res.status(400).json({ message: error.message})
        
    }
}

// delete Discount
export const deleteDiscount = async (req: Request, res: Response):Promise<void> => {
    try {
        const discount = await ServiceDiscountModel.findByIdAndDelete(req.params.id)
        if (!discount) {
            res.status(400).json({message: 'Discount not found'})
            return
        }
        res.json({message: 'The discount has been successfully deleted.'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}