import { Request, } from 'express'

// Extend for Request
export interface CustomRequest extends Request {
    user?: {
        username: string,
        _id: string
    }
}

