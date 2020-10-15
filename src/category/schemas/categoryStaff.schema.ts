import { Schema } from 'mongoose';

export const CategoryStaffSchema = new Schema({
    serviceId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required:true
    }, 
    staffId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },    
});

 