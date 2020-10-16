import { ILocation } from './interfaces/location.interface';
import { Model, Types } from 'mongoose';
import { CreateLocationDto } from './dto/location.dto';
//import { FindOrdersDto } from './dto/findOrders.dto';
import { DeleteDto } from '../shared/dto/delete.dto';
import { UpdateDto } from '../shared/dto/update.dto';
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
    console.log(Location);
    const location = new this.locationModel({
      userId: Location.userId,
      loc: {
        type: 'Point',
        coordinates: Location.location,
      },
    });
    return await location.save();
  }
  async updateLocation(Location: ILocation): Promise<ILocation> {
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
    lat: string,
    lng: string,
  ): Promise<any | undefined> {     
    return await this.locationModel.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [lat, lng],
          },
          distanceField: 'loc.coordinates._id',
          maxDistance: 5000
        }
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
        $match: {
          'category._id': Types.ObjectId(category),
        },
      },
    ]);
  }
}
