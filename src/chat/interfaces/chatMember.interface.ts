import { Document } from 'mongoose';

export interface IChatMember extends Document {
    readonly _id: string, 
    readonly userId: string,
    readonly chatId: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,   
}
