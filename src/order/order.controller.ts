import {
    Controller,
    Body,
    Logger,   
    Query,    
    UseGuards,       
    Get,
    Post,
    UseInterceptors, 
    UploadedFiles,
     
  } from '@nestjs/common';
  import { ApiTags, ApiResponse } from '@nestjs/swagger';
  import { IOrder } from './interfaces/order.interface'
  import { OrderService } from './order.service';
  import { OrderRepository } from './order.repository'
  import {CreateOrderDto} from './dto/order.dto';
  import { FindOrderDto } from './dto/findOrder.dto'
  import { FindOrdersDto } from './dto/findOrders.dto'
  import { CreateOrderServiceDto } from './dto/orderService.dto';
  import {SuccessDto} from '../shared/dto/success.dto';

@Controller('order')
export class OrderController {
    private readonly logger = new Logger(OrderController.name);    
    constructor( 
        private readonly orderService: OrderService,
        private readonly orderDB : OrderRepository
      ) {}
      @Post('addOrder')
      @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
        async addOrder(
            @Body() order: CreateOrderDto,
            @Body('services') services: string[],   
        ): Promise<IOrder> {                 
          return this.orderService.createOrder(order,services);  
      }  
  
      @Get('findOrder')
      @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
        async findOrder(
            @Query('orderId') orderId:string,                
        ): Promise<IOrder> {                 
          return await this.orderDB.find(orderId);
      }

      @Get('findUserOrders')      
        async findUserOrders(
            @Query('userId') userId:string, 
            @Query('day') day:Date,   
        ):Promise<FindOrdersDto[]> {       
          return this.orderDB.findUserOrders(userId,day);  
      }

      @Get('findStaffOrders')      
        async findStaffOrders(
            @Query('staffId') staffId:string, 
            @Query('day') day:Date,   
        ):Promise<FindOrdersDto[]> {       
          return this.orderDB.findStaffOrders(staffId,day);  
      }

}
