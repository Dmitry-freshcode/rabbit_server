import { ILocation } from './interfaces/location.interface';
import { Model, Types } from 'mongoose';
import { CreateLocationDto } from './dto/location.dto';
//import { FindOrdersDto } from './dto/findOrders.dto';
import { DeleteDto } from '../shared/dto/delete.dto';
import { UpdateDto } from '../shared/dto/update.dto';
import { NearDto } from './dto/near.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LocationRepository {
  constructor(
    @InjectModel('Location')
    private locationModel: Model<ILocation>,
  ) {}

  async findAll(query): Promise<ILocation[] | undefined> {
    return await this.locationModel.find(query).exec();
  }
  async createLocation(Location: CreateLocationDto): Promise<ILocation> {
    const location = new this.locationModel({
      userId: Location.userId,
      loc: {
        type: 'Point',
        coordinates: Location.location,
      },
    });
    return await location.save();
  }
  async updateLocation(Location: ILocation): Promise<UpdateDto> {
    return await this.locationModel.updateOne({ _id: Location._id }, Location);
  }
  async find(id: string): Promise<ILocation | undefined> {
    return await this.locationModel.findOne({ _id: id }).exec();
  }
  async delete(id: string): Promise<DeleteDto> {
    return await this.locationModel.deleteOne({ _id: id }).exec();
  }
  async getLocation(id: string): Promise<ILocation | undefined> {
    return await this.locationModel.findOne({ userId: id }).exec();
  }

  async nearStaff(
    category: string,
    lat: number,
    lng: number,
  ): Promise<NearDto[] | undefined> {
    return await this.locationModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [lat, lng],
          },
          distanceField: 'loc.distance',
          maxDistance: 10000,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $match: {
          'user.role': 'staff',
        },
      },
      {
        $lookup: {
          from: 'categorystaffs',
          localField: 'userId',
          foreignField: 'staffId',
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'user._id',
          foreignField: 'userId',
          as: 'profile',
        },
      },
      {
        $match: {
          'category.categoryId': Types.ObjectId(category),
        },
      },
      {
        $project: {
          loc: 1,
          profile: 1,
        },
      },
      {
        $unwind: '$profile',
      },
    ]);
  }
}
