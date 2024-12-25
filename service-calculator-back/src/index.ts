import express, {Request, Response} from 'express'
import { products } from './data/sampleProducts';

const app = express();

const port = 3000;

app.get('/api/products', (req: Request, res: Response) => {
    res.json(products)
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})