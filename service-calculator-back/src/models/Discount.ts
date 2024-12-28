import {  prop, getModelForClass, modelOptions  } from '@typegoose/typegoose';

@modelOptions({schemaOptions: {timestamps: true}})

class ServiceDiscount {
    @prop({required: true})
    discount_size: number

    @prop({required: true})
    available_from: number
}

const ServisDiscountModel = getModelForClass(ServiceDiscount)

export default ServisDiscountModel