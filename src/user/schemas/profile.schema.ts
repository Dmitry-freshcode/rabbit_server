import { Schema ,model} from 'mongoose';

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
    role: {type:String, enum:['user','staff','admin'] , required:true},
    isActive: {type: Boolean, default: false},
    isOnline: {type: Boolean, default: false},
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  });