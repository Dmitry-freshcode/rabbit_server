import { Injectable ,HttpException,HttpStatus,Logger} from '@nestjs/common';
import {CreateOrderDto} from './dto/order.dto';
import { OrderRepository } from './order.repository';
import { OrderServiceRepository } from './orderService.repository';
import { IOrder } from './interfaces/order.interface'

@Injectable()
export class OrderService {
    private readonly logger = new Logger(OrderService.name);
    constructor(  
     private orderDB:OrderRepository,  
     private orderServiceDB:OrderServiceRepository,
     
    ) {}

    async createOrder(orderDto: CreateOrderDto,services: string[]):Promise<IOrder>{
        const order = await this.orderDB.createOrder(orderDto);        
        services.forEach(async (serviceId:string):Promise<void>=>{
            await this.orderServiceDB.createOrderService({
                serviceId,
                orderId:order._id
            })
        });   
        this.logger.log(`order for user ${order.userId} created`);      
        return order;
    }

    async findAllOrder(userId: string,staffId: string): Promise<IOrder[]>{
        if(userId){
            return await this.orderDB.findAll({userId:userId});
        }
        return await this.orderDB.findAll({staffId:staffId});;
    }
}
