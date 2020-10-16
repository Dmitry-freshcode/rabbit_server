import {
    Controller,
    Body,
    Logger,   
    Query,    
    UseGuards,       
    Get,
    Post,
    Put,
    Delete,     
  } from '@nestjs/common';
  import { ApiTags, ApiResponse , ApiBody } from '@nestjs/swagger';
  import { IOrder } from './interfaces/order.interface'
  import { OrderService } from './order.service';
  import { OrderRepository } from './order.repository'
  import {CreateOrderDto} from './dto/order.dto';
  import { FindOrdersDto } from './dto/findOrders.dto';
  import { FindOrderDto } from './dto/findOrder.dto';
  import { DeleteDto } from '../shared/dto/delete.dto';
  import { UpdateDto } from '../shared/dto/update.dto';
  import {SuccessDto} from '../shared/dto/success.dto';
@ApiTags('order')
@Controller('order')
export class OrderController {
    private readonly logger = new Logger(OrderController.name);    
    constructor( 
        private readonly orderService: OrderService,
        private readonly orderDB : OrderRepository
      ) {}
      @Post()  
      @ApiBody({type: CreateOrderDto})   
      @ApiResponse({ status: 200, description: 'The order has been successfully created.', type: CreateOrderDto })
        async addOrder(
            @Body() order: CreateOrderDto,               
        ): Promise<IOrder> {                 
          return this.orderService.createOrder(order);  
      } 
      @Delete()
      @ApiBody({type: String})      
      @ApiResponse({ status: 200, description: 'Order was delete', type: DeleteDto })
        async deleteOrder(
            @Body('orderId') orderId:string,                
        ): Promise<DeleteDto> {  
          this.logger.log(`order ${orderId} was deleted`);               
          return await this.orderDB.delete(orderId);
      }   

      @Get('findUserOrders')  
      @ApiResponse({ status: 200, description: 'OK', type: [FindOrdersDto] })    
        async findUserOrders(
            @Query('userId') userId:string, 
            @Query('day') day:Date,   
        ):Promise<FindOrdersDto[]> {       
          return this.orderDB.findUserOrders(userId,day);  
      }

      @Get('findStaffOrders')
      @ApiResponse({ status: 200, description: 'OK', type: [FindOrdersDto] })      
        async findStaffOrders(
            @Query('staffId') staffId:string, 
            @Query('day') day:Date,   
        ):Promise<FindOrdersDto[]> {       
          return this.orderDB.findStaffOrders(staffId,day);  
      }

      @Get()
      @ApiResponse({ status: 200, description: 'OK', type: [FindOrderDto] })     
        async findOrder(@Query('orderId') orderId:string):Promise<FindOrderDto[]> {       
          return this.orderDB.findOrder(orderId);  
      }

      @Put() 
      @ApiBody({type: String})       
      @ApiResponse({ status: 200, description: 'The order has been successfully updated.', type: UpdateDto })
        async updateOrder(
            @Body() order: IOrder,                         
        ): Promise<UpdateDto> {   
          this.logger.log(`order ${order._id} was updated`);               
          return this.orderDB.updateOrder(order);  
      } 
}
