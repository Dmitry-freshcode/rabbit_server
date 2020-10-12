import { Schema } from 'mongoose';

export const OrderServiceSchema = new Schema({
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
 