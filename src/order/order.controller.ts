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
  import { CreateOrderServiceDto } from './dto/orderService.dto';
  import {SuccessDto} from '../shared/dto/success.dto';

@Controller('order')
export class OrderController {
    private readonly logger = new Logger(OrderController.name);
    private readonly orderDB : OrderRepository;
    constructor( 
        private readonly orderService: OrderService,
      ) {}
      @Post('addOrder')
      @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
        async addOrder(
            @Body() order: CreateOrderDto,
            @Body('services') services: string[],   
        ): Promise<IOrder> {                 
          return this.orderService.createOrder(order,services);  
      }
      @Get('findAllOrder')
      @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
        async findAllOrder(
            @Query('userId') userId:string, 
            @Query('staffId') staffId:string,   
        ): Promise<IOrder[]> {                 
          return this.orderService.findAllOrder(userId,staffId);  
      }
      @Get('findOrder')
      @ApiResponse({ status: 200, description: 'OK', type: SuccessDto })
        async findOrder(
            @Query('orderId') orderId:string,                
        ): Promise<IOrder> {                 
          return await this.orderDB.find(orderId);
      }


}
