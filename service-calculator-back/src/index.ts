import express from 'express'
import { products } from './data/sampleProducts';

const app = express();

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello TS Backend!')
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})