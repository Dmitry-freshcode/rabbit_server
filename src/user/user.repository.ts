import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UserRepository{
    constructor(
        @InjectModel('User')
        private userModel: Model<IUser>,
      
        ){}

    async createUser(User:CreateUserDto):Promise<IUser>{
        const user = new this.userModel(User);
        return await user.save();
    }

     async updateStatus(id:string,status:string):Promise<void>{  
        return await this.userModel.updateOne({_id:id},{status:status});
    }

    async findUserByEmail(email:string):Promise<IUser | undefined>{                     
        return await this.userModel.findOne({email:email}).exec();
    }
    async findUserById(id:string):Promise<IUser | undefined>{                
        return await this.userModel.findOne({_id:id}).exec();
    }

}