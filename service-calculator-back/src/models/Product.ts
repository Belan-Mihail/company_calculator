import { prop, getModelForClass, pre, modelOptions  } from '@typegoose/typegoose';

@modelOptions({ schemaOptions: {timestamps: true}})
@pre<ServiceProduct>('save', function (next) {
    this.product_quantity = 0; 
    next();
  })

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



const ServiceProductModel = getModelForClass(ServiceProduct)

export default ServiceProductModel;