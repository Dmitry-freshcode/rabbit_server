import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    email: {type: String , required:true},
    password: {type: String, required:true},
    status:{type: String, required: true, default: 'notConfirmed'},
    IsActive: {type: Boolean, required:true, default:false},    
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });
