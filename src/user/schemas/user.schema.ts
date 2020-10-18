import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    email: {type: String , required:true},
    password: {type: String, required:true},
    status:{type:String,enum:['blocked','confirmed','created'],required: true, default:'created'},
    role:{type:String,enum:['user','staff'],required: true},   
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });
