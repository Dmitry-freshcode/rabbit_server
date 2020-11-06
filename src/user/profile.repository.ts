import { IUserProfile } from './interfaces/userProfile.interface';
import { Model } from 'mongoose';
import { CreateUserProfileDto } from './dto/createUserProfile.dto';
import { UpdateDto } from '../shared/dto/update.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProfileRepository {
  constructor(
    @InjectModel('Profile')
    private userProfileModel: Model<IUserProfile>,
  ) {}

  async findProfileByUserId(userId: string): Promise<IUserProfile | undefined> {
    return await this.userProfileModel.findOne({ userId: userId }).exec();
  }

  async updateProfile(profile: IUserProfile): Promise<UpdateDto> {
    const {userId,...newProfile} = profile;
    return await this.userProfileModel.updateOne({ userId: userId }, newProfile);   
  }

  async createProfile(
    Profile: CreateUserProfileDto,
  ): Promise<CreateUserProfileDto> {
    const profile = new this.userProfileModel(Profile);
    return await profile.save();
  }
}
