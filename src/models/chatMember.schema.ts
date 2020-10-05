import { Schema, model } from 'mongoose';

const ChatMemberSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required:true
    }, 
    chatId: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required:true
    },    
});

export const ChatMember = model('ChatMember',ChatMemberSchema);