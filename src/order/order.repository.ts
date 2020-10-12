import { IOrder } from './interfaces/order.interface';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/order.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class OrderRepository{
    constructor(
        @InjectModel('Order')
        private orderModel: Model<IOrder>,
      
        ){}

    async findAll():Promise<IOrder[] | undefined>{                     
        return await this.orderModel.find({}).exec();
    }
    async createOrder(Order:CreateOrderDto):Promise<IOrder>{
        const order = new this.orderModel(Order);
        return await order.save();
    }
    async updateOrder(Order:IOrder):Promise<any>{  
        return await this.orderModel.updateOne({_id:Order._id},Order);
    }
    async find(id:string):Promise<IOrder | undefined>{                     
        return await this.orderModel.findOne({_id:id}).exec();
    }
    async delete(id:string):Promise<any>{                
        return await this.orderModel.deleteOne({_id:id}).exec();
    }

}