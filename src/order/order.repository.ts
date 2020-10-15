import { IOrder } from './interfaces/order.interface';
import { Model , Types } from 'mongoose';
import { CreateOrderDto } from './dto/order.dto';
import { FindOrdersDto } from './dto/findOrders.dto';
import { DeleteOrderDto } from './dto/orderDelete.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment';


@Injectable()
export class OrderRepository{
    constructor(
        @InjectModel('Order')
        private orderModel: Model<IOrder>      
        ){}

    async findAll(query):Promise<IOrder[] | undefined>{                     
        return await this.orderModel.find(query).exec();
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
    async delete(id:string):Promise<DeleteOrderDto>{                
        return await this.orderModel.deleteOne({_id:id}).exec();
    }
    async findUserOrders(userId:string,day:Date):Promise<FindOrdersDto[]>{                       
        return await this.orderModel.aggregate(
            [
                {
                    '$match': {
                      'userId': Types.ObjectId(userId)
                    }
                  }, {
                    '$match': {
                      'timeStart': {
                        '$gte': new Date(day), 
                        '$lte': moment(new Date(day)).add(1, 'd').toDate()
                      }
                    }
                  }, {
                    '$lookup': {
                      'from': 'profiles', 
                      'localField': 'staffId', 
                      'foreignField': 'userId', 
                      'as': 'staff'
                    }
                  }, {
                    '$lookup': {
                      'from': 'images', 
                      'localField': 'staffId', 
                      'foreignField': 'userId', 
                      'as': 'staffAvatar'
                    }
                  }, {
                    '$unwind': '$staff'
                  }, {
                    '$unwind': '$staffAvatar'
                  }, {
                    '$lookup': {
                      'from': 'orderservices', 
                      'localField': '_id', 
                      'foreignField': 'orderId', 
                      'as': 'services'
                    }
                  }, {
                    '$lookup': {
                      'from': 'services', 
                      'localField': 'services.serviceId', 
                      'foreignField': '_id', 
                      'as': 'services'
                    }
                  }, {
                    '$project': {
                      '_id': 1, 
                      'status': 1, 
                      'userId': 1, 
                      'staffId': 1, 
                      'timeStart': 1, 
                      'timeEnd': 1, 
                      'staffFname': '$staff.firstName', 
                      'staffLname': '$staff.lastName', 
                      'staffAvatar': '$staffAvatar.src', 
                      'services.name': 1, 
                      'services._id': 1
                    }
                  }
              ]
        )
    }

    async findStaffOrders(staffId:string,day:Date):Promise<FindOrdersDto[]>{                       
        return await this.orderModel.aggregate(
            [
                {
                    '$match': {
                      'staffId': Types.ObjectId(staffId)
                    }
                  }, {
                    '$match': {
                      'timeStart': {
                        '$gte': new Date(day), 
                        '$lte': moment(new Date(day)).add(1, 'd').toDate()
                      }
                    }
                  }, {
                    '$lookup': {
                      'from': 'profiles', 
                      'localField': 'userId', 
                      'foreignField': 'userId', 
                      'as': 'user'
                    }
                  }, {
                    '$lookup': {
                      'from': 'images', 
                      'localField': 'userId', 
                      'foreignField': 'userId', 
                      'as': 'userAvatar'
                    }
                  }, {
                    '$unwind': '$user'
                  }, {
                    '$unwind': '$userAvatar'
                  }, {
                    '$lookup': {
                      'from': 'orderservices', 
                      'localField': '_id', 
                      'foreignField': 'orderId', 
                      'as': 'services'
                    }
                  }, {
                    '$lookup': {
                      'from': 'services', 
                      'localField': 'services.serviceId', 
                      'foreignField': '_id', 
                      'as': 'services'
                    }
                  }, {
                    '$project': {
                      '_id': 1, 
                      'status': 1, 
                      'userId': 1, 
                      'staffId': 1, 
                      'timeStart': 1, 
                      'timeEnd': 1, 
                      'userFname': '$user.firstName', 
                      'userLname': '$user.lastName', 
                      'userAvatar': '$userAvatar.src', 
                      'services.name': 1, 
                      'services._id': 1
                    }
                  }
              ]
        )
    }

    

}