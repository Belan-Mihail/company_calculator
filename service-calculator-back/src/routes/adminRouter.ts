import express, { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import AdminModel from '../models/Admin';

const adminRouter = express.Router()

adminRouter.get('/create-admin', asyncHandler(async (req: Request, res: Response):Promise<void> => {
    try {
        const username = process.env.ADMIN_USERNAME
        const password = process.env.ADMIN_PASSWORD

        // check if admin exist
        const existingAdmin = await AdminModel.findOne({username})
        if (existingAdmin) {
            res.status(400).json({message: 'Admin already exist!'})
            return
        }

        // create a newAdmin 
        const newAdmin = new AdminModel({username, password})
        await newAdmin.save()
        res.status(201).json({message: 'Admin created succesfully!'})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}))

// Admin login logic
adminRouter.post('/login', asyncHandler(async (req:Request, res: Response) => {
    const {username, password} = req.body

    // Find admin by name
    const admin = await AdminModel.findOne({ username })
    if (!admin) {
        res.status(400).json({message: 'Admin not found!'})
        return
    } 
}))