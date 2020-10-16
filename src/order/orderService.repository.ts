import { IOrderService } from './interfaces/orderService.interface';
import { Model } from 'mongoose';
import { CreateOrderServiceDto } from './dto/orderService.dto';
import { DeleteDto } from '../shared/dto/delete.dto';
import { UpdateDto } from '../shared/dto/update.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class OrderServiceRepository{
    constructor(
        @InjectModel('OrderService')
        private orderServiceModel: Model<IOrderService>,
      
        ){}

    async findAll():Promise<IOrderService[] | undefined>{                     
        return await this.orderServiceModel.find({}).exec();
    }
    async createOrderService(OrderService:CreateOrderServiceDto):Promise<IOrderService>{
        const orderService = new this.orderServiceModel(OrderService);
        return await orderService.save();
    }
    async updateOrderService(OrderService:IOrderService):Promise<UpdateDto>{  
        return await this.orderServiceModel.updateOne({_id:OrderService._id},OrderService);
    }
    async find(id:string):Promise<IOrderService | undefined>{                     
        return await this.orderServiceModel.findOne({_id:id}).exec();
    }
    async delete(id:string):Promise<DeleteDto>{                
        return await this.orderServiceModel.deleteOne({_id:id}).exec();
    }

}