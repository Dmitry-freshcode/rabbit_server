import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from './schemas/service.schema';
import { ServiceRepository } from './services.repository'

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Service', schema: ServiceSchema},
     // {name: 'Profile', schema: ProfileSchema},     
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService,ServiceRepository],
  exports:[ServiceRepository]
})
export class ServicesModule {}
