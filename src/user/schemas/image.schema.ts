import { Schema, model } from 'mongoose';

const ImageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    imageSrc:{type: String, required:true}
});

export const Image = model('Image',ImageSchema);