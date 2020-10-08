import { Document } from 'mongoose';

export interface IRegistration extends Document {   
    readonly userId: string;    
    readonly token: string;
    readonly expireAt: Date;    
}
