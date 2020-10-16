import { Schema } from 'mongoose';

export const CategoryStaffSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    }, 
    staffId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },    
});

 