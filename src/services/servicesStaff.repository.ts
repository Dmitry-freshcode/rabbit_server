import { IServiceStaff } from './interfaces/serviceStaff.interface';
import { Model } from 'mongoose';
import { CreateServiceStaffDto } from './dto/serviceStaff.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ServiceStaffRepository{
    constructor(
        @InjectModel('ServiceStaff')
        private serviceStaffModel: Model<IServiceStaff>,
      
        ){}

    async findAll():Promise<IServiceStaff[] | undefined>{                     
        return await this.serviceStaffModel.find({}).exec();
    }
    async createServiceStaff(ServiceStaff:CreateServiceStaffDto):Promise<IServiceStaff>{
        const serviceStaff = new this.serviceStaffModel(ServiceStaff);
        return await serviceStaff.save();
    }
    async updateServiceStaff(ServiceStaff:IServiceStaff):Promise<any>{  
        return await this.serviceStaffModel.updateOne({_id:ServiceStaff._id},ServiceStaff);
    }
    async find(id:string):Promise<IServiceStaff | undefined>{                     
        return await this.serviceStaffModel.findOne({_id:id}).exec();
    }
    async delete(id:string):Promise<any>{                
        return await this.serviceStaffModel.deleteOne({_id:id}).exec();
    }

}