import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ServiceSchema } from './schemas/service.schema';
import { ServiceStaffSchema } from './schemas/servicesStaff.schema';
import { ServiceRepository } from './services.repository';
import { ServiceStaffRepository } from './servicesStaff.repository';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'Service', schema: ServiceSchema},
      {name: 'ServiceStaff', schema: ServiceStaffSchema},     
    ]),
  ],
  controllers: [ServicesController],
  providers: [ServicesService,ServiceRepository,ServiceStaffRepository],
  exports:[ServiceRepository,ServiceRepository,ServiceStaffRepository]
})
export class ServicesModule {}
