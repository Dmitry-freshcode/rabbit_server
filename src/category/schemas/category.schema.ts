import { Schema, model } from 'mongoose';

export const CategorySchema = new Schema({    
    name:{type: String, required:true},
    imageSrc:{type: String, required:true}
});
