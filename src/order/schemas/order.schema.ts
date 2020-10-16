import { Schema } from 'mongoose';


export const OrderSchema = new Schema({
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
    status:{type:String,enum:['done','not performed','performed'],required: true, default:'not performed'},
    timeStart: {type: Date,required: true},
    timeEnd: {type: Date,required: true}

},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });
