import { Schema } from 'mongoose';

export const ChatSchema = new Schema({
},{
timestamps: {
  createdAt: 'created_at',
  updatedAt: 'updated_at',      
}  
  });
