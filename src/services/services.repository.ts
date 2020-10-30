import { IService } from './interfaces/services.interface';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/service.dto';
import { DeleteServiceDto } from './dto/serviceDelete.dto';
import { UpdateServiceDto } from './dto/serviceUpdate.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ServiceRepository{
    constructor(
        @InjectModel('Service')
        private serviceModel: Model<IService>,
      
        ){}

    async findAll():Promise<IService[] | undefined>{                     
        return await this.serviceModel.find({}).exec();
    }
    async createService(Service:CreateServiceDto):Promise<IService>{
        const service = new this.serviceModel(Service);
        return await service.save();
    }
    async updateService(Service:IService):Promise<UpdateServiceDto>{  
        return await this.serviceModel.updateOne({_id:Service._id},Service);
    }
    async find(id:string):Promise<IService | undefined>{                     
        return await this.serviceModel.findOne({_id:id}).exec();
    }
    async delete(id:string):Promise<DeleteServiceDto>{                
        return await this.serviceModel.deleteOne({_id:id}).exec();
    }
    async findByCategory(id:string):Promise<IService[] | undefined>{                     
        return await this.serviceModel.find({categoryId:id}).exec();
    }

    

}