import { Schema } from 'mongoose';

export const RegistrationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },    
    token: {type: String, required:true},
    expireAt: {type:Date ,default :new Date(Date.now() + ( 3600 * 1000 * 24))},
},{
    timestamps: {      
      updatedAt: 'updated_at',
    }
  });