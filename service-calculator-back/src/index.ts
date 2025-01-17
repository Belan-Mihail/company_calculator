import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import discountRoutes from './routes/discountRoutes';
import seedRouter from './routes/seedRouter';
import adminRouter from './routes/adminRouter';

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
mongoose.connect(process.env.MONGODB_URI as string)
.then(() => {
  console.log('Connected to MongoDB')
})
.catch((error) => {
  console.log('Eroor with MongoDB connection: ', error)
})

app.use('/api', productRoutes)
app.use('/api', discountRoutes)
app.use('/api', seedRouter)
app.use('/api/admin', adminRouter)


// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})