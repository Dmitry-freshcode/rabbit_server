import { Document } from 'mongoose';

export interface IOrder extends Document {
    readonly _id: string, 
    readonly userId: string,
    readonly staffId: string,      
    readonly categoryId: string; 
    readonly status: string;
    readonly timeStart: number,
    readonly timeEnd: number,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,   
}
