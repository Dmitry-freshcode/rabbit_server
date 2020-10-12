import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    email: {type: String , required:true},
    password: {type: String, required:true},
    status:{type: String, required: true, default: 'notConfirmed'},
    role: {type: String, required:true},    
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });
