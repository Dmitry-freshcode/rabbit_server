import { Schema } from 'mongoose';

export const ServiceSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    name:{type: String, required:true},
});




