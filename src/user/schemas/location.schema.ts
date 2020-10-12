import { Schema, model } from 'mongoose';

const LocationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    location: {
        lat:{type: String, required:true},
        lng:{type: String, required:true}
    },   
});

export const Location = model('Location',LocationSchema);