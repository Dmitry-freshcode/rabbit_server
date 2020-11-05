import { IUser } from './interfaces/user.interface';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<IUser>,
  ) {}

  async createUser(User: CreateUserDto): Promise<IUser> {
    const user = new this.userModel(User);
    return await user.save();
  }

  async getUserState(id: string) {  
    return await this.userModel.aggregate([
      {
        '$match': {
          '_id': Types.ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'profiles', 
          'localField': '_id', 
          'foreignField': 'userId', 
          'as': 'profile'
        }
      }, {
        '$unwind': {
            'path': '$profile', 
            'includeArrayIndex': '0', 
            'preserveNullAndEmptyArrays': true
        }
    }, {
        '$lookup': {
          'from': 'locations', 
          'localField': '_id', 
          'foreignField': 'userId', 
          'as': 'location'
        }
      }, {
        '$unwind': {
            'path': '$location', 
            'includeArrayIndex': '0', 
            'preserveNullAndEmptyArrays': true
        }
    }, 
  //   {
  //     '$lookup': {
  //         'from': 'categorystaffs', 
  //         'localField': '_id', 
  //         'foreignField': 'staffId', 
  //         'as': 'categories'
  //     }
  // }, 
  {
      '$project': {
          '_id': 1,
          'strategy':1, 
          'role': 1, 
          'profile': 1, 
          'location': '$location.loc.coordinates', 
          //'categories': '$categories._id'
      }
  }
    ]);
  }

  async updateById(id: string, property): Promise<void> {
    return await this.userModel.updateOne({ _id: id }, property);
  }

  async findUserByEmail(email: string): Promise<IUser | undefined> {
    return await this.userModel.findOne({ email: email }).exec();
  }
  async findUserById(id: string): Promise<IUser | undefined> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  // async getCategory(id){
  //   return await this.userModel.findOne({ _id: id }).populate('categorystaffs');
  // }
}
