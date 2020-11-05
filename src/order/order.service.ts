import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { OrderRepository } from './order.repository';
import { OrderServiceRepository } from './orderService.repository';
import { IOrder } from './interfaces/order.interface';
import * as moment from 'moment';
import { CryptoService } from 'src/utils/crypto';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    private orderDB: OrderRepository,
    private orderServiceDB: OrderServiceRepository,
    private cryptoService: CryptoService,
  ) {}

  async createOrder(orderDto: CreateOrderDto): Promise<IOrder> {
    if (this.validateDate(orderDto.timeStart, orderDto.timeEnd)) {
      throw new HttpException(
        'Start time must be less than end time',
        HttpStatus.CONFLICT,
      );
    }
    const userOrderAtTime = await this.orderDB.findAllUserOrderAtTime(
      orderDto.userId,
      orderDto.timeStart,
      orderDto.timeEnd,
    );
    if (userOrderAtTime.length > 0) {
      throw new HttpException(
        'At this time, the user already has an order',
        HttpStatus.CONFLICT,
      );
    }
    const staffOrderAtTime = await this.orderDB.findAllStaffOrderAtTime(
      orderDto.staffId,
      orderDto.timeStart,
      orderDto.timeEnd,
    );
    if (staffOrderAtTime.length > 0) {
      throw new HttpException(
        'At this time, the staff already has an order',
        HttpStatus.CONFLICT,
      );
    }
    const order = await this.orderDB.createOrder(orderDto);
    orderDto.services.forEach(
      async (serviceId: string): Promise<void> => {
        await this.orderServiceDB.createOrderService({
          serviceId,
          orderId: order._id,
        });
      },
    );
    this.logger.log(`order for user ${order.userId} created`);
    return order;
  }

  async findUserOrders(token: string, day: number): Promise<IOrder[]> {
    const userData = await this.cryptoService.decodeToken(token);
    const timeStart = moment
      .unix(day)
      .startOf('day')
      .unix();
    const timeEnd = moment
      .unix(day)
      .endOf('day')
      .unix();
      
    if (userData.role === 'user') {
      const orders = await this.orderDB.findAllUserOrderAtTime(
        userData.id,
        timeStart,
        timeEnd,
      );     
      return orders
    }
    if (userData.role === 'staff') {
      const orders =  await this.orderDB.findAllStaffOrderAtTime(
        userData.id,
        timeStart,
        timeEnd,
      );   
      return orders
    }
  }

  validateDate(startDate: number, endDate: number): boolean {
    return moment(startDate).isAfter(endDate);
  }

  // async findAllOrder(userId: string,staffId: string): Promise<IOrder[]>{
  //     if(userId){
  //         return await this.orderDB.findAll({userId:userId});
  //     }
  //     return await this.orderDB.findAll({staffId:staffId});;
  // }
}
