import { IUser } from './interfaces/user.interface';
import { IUserProfile } from './interfaces/userProfile.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserProfileDto } from './dto/createUserProfile.dto'
import { FindUserDto } from './dto/findUser.dto'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UserRepository{
    constructor(
        @InjectModel('User')
        private userModel: Model<IUser>,
        @InjectModel('Profile')
        private userProfileModel: Model<IUserProfile>
        ){}

    async createUser(User:CreateUserDto,Profile:CreateUserProfileDto):Promise<CreateUserProfileDto>{
        const user = new this.userModel(User);
        const newUser = await user.save();
        const idUser = newUser._id;
        const profile = new this.userProfileModel({...Profile, userId:idUser});        
        return await profile.save();
    }

    // async createUserProfile(User:CreateUserDto,Profile:CreateUserProfileDto,):Promise<CreateUserProfileDto>{
    //     const profile = new this.userProfileModel({...Profile, });
    //     return await profile.save();
    // }

    async findUser(data:FindUserDto):Promise<IUser | undefined>{    
        return await this.userModel.findOne(data).exec();
    }
}