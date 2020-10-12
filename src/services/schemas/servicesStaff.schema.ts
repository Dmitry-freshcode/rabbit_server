import { Schema, model } from 'mongoose';

const ServiceStaffSchema = new Schema({
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

export const ServiceStaff = model('ServiceStaff',ServiceStaffSchema);