import { Document } from 'mongoose';

export interface IUser extends Document {   
    readonly email: string;    
    readonly password: string;
    readonly status: string;
    //readonly isActive: boolean;
}
