import { prop, getModelForClass, pre } from '@typegoose/typegoose';


class ServiceProduct {
    @prop({required: true, unique: true})
    product_name: string;

    @prop({required: true})
    product_price: number;

    @prop({required: true})
    product_quantity: number;

    @prop({required: true})
    product_quantityInStock: number;
}


// Middleware to set product_quantity to 0 always
@pre<ServiceProduct>('save', function () {
    this.product_quantity = 0;
})

const ServiceProductModel = getModelForClass(ServiceProduct)

export default ServiceProductModel;