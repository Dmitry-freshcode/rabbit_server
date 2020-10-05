import { timeStamp } from 'console';
import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }, 
    staffId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }, 
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    status:{type:String,enum:['done','not performed','performed'],required: true, default:'performed'},
    timeStart:{type: timeStamp,required: true},
    timeEnd:{type: timeStamp,required: true}

},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });

export const Order = model('Order',OrderSchema);