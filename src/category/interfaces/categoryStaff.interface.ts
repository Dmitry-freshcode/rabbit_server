import { Document } from 'mongoose';

export interface ICategoryStaff extends Document {
    readonly _id: string,   
    readonly categoryId: string;    
    readonly staffId: string;     
}
