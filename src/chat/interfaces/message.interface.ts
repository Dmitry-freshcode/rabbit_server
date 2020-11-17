import { Document } from 'mongoose';

export interface IMessage extends Document {
    readonly _id: string, 
    readonly userId: string,
    readonly chatId: string,      
    readonly message: string, 
    readonly addTime: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,   
}
