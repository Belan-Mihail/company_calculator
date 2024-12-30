import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const authenticAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Autorization')?.replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({message: 'No token provided'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret')
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}