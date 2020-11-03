import { Injectable ,HttpException,HttpStatus,Logger} from '@nestjs/common';
import {CreateOrderDto} from './dto/order.dto';
import { OrderRepository } from './order.repository';
import { OrderServiceRepository } from './orderService.repository';
import { IOrder } from './interfaces/order.interface';
import * as moment from 'moment';

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name);
    constructor(  
     private orderDB:OrderRepository,  
     private orderServiceDB:OrderServiceRepository,
     
    ) {}


    async createOrder(orderDto: CreateOrderDto):Promise<IOrder>{
        if(this.validateDate(orderDto.timeStart,orderDto.timeEnd)){
            throw new HttpException('Start time must be less than end time', HttpStatus.CONFLICT);
        }
        const orderUserInTime = await this.orderDB.findAll({
            userId:orderDto.userId,
            timeStart:{$gte:orderDto.timeStart},
            timeEnd:{$lte:orderDto.timeEnd}
        });
        if(orderUserInTime.length>0 ){
            throw new HttpException('At this time, the user already has an order', HttpStatus.CONFLICT);
        }
        const orderStaffInTime = await this.orderDB.findAll({
            staffId:orderDto.staffId,
            timeStart:{$gte:orderDto.timeStart},
            timeEnd:{$lte:orderDto.timeEnd}
        })        
        if(orderStaffInTime.length>0){
            throw new HttpException('At this time, the staff already has an order', HttpStatus.CONFLICT);
        }
        const order = await this.orderDB.createOrder(orderDto);        
        orderDto.services.forEach(async (serviceId:string):Promise<void>=>{
            await this.orderServiceDB.createOrderService({
                serviceId,
                orderId:order._id
            })
        });   
        this.logger.log(`order for user ${order.userId} created`);      
        return order;
    }
    
    async findUserOrders(userId:string,day:number): Promise<IOrder[]>{
        const timeStart= moment.unix(day).startOf('day').unix();
        const timeEnd= moment.unix(day).endOf('day').unix();            
        return await this.orderDB.findAll({
            userId:userId,
            timeStart:{$gte:timeStart},
            timeEnd:{$lte:timeEnd}
        });
    }


    validateDate (startDate : number,endDate: number):boolean{
        return moment(startDate).isAfter(endDate);
    }
  


    // async findAllOrder(userId: string,staffId: string): Promise<IOrder[]>{
    //     if(userId){
    //         return await this.orderDB.findAll({userId:userId});
    //     }
    //     return await this.orderDB.findAll({staffId:staffId});;
    // }
  
}
