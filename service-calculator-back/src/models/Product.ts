import mongoose, {Document, Schema } from "mongoose";

interface ServiceProduct extends Document {
    product_name: string,
    product_price: number,
    product_quantity: number,
    product_quantityInStock: number,
}

const serviceProductSchema: Schema = new Schema ({
    product_name: {type: String, required: true, unique: true},
    product_price: {type: Number, required: true},
    product_quantity: {type: Number, required: true, min: 0},
    product_quantityInStock: {type: Number, required: true, min: 0},
},
{ timestamps: true }
)

// Middleware to set product_quantity to 0 always
serviceProductSchema.pre('save', function(next) {
    this.product_quantity = 0;
    next()
})

const ServiceProductModel = mongoose.model<ServiceProduct>('ServiceProduct', serviceProductSchema)

export default ServiceProductModel;