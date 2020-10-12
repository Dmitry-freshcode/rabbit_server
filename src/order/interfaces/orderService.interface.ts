import { Document } from 'mongoose';

export interface IOrderService extends Document {
    readonly _id: string, 
    readonly serviceId: string,
    readonly orderId: string,   
   }
