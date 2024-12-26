import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';

dotenv.config();
const app: Express = express();

// Middleware
app.use(
    cors({
      credentials: true,
      origin: ['http://localhost:5173'],
    })
  )
app.use(express.json());

// Connect to mongoose
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI as string)
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
  console.log('Eroor with MongoDB connection: ', error)
})



const port = 3000;

app.get('/api/products', (req: Request, res: Response) => {
    res.json(products)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})