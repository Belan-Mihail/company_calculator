import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';

const app = express();

app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:5173'],
    })
  )

const port = 3000;

app.get('/api/products', (req: Request, res: Response) => {
    res.json(products)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})