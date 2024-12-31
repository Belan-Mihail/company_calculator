import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

// Extend for Request
export interface CustomRequest extends Request {
    user?: {
        username: string,
        _id: string
    }
}

export const authenticAdmin = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({message: 'No token provided'})
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret')
        req.user = decoded as { username: string; _id: string }
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
    }
}