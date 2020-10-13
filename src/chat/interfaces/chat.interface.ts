import { Document } from 'mongoose';

export interface IChat extends Document {
    readonly _id: string,    
    readonly createdAt: Date,
    readonly updatedAt: Date,   
}
