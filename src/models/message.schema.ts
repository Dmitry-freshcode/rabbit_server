import { Schema, model } from 'mongoose';

const MessageSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required:true
    },
    message: {type: String, required:true},        
},{
    timestamps: {
      createdAt: 'created_at',      
    }
  });

export const Message = model('Message',MessageSchema);