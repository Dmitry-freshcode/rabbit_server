import { Document } from 'mongoose';

export interface ILocation extends Document {   
    readonly _id: string;    
    readonly userId: string;
    readonly loc: {
        type:string,
        coordinates: number[]
    };
}
