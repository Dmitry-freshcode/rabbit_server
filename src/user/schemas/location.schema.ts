import { Schema } from 'mongoose';

const pointSchema = new Schema({
    type: {
      type: String, 
      enum: ['Point'],
      default:'Point',
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
 });


export const LocationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    loc: {type: pointSchema,
        index: '2dsphere'}
   
});



