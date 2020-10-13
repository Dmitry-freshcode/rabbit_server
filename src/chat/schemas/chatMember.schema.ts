import { Schema } from 'mongoose';

export const ChatMemberSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required:true
    }, 
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required:true
    } 
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',      
    }  
} );
