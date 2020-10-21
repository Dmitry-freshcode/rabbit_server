import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    email: {type: String , required:true},
    password: {type: String, required:true},
    status:{type:String,enum:['blocked','confirmed','created'],required: true, default:'created'},
    role:{type:String,enum:['user','staff','admin','none'],required: true, default:'none'}, 
    strategy: {type:String,enum:['google','local'],required: true, default:'local'}, 
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });
