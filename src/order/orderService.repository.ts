import { IOrderService } from './interfaces/orderService.interface';
import { Model } from 'mongoose';
import { CreateOrderServiceDto } from './dto/orderService.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class OrderServiceRepository{
    constructor(
        @InjectModel('Order')
        private orderServiceModel: Model<IOrderService>,
      
        ){}

    async findAll():Promise<IOrderService[] | undefined>{                     
        return await this.orderServiceModel.find({}).exec();
    }
    async createOrder(OrderService:CreateOrderServiceDto):Promise<IOrderService>{
        const orderService = new this.orderServiceModel(OrderService);
        return await orderService.save();
    }
    async updateOrder(OrderService:IOrderService):Promise<any>{  
        return await this.orderServiceModel.updateOne({_id:OrderService._id},OrderService);
    }
    async find(id:string):Promise<IOrderService | undefined>{                     
        return await this.orderServiceModel.findOne({_id:id}).exec();
    }
    async delete(id:string):Promise<any>{                
        return await this.orderServiceModel.deleteOne({_id:id}).exec();
    }

}