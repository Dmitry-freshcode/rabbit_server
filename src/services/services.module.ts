import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from './schemas/service.schema';
import { ServiceRepository } from './services.repository';


@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Service', schema: ServiceSchema}           
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService,ServiceRepository],
  exports:[ServiceRepository,ServiceRepository]
})
export class ServicesModule {}
