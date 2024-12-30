import express, { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import AdminModel from '../models/Admin';

const adminRouter = express.Router()

adminRouter.get('/create-admin', asyncHandler(async (req: Request, res: Response) => {
    try {
        const username = process.env.ADMIN_USERNAME
        const password = process.env.ADMIN_PASSWORD

        // create a newAdmin 
        const newAdmin = new AdminModel({username, password})
        await newAdmin.save()
        res.status(201).json({message: 'Admin created succesfully!'})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}))