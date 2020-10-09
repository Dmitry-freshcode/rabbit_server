import { IUser } from './interfaces/user.interface';
import { IUserProfile } from './interfaces/userProfile.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateUserProfileDto } from './dto/createUserProfile.dto';
import { IRegistration } from './interfaces/registration.interface'
import { ConfirmUserDto } from './dto/confirmUser.dto'
import { FindUserDto } from './dto/findUser.dto'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UserRepository{
    constructor(
        @InjectModel('User')
        private userModel: Model<IUser>,
        @InjectModel('Profile')
        private userProfileModel: Model<IUserProfile>,
        @InjectModel('Registration')
        private registrationModel: Model<IRegistration>
        ){}

    async createUser(User:CreateUserDto):Promise<IUser>{
        const user = new this.userModel(User);
        return await user.save();
    }

    async createProfile(User:IUser,Profile:CreateUserProfileDto):Promise<CreateUserProfileDto>{        
        const profile = new this.userProfileModel({...Profile, userId:User._id});        
        return await profile.save();
    }

    async createRegistration(User:IUser,token:string):Promise<IRegistration>{        
        const registration = new this.registrationModel({
            token,
            userId:User._id,            
        });        
        return await registration.save();
    }
    async deleteRegistration(token:string):Promise<any>{  
       return await this.registrationModel.deleteOne({"token":token});
    }
    async findRegistration(token:string):Promise<IRegistration>{  
        return await this.registrationModel.findOne({token}).exec();
    }


    // async createUserProfile(User:CreateUserDto,Profile:CreateUserProfileDto,):Promise<CreateUserProfileDto>{
    //     const profile = new this.userProfileModel({...Profile, });
    //     return await profile.save();
    // }

    async findUserByEmail(email:string):Promise<IUser | undefined>{                
        return await this.userModel.findOne({email:email}).exec();
    }

    async findProfileByUserId(userId:string):Promise<IUserProfile | undefined>{            
        return await this.userProfileModel.findOne({userId:userId}).exec();        
    }
}