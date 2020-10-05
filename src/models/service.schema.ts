import { Schema, model } from 'mongoose';

const ServiceSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    name:{type: String, required:true},
    imageSrc:{type: String, required:true}
});

export const Service = model('Service',ServiceSchema);