import { 
    Controller,
    Body,
    Logger,   
    Query,    
    //UseGuards,       
    Get,
    Post,
    Delete, 
    Patch,   
 } from '@nestjs/common';
 //import { ApiTags, ApiResponse } from '@nestjs/swagger';
 import { ServicesService } from './services.service';
 import { ServiceRepository } from './services.repository';
 import { CreateServiceDto } from './dto/service.dto';
 import { IService } from './interfaces/services.interface'

@Controller('services')
export class ServicesController {
    private readonly logger = new Logger(ServicesController.name);
    constructor(
        private readonly servicesService: ServicesService,
        private readonly servicesDB: ServiceRepository,
      ) {}

    @Post('add')
      async addService(
        @Body() service: CreateServiceDto): Promise<IService> {         
        return this.servicesDB.createService(service);  
    }
    @Delete('delete')
    async deleteService(
        @Body() id: string): Promise<any> {         
        return this.servicesDB.delete(id);  
    }
    @Patch('update')
    async updateService(
        @Body() service: IService): Promise<any> {         
        return this.servicesDB.updateService(service);  
    }
    @Get('find')
    async findService(
        @Query('id') id: string): Promise<IService | undefined> {         
        return this.servicesDB.find(id);  
    }
    @Get('findAll')
        async findAllServices(): Promise<IService[] | undefined> {         
        return this.servicesDB.findAll();  
    }
}


