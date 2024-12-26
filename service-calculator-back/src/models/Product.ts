import mongoose, {Document, Schema } from "mongoose";

interface ServiceProduct extends Document {
    product_name: string,
    product_price: number,
    product_quantity: number,
    product_quantityInStock: number,
}

const productSchema: Schema = new Schema ({
    product_name: {type: String, required: true, unique: true},
    product_price: {type: Number, required: true},
    product_quantity: {type: Number, required: true, min: 0},
    product_quantityInStock: {type: Number, required: true, min: 0},
},
{ timestamps: true }
)

const ServiceProductModel = mongoose.model<ServiceProduct>('ServiceProduct', productSchema)

export default ServiceProductModel;