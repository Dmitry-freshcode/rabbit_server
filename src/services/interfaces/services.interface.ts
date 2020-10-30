import { Document } from 'mongoose';

export interface IService extends Document {
    readonly _id: string,   
    readonly categoryId: string;    
    readonly name: string;
}
