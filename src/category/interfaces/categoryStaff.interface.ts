import { Document } from 'mongoose';

export interface ICategoryStaff extends Document {
    readonly _id: string,   
    readonly serviceId: string;    
    readonly staffId: string;     
}
