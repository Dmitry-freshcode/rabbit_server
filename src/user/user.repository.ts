import { IUser } from './interfaces/user.interface';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class UserRepository{
    constructor(@InjectModel('User')
        private userModel: Model<IUser>){}

    async create(Model:CreateUserDto):Promise<CreateUserDto>{
        const user = new this.userModel(Model);
        return await user.save();
    }

    async findUser(data:Object):Promise<IUser | undefined>{    
        return await this.userModel.findOne(data).exec();
    }
}