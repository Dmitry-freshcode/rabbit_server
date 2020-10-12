import { Schema, model } from 'mongoose';

const ChatSchema = new Schema({
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });

export const  Chat = model(' Chat', ChatSchema);