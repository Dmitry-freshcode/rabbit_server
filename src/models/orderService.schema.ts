import { Schema, model } from 'mongoose';

const OrderServiceSchema = new Schema({
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required:true
    }, 
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order',
        required:true
    },    
});

export const OrderService = model('OrderService',OrderServiceSchema);