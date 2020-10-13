import { Document } from 'mongoose';

export interface IServiceStaff extends Document {
    readonly _id: string,   
    readonly serviceId: string;    
    readonly staffId: string;     
}
