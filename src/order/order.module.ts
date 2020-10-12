import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schemas/order.schema';
import { OrderServiceSchema } from './schemas/orderServices.schema';
import { OrderRepository } from './order.repository'
import { OrderServiceRepository } from './orderService.repository'

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Order', schema: OrderSchema},
      {name: 'OrderService', schema: OrderServiceSchema},  
    ]),
  ],
  providers: [OrderService,OrderRepository,OrderServiceRepository],
  controllers: [OrderController],
  exports:[OrderRepository,OrderServiceRepository]
})
export class OrderModule {}
