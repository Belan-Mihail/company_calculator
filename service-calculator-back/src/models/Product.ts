import mongoose, {Document, Schema } from "mongoose";

interface Product extends Document {
    name: string,
    price: number,
    quantity: number,
    quantityInStock: number,
}