import { Schema } from 'mongoose';

export const ProfileSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },    
    lastName: {type: String, required:true},
    firstName: {type: String, required:true},
    middleName: {type: String, required:true},
    birthday: {type: Date, required:true},
    city: {type: String, required:true},
    state: {type: String, required:true},    
    isOnline: {type: Boolean, required:true, default: false},
    userAvatar:{type:String, required:true, default: ''}
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });